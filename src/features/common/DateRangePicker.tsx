import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Stack } from '@mui/material';
import AppLocalizationProvider from './AppLocalizationProvider';
import { add } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

export type DateRange = {
    startDate: Date | null;
    endDate: Date | null;
}

type DateRangePickerProps = {
    onChange: (dateRange: DateRange) => void;
    startError?: string;
    endError?: string;
    startLabel?: string;
    endLabel?: string;
}

export default function DateRangePicker({ onChange, startError, endError }: DateRangePickerProps) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(add(new Date(), { weeks: 1 }));

    const handleSetDate = useCallback((type: "start" | "end") => (date: dayjs.Dayjs | null) => {
        const fn = type === "start" ? setStartDate : setEndDate;
        fn(date?.toDate() ?? null)
    }, [setStartDate, setEndDate])

    useEffect(() => {
        onChange({ startDate, endDate })
    }, [startDate, endDate])

    return (
        <AppLocalizationProvider>
            <Stack direction="row" spacing={1}>
                <DatePicker
                    onChange={handleSetDate("start")}
                    value={dayjs(startDate)}
                    minDate={dayjs(new Date())}
                    slotProps={{ textField: { size: "small", error: Boolean(startError), helperText: startError } }}
                />
                <DatePicker
                    onChange={handleSetDate("end")}
                    value={dayjs(endDate)}
                    minDate={dayjs(startDate)}
                    slotProps={{ textField: { size: "small", error: Boolean(endError), helperText: endError } }}
                />
            </Stack>
        </AppLocalizationProvider>
    );
}