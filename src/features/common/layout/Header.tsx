import { Box, Divider, Grid, Typography } from "@mui/material";
import LanguageButton from "../../../translations/LanguageButton";
import { useBreakPoint } from "../../../useBreakpoint";

const small = ["sx", "sm"]

export default function Header() {
    const breakPoint = useBreakPoint();
    return (
        <Box my={2} >
            <Grid container direction={small.includes(breakPoint) ? "column-reverse" : "row"}>
                <Grid item xs={12} sm={6} textAlign={small.includes(breakPoint) ? "center" : "left"}>
                    <Typography variant="h4">Wander By Way</Typography>
                </Grid>
                <Grid display={"flex"} item xs={12} sm={6} justifyContent={"right"}>
                    <LanguageButton />
                </Grid>
            </Grid>

            <Divider />
        </Box>
    )
}