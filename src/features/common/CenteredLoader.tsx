import { Box, CircularProgress, CircularProgressProps, LinearProgress, LinearProgressProps } from "@mui/material";

type CenteredCircularLoaderProps = CircularProgressProps & { type: "circular" };
type CenteredLinearLoaderProps = LinearProgressProps & { type: "linear" };

type CenteredLoaderProps = CenteredCircularLoaderProps | CenteredLinearLoaderProps;

export default function CenteredLoader({ type, ...props }: CenteredLoaderProps) {
    return (
        <Box
            position={"absolute"}
            top={0}
            bottom={0}
            left={0}
            right={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={500}
        >
            {type === "circular" && <CircularProgress {...props as CircularProgressProps} />}
            {type === "linear" && <LinearProgress {...props as LinearProgressProps} />}
        </Box>
    )
}