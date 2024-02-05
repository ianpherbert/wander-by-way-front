import { Box } from "@mui/material";
import Map from "../features/map/Map";
import { MapPointType, Point } from "../features/map/Point";


const points: Point[] = [
    {
        id: "1",
        longitude: 2.3522, // Paris
        latitude: 48.8566,
        type: MapPointType.ORIGIN,
        label: "Paris",
    },
    {
        id: "2",
        longitude: -1.5536, // Rennes
        latitude: 48.1173,
        type: MapPointType.AIRPORT,
        label: "Rennes",
    },
    {
        id: "3",
        longitude: 3.0572, // Lyon
        latitude: 45.7640,
        type: MapPointType.TRAIN_STATION,
        label: "Lyon",
    },
    {
        id: "4",
        longitude: 5.7245, // Nice
        latitude: 43.7102,
        type: MapPointType.PORT,
        label: "Nice",
    },
    {
        id: "5",
        longitude: -0.5792, // Bordeaux
        latitude: 44.8378,
        type: MapPointType.BUS_STATION,
        label: "Bordeaux",
    }
];

export default function TestPage() {
    return (
        <Box >
            <Map height={800} width={800} points={points} autoZoom={true} />
        </Box>

    )
}