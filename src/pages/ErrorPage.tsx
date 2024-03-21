import { useLocation } from "react-router-dom";
import { Container, Grid, Link, Typography } from "@mui/material";
import { endPoints } from "../main";
import { Languages, TranslationLabelObject } from "../translations/global";
import useTranslation from "../translations/useTranslation";

const containerStyle = {
    alignItems: "center",
    justifyContent: "center",
    width: "50vw",
    textAlign: "center",
    marginTop: "3rem"
};

const imageStyle = {
    height: "25rem",
    cursor: "pointer"
};

const labelObject: TranslationLabelObject<{
    title: string, subtitle: {
        intro: string;
        info: string;
    }
}> = {
    [Languages.EN]: {
        title: "You've ventured off the map!",
        subtitle: {
            intro: "This is where the sidewalk ends, the road less traveled, the Bermuda triangle of our website.",
            info: " has been lost, moved, or never existed at all"
        }
    },
    [Languages.FR]: {
        "title": "Vous vous êtes aventuré hors de la carte !",
        "subtitle": {
            "intro": "C'est là que le trottoir se termine, la route moins empruntée, le triangle des Bermudes de notre site web.",
            "info": " a été perdu, déplacé, ou n'a jamais existé du tout"
        }
    }
}

export default function ErrorPage() {
    const location = useLocation();
    const labels = useTranslation(labelObject);

    return (
        <Container sx={containerStyle}>
            <Grid container>
                <Grid xs={12}>
                    <Typography variant={"h3"}>{labels.title}</Typography>
                </Grid>
                <Grid xs={12}>
                    <Typography variant={"h1"}>Error 404</Typography>
                </Grid>
                <Grid xs={12}>
                    <Link href={"/" + endPoints.home.entrypoint}>
                        <img alt="man and woman lost sitting on the ground" style={imageStyle}
                            src={"/graphics/couple_lost.png"} />
                    </Link>

                </Grid>
                <Grid xs={12}>
                    <Typography variant={"subtitle1"}>
                        {labels.subtitle.intro} {" "}
                        <strong>{location.pathname}</strong>
                         {" "}{labels.subtitle.info}
                        </Typography>
                </Grid>
                <Grid xs={12}>
                    <Link href={"/" + endPoints.home.entrypoint}
                        variant="h5">
                        Go Home
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};