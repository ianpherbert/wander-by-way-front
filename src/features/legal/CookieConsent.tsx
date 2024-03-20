import CookieConsent from "react-cookie-consent";
import { GDPRCookie } from "../../variables";
import { Languages, TranslationLabelObject } from "../../translations/global";
import useTranslation from "../../translations/useTranslation";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { endPoints } from "../../main";
import { QuestionMark } from "@mui/icons-material";
import { theme } from "../../theme";

const labelObject: TranslationLabelObject<{ buttonText: string, content: string }> = {
    [Languages.EN]: {
        buttonText: "I understand",
        content: "This website uses cookies to enhance the user experience."
    },
    [Languages.FR]: {
        buttonText: "Je comprends",
        content: "Ce site utilise les cookies pour ameliorer l'expérience utilisateur."
    }
}

export default function CookieConsentComponent() {
    const labels = useTranslation(labelObject);
    return (
        <CookieConsent
            location="bottom"
            buttonText={labels.buttonText}
            ButtonComponent={Button}
            cookieName={GDPRCookie}
            buttonStyle={{backgroundColor: theme.palette.info.main, borderRadius: "10px", color: "white"}}
            expires={150}
        >
            <Stack direction="row" alignItems="center" m="auto" spacing={2}>
                <Typography variant="body1">{labels.content}</Typography>
                <IconButton size="small" color="info" sx={{ border: "white 1px solid" }} component={NavLink} to={endPoints.gdpr.entrypoint}>
                    <QuestionMark />
                </IconButton>

            </Stack>



        </CookieConsent>
    )
}