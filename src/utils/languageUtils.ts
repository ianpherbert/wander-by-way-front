import { LocalStorageItem, getLocalStorageItem, writeLocalStorageItem } from "../assets/localStorage";
import { Languages } from "../translations/global";

export const navigatorLanguages = {
    // French Variations
    "fr": Languages.FR, // Generic French
    "fr-FR": Languages.FR, // France
    "fr-CA": Languages.FR, // Canada
    "fr-BE": Languages.FR, // Belgium
    "fr-CH": Languages.FR, // Switzerland
    "fr-LU": Languages.FR, // Luxembourg
    "fr-MC": Languages.FR, // Monaco
    "fr-BF": Languages.FR, // Burkina Faso
    "fr-BI": Languages.FR, // Burundi
    "fr-CM": Languages.FR, // Cameroon
    "fr-CD": Languages.FR, // Congo - Kinshasa
    "fr-CI": Languages.FR, // Côte d’Ivoire
    "fr-DJ": Languages.FR, // Djibouti
    "fr-GQ": Languages.FR, // Equatorial Guinea
    "fr-GA": Languages.FR, // Gabon
    "fr-GP": Languages.FR, // Guadeloupe
    "fr-GF": Languages.FR, // French Guiana
    "fr-MG": Languages.FR, // Madagascar
    "fr-ML": Languages.FR, // Mali
    "fr-MQ": Languages.FR, // Martinique
    "fr-NE": Languages.FR, // Niger
    "fr-RE": Languages.FR, // Réunion
    "fr-RW": Languages.FR, // Rwanda
    "fr-SN": Languages.FR, // Senegal
    "fr-SC": Languages.FR, // Seychelles
    "fr-TD": Languages.FR, // Chad
    "fr-TG": Languages.FR, // Togo
    "fr-VU": Languages.FR, // Vanuatu
    "fr-WF": Languages.FR, // Wallis and Futuna
    "fr-YT": Languages.FR, // Mayotte

    // English Variations
    "en": Languages.EN, // Generic English
    "en-US": Languages.EN, // United States
    "en-GB": Languages.EN, // United Kingdom
    "en-AU": Languages.EN, // Australia
    "en-CA": Languages.EN, // Canada
    "en-IN": Languages.EN, // India
    "en-NZ": Languages.EN, // New Zealand
    "en-ZA": Languages.EN, // South Africa
    "en-IE": Languages.EN, // Ireland
    "en-JM": Languages.EN, // Jamaica
    "en-BZ": Languages.EN, // Belize
    "en-TT": Languages.EN, // Trinidad and Tobago
    "en-ZW": Languages.EN, // Zimbabwe
    "en-PH": Languages.EN, // Philippines
    "en-SG": Languages.EN, // Singapore
    "en-HK": Languages.EN, // Hong Kong
    "en-MY": Languages.EN, // Malaysia
    "en-KE": Languages.EN, // Kenya
    "en-NG": Languages.EN, // Nigeria
    "en-GH": Languages.EN, // Ghana
    "en-FJ": Languages.EN, // Fiji
    "en-BW": Languages.EN, // Botswana
    "en-UG": Languages.EN, // Uganda
    "en-CM": Languages.EN, // Cameroon
    "en-RW": Languages.EN, // Rwanda
    "en-SL": Languages.EN, // Sierra Leone
    "en-MW": Languages.EN, // Malawi
};

const recognisedLanguages = Object.keys(navigatorLanguages)

export function getLanguage() {
    const savedPreference = getLocalStorageItem(LocalStorageItem.LANGUAGE_PREFERENCE);
    if (savedPreference) {
        return savedPreference as Languages;
    }
    const navigatorLanguage = navigator.language;
    const language = recognisedLanguages.includes(navigatorLanguage) ? navigatorLanguages[navigatorLanguage as keyof typeof navigatorLanguages] : Languages.EN
    writeLocalStorageItem(LocalStorageItem.LANGUAGE_PREFERENCE, language);
    return language;
}