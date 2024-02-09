import { Box, Stack, Typography} from "@mui/material";
import { Image } from "../../assets/images";
import { theme } from "../../theme";
import useTranslation from "../../translations/useTranslation";
import { welcomeText as welcomeCopy } from "./homeTranslations";
import SearchForm from "../search/SearchForm";
import WanderCard from "../common/WanderCard";

export default function WelcomeCard() {

    const welcomeText = useTranslation(welcomeCopy)

    return (
        <WanderCard sx={styles.card} elevation={5} background="noisePrimary">
            <Stack direction="row" alignContent="center" m={2}>
                <Stack flex={2} m={5} justifyContent="center" spacing={2}>
                    <Typography variant="body1">{welcomeText}</Typography>
                    <SearchForm onSubmit={(a) => console.log(a)} m="auto"/>
                </Stack>
                <Box flex={1} m="auto">
                    <Image url="womanGlassesTrans" sx={styles.image} />
                </Box>
            </Stack>
        </WanderCard>
    )
}

const styles = {
    image: {
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.primary.main} 60%, transparent 20%)`,
        display: 'inline-block',
        m: 2
    },
    card: {
        width: "90%",
        maxWidth: 1200,
        margin: "auto",
        mt: 5
    }
}

