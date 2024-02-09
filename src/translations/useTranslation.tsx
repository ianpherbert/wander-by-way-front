import { useAppLanguage } from "../redux/appSlice";
import { TranslationLabelObject } from "./global";

export default function useTranslation<T>(baseTranslation: TranslationLabelObject<T>){
    const language = useAppLanguage();
    return baseTranslation[language];
}