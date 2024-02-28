import { Button, Stack } from "@mui/material";
import ExploreMap from "./ExploreMap";
import SelectedPane from "./SelectedPane";
import RouteSearchList from "./RouteSearchList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TranslationLabelObject, Languages } from "../../translations/global";
import useTranslation from "../../translations/useTranslation";
import { useBreakPoint } from "../../useBreakpoint";
import { useExploreContext } from "./hooks/useExploreContext";
import WanderCard from "../common/WanderCard";
import ExploreForm from "./ExploreForm";
import CenteredLoader from "../common/CenteredLoader";
import { List, Map } from "@mui/icons-material";

const exploreLabels: TranslationLabelObject<{
    hideListLabel: string;
    showListLabel: string;
}> = {
    [Languages.EN]: {
        hideListLabel: "Hide List",
        showListLabel: "Show List"
    },
    [Languages.FR]: {
        hideListLabel: "Cacher liste",
        showListLabel: "Afficher liste"
    }
}

function ShowButton({ listVisible, toggleVisible }: { listVisible: boolean, toggleVisible: () => void }) {
    const { hideListLabel, showListLabel } = useTranslation(exploreLabels);

    const label = useMemo(() => listVisible ? hideListLabel : showListLabel, [listVisible, showListLabel, hideListLabel])

    return <Button
        onClick={toggleVisible}
        variant={!listVisible ? "outlined" : "contained"}
        color="secondary"
        sx={styles.showButton}
        size="small"
        startIcon={listVisible ? <Map /> : <List />}
    >
        {label}
    </Button>
}

const imposeBreakpoints = ["sx", "sm", "md"];

export default function Explore() {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [listOpen, setListOpen] = useState(true);
    // it is essential that the map is initialised in its largest form. otherwise it will not fill space correctly
    const loadMap = useCallback(() => setMapLoaded(true), [setMapLoaded]);
    const breakpoint = useBreakPoint();
    const shouldImpose = useMemo(() => imposeBreakpoints.includes(breakpoint), [breakpoint]);

    const toggleListOpen = useCallback(() => setListOpen(value => !value), [setListOpen]);
    const { selectedSearchGroup, currentOrigin, currentOriginQueryFetching } = useExploreContext();

    //The list is always open on desktop
    useEffect(() => {
        if (!shouldImpose) {
            setListOpen(true)
        }
    }, [shouldImpose]);

    // When the selectedPane is open, we do not want to see the toggle button, as it has its own close button.
    const shouldShowToggleButton = useMemo(() => (!shouldImpose && mapLoaded) || !Boolean(selectedSearchGroup) && mapLoaded && shouldImpose, [selectedSearchGroup, mapLoaded, shouldImpose]);
    const shouldShowSearchList = useMemo(() => (mapLoaded && !shouldImpose && Boolean(currentOrigin)) || (Boolean(currentOrigin) && mapLoaded && listOpen && !Boolean(selectedSearchGroup)), [mapLoaded, listOpen, selectedSearchGroup, shouldImpose, currentOrigin]);
    const shouldShowSelectedPane = useMemo(() => (mapLoaded && !shouldImpose) || (mapLoaded && Boolean(selectedSearchGroup)), [mapLoaded, selectedSearchGroup, shouldImpose]);
    const shouldShowLoader = useMemo(() => mapLoaded && currentOriginQueryFetching, [mapLoaded, currentOriginQueryFetching])
    return (
        <Stack>
            <WanderCard background="noisePrimary" sx={{ p: .5 }}>
                <ExploreForm />
                <Stack direction="row" height={"85vh"} position="relative">
                    {shouldShowLoader && <CenteredLoader type="circular" />}
                    {shouldShowSearchList && <RouteSearchList visible={listOpen} />}
                    <ExploreMap onLoad={loadMap} />
                    {shouldShowSelectedPane && <SelectedPane />}
                    {shouldShowToggleButton && <ShowButton toggleVisible={toggleListOpen} listVisible={listOpen} />}
                </Stack>
            </WanderCard>
        </Stack>


    )
}


const styles = {
    showButton: {
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
    }

}
