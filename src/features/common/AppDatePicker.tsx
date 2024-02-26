import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import AppLocalizationProvider from './AppLocalizationProvider';

export default function AppDatePicker({...props}: DatePickerProps<Date>) {

    return (
        <AppLocalizationProvider>
                <DatePicker
                    {...props}
                />
        </AppLocalizationProvider>
    );
}