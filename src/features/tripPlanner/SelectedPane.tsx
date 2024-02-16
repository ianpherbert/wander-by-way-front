import { Box, Button, Card, Collapse, IconButton, List, ListItem,  ListItemIcon, ListItemText, Stack, Tooltip } from "@mui/material";
import PlaceImage from "../common/unsplash/CityImage";
import { useTripPlannerContext } from "./useTripPlannerContext";
import { routeSearchRouteTypeIcons } from "../../utils/icons";
import { RouteSearchRoute } from "./RouteSearchResult";
import {  useMemo } from "react";
import useTranslation from "../../translations/useTranslation";
import { countryLabels } from "../../translations/countries";
import { minutesToHours } from "../../utils/dateUtils";
import { Add } from "@mui/icons-material";
import { Languages, TranslationLabelObject } from "../../translations/global";

const selectedPaneLabels: TranslationLabelObject<{
    addToTrip: string;
}> = {
    [Languages.EN]: {
        addToTrip: "Add to trip"
    },
    [Languages.FR]: {
        addToTrip: "Ajouter au voyage"
    }
}


function RouteListItem({ type, destination, origin, durationMinutes }: RouteSearchRoute) {
    const { addToTrip: addToTripLabel } = useTranslation(selectedPaneLabels);

    const country = useTranslation(countryLabels)
    const name = useMemo(() => `${destination.name} ${country[destination.country as keyof typeof country]}`, [destination])
    const subtitle = useMemo(() => {
        const { hours, remainingMinutes } = minutesToHours(durationMinutes);
        const minuteString = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;
        return `${hours}:${minuteString} from ${origin.name}`
    }, [origin, durationMinutes])


    const addToTrip = <Tooltip title={addToTripLabel}>
        <IconButton>
            <Add />
        </IconButton>
    </Tooltip>

    return (
        <ListItem secondaryAction={
            addToTrip
        }>
            <ListItemIcon>{routeSearchRouteTypeIcons[type]}</ListItemIcon>
            <ListItemText primary={name} secondary={subtitle} />

        </ListItem>
    )
}

export default function SelectedPane() {
    
    const { selectedSearchGroup, unselectSearchGroup } = useTripPlannerContext();

    return (
        <Collapse in={Boolean(selectedSearchGroup)} orientation="horizontal">
            <Card sx={{ height: "100%" }}>
                <Stack height={"100%"}>
                    <PlaceImage queryString={selectedSearchGroup?.destination.name} height={50} width={400} blur={2}>
                        <h2>{selectedSearchGroup?.destination.name}</h2>
                    </PlaceImage>
                    <Box flex={1} overflow={"auto"}>
                        <List>
                            {selectedSearchGroup?.routes.map(RouteListItem)}
                        </List>
                    </Box>
                    <Button
                        onClick={unselectSearchGroup}
                        variant="contained"
                        color="info"
                        sx={{ margin: 1 }}
                    >
                        Close
                    </Button>
                </Stack>
            </Card>

        </Collapse>
    )
}