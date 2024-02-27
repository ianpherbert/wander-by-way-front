import { Stack, Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { useTripPlannerContext } from "./hooks/useTripPlannerContext";
import { useCallback } from "react";
import { SearchItemType } from "../common/SearchItemType";
import { searchItemTypeIcons } from "../../utils/icons";
import PlaceImage from "../common/unsplash/CityImage";
import WanderCard from "../common/WanderCard";
import CenteredLoader from "../common/CenteredLoader";



function RouteSearchListItem({ type, name, routeCount, onClick }: { type: SearchItemType, name: string, routeCount: number; onClick: () => void }) {
    const countLabel = routeCount + " Routes"

    return (
        <ListItem >
            <ListItemButton onClick={onClick}>
                <ListItemIcon>{searchItemTypeIcons[type]}</ListItemIcon>
                <ListItemText primary={name} secondary={countLabel} />
            </ListItemButton>
        </ListItem>
    )
}

type RouteSearchListProps = {
    visible: boolean;
}

export default function RouteSearchList({ visible }: RouteSearchListProps) {

    const { currentSearchResult, setSelectedSearchGroup, currentSearchQueryFetching, currentOrigin } = useTripPlannerContext();
    const doSelectGroup = useCallback((id: number) => () => {
        const match = currentSearchResult?.destinations.find(it => it.destination.id === id);
        setSelectedSearchGroup(match);
    }, [setSelectedSearchGroup, currentSearchResult]);


    return (
        <WanderCard sx={[styles.card, { maxWidth: visible ? "100%" : 0, }]} elevation={5}>
            <Stack height={"100%"}>
                <PlaceImage queryString={currentOrigin?.name} height={50} width={400} blur={2}>
                    <h2>{currentOrigin?.name}</h2>
                </PlaceImage>
                <Box flex={1} overflow={"auto"} pb={10} position="relative">
                    <List dense>
                        {currentSearchResult?.destinations.map(({ destination, routes }) => (
                            <RouteSearchListItem
                                routeCount={routes.length}
                                key={destination.id}
                                type={destination.type}
                                name={destination.name}
                                onClick={doSelectGroup(destination.id)}
                            />
                        ))}

                    </List>
                    {currentSearchQueryFetching && <CenteredLoader type="circular" />}
                </Box>
            </Stack>
        </WanderCard>
    )
}

const styles = {
    card: {
        height: "100%",
        width: "fit-content",
    },
}