import { Stack, Typography } from "@mui/material";
import WelcomeCard from "../features/home/WelcomeCard";

export default function HomePage() {
    return (
        <Stack justifyContent="center">
            <Typography variant="h1" component="p" m="auto" sx={{my: 2}}>Wander.</Typography> 
            <WelcomeCard/>
        </Stack>
    )
}