import { Box, BoxProps, Button, Grid } from "@mui/material";
import { SearchItem, SearchOptions } from "./SearchResult";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchInput from "./SearchInput";
import { useCallback, useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import TypeChoice from "./TypeChoice";
import useTranslation from "../../translations/useTranslation";
import WanderCard from "../common/WanderCard";
import AppDatePicker from "../common/AppDatePicker";
import { TranslationLabelObject, Languages } from "../../translations/global";

const defaultOptions: SearchOptions = {
    airport: true,
    train: true,
    city: true,
    // port: true,
    // bus: true,
}

export type SearchFormType = {
    startDate: Date | null;
    from: SearchItem | null;
    options: SearchOptions;
}

type SearchFromProps = Omit<BoxProps, "onSubmit" | "defaultValues"> & {
    onSubmit: (data: SearchFormType) => void;
    defaultValues?: Partial<SearchFormType>;
}


export const searchLabels: TranslationLabelObject<{
    searchOptions: {
        from: string;
        startDate: string;
        endDate: string;
        submit: string
    },
    errors: {
        origin: string,
        startDate: string,
        endDate: string
    }
}> = {
    [Languages.EN]: {
        searchOptions: {
            from: "Where do you want to start?",
            startDate: "Search Date",
            endDate: "End Date",
            submit: "Explore"
        }, errors: {
            origin: "Select an origin",
            startDate: "Select a date to search from",
            endDate: "Select a date to search to"
        }
    },
    [Languages.FR]: {
        searchOptions: {
            from: "Où souhaitez-vous commencer ?",
            startDate: "Date de recherche",
            endDate: "Date de fin",
            submit: "Explorer"
        },
        errors: {
            origin: "Sélectionnez une origine",
            startDate: "Sélectionnez une date de début de recherche",
            endDate: "Sélectionnez une date de fin de recherche"
        }
    }
}

export const originErrorLabel: TranslationLabelObject<{ origin: string, startDate: string, endDate: string }> = {
    [Languages.EN]: {
        origin: "Select an origin",
        startDate: "Select a date to search from",
        endDate: "Select a date to search to"
    },
    [Languages.FR]: {
        origin: "Sélectionnez une origine",
        startDate: "Sélectionnez une date de début de recherche",
        endDate: "Sélectionnez une date de fin de recherche"
    }
}


export default function SearchForm({ onSubmit, defaultValues, ...props }: SearchFromProps) {
    const [from, setFrom] = useState<SearchItem | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [selectedOptions, setSelectedOptions] = useState(defaultValues?.options ?? defaultOptions);
    const { errors: errorLabels, searchOptions } = useTranslation(searchLabels);

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        setError,
        clearErrors
    } = useForm<SearchFormType>();

    //If there are default values, we must set the form values to these
    useEffect(() => {
        if (defaultValues?.from) {
            setFormValue("from")(defaultValues.from);
            setFrom(defaultValues.from)
        }
        if (defaultValues?.startDate) {
            setFormValue("startDate")(defaultValues.startDate);
            setStartDate(defaultValues.startDate);
        } else {
            // Set form value as today if no default
            setFormValue("startDate")(new Date());
            setStartDate(new Date());
        }
    }, [defaultValues])

    const doSubmit: SubmitHandler<SearchFormType> = useCallback((data) => {
        if (!data.from?.id) {
            setError("from", { message: errorLabels.origin });
            return;
        }
        if (!data.startDate) {
            setError("startDate", { message: errorLabels.startDate })
        }
        onSubmit(data)
    }, [setError]);

    const { from: fromWatch, startDate: startDateWatch } = watch();

    //For some reason the watch will not work with a setValue, so we are obligated to use a separate state... fuck that.
    useEffect(() => {
        clearErrors();
        setFrom(fromWatch);
        setStartDate(startDateWatch)
    }, [setFrom, fromWatch, setStartDate, startDateWatch])


    const setFormValue = useCallback((fieldName: "from" | "startDate") => (value: SearchItem | Date | null) => { setValue(fieldName, value) }, [setValue])

    return (
        <form onSubmit={handleSubmit(doSubmit)}>
            <Box sx={styles.container} {...props}>
                <WanderCard sx={styles.card} background="noiseGrey">
                    <Grid container spacing={1.5} pt={1} mb={1}>
                        <Grid item xs={12} sm={8}>
                            <SearchInput selectedItem={from} onSelect={setFormValue("from")} label={searchOptions.from} searchOptions={selectedOptions} fullWidth size="small" error={errors.from?.message} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <AppDatePicker
                                label={searchOptions.startDate}
                                onChange={setFormValue("startDate")}
                                value={startDate}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        error: Boolean(errors?.startDate?.message),
                                        helperText: errors?.startDate?.message,
                                        fullWidth: true
                                    }
                                }}
                            />
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