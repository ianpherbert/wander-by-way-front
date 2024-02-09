import { Box, BoxProps } from "@mui/material"
import { graphicsDirectory } from "../variables"

export const imageUrls = {
    coupleLost: `${graphicsDirectory}/couple_lost.png`,
    man: `${graphicsDirectory}/man.png`,
    street: `${graphicsDirectory}/street.png`,
    trainStation: `${graphicsDirectory}/train_station.png`,
    womanGlasses: `${graphicsDirectory}/womanSunglasses.png`,
    womanGlassesTrans: `${graphicsDirectory}/woman_sunglasses_trans.png`,
    womanLost: `${graphicsDirectory}/woman_lost.png`,
    shortLogo: `${graphicsDirectory}/wander_logo.png`,
    langFr: `${graphicsDirectory}/language/flag_FR.png`,
    langEn: `${graphicsDirectory}/language/flag_EN.png`
}

/**
 * Type definition for Image component properties.
 * Extends BoxProps from Material-UI, omitting certain layout-related props.
 * Adds 'url' prop to specify the key of the desired image from `imageUrls`.
 */
type ImageProps = Omit<BoxProps, "justifyContent" | "alignItems" | "display" | "justifyItems" | "alignContent"> & { 
    url: keyof typeof imageUrls; 
};

/**
 * Image component
 * Renders an image within a Material-UI Box component.
 * 
 * @param props - The properties for the Image component, including URL key and any BoxProps.
 * @returns A Box component containing the specified image.
 */
export function Image({ url, ...props }: ImageProps) {
    const imgUrl = imageUrls[url];

    const imgStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'cover' as const, // This ensures the image covers the area, you can adjust as needed
    };

    return (
        <Box {...props}
            overflow="hidden"
            justifyContent="center"
            alignItems="center"
            display="flex"
            justifyItems="center"
            alignContent="center"
        >
            <img src={imgUrl} style={imgStyle} />
        </Box>
    )
}