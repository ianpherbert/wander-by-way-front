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


const labelObject: TranslationLabelObject<{ cancel: string, confirm: string, title: (name?: string) =>  string }> = {
    [Languages.EN]: {
        cancel: "No",
        confirm: "yes",
        title: (name?: string)=> `Do you want to start a new search from ${name} on the same day?`
    },
    [Languages.FR]: {
        cancel: "Non",
        confirm: "Oui",
        title: (name?: string)=> `Voulez-vous lancer une nouvelle recherche à partir de ${name} le même jour ?`
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
            <DialogTitle>{title(stop?.name)}</DialogTitle>
            <DialogActions>
                <Button variant="outlined" color="secondary" onClick={onClose}>{cancel}</Button>
                <Button variant="contained" onClick={handleStopClick}>{confirm}</Button>
            </DialogActions>
        </Dialog>
    )
}