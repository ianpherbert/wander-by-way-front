import { Card, Stack, Box, List, Button, ListItem, ListItemIcon, ListItemText, ListItemButton, IconButton } from "@mui/material";
import { useTripPlannerContext } from "./hooks/useTripPlannerContext";
import { useCallback, useState } from "react";
import { SearchItemType } from "../common/SearchItemType";
import { searchItemTypeIcons } from "../../utils/icons";
import { RiceBowl } from "@mui/icons-material";
import PlaceImage from "../common/unsplash/CityImage";

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

export default function RouteSearchList() {
    const [collapse, setCollapse] = useState(false);
    const { currentSearchResult, setSelectedSearchGroup } = useTripPlannerContext();

    const doSelectGroup = useCallback((id: number) => () => {
        const match = currentSearchResult?.destinations.find(it => it.destination.id === id);
        setSelectedSearchGroup(match);
    }, [setSelectedSearchGroup, currentSearchResult]);

    const toggleCollapse = useCallback(() => setCollapse(it => !it), [setCollapse])

    return (
        <>
            {collapse && <Box position="absolute" left={0} top={0} zIndex={50}>
                <IconButton onClick={toggleCollapse} title="Open">
                    <RiceBowl />
                </IconButton>
            </Box>}
            <Card sx={{ height: "100%", transition: "ease-in-out .5s", width: "fit-content", maxWidth: collapse ? 0 : 100000 }}>
                <Stack height={"100%"}>
                    <PlaceImage queryString={currentSearchResult?.origin.name} height={50} width={400} blur={2}>
                        <h2>{currentSearchResult?.origin.name}</h2>
                    </PlaceImage>
                    <Box flex={1} overflow={"auto"}>
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
                    </Box>
                    <Button
                        onClick={toggleCollapse}
                        variant="contained"
                        color="primary"
                        sx={{ margin: 1 }}
                        size="small"
                    >
                        Collapse
                    </Button>
                </Stack>
            </Card>
        </>
    )
}
