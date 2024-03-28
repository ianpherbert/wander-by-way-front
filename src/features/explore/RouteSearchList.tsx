import { Stack, Box, List, ListItemIcon, ListItemText, ListItemButton, Typography } from "@mui/material";
import { useExploreContext } from "./hooks/useExploreContext";
import { useCallback, useMemo } from "react";
import { searchItemTypeIcons } from "../../utils/icons";
import WanderCard from "../common/WanderCard";
import CenteredLoader from "../common/CenteredLoader";
import { Image, InternalImage } from "../../assets/images";
import { theme } from "../../theme";
import { Languages, TranslationLabelObject } from "../../translations/global";
import useTranslation from "../../translations/useTranslation";
import { RouteSearchPlace } from "./RouteSearchResult";
import { SearchItemType } from "../common/SearchItemType";
import ContainerWithImage from "../common/ContainerWithImage";
import InfoPopover from "../common/InfoPopover";

const routeSearchListLabels: TranslationLabelObject<{
    noResultsLabel: string;
    retryLabel: string;
    helpTitle: string;
    helpBody: string;
    routesLabel: string;
    longLoadText: string;
    longLoadSecondaryText: string;
}> = {
    [Languages.EN]: {
        noResultsLabel: "No journeys found!",
        retryLabel: "Please search a different day or nearby location.",
        helpTitle: "What am I looking at?",
        helpBody: "The list you're viewing shows the ultimate destinations of each line, such as a train from Paris to Nantes. To uncover the journey's details, including intermediate stops like Angers, you must first select your desired final destination, like Nantes. Then, by choosing an hour, you can access a detailed view of all the stops along that line. This feature emphasizes that while the list initially presents only the endpoint of each route, a deeper exploration reveals the full spectrum of destinations accessible on your journey, allowing for a comprehensive planning experience.",
        routesLabel: "Departure",
        longLoadText: "Extended search time due to high connectivity of selected origin. ",
        longLoadSecondaryText: "Cities with numerous train stations, and airports require more time to process due to the increased number of possible departure points. Please be patient as we cover all available routes from highly connected cities. The complexity of these locations results in longer search durations."
    },
    [Languages.FR]: {
        noResultsLabel: "Aucun voyage trouvé !",
        retryLabel: "Veuillez rechercher un autre jour ou un lieu à proximité.",
        helpTitle: "Je regarde quoi ?",
        helpBody: "La liste que vous consultez affiche les destinations finales de chaque ligne, comme un train de Paris à Nantes. Pour découvrir les détails du voyage, y compris les arrêts intermédiaires comme Angers, vous devez d'abord sélectionner votre destination finale souhaitée, comme Nantes. En choisissant ensuite une heure, vous accédez à une vue détaillée de tous les arrêts le long de cette ligne. Cette fonctionnalité souligne que, bien que la liste présente initialement uniquement le point final de chaque itinéraire, une exploration plus approfondie révèle la gamme complète des destinations accessibles sur votre parcours, permettant ainsi une expérience de planification complète.",
        routesLabel: "Départ",
        longLoadText: "Temps de recherche prolongé en raison de la haute connectivité de l'origine sélectionnée.",
        longLoadSecondaryText: "Veuillez patienter pendant que nous couvrons toutes les routes disponibles depuis des villes hautement connectées. La complexité de ces emplacements entraîne des durées de recherche plus longues.  Les villes dotées de nombreuses gares et aéroports nécessitent plus de temps pour être traitées en raison du nombre accru de points de départ possibles."
    }
}

function RouteSearchListItem({ destination, routeCount, onClick }: { destination: RouteSearchPlace, routeCount: number; onClick: () => void }) {
    const { routesLabel } = useTranslation(routeSearchListLabels);
    const countLabel = `${routeCount} ${routesLabel}${routeCount > 1 ? "s" : ""}`;
    const { selectedSearchGroup, hoveredPoint } = useExploreContext();

    const isSelected = useMemo(() => selectedSearchGroup?.destination.id === destination.id, [destination, selectedSearchGroup])
    const isHoveredOnMap = useMemo(() => hoveredPoint?.layer === "search" && hoveredPoint?.point?.id === String(destination.id), [destination, hoveredPoint])

    return (
        <ListItemButton onClick={onClick} selected={isSelected}>
            <ListItemIcon sx={isHoveredOnMap ? { color: theme.palette.primary.main } : {}}>{searchItemTypeIcons[destination.type]}</ListItemIcon>
            <ListItemText primary={destination.name} secondary={countLabel} />
        </ListItemButton>
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
    const { helpBody, helpTitle, longLoadSecondaryText, longLoadText } = useTranslation(routeSearchListLabels);

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

    const containerImage: InternalImage = useMemo(() => {
        switch (currentOrigin?.type) {
            case SearchItemType.AIRPORT:
                return "airport2";
            case SearchItemType.CITY:
                return "cityscape1";
            case SearchItemType.TRAIN_STATION:
                return "trainStation2";
            case SearchItemType.BUS_STATION:
                return "busStation2";
            case SearchItemType.PORT:
                return "port2"
        }
        return "cityscape2"
    }, [currentOrigin])



    return (
        <WanderCard sx={[styles.card, { maxWidth: visible ? "100%" : 0, }]} elevation={5}>
            <Stack height={"100%"}>
                <ContainerWithImage url={containerImage} minHeight={100} width={400} py={5} px={2}>
                    <Stack sx={styles.title}>
                        <Typography variant="h6" >
                            Origin:
                        </Typography>
                        <Typography variant="h4">{currentOrigin?.name}</Typography>
                    </Stack>

                    <InfoPopover
                        helpBody={helpBody}
                        helpTitle={helpTitle}
                        sx={{ position: "absolute", bottom: 1, right: 5 }}
                    />
                </ContainerWithImage>
                <Box flex={1} overflow={"auto"} pb={10} position="relative">
                    {content}
                    {currentSearchQueryFetching && <CenteredLoader type="circular" longLoadText={longLoadText} longLoadTextDelay={1} longLoadSecondaryText={longLoadSecondaryText} />}

                </Box>
            </Stack>
        </WanderCard>
    )
}

const styles = {
    card: {
        height: "100%",
        width: "fit-content",
        position: "relative"
    },
    image: {
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.secondary.main} 50%, transparent 50%)`,
        display: 'inline-block',
    },
    title: {
        bgcolor: "#DCDADAcc",
        p: .2,
        borderRadius: 3,
        textAlign: "center",
        px: 1
    },

}

