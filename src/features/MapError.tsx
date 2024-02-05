import { Box, Typography } from "@mui/material";
import { Image } from "../assets/images";


export default function MapError(){
    return <Box sx={{textAlign: "center"}}>
        <Typography variant="body1">There was a problem while loading the map!</Typography>
        <Image url="womanLost"/> 
        <Typography variant="caption">Try reloading the page. If the problem persists please contact us.</Typography>
    </Box>
}