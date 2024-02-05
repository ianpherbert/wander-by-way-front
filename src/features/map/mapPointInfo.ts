import { Point } from "./Point";
import { mapIcons } from "./icons";

export interface MapFeature {
    type: "Feature";
    properties: {
        description?: string;
        icon: string;
        size: number;
        point: Point;
        id: string;
    }
    geometry: {
        type: "Point",
        coordinates: [number, number]
    }
}

function mapPointsToFeatures(points: Point[]): MapFeature[] {
    return points.map(it => {
        const { name, scale } = mapIcons[it.type]
        return {
            type: "Feature",
            properties: {
                icon: name,
                size: scale,
                point: it,
                id: it.id
            },
            geometry: {
                type: "Point",
                coordinates: [it.longitude, it.latitude]
            }
        };
    });
}

export default mapPointsToFeatures;