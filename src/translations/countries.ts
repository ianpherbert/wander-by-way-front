import { TranslationLabelObject, Languages } from "./global";

export type CountryCode = "AT"
    | "BG"
    | "CZ"
    | "DK"
    | "BY"
    | "DE"
    | "BE"
    | "HU"
    | "IE"
    | "IT"
    | "PL"
    | "RO"
    | "FR"
    | "ES"
    | "SE"
    | "UA"
    | "EN"
    | "BA"
    | "HR"
    | "FI"
    | "RS"
    | "GR"
    | "LV"
    | "LT"
    | "PT"
    | "NO"
    | "SC"
    | "AL"
    | "EE"
    | "SK"
    | "SI"
    | "CH"
    | "WL"
    | "NI"
    | "IS"
    | "ME"
    | "LU"
    | "AD"
    | "GI"
    | "IM"
    | "MT"
    | "MC"
    | "NL"
    | "RU"
    | "TR"
    | "GE"
    | "MK"
    | "XK"
    | "CY"
    | "MD"
    | "JE"
    | "GG";

export type CountryLabel = { [key in CountryCode]: string }

const countriesEn: CountryLabel = {
    AT: "Austria",
    BG: "Bulgaria",
    CZ: "Czechia",
    DK: "Denmark",
    BY: "Belarus",
    DE: "Germany",
    BE: "Belgium",
    HU: "Hungary",
    IE: "Ireland",
    IT: "Italy",
    PL: "Poland",
    RO: "Romania",
    FR: "France",
    ES: "Spain",
    SE: "Sweden",
    UA: "Ukraine",
    EN: "England",
    BA: "Bosnia and Herzegovina",
    HR: "Croatia",
    FI: "Finland",
    RS: "Serbia",
    GR: "Greece",
    LV: "Latvia",
    LT: "Lithuania",
    PT: "Portugal",
    NO: "Norway",
    SC: "Scotland",
    AL: "Albania",
    EE: "Estonia",
    SK: "Slovakia",
    SI: "Slovenia",
    CH: "Switzerland",
    WL: "Wales",
    NI: "Northern Ireland",
    IS: "Iceland",
    ME: "Montenegro",
    LU: "Luxembourg",
    AD: "Andorra",
    GI: "Gibraltar",
    IM: "Isle of Man",
    MT: "Malta",
    MC: "Monaco",
    NL: "Netherlands",
    RU: "Russia",
    TR: "Turkey",
    GE: "Georgia",
    MK: "North Macedonia",
    XK: "Kosovo",
    CY: "Cyprus",
    MD: "Moldova",
    JE: "Jersey",
    GG: "Guernsey"
}

const countriesFr: CountryLabel = {
    AT: "Autriche",
    BG: "Bulgarie",
    CZ: "Tchéquie",
    DK: "Danemark",
    BY: "Biélorussie",
    DE: "Allemagne",
    BE: "Belgique",
    HU: "Hongrie",
    IE: "Irlande",
    IT: "Italie",
    PL: "Pologne",
    RO: "Roumanie",
    FR: "France",
    ES: "Espagne",
    SE: "Suède",
    UA: "Ukraine",
    EN: "Angleterre",
    BA: "Bosnie-Herzégovine",
    HR: "Croatie",
    FI: "Finlande",
    RS: "Serbie",
    GR: "Grèce",
    LV: "Lettonie",
    LT: "Lituanie",
    PT: "Portugal",
    NO: "Norvège",
    SC: "Écosse",
    AL: "Albanie",
    EE: "Estonie",
    SK: "Slovaquie",
    SI: "Slovénie",
    CH: "Suisse",
    WL: "Pays de Galles",
    NI: "Irlande du Nord",
    IS: "Islande",
    ME: "Monténégro",
    LU: "Luxembourg",
    AD: "Andorre",
    GI: "Gibraltar",
    IM: "Île de Man",
    MT: "Malte",
    MC: "Monaco",
    NL: "Pays-Bas",
    RU: "Russie",
    TR: "Turquie",
    GE: "Géorgie",
    MK: "Macédoine du Nord",
    XK: "Kosovo",
    CY: "Chypre",
    MD: "Moldavie",
    JE: "Jersey",
    GG: "Guernesey"
    }

export const countryLabels: TranslationLabelObject<CountryLabel> = {
    [Languages.EN]: countriesEn,
    [Languages.FR]: countriesFr
}