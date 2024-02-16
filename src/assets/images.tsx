import { Box, BoxProps } from "@mui/material"
import { graphicsDirectory } from "../variables"
import { useMemo } from "react";

export const internalImages = {
    coupleLost: { url: "couple_lost.png", alt: "" },
    man: { url: "man.png", alt: "" },
    street: { url: "street.png", alt: "" },
    trainStation: { url: "train_station.png", alt: "" },
    womanGlasses: { url: "womanSunglasses.png", alt: "" },
    womanGlassesTrans: { url: "woman_sunglasses_trans.png", alt: "" },
    womanLost: { url: "woman_lost.png", alt: "" },
    shortLogo: { url: "wander_logo.png", alt: "" },
    langFr: { url: "language/flag_FR.png", alt: "" },
    langEn: { url: "language/flag_EN.png", alt: "" },
    genericCity: { url: "generic_city.png", alt: "" },
}

export type InternalImage = keyof typeof internalImages;

export function getInternalImageUrl(url: InternalImage) {
    return `${graphicsDirectory}/${internalImages[url].url}`
}

export const backgroundUrls = {
    noisePrimary: "noisePrimary.svg",
    noiseGrey: "noiseGrey.svg"
}



export function getBackgroundUrl(url: keyof typeof backgroundUrls) {
    return `${graphicsDirectory}/backgrounds/${backgroundUrls[url]}`
}

/**
 * Type definition for Image component properties.
 * Extends BoxProps from Material-UI, omitting certain layout-related props.
 * Adds 'url' prop to specify the key of the desired image from `imageUrls`.
 */
export type ImageProps = Omit<BoxProps, "justifyContent" | "alignItems" | "display" | "justifyItems" | "alignContent"> & {
    url: InternalImage | string;
    alt?: string;
    blur?: number;
};



/**
 * Image component
 * Renders an image within a Material-UI Box component.
 * 
 * @param props - The properties for the Image component, including URL key and any BoxProps.
 * @returns A Box component containing the specified image.
 */
export function Image({ alt, url, blur, ...props }: ImageProps) {
    const { imgUrl, imgAlt } = useMemo(() => {
        const urlIsInternal = Object.keys(internalImages).includes(url);
        if (urlIsInternal) {
            const image = internalImages[url as InternalImage]
            return {
                imgUrl: `${graphicsDirectory}/${image.url}`,
                imgAlt: image.alt
            }
        }
        return {
            imgAlt: alt ?? "",
            imgUrl: url
        }
    }, [url, alt]);


    const imgStyle = useMemo(() => ({
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover' as const,
        filter: `blur(${blur ?? 0}px)`,
    }), [blur, props]);

    return (
        <Box {...props}
            position="relative"
            overflow="hidden"
            justifyContent="center"
            alignItems="center"
            display="flex"
            justifyItems="center"
            alignContent="center"
        >
            <img src={imgUrl} style={imgStyle} alt={imgAlt} />
        </Box>
    )
}