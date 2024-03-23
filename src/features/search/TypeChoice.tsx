import { Checkbox, FormControlLabel, StackProps, Grid, Stack, IconButton, Collapse } from "@mui/material";
import { PropsWithChildren, useCallback, useState } from "react";
import useTranslation from "../../translations/useTranslation";
import { SearchOptions } from "./SearchResult";
import { useBreakPoint } from "../../useBreakpoint";
import { FilterAlt, FilterAltOff } from "@mui/icons-material";
import { TranslationLabel, TranslationLabelObject, Languages } from "../../translations/global";

type TypeChoiceProps = Omit<StackProps, "direction"> & {
    selectedOptions: SearchOptions;
    setSelectedOptions: (options: SearchOptions) => void;
}

const small = ["xs", "sm"];

function TypeChoiceCollapse({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => setOpen((it) => !it), [setOpen]);

    return (
        <Stack direction="row-reverse">
            <div>
                <IconButton onClick={toggleOpen}>
                    {open ? <FilterAltOff /> : <FilterAlt />}
                </IconButton>
            </div>
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
    port: "Sea Port",
    bus: "Bus Station"
}

const searchOptionsLabelFr: TranslationLabel<SearchOptions> = {
    airport: "Aéroport",
    train: "Gare",
    city: "Ville",
    port: "Port",
    bus: "Gare Routière"
}


export const searchOptionLabels: TranslationLabelObject<TranslationLabel<SearchOptions>> = {
    [Languages.EN]: searchOptionsLabelEn,
    [Languages.FR]: searchOptionsLabelFr
}

export default function TypeChoice({ selectedOptions, setSelectedOptions, ...props }: TypeChoiceProps) {
    const breakPoint = useBreakPoint();
    const optionLabels = useTranslation(searchOptionLabels);

    const toggleOption = useCallback((key: keyof SearchOptions) => {
        setSelectedOptions({
            ...selectedOptions,
            [key]: !selectedOptions[key]
        })
    }, [setSelectedOptions, selectedOptions, optionLabels])

    const options = (
        <Grid container {...props} spacing={.5}>
            {Object.entries(optionLabels).map(([key, label]) => (
                <Grid item>
                    <FormControlLabel
                        checked={selectedOptions[key as keyof SearchOptions]} onChange={() => toggleOption(key as keyof SearchOptions)}
                        control={<Checkbox size="small" color="info" />}
                        label={label}
                    />
                </Grid>
            ))}
        </Grid>
    )

    if (small.includes(breakPoint)) {
        return (
            <TypeChoiceCollapse>
                {options}
            </TypeChoiceCollapse>
        )
    }
    return options;
}
