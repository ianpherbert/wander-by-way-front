import { Box, BoxProps } from "@mui/material";
import mapBox, { GeoJSONSource, LngLatLike } from "mapbox-gl";
import { mapKey, mapStyle } from "../../variables";
import { useEffect, useMemo, useState } from "react";
import { mapIcons } from "./icons";
import { Feature } from "geojson";
import { Point } from "./Point";
import mapPoints from "./mapPointInfo";
import mapboxgl from "mapbox-gl";
import MapError from "../MapError";

type MapBox = mapBox.Map;
type MapBoxError = mapBox.ErrorEvent

const MAP_CONTAINER = "map"

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
            for (const icon of Object.entries(mapIcons)) {
                map.loadImage(`/cartography/icons/${icon[1].path}`, (_, image) => {
                    map.addImage(icon[1].name, image as HTMLImageElement, { pixelRatio: 30 });
                });
            }
            resolve(map)
        });
        map.on("error", (e) => {
            reject(e)
        });
    })
}

function addPointsLayer(map: mapboxgl.Map, onSelectPoint: (id: string) => void) {
    map.addSource("points", {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: []
        }
    });

    map.addLayer({
        'id': "points",
        'type': 'symbol',
        'source': "points", // reference the data source
        'layout': {
            'icon-image': ['get', 'icon'],
            "icon-size": ['get', 'scale'],
            'icon-allow-overlap': false
        }
    });
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', () => {
        map.getCanvas().style.cursor = '';
    });


    map.on('click', "points", ({ features }) => {
        const feature = features?.[0] as Feature;
        if (!feature) return;
        const { id } = feature.properties ?? {};
        onSelectPoint(id);
    });
}

type MapProps = BoxProps & {
    points?: Point[];
    showConnections?: boolean;
    autoZoom?: boolean;
    autoZoomLevel?: number;
    selectedPoint?: Point;
    onSelectPoint?: (point?: Point) => void;
}

export default function Map({ points, showConnections, onSelectPoint, autoZoom, autoZoomLevel, ...props }: MapProps) {
    const [map, setMap] = useState<MapBox>();
    const [mapError, setMapError] = useState<MapBoxError>();
    const [selectedId, setSelectedId] = useState<string>();

    //Initialize map
    useEffect(() => {
        if (!map) {
            initMap()?.then((newMap) => {
                addPointsLayer(newMap, setSelectedId);
                setMap(newMap);
            }).catch((error) => {
                setMapError(error)
            })
        }
    }, [])

    useEffect(()=>{
        if(autoZoom){
            const feature = features?.find(it => it.properties.id === selectedId)
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
        const selectedPoint = points?.find(it => it.id === selectedId);
        onSelectPoint?.(selectedPoint)
    }, [selectedId])

    const features = useMemo(() => points ? mapPoints(points, Boolean(showConnections)) : [], [points, showConnections]);

    // Add points data to map
    useEffect(() => {
        if (map && features.length) {
            const source = map.getSource("points") as GeoJSONSource;
            source.setData({
                type: "FeatureCollection",
                features: features
            });
        }
    }, [features, map]);



    return (
        <Box {...props} sx={styles.container}>
            {mapError ? <MapError/> : <Box id={MAP_CONTAINER} sx={styles.map}></Box>}
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