import { Box } from "@mui/material";
import PlaceImage from "../features/common/unsplash/CityImage";

export default function TestPage() {

    return (
        <PlaceImage queryString="bayonne" height={300} blur={1.5}>
            <Box>

            </Box>
        </PlaceImage>
    )
}