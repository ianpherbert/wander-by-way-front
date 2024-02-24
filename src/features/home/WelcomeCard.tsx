import { Box, Grid, Typography } from "@mui/material";
import { Image } from "../../assets/images";
import { theme } from "../../theme";
import useTranslation from "../../translations/useTranslation";
import { welcomeText as welcomeCopy } from "./homeTranslations";
import SearchForm, { SearchFormType } from "../search/SearchForm";
import WanderCard from "../common/WanderCard";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../../main";
import { format } from 'date-fns';

export default function WelcomeCard() {

    const welcomeText = useTranslation(welcomeCopy);
    const navigate = useNavigate();

    const redirectToTripPlanner = useCallback(({from, startDate, endDate}: SearchFormType)=>{
        const origin = from?.id ? `${from?.id}-${from?.type}` : "";
        const queryParams = new URLSearchParams();
        queryParams.append("origin", origin);
        queryParams.append("startDate", format(startDate!, 'yyyy-MM-dd'));
        queryParams.append("endDate", format(endDate!, 'yyyy-MM-dd'));
        const path = `/${endPoints.explore.entrypoint}?${queryParams}`
        navigate(path);
    },[])

    return (
        <WanderCard sx={styles.card} elevation={5} background="noisePrimary">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={12} lg={8} sm={12} justifyContent="center" display="flex" flexDirection="column" spacing={2}>
                    <Typography variant="body1">{welcomeText}</Typography>
                    <SearchForm onSubmit={redirectToTripPlanner} mt={2} />
                </Grid>
                <Grid item xs={12} md={12} lg={4} sm={12} display="flex" justifyContent="center" alignItems="center">
                    <Box m="auto">
                        <Image url="womanGlassesTrans" sx={styles.image} />
                    </Box>
                </Grid>
            </Grid>
        </WanderCard>
    )
}

const styles = {
    image: {
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.palette.primary.main} 60%, transparent 20%)`,
        display: 'inline-block',
    },
    card: {
        maxWidth: 1200,
        margin: "auto",
        p: 4
    }
}

