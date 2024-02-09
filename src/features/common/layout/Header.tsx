import { Box, Divider, Stack, Typography } from "@mui/material";
import LanguageButton from "../../../translations/LanguageButton";


export default function Header() {
    return (
        <Box my={2} >
            <Stack direction="row" justifyContent="space-between" my={1} mx={10}>
                <Typography variant="h4">Wander By Way</Typography>
                <LanguageButton />
            </Stack>
            <Divider />
        </Box>
    )
}