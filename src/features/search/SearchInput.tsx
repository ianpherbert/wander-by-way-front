import { Autocomplete, AutocompleteProps, LinearProgress, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useSearchByNameQuery } from "./SearchRest";
import { FormEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import debounce from 'lodash/debounce';
import { BoatIcon, BusIcon, CityIcon, PlaneIcon, TrainIcon } from "../../utils/icons";
import { countryLabels } from "../../translations/countries";
import { SearchItem, SearchOptions } from "./SearchResult";
import useTranslation from "../../translations/useTranslation";
import { SearchItemType } from "../common/SearchItemType";


const styles = {
    icons: {
        color: "grey[50]"
    }
}

type SearchInputProps = Omit<AutocompleteProps<SearchItem, false, false, false>, "renderInput" | "options" | "value" | "onSelect"> & {
    onSelect: (item: SearchItem | null) => void;
    selectedItem?: SearchItem | null;
    searchOptions: SearchOptions;
    label: string;
    error?: string;
}

const searchIcons: { [key in SearchItemType]: JSX.Element } = {
    AIRPORT: <PlaneIcon sx={styles.icons} />,
    PORT: <BoatIcon sx={styles.icons} />,
    CITY: <CityIcon sx={styles.icons} />,
    BUS_STATION: <BusIcon sx={styles.icons} />,
    TRAIN_STATION: <TrainIcon sx={styles.icons} />
}

function Option({ item, ...props }: React.HTMLAttributes<HTMLLIElement> & { item: SearchItem }) {
    const countries = useTranslation(countryLabels)
    return (
        <ListItem {...props} disablePadding={true}>
            <ListItemIcon>
                {searchIcons[item.type]}
            </ListItemIcon>
            <ListItemText primary={`${item.name} (${countries[item.country]})`} />
        </ListItem>
    )
}

export default function SearchInput({ onSelect, selectedItem, searchOptions, label, error, ...props }: SearchInputProps) {
    const [queryString, setQueryString] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");

    const countries = useTranslation(countryLabels)

    const { data, isFetching } = useSearchByNameQuery(Boolean(queryString) ? { queryString, searchOptions } : skipToken);
    const options: SearchItem[] = useMemo(() => {
        if (data?.results && queryString) return data?.results
        return []
    }, [data]);


    const changeSearchTerm = useCallback((e: FormEvent<HTMLDivElement>) => {
        const value = (e.target as HTMLInputElement).value;
        setSearchInput(value);
    }, [setSearchInput])

    const doSearch = useCallback(debounce((value) => {
        setQueryString(value);
    }, 500), []);

    useEffect(() => {
        if (searchInput) {
            doSearch(searchInput);
        }
        return () => doSearch.cancel();
    }, [searchInput, doSearch]);

    const noResults = useMemo(() => {
        if (isFetching) {
            return <LinearProgress />
        }
        if (Boolean(queryString)) {
            return `No results for ${queryString}`
        }
        if (!Boolean(searchInput)) {
            return null
        }
    }, [data, isFetching, queryString, searchInput])

    const handleSelect = useCallback((_: SyntheticEvent, item: SearchItem | null) => {
        onSelect(item);
    }, [onSelect])

    return (
        <Autocomplete
            {...props}
            options={options}
            renderInput={(params) => <TextField {...params} onInput={changeSearchTerm} label={label} error={Boolean(error)} helperText={error} />}
            getOptionLabel={(option: SearchItem) => `${option.name} (${countries[option.country]})`}
            noOptionsText={noResults}
            onChange={handleSelect}
            value={selectedItem}
            filterOptions={(options, state) => {
                const regex = new RegExp(state.inputValue.replace(/[- ]/g, '[- ]'), 'i');
                return options.filter(string => regex.test(string.name));
            }}
            renderOption={(props, item) => <Option item={item} {...props} />}
        />
    )
}

