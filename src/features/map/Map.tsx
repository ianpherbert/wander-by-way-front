import { Box, BoxProps } from "@mui/material";
import mapBox from "mapbox-gl";
import { mapKey, mapStyle } from "../../variables";
import { useEffect, useState } from "react";

type MapBox = mapBox.Map;
type MapBoxError = mapBox.ErrorEvent

type MapProps = BoxProps & {
    auto?: boolean;
}

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
            // for (const icon of Object.entries(mapIcons)) {
            //     map.loadImage(`/cartography/icons/${icon[1].path}`, (error, image) => {
            //         map.addImage(icon[1].name, image as HTMLImageElement, {pixelRatio: 30});
            //     });
            // }
            resolve(map)
            // document.querySelector(".mapboxgl-control-container")?.remove()
        });
        map.on("error", (e) => {
            reject(e)
        });
    })
}

export default function Map({ auto, ...props }: MapProps) {
    const [map, setMap] = useState<MapBox>();
    const [mapError, setMapError] = useState<MapBoxError>();

    useEffect(() => {
        if (!map) {
            initMap()?.then((newMap) => {
                console.log({ map, newMap })
                setMap(newMap)
            }).catch((error) => {
                setMapError(error)
            })
        }
    }, [])


    return (
        <Box {...props} sx={styles.container}>
            <Box id={MAP_CONTAINER} sx={styles.map}></Box>
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
        ".mapboxgl-control-container":{
            display: "none"
        }
    }
}