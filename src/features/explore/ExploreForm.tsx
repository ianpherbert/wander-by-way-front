import { Collapse, IconButton, Stack, Typography } from "@mui/material";
import SearchForm, { SearchFormType } from "../search/SearchForm";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { endPoints } from "../../main";
import { ExpandMore, Search } from "@mui/icons-material";
import WanderCard from "../common/WanderCard";
import { Languages, TranslationLabelObject } from "../../translations/global";
import useTranslation from "../../translations/useTranslation";

const exploreFormLabels: TranslationLabelObject<{ searchLabel: string }> = {
    [Languages.EN]: { searchLabel: "Search" },
    [Languages.FR]: { searchLabel: "Rechercher" },
}

export default function ExploreForm() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const { searchLabel } = useTranslation(exploreFormLabels);

    const redirectToTripPlanner = useCallback(({ from, startDate}: SearchFormType) => {
        const origin = from?.id ? `${from?.id}-${from?.type}` : "";
        const queryParams = new URLSearchParams();
        queryParams.append("origin", origin);
        queryParams.append("startDate", format(startDate!.toISOString(), 'yyyy-MM-dd'));
        const path = `/${endPoints.explore.entrypoint}?${queryParams}`
        navigate(path);
    }, [])

    const toggleOpen = useCallback(() => setOpen(value => !value), [setOpen])

    return (
        <WanderCard sx={{ mb: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" onClick={toggleOpen} m={1}>
                <Stack direction="row" spacing={2} px={1}>
                    <Search />
                    <Typography variant="subtitle1">{searchLabel}</Typography>
                </Stack>

                <IconButton>
                    <ExpandMore sx={[{ transition: "ease-in-out .2s" }, open ? { transform: "rotate(-180deg)" } : {}]} />
                </IconButton>
            </Stack>
            <Collapse in={open}>
                <SearchForm onSubmit={redirectToTripPlanner} m={1} />
            </Collapse>
        </WanderCard>
    )
}