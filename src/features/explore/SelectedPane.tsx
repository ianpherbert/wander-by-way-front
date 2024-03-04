import { Box, Button, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip } from "@mui/material";
import PlaceImage from "../common/unsplash/CityImage";
import { useExploreContext } from "./hooks/useExploreContext";
import { IntermediateIcon, routeSearchRouteTypeIcons } from "../../utils/icons";
import { RouteSearchRoute, RouteSearchRouteType, routeSearchRouteToSimpleRouteStopList } from "./RouteSearchResult";
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
import { PlaceOutlined } from "@mui/icons-material";

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
        if(!shouldFetchDetails){
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

    return (
        <Collapse in={open}>
            <List component="div" disablePadding>
                {!loading ?
                    displayedStops?.map(({ stop, plannedDeparture, plannedArrival }) => (
                        <ListItem secondaryAction={hoveredPoint?.point?.id === String(stop.id) && <PlaceOutlined />}>
                            <ListItemButton sx={{ pl: 4 }} key={stop.id}>
                                <ListItemIcon>
                                    <IntermediateIcon />
                                </ListItemIcon>
                                <ListItemText primary={stop.name} secondary={buildSecondaryLabel(plannedDeparture, plannedArrival)} />
                            </ListItemButton>
                        </ListItem>

                    )) :
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemIcon><CenteredLoader type="circular" /></ListItemIcon>
                    </ListItem>
                }
            </List>

        </Collapse>
    )
}

function RouteListItem({ route, open, toggleOpen }: { open: boolean; toggleOpen: () => void, route: RouteSearchRoute }) {
    const { addToTripLabel: expandLabel, countriesLabel: countries } = useTranslation(selectedPaneLabels);
    const name = useMemo(() => `${route.destination.name} ${countries[route.destination.country as keyof CountryLabel]}`, [route]);
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

    return (
        <WanderCard sx={{ height: "100%", width: Boolean(selectedSearchGroup) ? "fit-content" : 0 }} elevation={5}>
            <Stack height={"100%"}>
                <PlaceImage queryString={selectedSearchGroup?.destination.name} height={50} width={400} blur={2}>
                    <h2>{selectedSearchGroup?.destination.name}</h2>
                </PlaceImage>
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