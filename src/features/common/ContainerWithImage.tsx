import { useMemo } from "react";
import { Box, BoxProps } from "@mui/material";
import { InternalImage, getInternalImageUrl } from "../../assets/images";



type ContainerWithImage = BoxProps & {
    url: InternalImage;
    blur?: number;
}

export default function ContainerWithImage({ url, blur, ...props }: ContainerWithImage) {

    const style = useMemo(() => ({
        backgroundImage: `url(${getInternalImageUrl(url)})`,
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
    }), [url, blur])

    const { children, ...boxProps } = props

    return (
        <Box sx={{ position: "relative", overflow: "hidden" }} {...boxProps}>
            <Box sx={styles.childBox}>
                {children}
            </Box>
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