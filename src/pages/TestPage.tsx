import { Box } from "@mui/material";
import CityImage from "../features/common/unsplash/CityImage";

export default function TestPage() {

    return (
        <CityImage cityName="bayonne" height={300} blur={1.5}>
            <Box>

            </Box>
        </CityImage>
    )
}