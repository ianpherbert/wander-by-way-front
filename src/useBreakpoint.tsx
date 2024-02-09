import { useTheme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

export default function useBreakPoint() {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const isLg = useMediaQuery(theme.breakpoints.down('lg'));

    return useMemo(() => {
        if (isXs) {
            return 'xs';
        } else if (isSm) {
            return 'sm';
        } else if (isMd) {
            return 'md';
        } else if (isLg) {
            return 'lg';
        }
        return 'xl';

    }, [isXs, isSm, isMd, isLg, theme])


}