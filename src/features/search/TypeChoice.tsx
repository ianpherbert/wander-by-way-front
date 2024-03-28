import { Checkbox, FormControlLabel, StackProps, Grid, Stack, IconButton, Collapse, Tooltip } from "@mui/material";
import { PropsWithChildren, useCallback, useState } from "react";
import useTranslation from "../../translations/useTranslation";
import { SearchOptions } from "./SearchResult";
import { FilterAlt, FilterAltOff } from "@mui/icons-material";
import { TranslationLabel, TranslationLabelObject, Languages } from "../../translations/global";

type TypeChoiceProps = Omit<StackProps, "direction"> & {
    selectedOptions: SearchOptions;
    setSelectedOptions: (options: SearchOptions) => void;
}


function TypeChoiceCollapse({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => setOpen((it) => !it), [setOpen]);

    const { searchFor } = useTranslation(searchOptionLabels)

    return (
        <Stack direction="row-reverse" justifyContent="space-between">
            <Tooltip title={searchFor}>
                <div>
                    <IconButton onClick={toggleOpen}>
                        {open ? <FilterAltOff /> : <FilterAlt />}
                    </IconButton>
                </div>
            </Tooltip>
            <Collapse in={open}>
                {children}
            </Collapse>
        </Stack>
    )
}

const searchOptionsLabelEn: TranslationLabel<SearchOptions> = {
    airport: "Airport",
    train: "Train Station",
    city: "City",
    // port: "Sea Port",
    // bus: "Bus Station"
}

const searchOptionsLabelFr: TranslationLabel<SearchOptions> = {
    airport: "Aéroport",
    train: "Gare",
    city: "Ville",
    // port: "Port",
    // bus: "Gare Routière"
}

export const searchOptionLabels: TranslationLabelObject<{ options: TranslationLabel<SearchOptions>, searchFor: string }> = {
    [Languages.EN]: { options: searchOptionsLabelEn, searchFor: "Search for origins with type" },
    [Languages.FR]: { options: searchOptionsLabelFr, searchFor: "Résultats pour des origines de type" }
}

export default function TypeChoice({ selectedOptions, setSelectedOptions, ...props }: TypeChoiceProps) {
    const { options: optionLabels } = useTranslation(searchOptionLabels);

    const toggleOption = useCallback((key: keyof SearchOptions) => {
        setSelectedOptions({
            ...selectedOptions,
            [key]: !selectedOptions[key]
        })
    }, [setSelectedOptions, selectedOptions, optionLabels])

    const options = (
        <Grid container {...props}>
            {Object.entries(optionLabels).map(([key, label]) => (
                <Grid item ml={2}>
                    <FormControlLabel
                        checked={selectedOptions[key as keyof SearchOptions]} onChange={() => toggleOption(key as keyof SearchOptions)}
                        control={<Checkbox size="small" color="info" />}
                        label={label}
                    />
                </Grid>
            ))}
        </Grid>
    )
    return (
        <TypeChoiceCollapse>
            {options}
        </TypeChoiceCollapse>
    )
}
