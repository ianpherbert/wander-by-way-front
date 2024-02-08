import { Box, BoxProps, Button, Card, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import { SearchItem, SearchOptions } from "./SearchResult";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchInput from "./SearchInput";
import { useCallback, useEffect, useMemo, useState } from "react";
import { grey } from "@mui/material/colors";
import { SwapHoriz } from "@mui/icons-material";

const options = {
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

type SearchFromProps = BoxProps & {
    onSubmit: (data: SearchFormType) => void;
}


export default function SearchForm({ onSubmit, ...props }: SearchFromProps) {
    const [to, setTo] = useState<SearchItem | null>(null)
    const [from, setFrom] = useState<SearchItem | null>(null)

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        getValues,
        setError
    } = useForm<SearchFormType>()
    const doSubmit: SubmitHandler<SearchFormType> = useCallback((data) => {
        onSubmit(data)
    }, [setError]);

    const { to: toWatch, from: fromWatch } = watch();

    //For some reason the watch will not work with a setValue, so we are obligated to use a separate state... fuck that.
    useEffect(() => {
        setFrom(fromWatch);
        setTo(toWatch);
    }, [setTo, setFrom, toWatch, fromWatch])


    const setFormValue = useCallback((fieldName: "to" | "from") => (value: SearchItem | null) => setValue(fieldName, value), [setValue])

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
                <Card sx={styles.card}>
                    <Stack direction="row" spacing={.5} pt={1} mb={1}>
                        <SearchInput selectedItem={from} onSelect={setFormValue("from")} label="From" searchOptions={options} fullWidth size="small" error={errors.from?.message} />
                        <Tooltip title="Swap origin and destination">
                            <IconButton disabled={!swapButtonActive} onClick={swapInputs}>
                                <SwapHoriz />
                            </IconButton>
                        </Tooltip>
                        <SearchInput selectedItem={to} onSelect={setFormValue("to")} label="To" searchOptions={options} fullWidth size="small" />
                    </Stack>
                </Card>
                <Button sx={styles.submitButton} type="submit" variant="contained">Go there!</Button>
            </Box>
        </form>)

}



const styles = {
    container: {
        position: "relative",
        mb: 5
    },
    card: { p: 3, backgroundColor: grey[100] },
    submitButton: {
        position: "absolute",
        bottom: "-15%",
        right: "30%",
        left: "30%"
    },
}