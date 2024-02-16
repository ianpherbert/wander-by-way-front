import { Stack } from "@mui/material";
import RouteSearchMap from "./RouteSearchMap";
import SelectedPane from "./SelectedPane";

export default function TripPlanner() {

    return (
        <Stack direction="row" height={800}>
            <RouteSearchMap />
            <SelectedPane />
        </Stack>
    )
}