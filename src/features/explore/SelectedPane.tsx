import { Box, Button, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { useExploreContext } from "./hooks/useExploreContext";
import { IntermediateIcon, routeSearchRouteTypeIcons } from "../../utils/icons";
import { RouteSearchPlace, RouteSearchRoute, RouteSearchRouteType, routeSearchRouteToSimpleRouteStopList } from "./RouteSearchResult";
import { useCallback, useEffect, useMemo, useState } from "react";
import useTranslation from "../../translations/useTranslation";
import { CountryLabel, countryLabels } from "../../translations/countries";
import { useDateFormatter } from "../../utils/dateUtils";
import { Languages, TranslationLabelObject } from "../../translations/global";
import { SearchItemType } from "../common/SearchItemType";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetRouteQuery } from "./exploreRest";
import { differenceInMinutes, isAfter, parseISO } from "date-fns";
import WanderCard from "../common/WanderCard";
import CenteredLoader from "../common/CenteredLoader";
import ContainerWithImage from "../common/ContainerWithImage";
import { InternalImage } from "../../assets/images";
import { theme } from "../../theme";
import NewSearchDialog from "./NewSearchDialog";

const selectedPaneLabels: TranslationLabelObject<{
    addToTripLabel: string;
    countriesLabel: CountryLabel;
    minutesLayoverLabel: string;
    closeLabel: string;
}> = {
    [Languages.EN]: {
        addToTripLabel: "See the stops on this route",
        countriesLabel: countryLabels.EN,
        minutesLayoverLabel: "minute stop",
        closeLabel: "close"
    },
    [Languages.FR]: {
        addToTripLabel: "Voir les arrêts sur cette ligne",
        countriesLabel: countryLabels.FR,
        minutesLayoverLabel: "minutes d'arrêt",
        closeLabel: "fermer"
    }
}

const DATE_FORMAT = "MMM d h:mma";

const getDetails = [
    RouteSearchRouteType.TRAIN
]

function StopList({ open, route }: {
    open: boolean, route: RouteSearchRoute
}) {
    const { minutesLayoverLabel: minutesLayover } = useTranslation(selectedPaneLabels);
    const { currentOrigin, setSelectedRouteStops, hoveredPoint } = useExploreContext();
    const { formatDate } = useDateFormatter();

    const [selectedStop, setSelectedStop] = useState<RouteSearchPlace>();

    const shouldFetchDetails = useMemo(() => getDetails.includes(route.type), [route])

    const tripSearchParams = useMemo(() => {
        // Only need to focus on open. RTK query will not refetch if the last query is in its cache
        if (open && shouldFetchDetails) {
            return { routeIds: [route.routeId], placeType: SearchItemType.TRAIN_STATION }
        }
        return skipToken;
    }, [open, shouldFetchDetails, route])

    const { data: routes, isFetching: loading } = useGetRouteQuery(tripSearchParams);

    // We always get a list from the api, but since we are only requesting one routeId, the list should only be one long.
    const { stops } = useMemo(() => routes?.find(it => it.routeId === route.routeId) ?? { stops: [] }, [routes, route])

    const displayedStops = useMemo(() => {
        if (!stops && shouldFetchDetails) return [];
        if (!shouldFetchDetails) {
            return routeSearchRouteToSimpleRouteStopList(route);
        }

        const filtered = stops.filter(({ plannedDeparture, stop }) => {
            if (plannedDeparture === null) return true;
            if (plannedDeparture && route.departureTime) {
                const parsedStop = parseISO(plannedDeparture);
                const parsedDeparture = parseISO(route.departureTime);
                return isAfter(parsedStop, parsedDeparture) || currentOrigin?.name === stop.name;
            }
        })
        return filtered;
    }, [stops, route]);

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
            setSelectedRouteStops(places ?? []);
        }
    }, [setSelectedRouteStops, routes, open])

    /** Will search from selected stop on the same day */
    const handleStopClick = useCallback((stop?: RouteSearchPlace) => () => {
        setSelectedStop(stop);

    }, [setSelectedStop])

    return (
        <Collapse in={open}>
            <List component="div" disablePadding sx={{ bgcolor: "grey.100" }}>
                {!loading ?
                    displayedStops?.map(({ stop, plannedDeparture, plannedArrival }) => (
                        //We do not need to handle the case of a user clicking on the current stop, because the navigate will just do nothing.
                        <ListItemButton key={stop.id} onClick={handleStopClick(stop)} >
                            <ListItemIcon>
                                <IntermediateIcon sx={hoveredPoint?.point?.id === String(stop.id) ? { color: theme.palette.primary.main } : {}} />
                            </ListItemIcon>
                            <ListItemText primary={stop.name} secondary={buildSecondaryLabel(plannedDeparture, plannedArrival)}
                                sx={styles.intermediateItem}
                            />
                        </ListItemButton>

                    )) :
                    <ListItem>
                        <ListItemIcon><CenteredLoader type="circular" /></ListItemIcon>
                    </ListItem>
                }
            </List>
            <NewSearchDialog stop={selectedStop} onClose={handleStopClick(undefined)} />
        </Collapse>
    )
}

function RouteListItem({ route, open, toggleOpen }: { open: boolean; toggleOpen: () => void, route: RouteSearchRoute }) {
    const { addToTripLabel: expandLabel, countriesLabel: countries } = useTranslation(selectedPaneLabels);
    const name = useMemo(() => `${route.destination.name} (${countries[route.destination.country as keyof CountryLabel]})`, [route]);
    const { formatDateFromString } = useDateFormatter();

    return (
        <>
            <Tooltip title={expandLabel}>
                <ListItemButton onClick={toggleOpen} selected={open}>
                    <ListItemIcon>{routeSearchRouteTypeIcons[route.type]}</ListItemIcon>
                    <ListItemText primary={name} secondary={formatDateFromString(route.departureTime, DATE_FORMAT)} />
                </ListItemButton>
            </Tooltip>
            <StopList open={open} route={route} />
        </>
    )
}

export default function SelectedPane() {
    const { selectedSearchGroup, unselectSearchGroup, setSelectedRouteStops } = useExploreContext();
    const [openDestinationId, setOpenDestinationId] = useState<string>();
    const { closeLabel } = useTranslation(selectedPaneLabels)

    const handleSetOpenDestinationId = useCallback(({ routeId }: RouteSearchRoute) => () => {
        if (openDestinationId === routeId) {
            setOpenDestinationId(undefined);
            setSelectedRouteStops([]);
        } else {
            setOpenDestinationId(routeId);
        }
    }, [setOpenDestinationId, openDestinationId, setSelectedRouteStops]);

    const closePane = useCallback(() => {
        setOpenDestinationId(undefined);
        unselectSearchGroup();
    }, [unselectSearchGroup])

    const containerImage: InternalImage = useMemo(() => {
        switch (selectedSearchGroup?.destination.type) {
            case SearchItemType.AIRPORT:
                return "airport1";
            case SearchItemType.CITY:
                return "cityscape1";
            case SearchItemType.TRAIN_STATION:
                return "trainStation1";
            case SearchItemType.BUS_STATION:
                return "busStation1";
            case SearchItemType.PORT:
                return "port1"
        }
        return "cityscape1"
    }, [selectedSearchGroup])

    return (
        <WanderCard sx={{ height: "100%", width: Boolean(selectedSearchGroup) ? "fit-content" : 0 }} elevation={5}>
            <Stack height={"100%"}>
                <ContainerWithImage url={containerImage} height={100} width={400}>
                    <Typography variant="h4" sx={styles.title}>{selectedSearchGroup?.destination.name}</Typography>
                </ContainerWithImage>

                <Box flex={1} overflow={"auto"}>
                    <List>
                        {selectedSearchGroup?.routes.map((route, index) => (
                            <RouteListItem
                                route={route}
                                key={route.destination.id + index}
                                toggleOpen={handleSetOpenDestinationId(route)}
                                open={openDestinationId === route.routeId}
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
                    {closeLabel}
                </Button>
            </Stack>
        </WanderCard>
    )
}

const styles = {
    title: {
        bgcolor: "#DCDADAcc",
        p: .2,
        borderRadius: 3,
        textAlign: "center"
    },
    intermediateItem: {
        width: 250,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
}