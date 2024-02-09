import { Languages, TranslationLabelObject } from "../../translations/global";

const welcomeTextEn = "Wander By Way invites you to discover the joy of unexpected journeys by presenting all possible routes from your starting point, unveiling novel paths and destinations you never knew you wanted to explore. Our platform is designed for the curious traveler seeking adventure beyond the beaten path, offering a world of possibilities at your fingertips. Embark on a journey of discovery and let Wander By Way guide you to your next unforgettable destination."

const welcomeTextFr = "Wander By Way vous invite à découvrir le plaisir des voyages inattendus en présentant toutes les routes possibles depuis votre point de départ, révélant des chemins novateurs et des destinations que vous ignoriez vouloir explorer. Notre plateforme est conçue pour le voyageur curieux en quête d'aventure au-delà des sentiers battus, offrant un monde de possibilités à portée de main. Embarquez pour un voyage de découverte et laissez Wander By Way vous guider vers votre prochaine destination inoubliable."

export const welcomeText: TranslationLabelObject<string> = {
    [Languages.EN]: welcomeTextEn,
    [Languages.FR]: welcomeTextFr
}