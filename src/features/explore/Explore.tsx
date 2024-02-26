import { Button, Stack } from "@mui/material";
import ExploreMap from "./ExploreMap";
import SelectedPane from "./SelectedPane";
import RouteSearchList from "./RouteSearchList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TranslationLabelObject, Languages } from "../../translations/global";
import useTranslation from "../../translations/useTranslation";
import useBreakPoint from "../../useBreakpoint";
import { useTripPlannerContext } from "./hooks/useTripPlannerContext";
import WanderCard from "../common/WanderCard";
import ExploreForm from "./ExploreForm";

const exploreLabels: TranslationLabelObject<{
    hideListLabel: string;
    showListLabel: string;
}> = {
    [Languages.EN]: {
        hideListLabel: "Hide List",
        showListLabel: "Show List"
    },
    [Languages.FR]: {
        hideListLabel: "Cacher la liste",
        showListLabel: "Afficher la liste"
    }
}

function ShowButton({ listVisible, toggleVisible }: { listVisible: boolean, toggleVisible: () => void }) {
    const { hideListLabel, showListLabel } = useTranslation(exploreLabels);

    const label = useMemo(() => listVisible ? hideListLabel : showListLabel, [listVisible, showListLabel, hideListLabel])

    return <Button
        onClick={toggleVisible}
        variant="contained"
        color="primary"
        sx={styles.showButton}
        size="small"
    >
        {label}
    </Button>
}

const imposeBreakpoints = ["sx", "sm", "md"]

export default function Explore() {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [listOpen, setListOpen] = useState(true);
    // it is essential that the map is initialised in its largest form. otherwise it will not fill space correctly
    const loadMap = useCallback(() => setMapLoaded(true), [setMapLoaded]);
    const breakpoint = useBreakPoint();
    const shouldImpose = useMemo(() => imposeBreakpoints.includes(breakpoint), [breakpoint]);

    const toggleListOpen = useCallback(() => setListOpen(value => !value), [setListOpen]);
    const { selectedSearchGroup } = useTripPlannerContext();

    //The list is always open on desktop
    useEffect(() => {
        if (!shouldImpose) {
            setListOpen(true)
        }
    }, [shouldImpose]);

    // When the selectedPane is open, we do not want to see the toggle button, as it has its own close button.
    const shouldShowToggleButton = useMemo(() => !Boolean(selectedSearchGroup) && mapLoaded && shouldImpose, [selectedSearchGroup, mapLoaded, shouldImpose]);
    const shouldShowSearchList = useMemo(() => (mapLoaded && !shouldImpose) || (mapLoaded && listOpen && !Boolean(selectedSearchGroup)), [mapLoaded, listOpen, selectedSearchGroup, shouldImpose]);
    const shouldShowSelectedPane = useMemo(() => (mapLoaded && !shouldImpose) || (mapLoaded && Boolean(selectedSearchGroup)), [mapLoaded, selectedSearchGroup, shouldImpose]);

    return (
        <Stack>
            <WanderCard background="noisePrimary" sx={{ p: .5 }}>
                <ExploreForm />
                <Stack direction="row" height={800} position="relative">
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
