import { Box } from "@mui/material";
import SearchInput from "../features/search/SearchInput";
import { useState } from "react";

const options = {
    airport: true,
    train: true,
    city: true,
    port: true,
    bus: true,
}

export default function TestPage() {
    const [selected, setSelected] = useState<SearchItem | null>(null);

    function handleSelect(item: SearchItem | null){
        setSelected(item)
    }

    return (
        <Box height={"90vw"}>
            {selected?.name}
            <SearchInput onSelect={handleSelect} selectedItem={selected} searchOptions={options}/>
        </Box>

    )
}