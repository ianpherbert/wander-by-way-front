import { useMemo } from "react";
import { getInternalImageUrl, } from "../../../assets/images"
import { useSearchByKeywordQuery } from "./unsplashRest"
import { Box, BoxProps, Stack, Tooltip, Typography } from "@mui/material";
import { Languages, TranslationLabelObject } from "../../../translations/global";
import useTranslation from "../../../translations/useTranslation";



type CityImageProps = BoxProps & {
    cityName: string;
    blur?: number;
}

const labels: TranslationLabelObject<{ responsibility: string }> = {
    [Languages.EN]: {
        responsibility: "Images are sourced from Unsplash and credited to their respective artists. We do not claim ownership and are not responsible for the content of these images. Use of these images is for illustrative purposes only and does not imply endorsement by the artists or Unsplash."
    },
    [Languages.FR]: {
        responsibility: "Les images proviennent d'Unsplash et sont créditées à leurs artistes respectifs. Nous ne revendiquons pas la propriété et ne sommes pas responsables du contenu de ces images. L'utilisation de ces images est à des fins illustratives uniquement et n'implique pas l'approbation par les artistes ou Unsplash."
    }
}

const defaultImage = getInternalImageUrl("genericCity");

export default function CityImage({ cityName, blur, ...props }: CityImageProps) {
    const { data } = useSearchByKeywordQuery({ query: cityName, topics: ["city"], orientation: "landscape" });

    const { responsibility } = useTranslation(labels);
    const copyright = useMemo(() => data ? `©${data?.user.first_name} ${data?.user.last_name}` : "", [data])

    const style = useMemo(() => ({
        backgroundImage: `url(${data?.urls.regular ?? defaultImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: `blur(${blur ?? 0}px)`,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1
    }), [data, blur])

    const { children, ...boxProps } = props



    return (
        <Box sx={{ position: "relative", overflow: "hidden" }} {...boxProps}>
            <Box sx={styles.childBox}>
                {children}
            </Box>
            <Tooltip title={responsibility}>
                <Stack
                    direction="row"
                    sx={styles.creditBox}
                >
                    <Typography variant="caption">
                        {copyright}
                    </Typography>
                </Stack>
            </Tooltip>
            <Box sx={style}>
            </Box>
        </Box>
    )
}

const styles = {
    childBox: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > *": { position: 'relative', zIndex: 4 }
    },
    creditBox: {
        color: "white",
        position: "absolute",
        alignItems: "center",
        justifyContent: "right",
        flexWrap: "wrap",
        right: 0,
        bottom: 0,
        zIndex: 3,
        px: .5,
        userSelect: "none"
    }
}