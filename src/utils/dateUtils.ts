import { useAppLanguage } from "../redux/appSlice";
import { Locale, format, parseISO } from 'date-fns';
import { enGB, fr as fnsFR } from 'date-fns/locale';
import { Languages, TranslationLabelObject } from "../translations/global";

export function minutesToHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return { hours, remainingMinutes, minutes };
}

const fnsLanguages: TranslationLabelObject<Locale> = {
    [Languages.EN]: enGB,
    [Languages.FR]: fnsFR,
}

export function useDateFormatter() {
    const language = useAppLanguage();
    const locale = fnsLanguages[language];
    const formatDate = (date: Date, dateFormat: string) => format(date, dateFormat, { locale });
    const formatDateFromIso = (date: number, dateFormat: string) => format(date, dateFormat, {locale})
    const formatDateFromString = (date: string, dateFormat: string) => { 
        try{
            const parsedDate = parseISO(date)
            return format(parsedDate, dateFormat, { locale });
        }catch(e){
            return date;
        }
    }
    return { formatDate, formatDateFromString, formatDateFromIso }
}