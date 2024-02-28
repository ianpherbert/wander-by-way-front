import { Box } from "@mui/material";
import PlaceImage from "../features/common/unsplash/CityImage";
import { NoResults } from "../features/explore/RouteSearchList";

export default function TestPage() {

    return (
        <Box height={"90vh"} width={500}>
            <NoResults/>
        </Box>
    )
}