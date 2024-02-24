import { Box, Button, Card, CircularProgress, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip } from "@mui/material";
import PlaceImage from "../common/unsplash/CityImage";
import { useTripPlannerContext } from "./hooks/useTripPlannerContext";
import { IntermediateIcon, routeSearchRouteTypeIcons } from "../../utils/icons";
import { RouteSearchRoute } from "./RouteSearchResult";
import { useCallback, useEffect, useMemo, useState } from "react";
import useTranslation from "../../translations/useTranslation";
import { CountryLabel, countryLabels } from "../../translations/countries";
import { useDateFormatter } from "../../utils/dateUtils";
import { Languages, TranslationLabelObject } from "../../translations/global";
import { SearchItemType } from "../common/SearchItemType";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetRouteQuery } from "./exploreRest";
import { differenceInMinutes, isAfter, parseISO } from "date-fns";

const selectedPaneLabels: TranslationLabelObject<{
    addToTrip: string;
    countries: CountryLabel;
    minutesLayover: string
}> = {
    [Languages.EN]: {
        addToTrip: "See the stops on this route",
        countries: countryLabels.EN,
        minutesLayover: "minute stop"
    },
    [Languages.FR]: {
        addToTrip: "Voir les arrêts sur cette ligne",
        countries: countryLabels.FR,
        minutesLayover: "minutes d'arrêt"
    }
}

const DATE_FORMAT = "MMM d h:mma"

function StopList({ open, departureTime, routeId }: {
    open: boolean, departureTime: string, routeId: string
}) {
    const { minutesLayover } = useTranslation(selectedPaneLabels);
    const { currentOrigin, setSelectedRouteStops: setAdditionalSearchPlaces } = useTripPlannerContext();
    const { formatDate } = useDateFormatter();

    const tripSearchParams = useMemo(() => {
        // Only need to focus on open. RTK query will not refetch if the last query is in its cache
        if (open) {
            return { routeIds: [routeId], placeType: SearchItemType.TRAIN_STATION }
        }
        return skipToken;
    }, [open])

    const { data: routes, isFetching: loading } = useGetRouteQuery(tripSearchParams);

    const { stops } = useMemo(() => routes?.find(it => it.routeId === routeId) ?? { stops: [] }, [routes, routeId])

    const displayedStops = useMemo(() => {
        if (!stops) return [];

        const filtered = stops.filter(({ plannedDeparture, stop }) => {
            if (plannedDeparture === null) return true;
            if (plannedDeparture && departureTime) {
                const parsedStop = parseISO(plannedDeparture);
                const parsedDeparture = parseISO(departureTime);
                return isAfter(parsedStop, parsedDeparture) || currentOrigin?.name === stop.name;
            }
        })
        return filtered;
    }, [stops, departureTime]);

    const buildSecondaryLabel = useCallback((plannedArrival?: string | null, plannedDeparture?: string | null) => {
        const plannedDepartureIso = Boolean(plannedArrival) ? parseISO(plannedArrival!) : undefined;
        const plannedArrivalIso = Boolean(plannedDeparture) ? parseISO(plannedDeparture!) : undefined;

        if (plannedArrivalIso && plannedDepartureIso) {
            const stopover = differenceInMinutes(plannedDepartureIso, plannedArrivalIso);
            const stopoverString = stopover > 5 ? `(${stopover} ${minutesLayover})` : ""
            return `${formatDate(plannedDepartureIso, DATE_FORMAT)} ${stopoverString}`;
        }
        if (plannedArrivalIso) {
            return formatDate(plannedArrivalIso, DATE_FORMAT);
        }
        if (plannedDepartureIso) {
            return formatDate(plannedDepartureIso, DATE_FORMAT);
        }
    }, [formatDate]);

    useEffect(() => {
        if (open) {
            const places = routes?.flatMap(it => it.stops.map(({ stop }) => stop))
            setAdditionalSearchPlaces(places ?? []);
        }
    }, [setAdditionalSearchPlaces, routes, open])

    return (
        <Collapse in={open}>
            <List component="div" disablePadding>
                { !loading ? 
                    displayedStops?.map(({ stop, plannedDeparture, plannedArrival }) => (
                        <ListItemButton sx={{ pl: 4 }} key={stop.id}>
                            <ListItemIcon>
                                <IntermediateIcon />
                            </ListItemIcon>
                            <ListItemText primary={stop.name} secondary={buildSecondaryLabel(plannedDeparture, plannedArrival)} />
                        </ListItemButton>
                    )) :
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemIcon><CircularProgress/></ListItemIcon>
                    </ListItem>
                }
            </List>

        </Collapse>
    )
}

function RouteListItem({ type, destination, departureTime, open, toggleOpen, routeId }: RouteSearchRoute & { open: boolean; toggleOpen: () => void }) {
    const { addToTrip: expandLabel, countries } = useTranslation(selectedPaneLabels);
    const name = useMemo(() => `${destination.name} ${countries[destination.country as keyof CountryLabel]}`, [destination]);
    const { formatDateFromString } = useDateFormatter();

    return (
        <>
            <Tooltip title={expandLabel}>
                <ListItemButton onClick={toggleOpen} selected={open}>
                    <ListItemIcon>{routeSearchRouteTypeIcons[type]}</ListItemIcon>
                    <ListItemText primary={name} secondary={formatDateFromString(departureTime, DATE_FORMAT)} />
                </ListItemButton>
            </Tooltip>
            <StopList open={open} departureTime={departureTime} routeId={routeId} />
        </>
    )
}

export default function SelectedPane() {
    const { selectedSearchGroup, unselectSearchGroup, setSelectedRouteStops: setAdditionalSearchPlaces } = useTripPlannerContext();
    const [openDestinationId, setOpenDestinationId] = useState<string>();

    const handleSetOpenDestinationId = useCallback(({ routeId }: RouteSearchRoute) => () => {
        if (openDestinationId === routeId) {
            setOpenDestinationId(undefined);
            setAdditionalSearchPlaces([]);
        } else {
            setOpenDestinationId(routeId);
        }
    }, [setOpenDestinationId, openDestinationId]);

    const closePane = useCallback(() => {
        setAdditionalSearchPlaces([]);
        unselectSearchGroup();
    }, [setAdditionalSearchPlaces, unselectSearchGroup])

    return (
        <Collapse in={Boolean(selectedSearchGroup)} orientation="horizontal" key={selectedSearchGroup?.destination.id}>
            <Card sx={{ height: "100%" }}>
                <Stack height={"100%"}>
                    <PlaceImage queryString={selectedSearchGroup?.destination.name} height={50} width={400} blur={2}>
                        <h2>{selectedSearchGroup?.destination.name}</h2>
                    </PlaceImage>
                    <Box flex={1} overflow={"auto"}>
                        <List>
                            {selectedSearchGroup?.routes.map((props, index) => (
                                <RouteListItem
                                    {...props}
                                    key={props.destination.id + index}
                                    toggleOpen={handleSetOpenDestinationId(props)}
                                    open={openDestinationId === props.routeId}
                                />
                            ))}
                        </List>
                    </Box>
                    <Button
                        onClick={closePane}
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