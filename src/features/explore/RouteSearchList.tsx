import { Stack, Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography } from "@mui/material";
import { useExploreContext } from "./hooks/useExploreContext";
import { useCallback, useMemo } from "react";
import { SearchItemType } from "../common/SearchItemType";
import { searchItemTypeIcons } from "../../utils/icons";
import PlaceImage from "../common/unsplash/CityImage";
import WanderCard from "../common/WanderCard";
import CenteredLoader from "../common/CenteredLoader";
import { Image } from "../../assets/images";
import { theme } from "../../theme";
import { Languages, TranslationLabelObject } from "../../translations/global";
import useTranslation from "../../translations/useTranslation";
import { RouteSearchGroup, RouteSearchPlace } from "./RouteSearchResult";
import { PlaceOutlined } from "@mui/icons-material";

const routeSearchListLabels: TranslationLabelObject<{
    noResultsLabel: string;
    retryLabel: string;
}> = {
    [Languages.EN]: {
        noResultsLabel: "No journeys found!",
        retryLabel: "Please search a different day or nearby location."
    },
    [Languages.FR]: {
        noResultsLabel: "Aucun voyage trouvé !",
        retryLabel: "Veuillez rechercher un autre jour ou un lieu à proximité."
    }
}

function RouteSearchListItem({ destination, routeCount, onClick }: { destination: RouteSearchPlace, routeCount: number; onClick: () => void }) {
    const countLabel = routeCount + " Routes";
    const { selectedSearchGroup, hoveredPoint } = useExploreContext();

    const isSelected = useMemo(() => selectedSearchGroup?.destination.id === destination.id, [destination, selectedSearchGroup])
    const isHoveredOnMap = useMemo(() => hoveredPoint?.layer === "search" && hoveredPoint?.point?.id === String(destination.id), [destination, hoveredPoint])

    return (
        <ListItem secondaryAction={isHoveredOnMap && <PlaceOutlined />}>
            <ListItemButton onClick={onClick} selected={isSelected}>
                <ListItemIcon>{searchItemTypeIcons[destination.type]}</ListItemIcon>
                <ListItemText primary={destination.name} secondary={countLabel} />
            </ListItemButton>
        </ListItem>
    )
}

export function NoResults() {
    const { noResultsLabel, retryLabel } = useTranslation(routeSearchListLabels);
    return (

        <Box height="100%" alignItems="center" display="flex">
            <Stack alignItems="center" justifyItems="center" width="100%">
                <Typography sx={{ textAlign: "center" }} variant="h5">{noResultsLabel}</Typography>
                <Image url="womanLost" sx={styles.image} width={300} flip={true} />
                <Typography variant="subtitle1" sx={{ textAlign: "center", width: "70%" }}>{retryLabel}</Typography>
            </Stack>

        </Box>
    )
}

type RouteSearchListProps = {
    visible: boolean;
}

export default function RouteSearchList({ visible }: RouteSearchListProps) {

    const { currentSearchResult, setSelectedSearchGroup, currentSearchQueryFetching, currentOrigin } = useExploreContext();
    const doSelectGroup = useCallback((id: number) => () => {
        const match = currentSearchResult?.destinations.find(it => it.destination.id === id);
        setSelectedSearchGroup(match);
    }, [setSelectedSearchGroup, currentSearchResult]);

    const content = useMemo(() => {
        if (!Boolean(currentSearchResult?.destinations.length) && !currentSearchQueryFetching) {
            return <NoResults />
        }
        return (<List dense>
            {currentSearchResult?.destinations.map(({ destination, routes }) => (
                <RouteSearchListItem
                    routeCount={routes.length}
                    key={destination.id}
                    destination={destination}
                    onClick={doSelectGroup(destination.id)}
                />
            ))}
        </List>)
    }, [currentSearchResult])

    return (
        <WanderCard sx={[styles.card, { maxWidth: visible ? "100%" : 0, }]} elevation={5}>
            <Stack height={"100%"}>
                <PlaceImage queryString={currentOrigin?.name} height={50} width={"100%"} minWidth={400} blur={2}>
                    <h2>{currentOrigin?.name}</h2>
                </PlaceImage>
                <Box flex={1} overflow={"auto"} pb={10} position="relative">
                    {content}
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
    image: {
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.secondary.main} 50%, transparent 50%)`,
        display: 'inline-block',
    },
}