import { Box, BoxProps } from "@mui/material";
import mapBox, { GeoJSONSource, LngLatBoundsLike, LngLatLike } from "mapbox-gl";
import { mapKey, mapStyle } from "../../../variables";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mapIcons } from "./icons";
import { Feature } from "geojson";
import { Point } from "./Point";
import mapPointsToFeatures from "./mapPointInfo";
import mapboxgl from "mapbox-gl";
import MapError from "./MapError";
import { useBreakPoint } from "../../../useBreakpoint";
import addLayer, { MapEventHandler } from "./addLayer";
import { theme } from "../../../theme";

type MapBox = mapBox.Map;
type MapBoxError = mapBox.ErrorEvent;
type MapBoxPopup = mapBox.Popup;
type Marker = mapBox.Marker;

const MAP_CONTAINER = "map"
const layers = {
    searchPoints: "searchPoints",
    routePoints: "routePoints"
}

function initMap() {
    if (document.querySelector(".mapboxgl-canvas-container")) {
        return;
    }
    return new Promise<MapBox>((resolve, reject) => {
        mapBox.accessToken = mapKey;
        const map = new mapBox.Map({
            style: mapStyle,
            container: MAP_CONTAINER,
        });
        map.on("load", async () => {
            for (const icon of Object.values(mapIcons)) {
                map.loadImage(`/cartography/icons/${icon.path}`, (_, image) => {
                    map.addImage(icon.name, image as HTMLImageElement, { pixelRatio: icon.scale });
                });
            }
            resolve(map)
        });
        map.on("error", (e) => {
            reject(e)
        });
    })
}

function customPopup(name: string) {
    return `<div class="custom-popup">${name}</div>`
}

/** Tells which point, as well as the name of the layer */
export type PointHover = { point?: Point, layer: "search" | "route" }

type MapProps = BoxProps & {
    searchPoints?: Point[];
    routePoints?: Point[];
    showConnections?: boolean;
    autoZoom?: boolean;
    autoZoomLevel?: number;
    selectedPoint?: Point;
    onSelectPoint?: (point?: Point) => void;
    onLoad?: () => void;
    onPointHover?: (options?: PointHover) => void;
    markers?: Point[];
    onRoutePointLayerClick?: (point?: Point) => void;
}

export default function Map({ markers, searchPoints, routePoints, showConnections, onSelectPoint, selectedPoint, autoZoom, autoZoomLevel, onLoad, onPointHover, onRoutePointLayerClick, ...props }: MapProps) {
    const [map, setMap] = useState<MapBox>();
    const [mapError, setMapError] = useState<MapBoxError>();
    // Unfortunately we are obligated to have a selectedId state in order to ensure that the mapbox js calls the same function every time without reloading
    // However this state should not be used internally, and serves only to elevate the selected point.
    const [selectedSearchLayerId, setSelectedSearchLayerId] = useState<string>();
    const [selectedRouteLayerId, setSelectedRouteLayerId] = useState<string>();


    const [mapMarkers, setMapMarkers] = useState<Marker[]>([])

    /** Here we use a ref instead of a state, because we will need to pass this object at initialisation. Same problem as above */
    const openPopup = useRef<MapBoxPopup>();

    const handleHoverUpdate = (layer: "search" | "route") => (point?: Point) => onPointHover?.({ point, layer });

    const breakpoint = useBreakPoint(true);

    const isMobile = breakpoint < 2;

    //Initialize map
    useEffect(() => {
        if (!map) {
            initMap()?.then((newMap) => {

                const initPopup = (event: MapEventHandler) => {
                    const popup = new mapboxgl.Popup()
                        .setLngLat(event.getCoordinates())
                        .setHTML(customPopup(event.getPoint()?.label ?? ""))
                        .addTo(newMap);
                    openPopup.current = popup;
                }


                addLayer(layers.searchPoints, newMap, {
                    onPointClick: (event) => {
                        const feature = event.getFeatures()?.[0] as Feature;
                        if (!feature) return;
                        const { id } = feature.properties ?? {};
                        setSelectedSearchLayerId(id);
                    },
                    onMouseEnter: (event) => {
                        initPopup(event)
                        handleHoverUpdate("search")(event.getPoint());
                    },
                    onMouseExit: () => {
                        openPopup.current?.remove();
                        handleHoverUpdate("search")(undefined);
                    }
                })
                addLayer(layers.routePoints, newMap, {
                    onMouseEnter: (event) => {
                        initPopup(event);
                        handleHoverUpdate("route")(event.getPoint());
                    },
                    onMouseExit: () => {
                        openPopup.current?.remove();
                        handleHoverUpdate("route")(undefined);
                    },
                    onPointClick: (event) => {
                        const feature = event.getFeatures()?.[0] as Feature;
                        if (!feature) return;
                        const { id } = feature.properties ?? {};
                        setSelectedRouteLayerId(id)
                    },
                });
                setMap(newMap);
                onLoad?.();
            }).catch((error) => {
                setMapError(error)
            })
        }
    }, [])

    //See above comment about selectedId
    useEffect(() => {
        const selectPoint = searchPoints?.find(it => it.id === selectedSearchLayerId);
        onSelectPoint?.(selectPoint)
    }, [selectedSearchLayerId])

    useEffect(() => {
        if (selectedRouteLayerId) {
            const routePoint = routePoints?.find(it => it.id === selectedRouteLayerId);
            if (!routePoint) return;
            onRoutePointLayerClick?.(routePoint);
            setSelectedRouteLayerId(undefined);
        }
    }, [selectedRouteLayerId, setSelectedRouteLayerId])

    const searchFeatures = useMemo(() => searchPoints ? mapPointsToFeatures(searchPoints) : [], [searchPoints, showConnections]);
    const routeFeatures = useMemo(() => routePoints ? mapPointsToFeatures(routePoints) : [], [routePoints, showConnections]);


    useEffect(() => {
        setSelectedSearchLayerId(selectedPoint?.id);
        if (selectedPoint && !Boolean(routePoints?.length) && autoZoom) {
            const feature = searchFeatures?.find(it => it.properties.id === selectedPoint?.id);
            const geometry = feature?.geometry as unknown as {
                coordinates: number[],
                type: string;
            };
            const coordinates = geometry?.coordinates as LngLatLike;
            if (!coordinates) return;
            map?.flyTo({
                center: coordinates,
                essential: true,
                zoom: autoZoomLevel ?? 10,
                padding: { top: 0, bottom: 0, left: 0, right: isMobile ? 0 : 800 }
            });
        }
        if (!selectedPoint) {
            zoomToAllPoints(searchPoints)
        }
    }, [selectedPoint, isMobile])

    useEffect(() => {
        if (routePoints) {
            zoomToAllPoints(routePoints)
        }
    }, [routePoints])

    useEffect(() => {

        for (const marker of mapMarkers) {
            marker.remove()
        }

        if (markers && map) {
            const newMarkers = [];
            for (const marker of markers) {
                newMarkers.push(
                    new mapboxgl.Marker({ color: theme.palette.secondary.main })
                        .setLngLat([marker.longitude, marker.latitude])
                        .addTo(map)
                )
            }
            setMapMarkers(newMarkers)
        }
    }, [map, markers])

    /**Will set view of map to include all of the points that are passed to this method */
    const zoomToAllPoints = useCallback((pointsToZoom?: Point[]) => {
        if (!pointsToZoom || !Boolean(pointsToZoom?.length) || !autoZoom) {
            return;
        }
        const latSorted = pointsToZoom.sort((a, b) => a.latitude - b.latitude);
        const lonSorted = pointsToZoom.sort((a, b) => a.longitude - b.longitude);

        const extremePoints = {
            north: lonSorted[0],
            south: lonSorted[lonSorted.length - 1],
            west: latSorted[0],
            east: latSorted[latSorted.length - 1]
        };
        if (map) {
            try {
                const southwest = [extremePoints.west?.longitude, extremePoints.south?.latitude];
                const northeast = [extremePoints.east?.longitude, extremePoints.north?.latitude];
                const bbox = [southwest, northeast] as LngLatBoundsLike;
                map?.fitBounds(bbox, {
                    duration: 2000,
                    padding: { top: 50, bottom: 50, left: 50, right: 50 },
                });
            } catch (e) {
                console.error(e)
            }

        }
    }, [map, searchPoints, autoZoom])



    // Add search points data to map
    useEffect(() => {
        if (map) {
            const source = map.getSource(layers.searchPoints) as GeoJSONSource;
            source.setData({
                type: "FeatureCollection",
                features: searchFeatures
            });
        }
    }, [searchFeatures, map]);

    // Add route points data to map
    useEffect(() => {
        if (map) {
            const source = map.getSource(layers.routePoints) as GeoJSONSource;
            source.setData({
                type: "FeatureCollection",
                features: routeFeatures
            });
        }
    }, [routeFeatures, map]);



    return (
        <Box {...props} sx={styles.container}>
            {mapError ? <MapError /> : <Box id={MAP_CONTAINER} sx={styles.map}></Box>}
        </Box>
    )
}

const styles = {
    container: {
        position: "relative",
    },
    map: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        ".mapboxgl-control-container": {
            display: "none"
        },
        ".mapboxgl-popup": {
        },
        ".mapboxgl-popup-content": {
            background: "none",
            "boxShadow": "none",
            height: "fit-content",
            width: "fit-content",
            "button": {
                display: "none"
            }
        },
        ".mapboxgl-popup-tip": {
            display: "none"
        },
        ".custom-popup": {
            background: theme.palette.secondary.main,
            padding: "2px 5px 2px 5px",
            "borderRadius": "5px",
            color: "white"
        }
    }
}