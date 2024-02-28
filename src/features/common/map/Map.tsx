import { Box, BoxProps } from "@mui/material";
import mapBox, { GeoJSONSource, LngLatLike } from "mapbox-gl";
import { mapKey, mapStyle } from "../../../variables";
import { useEffect, useMemo, useState } from "react";
import { mapIcons } from "./icons";
import { Feature } from "geojson";
import { Point } from "./Point";
import mapPointsToFeatures from "./mapPointInfo";
import mapboxgl from "mapbox-gl";
import MapError from "./MapError";

type MapBox = mapBox.Map;
type MapBoxError = mapBox.ErrorEvent

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
                    map.addImage(icon.name, image as HTMLImageElement, { pixelRatio: 30 });
                });
            }
            resolve(map)
        });
        map.on("error", (e) => {
            reject(e)
        });
    })
}

function addSearchPointsLayer(map: mapboxgl.Map, onSelectPoint: (id: string) => void) {
    const NAME = layers.searchPoints
    if (!map.getSource(NAME)) {
        map.addSource(NAME, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: []
            }
        });
    }

    if (!map.getLayer(NAME)) {
        map.addLayer({
            'id': NAME,
            'type': 'symbol',
            'source': NAME, // reference the data source
            'layout': {
                'icon-image': ['get', 'icon'],
                "icon-size": ['get', 'scale'],
                'icon-allow-overlap': false
            }
        });
    }

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', () => {
        map.getCanvas().style.cursor = '';
    });


    map.on('click', NAME, ({ features }) => {
        const feature = features?.[0] as Feature;
        if (!feature) return;
        const { id } = feature.properties ?? {};
        onSelectPoint(id);
    });
}

function addRoutePointsLayer(map: mapboxgl.Map) {
    const NAME = layers.routePoints;
    if (!map.getSource(NAME)) {
        map.addSource(NAME, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: []
            }
        });
    }

    if (!map.getLayer(NAME)) {
        map.addLayer({
            'id': NAME,
            'type': 'symbol',
            'source': NAME, // reference the data source
            'layout': {
                'icon-image': ['get', 'icon'],
                "icon-size": ['get', 'scale'],
                'icon-allow-overlap': false
            }
        });
    }

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', () => {
        map.getCanvas().style.cursor = '';
    });


    // map.on('click', NAME, ({ features }) => {
    //     const feature = features?.[0] as Feature;
    //     if (!feature) return;
    //     const { id } = feature.properties ?? {};
    //     onSelectPoint(id);
    // });
}

type MapProps = BoxProps & {
    searchPoints?: Point[];
    routePoints?: Point[];
    showConnections?: boolean;
    autoZoom?: boolean;
    autoZoomLevel?: number;
    selectedPoint?: Point;
    onSelectPoint?: (point?: Point) => void;
    onLoad?: () => void;
}

export default function Map({ searchPoints, routePoints, showConnections, onSelectPoint, selectedPoint, autoZoom, autoZoomLevel, onLoad, ...props }: MapProps) {
    const [map, setMap] = useState<MapBox>();
    const [mapError, setMapError] = useState<MapBoxError>();
    // Unfortunately we are obligated to have a selectedId state in order to ensure that the mapbox js calls the same function every time without reloading
    // However this state should not be used internally, and serves only to elevate the selected point.
    const [selectedId, setSelectedId] = useState<string>();

    //Initialize map
    useEffect(() => {
        if (!map) {
            initMap()?.then((newMap) => {
                addSearchPointsLayer(newMap, setSelectedId);
                addRoutePointsLayer(newMap);
                setMap(newMap);
                onLoad?.();
            }).catch((error) => {
                setMapError(error)
            })
        }
    }, [])

    useEffect(() => {
        const selectPoint = searchPoints?.find(it => it.id === selectedId);
        onSelectPoint?.(selectPoint)
    }, [selectedId])

    useEffect(() => {
        if (autoZoom) {
            // Here we use the selectedPoint.id instead of selectedId because the parent is the one who decides which point is selected.
            const feature = searchFeatures?.find(it => it.properties.id === selectedPoint?.id)
            const geometry = feature?.geometry as unknown as {
                coordinates: number[],
                type: string;
            };
            const coordinates = geometry?.coordinates as LngLatLike;
            map?.flyTo({
                center: coordinates,
                essential: true,
                zoom: autoZoomLevel ?? 10,
                padding: { top: 0, bottom: 0, left: 0, right: 0 }
            });
        }
    }, [selectedPoint])

    const searchFeatures = useMemo(() => searchPoints ? mapPointsToFeatures(searchPoints) : [], [searchPoints, showConnections]);
    const routeFeatures = useMemo(() => routePoints ? mapPointsToFeatures(routePoints) : [], [routePoints, showConnections]);

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
        }
    }
}