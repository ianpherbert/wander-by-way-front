import { Close, HelpOutline } from "@mui/icons-material";
import { Box, Tooltip, IconButton, Popover, Typography, BoxProps, Stack } from "@mui/material";
import { useState } from "react";

type InfoPopoverProps = BoxProps & {
    helpTitle: string;
    helpBody: string;
}

export default function InfoPopover({ helpBody, helpTitle, ...props }: InfoPopoverProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{
            ...props.sx,
            width: "fit-content",
            height: "fit-content"
        }} {...props}>
            <Tooltip title={helpTitle}>
                <IconButton onClick={handleClick} color="info" sx={{ color: "white" }}>
                    <HelpOutline />
                </IconButton>
            </Tooltip>
            <Popover
                id={Boolean(anchorEl) ? `popover-${Math.random()}` : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                sx={{ maxWidth: 1000, pt: 25, }}
            >
                <Stack sx={{ minWidth: 500 }}>
                    <Box sx={styles.closeButton}>
                        <Typography variant="h6">{helpTitle}</Typography>
                        <IconButton onClick={handleClose} >
                            <Close />
                        </IconButton>
                    </Box>
                    <Typography sx={{ px: 1, pb: 1 }} variant="body1">{helpBody}</Typography>
                </Stack>

            </Popover>

        </Box>
    )
}

const styles = {
    closeButton: {
        justifyContent: "space-between",
        display: "flex",
        p: 1,
    }
}