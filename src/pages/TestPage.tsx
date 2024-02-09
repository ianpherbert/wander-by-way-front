import { Button } from "@mui/material";
import { LocalStorageItem } from "../assets/localStorage";




export default function TestPage() {

    const doIt = () => {
        const language = localStorage.getItem(LocalStorageItem.LANGUAGE_PREFERENCE);
        const browserLang = navigator.language;
        const browserLangs = navigator.languages;

        console.log({language, browserLang, browserLangs})
    }

    return (
        <Button onClick={doIt}>OK</Button>
    )
}