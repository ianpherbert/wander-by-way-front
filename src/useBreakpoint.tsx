import { useTheme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl";

const breakpointLevels: { [key in BreakPoint]: number } = {
    xs: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
}

export function useBreakPoint(numeric: true): number;
export function useBreakPoint(numeric?: false): string;

export function useBreakPoint(numeric: boolean = false): string | number{
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const isLg = useMediaQuery(theme.breakpoints.down('lg'));


    const breakpoint = useMemo(() => {
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

    }, [isXs, isSm, isMd, isLg, theme]);

    if(numeric){
        return breakpointLevels[breakpoint];
    }
    
    return breakpoint;
}