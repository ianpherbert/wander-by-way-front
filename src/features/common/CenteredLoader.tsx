import { CircularProgress, CircularProgressProps, LinearProgress, LinearProgressProps, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";


type GenericCenteredLoaderProps = {
    longLoadText?: string;
    /**Number of seconds before displaying message for long load */
    longLoadTextDelay?: number;
    longLoadSecondaryText?: string;
}

type CenteredCircularLoaderProps = CircularProgressProps & { type: "circular" } & GenericCenteredLoaderProps;
type CenteredLinearLoaderProps = LinearProgressProps & { type: "linear" } & GenericCenteredLoaderProps;

type CenteredLoaderProps = CenteredCircularLoaderProps | CenteredLinearLoaderProps;

export default function CenteredLoader({ type, longLoadText, longLoadTextDelay, longLoadSecondaryText, ...props }: CenteredLoaderProps) {
    const [displayLongLoadText, setDisplayLongLoadText] = useState(false);

    useEffect(() => {
        if (longLoadText && longLoadTextDelay) {
            setTimeout(() => {
                setDisplayLongLoadText(true)
            }, (longLoadTextDelay ?? 0) * 1000)
        }
    }, [longLoadText])

    return (
        <Stack
            position={"absolute"}
            top={0}
            bottom={0}
            left={0}
            right={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            zIndex={500}
        >
            {type === "circular" && <CircularProgress {...props as CircularProgressProps} />}
            {type === "linear" && <LinearProgress {...props as LinearProgressProps} />}
            <Stack p={2}>
                {displayLongLoadText && <Typography variant="body1">{longLoadText}</Typography>}
                {displayLongLoadText && longLoadSecondaryText && <Typography variant="caption">{longLoadSecondaryText}</Typography>}
            </Stack>
        </Stack>
    )
}