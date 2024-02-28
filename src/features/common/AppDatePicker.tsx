import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import AppLocalizationProvider from './AppLocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

type AppDatePickerProps = Omit<DatePickerProps<Dayjs>, "value" | "onChange"> & {
    value: Date | null;
    onChange: (date: Date | null) => void;
}

export default function AppDatePicker({value, onChange, ...props}: AppDatePickerProps) {

    const handleChange = (date: Dayjs | null) => {
        onChange(date?.toDate() ?? null)
    }

    return (
        <AppLocalizationProvider>
                <DatePicker
                    value={dayjs(value)}
                    onChange={handleChange}
                    {...props}
                />
        </AppLocalizationProvider>
    );
}