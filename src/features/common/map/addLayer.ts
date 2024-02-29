import mapboxgl, { LngLatLike, } from "mapbox-gl";
import { Point } from "./Point";

type MapEvent = mapboxgl.MapMouseEvent & {
    features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData

type AddLayerOptions = {
    onPointClick?: (event: MapEventHandler) => void;
    onMouseEnter?: (event: MapEventHandler) => void;
    onMouseExit?: (event: MapEventHandler) => void;
}

export class MapEventHandler {
    event: MapEvent;
    constructor(event: MapEvent) {
        this.event = event;
    };
    getPoint() {
        const pointString = this.event.features?.[0]?.properties?.point;
        if (!pointString) return undefined;
        return JSON.parse(pointString) as Point
    }
    getFeatures() {
        return this.event.features;
    }
    getCoordinates() {
        const point = this.getPoint();
        if (!point) return {} as LngLatLike;;
        return [point.longitude, point.latitude] as LngLatLike;
    }
}

export default function addLayer(NAME: string, map: mapboxgl.Map, { onPointClick, onMouseEnter, onMouseExit }: AddLayerOptions = {}) {
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
    map.on('mouseenter', NAME, (e) => {
        const event = new MapEventHandler(e);
        map.getCanvas().style.cursor = 'pointer';
        onMouseEnter?.(event);
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', NAME, (e) => {
        const event = new MapEventHandler(e);
        map.getCanvas().style.cursor = '';
        onMouseExit?.(event);
    });

    map.on('click', NAME, (e) => {
        const event = new MapEventHandler(e);
        onPointClick?.(event)
    });

}