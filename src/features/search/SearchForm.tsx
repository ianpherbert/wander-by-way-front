import { Box, BoxProps, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { SearchItem, SearchOptions } from "./SearchResult";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchInput from "./SearchInput";
import { useCallback, useEffect, useMemo, useState } from "react";
import { grey } from "@mui/material/colors";
import { SwapHoriz } from "@mui/icons-material";
import TypeChoice from "./TypeChoice";
import useTranslation from "../../translations/useTranslation";
import { inputLabels, originErrorLabel } from "./searchTranslations";
import WanderCard from "../common/WanderCard";

const defaultOptions: SearchOptions = {
    airport: true,
    train: true,
    city: true,
    port: true,
    bus: true,
}

export type SearchFormType = {
    to: SearchItem | null;
    from: SearchItem | null;
    options: SearchOptions;
}

type SearchFromProps = Omit<BoxProps, "onSubmit"> & {
    onSubmit: (data: SearchFormType) => void;
}


export default function SearchForm({ onSubmit, ...props }: SearchFromProps) {
    const [to, setTo] = useState<SearchItem | null>(null)
    const [from, setFrom] = useState<SearchItem | null>(null)
    const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

    const { to: toLabel, from: fromLabel, submit: submitLabel } = useTranslation(inputLabels);
    const errorLabel = useTranslation(originErrorLabel);

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        getValues,
        setError,
        clearErrors
    } = useForm<SearchFormType>();

    const doSubmit: SubmitHandler<SearchFormType> = useCallback((data) => {
        if(!data.from?.id){
            setError("from", {message: errorLabel});
            return;
        }
        onSubmit(data)
    }, [setError]);

    const { to: toWatch, from: fromWatch } = watch();

    //For some reason the watch will not work with a setValue, so we are obligated to use a separate state... fuck that.
    useEffect(() => {
        clearErrors();
        setFrom(fromWatch);
        setTo(toWatch);
    }, [setTo, setFrom, toWatch, fromWatch])


    const setFormValue = useCallback((fieldName: "to" | "from") => (value: SearchItem | null) => { setValue(fieldName, value) }, [setValue])

    const swapButtonActive = useMemo(() => Boolean(to) && Boolean(from), [to, from])

    const swapInputs = useCallback(() => {
        const { to, from } = getValues();
        setValue("from", to);
        setValue("to", from);
        setTo(to);
        setFrom(from);
    }, [setValue, getValues]);

    return (
        <form onSubmit={handleSubmit(doSubmit)}>
            <Box sx={styles.container} {...props}>
                <WanderCard sx={styles.card} background="noiseGrey">
                    <Grid container spacing={.5} pt={1} mb={1}>
                        <Grid item xs={12} md={5.5}>
                            <SearchInput selectedItem={from} onSelect={setFormValue("from")} label={fromLabel} searchOptions={selectedOptions} fullWidth size="small" error={errors.from?.message} />
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Tooltip title="Swap origin and destination">
                                <IconButton disabled={!swapButtonActive} onClick={swapInputs}>
                                    <SwapHoriz />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <SearchInput selectedItem={to} onSelect={setFormValue("to")} label={toLabel} searchOptions={selectedOptions} fullWidth size="small" />
                        </Grid>
                    </Grid>
                    <TypeChoice selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                </WanderCard>
                <Button sx={styles.submitButton} type="submit" variant="contained">{submitLabel}</Button>
            </Box>
        </form>)

}



const styles = {
    container: {
        position: "relative",
        mb: 5
    },
    card: { p: 3, backgroundColor: grey[100], textAlign: "center" },
    submitButton: {
        minWidth: 200,
        position: "absolute",
        bottom: -20,
        width: "40%",
        left: "50%",
        transform: "translateX(-50%)",
    },
}