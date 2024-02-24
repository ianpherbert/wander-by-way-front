import { Box, BoxProps, Button, Grid } from "@mui/material";
import { SearchItem, SearchOptions } from "./SearchResult";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchInput from "./SearchInput";
import { useCallback, useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import TypeChoice from "./TypeChoice";
import useTranslation from "../../translations/useTranslation";
import { searchLabels } from "./searchTranslations";
import WanderCard from "../common/WanderCard";
import DateRangePicker, { DateRange } from "../common/DateRangePicker";

const defaultOptions: SearchOptions = {
    airport: true,
    train: true,
    city: true,
    port: true,
    bus: true,
}

export type SearchFormType = {
    startDate: Date | null;
    endDate: Date | null;
    from: SearchItem | null;
    options: SearchOptions;
}

type SearchFromProps = Omit<BoxProps, "onSubmit"> & {
    onSubmit: (data: SearchFormType) => void;
}


export default function SearchForm({ onSubmit, ...props }: SearchFromProps) {

    const [from, setFrom] = useState<SearchItem | null>(null)
    const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
    const { errors: errorLabels, searchOptions } = useTranslation(searchLabels);

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        setError,
        clearErrors
    } = useForm<SearchFormType>();

    const doSubmit: SubmitHandler<SearchFormType> = useCallback((data) => {
        if (!data.from?.id) {
            setError("from", { message: errorLabels.origin });
            return;
        }
        if (!data.startDate) {
            setError("startDate", { message: errorLabels.startDate })
        }
        if (!data.endDate) {
            setError("endDate", { message: errorLabels.endDate })
        }
        onSubmit(data)
    }, [setError]);

    const { from: fromWatch } = watch();

    //For some reason the watch will not work with a setValue, so we are obligated to use a separate state... fuck that.
    useEffect(() => {
        clearErrors();
        setFrom(fromWatch);

    }, [setFrom, fromWatch])


    const setFormValue = useCallback((fieldName: "from" | "startDate" | "endDate") => (value: SearchItem | Date | null) => { setValue(fieldName, value) }, [setValue])

    const handleDateChange = useCallback((dateRange: DateRange) => {
        setFormValue("startDate")(dateRange.startDate);
        setFormValue("endDate")(dateRange.endDate);
    }, [setFormValue])

    return (
        <form onSubmit={handleSubmit(doSubmit)}>
            <Box sx={styles.container} {...props}>
                <WanderCard sx={styles.card} background="noiseGrey">
                    <Grid container spacing={.5} pt={1} mb={1}>
                        <Grid item xs={12} md={6}>
                            <SearchInput selectedItem={from} onSelect={setFormValue("from")} label={searchOptions.from} searchOptions={selectedOptions} fullWidth size="small" error={errors.from?.message} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DateRangePicker onChange={handleDateChange} endError={errors.endDate?.message} startError={errors.startDate?.message} />
                        </Grid>
                    </Grid>
                    <TypeChoice selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                </WanderCard>
                <Button sx={styles.submitButton} type="submit" variant="contained">{searchOptions.submit}</Button>
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