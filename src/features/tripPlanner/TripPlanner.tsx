import { Stack } from "@mui/material";
import RouteSearchMap from "./RouteSearchMap";
import SelectedPane from "./SelectedPane";
import RouteSearchList from "./RouteSearchList";
import { useCallback, useState } from "react";

export default function TripPlanner() {
    const [mapLoaded, setMapLoaded] = useState(false);
    // it is essential that the map is initialised in its largest form. otherwise it will not fill space correctly
    const loadMap = useCallback(() => setMapLoaded(true), [setMapLoaded])

    return (
        <Stack direction="row" height={800} position="relative">
            {mapLoaded && <RouteSearchList />}
            <RouteSearchMap onLoad={loadMap} />
            {mapLoaded && <SelectedPane />}
        </Stack>
    )
}