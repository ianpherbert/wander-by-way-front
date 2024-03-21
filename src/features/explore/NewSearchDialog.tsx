import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { RouteSearchPlace } from "./RouteSearchResult";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useExploreParams from "./hooks/useExploreParams";
import { Languages, TranslationLabelObject } from "../../translations/global";
import useTranslation from "../../translations/useTranslation";
import { useExploreContext } from "./hooks/useExploreContext";


type NewSearchDialogProps = {
    stop?: RouteSearchPlace;
    onClose: () => void;
}


const labelObject: TranslationLabelObject<{ cancel: string, confirm: string, title: string }> = {
    [Languages.EN]: {
        cancel: "No",
        confirm: "yes",
        title: "Do you want to search from "
    },
    [Languages.FR]: {
        cancel: "Non",
        confirm: "Oui",
        title: "Vous voulez chercher depuis "
    }
}

export default function NewSearchDialog({ stop, onClose }: NewSearchDialogProps) {
    const navigate = useNavigate();
    const { startDate } = useExploreParams();
    const { unselectSearchGroup } = useExploreContext();

    const { cancel, confirm, title } = useTranslation(labelObject);

    const handleStopClick = useCallback(() => {
        if (startDate && stop) {
            const placeId = `${stop.id}-${stop.type}`
            const queryParams = new URLSearchParams();
            queryParams.append("origin", placeId);
            queryParams.append("startDate", startDate);
            navigate(`?${queryParams}`);
            unselectSearchGroup()
        }
        onClose();
    }, [navigate, startDate, stop])

    return (
        <Dialog open={Boolean(stop)} fullWidth>
            <DialogTitle>{title}<strong> {stop?.name} </strong>?</DialogTitle>
            <DialogActions>
                <Button variant="outlined" color="secondary" onClick={onClose}>{cancel}</Button>
                <Button variant="contained" onClick={handleStopClick}>{confirm}</Button>
            </DialogActions>
        </Dialog>
    )
}