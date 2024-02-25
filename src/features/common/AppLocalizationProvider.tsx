import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppLanguage } from '../../redux/appSlice';
import 'dayjs/locale/fr';
import 'dayjs/locale/en';
import { Languages, TranslationLabelObject } from '../../translations/global';
import { PropsWithChildren, useMemo } from 'react';

const locales: TranslationLabelObject<string> = {
    [Languages.EN]: "en",
    [Languages.FR]: "fr"
}

export default function AppLocalizationProvider({ children }: PropsWithChildren) {
    const language = useAppLanguage();
    const locale = useMemo(() => locales[language], [language]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            {children}
        </LocalizationProvider>
    );
}