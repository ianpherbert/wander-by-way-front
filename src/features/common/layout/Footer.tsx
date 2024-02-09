import { Divider, Grid, Link, Stack, Typography } from "@mui/material";
import { Image } from "../../../assets/images";
import { Languages, TranslationLabelObject } from "../../../translations/global";
import useTranslation from "../../../translations/useTranslation";



type FooterLabels = {

    contactUs: string;
    funding: string;
}

const footerLabelsEn = {
    contactUs: "Contact us",
    funding: "Help us keep this going"
}

const footerLabelsFr = {
    contactUs: "Nous contacter",
    funding: "Aidez-nous à continuer",
}


export const footerLabels: TranslationLabelObject<FooterLabels> = {
    [Languages.EN]: footerLabelsEn,
    [Languages.FR]: footerLabelsFr
}

export default function Footer() {
    const labels = useTranslation(footerLabels)

    return <footer style={footerStyle}>
        <Divider />
        <Grid container my={2} spacing={4}>
            <Grid item xs={12} md={6}>
                <Grid container direction="column" spacing={1} justifyContent="center" textAlign="center">
                    <Grid item>
                        <Image url="shortLogo" height={100} />
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">Wander by Way ©2024</Typography>
                    </Grid>
                </Grid>
            </Grid>

            {/* Contact and funding section */}
            <Grid item xs={12} md={6}>
                <Grid container direction="column" spacing={2}>
                    {/* Contact Us */}
                    <Grid item xs={12}>
                        <Typography>{labels.contactUs}:</Typography>
                        <Link underline="hover" color="info" href="mailto:hello@wanderbyway.com">hello@wanderbyway.com</Link>
                    </Grid>

                    <Grid item>
                        <Divider />
                    </Grid>

                    {/* Funding */}
                    <Grid item sx={{ marginTop: '2rem' }}>
                        <Typography>{labels.funding}:</Typography>
                        <Link underline="hover" color="info" href="https://bmc.link/ianpatrickherbert">Buy me a coffee</Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        {/* <Stack direction="row" justifyContent="space-between" mx={20} my={5}>
            <Stack>
                <Image url="shortLogo" height={100} />
                <Typography variant={"caption"}>Wander by Way ©2024</Typography>
            </Stack>

            <Stack>
                <Stack>
                    <Typography>{labels.contactUs}:</Typography>
                    <Link underline="hover" color={"info"}
                        href={"mailto:hello@wanderbyway.com"}>hello@wanderbyway.com</Link>
                </Stack>
                <Divider />
                <Stack marginTop={"2rem"}>
                    <Typography>{labels.funding}:</Typography>

                    <Link underline="hover" color={"info"}
                        href={"https://bmc.link/ianpatrickherbert"}>Buy me a coffee</Link>
                </Stack>
            </Stack>

        </Stack> */}
    </footer>;
}

export const footerStyle = {
    minHeight: "10vh",
    width: "100%",
    margin: "auto",
    paddingTop: "2rem",
};
