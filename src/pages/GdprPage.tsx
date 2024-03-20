import { Box, Grid, Stack, Typography } from "@mui/material";
import GDPRPolicy from "../features/legal/GDPRPolicy";
import WanderCard from "../features/common/WanderCard";
import { Languages, TranslationLabelObject } from "../translations/global";
import useTranslation from "../translations/useTranslation";
import { theme } from "../theme";
import { Image } from "../assets/images";

const policyObjects: TranslationLabelObject<{ title: string, subTitle: string }> = {
    [Languages.EN]: { title: "Cookie Policy", subTitle: "This is the Cookie Policy for Wander By Way, accessible from wanderbyway.com" },
    [Languages.FR]: { title: "Politique de Cookies", subTitle: "Ceci est la Politique des Cookies pour Wander By Way, accessible depuis wanderbyway.com" }
}

export default function GdprPage() {
    const { title, subTitle } = useTranslation(policyObjects);

    return (
        <Stack>
            <WanderCard sx={styles.card} elevation={5} background="noisePrimary">
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={12} lg={4} sm={12} display="flex" justifyContent="center" alignItems="center">
                        <Box m="auto">
                            <Image url="happyLawyer" sx={styles.image} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={8} sm={12} justifyContent="center" display="flex" flexDirection="column" spacing={2}>
                        <Typography variant="h3">{title}</Typography>
                        <Typography variant="subtitle1">{subTitle}</Typography>
                    </Grid>

                </Grid>
            </WanderCard>
            <WanderCard sx={{ m: 3, p: 2 }} elevation={2}>
                <GDPRPolicy />
            </WanderCard>
        </Stack>
    )
}


const styles = {
    image: {
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.secondary.main} 60%, transparent 20%)`,
        display: 'inline-block',
    },
    card: {
        width: "85%",
        margin: "auto",
        p: 4
    }
}
