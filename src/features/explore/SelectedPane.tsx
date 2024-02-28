import { Box, Button, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip } from "@mui/material";
import PlaceImage from "../common/unsplash/CityImage";
import { useExploreContext } from "./hooks/useExploreContext";
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

const DATE_FORMAT = "MMM d h:mma"

function StopList({ open, departureTime, routeId }: {
    open: boolean, departureTime: string, routeId: string
}) {
    const { minutesLayoverLabel: minutesLayover } = useTranslation(selectedPaneLabels);
    const { currentOrigin, setSelectedRouteStops, hoveredPoint } = useExploreContext();
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

// function RouteSearchListItem({ destination, routeCount, onClick }: { destination: RouteSearchPlace, routeCount: number; onClick: () => void }) {
//     const countLabel = routeCount + " Routes";
//     const { selectedSearchGroup, hoveredPoint } = useExploreContext();

//     const isSelected = useMemo(() => selectedSearchGroup?.destination.id === destination.id, [destination, selectedSearchGroup])
//     const isHoveredOnMap = useMemo(() => hoveredPoint?.layer === "search" && hoveredPoint?.point?.id === String(destination.id), [destination, hoveredPoint])

//     return (
//         <ListItem secondaryAction={isHoveredOnMap && <PlaceOutlined />}>
//             <ListItemButton onClick={onClick} selected={isSelected}>
//                 <ListItemIcon>{searchItemTypeIcons[destination.type]}</ListItemIcon>
//                 <ListItemText primary={destination.name} secondary={countLabel} />
//             </ListItemButton>
//         </ListItem>
//     )
// }

function RouteListItem({ type, destination, departureTime, open, toggleOpen, routeId }: RouteSearchRoute & { open: boolean; toggleOpen: () => void }) {
    const { addToTripLabel: expandLabel, countriesLabel: countries } = useTranslation(selectedPaneLabels);
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
                    {closeLabel}
                </Button>
            </Stack>
        </WanderCard>
    )
}