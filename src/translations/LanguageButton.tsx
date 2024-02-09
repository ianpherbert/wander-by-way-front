import { useCallback, useEffect, useMemo, useState } from "react";
import { Image, imageUrls } from "../assets/images";
import { setLanguage, useAppLanguage } from "../redux/appSlice";
import { Languages, TranslationLabelObject, languageLabel } from "./global";
import { Fade, IconButton, List, ListItem, ListItemButton, ListItemText, Popper, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";

type LanguageImage = { [key in Languages]: keyof typeof imageUrls }

const languageIcons: LanguageImage = {
    [Languages.EN]: "langEn",
    [Languages.FR]: "langFr"
}

function LanguageListItem({ language, image }: { language: string, image: string }) {
    const dispatch = useDispatch();

    const changeLanguage = useCallback(() => dispatch(setLanguage(language as Languages)), [language])

    return (
        <ListItem dense>
            <ListItemButton sx={{ display: "flex" }} onClick={changeLanguage} dense>
                <Image url={image as keyof typeof imageUrls} component={IconButton} sx={styles.image} />
                <ListItemText primary={languageLabel[language as Languages]} />
            </ListItemButton>
        </ListItem>
    )
}

export const changeText: TranslationLabelObject<string> = {
    [Languages.EN]: "Change language",
    [Languages.FR]: "Changer la langue"
}

export default function LanguageButton() {
    const language = useAppLanguage();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const icon = useMemo(() => languageIcons[language], [language]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    useEffect(() => {
        setOpen(false)
    }, [language])

    const languageOptions = useMemo(() => Object.entries(languageIcons).filter(([lang]) => lang !== language), [languageIcons, language])

    return (
        <>
            <Tooltip title={changeText[language]}>
                <Image url={icon} component={IconButton} sx={styles.image} onClick={handleClick} />
            </Tooltip>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <List dense>
                            {languageOptions.map(
                                ([language, image]) => (
                                    <LanguageListItem
                                        language={language}
                                        image={image} />
                                ))}
                        </List>
                    </Fade>
                )}
            </Popper>
        </>

    )
}

const styles = {
    image: {
        height: 50,
        width: 50,
    }
}