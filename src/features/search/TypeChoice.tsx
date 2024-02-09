import { Stack, Checkbox, FormControlLabel, StackProps } from "@mui/material";
import { useCallback } from "react";
import useTranslation from "../../translations/useTranslation";
import { searchOptionLabels } from "./searchTranslations";
import { SearchOptions } from "./SearchResult";

type TypeChoiceProps = Omit<StackProps, "direction"> & {
    selectedOptions: SearchOptions;
    setSelectedOptions: (options: SearchOptions) => void;
}

export default function TypeChoice({ selectedOptions, setSelectedOptions, ...props }: TypeChoiceProps) {

    const optionLabels = useTranslation(searchOptionLabels);

    const toggleOption = useCallback((key: keyof SearchOptions) => {
        setSelectedOptions({
            ...selectedOptions,
            [key]: !selectedOptions[key]
        })
    }, [setSelectedOptions, selectedOptions,optionLabels])

    return (
        <Stack direction="row" {...props}>
            {Object.entries(optionLabels).map(([key, label]) => (
                <FormControlLabel
                    checked={selectedOptions[key as keyof SearchOptions]}
                    control={<Checkbox size="small" color="info" />}
                    label={label}
                    onMouseDown={() => toggleOption(key as keyof SearchOptions)}
                />
            ))}
        </Stack>
    )
}
