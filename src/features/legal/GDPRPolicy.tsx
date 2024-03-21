import { Languages, TranslationLabelObject } from "../../translations/global";
import useTranslation from "../../translations/useTranslation";

const EnglishPolicy = () => (
    <>

        <p><strong>What Are Cookies</strong></p>
        <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>
        <p><strong>How We Use Cookies</strong></p>
        <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
        <p><strong>Disabling Cookies</strong></p>
        <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies. This Cookies Policy was created with the help of the <a href="https://www.cookiepolicygenerator.com/cookie-policy-generator/">Cookies Policy Generator</a>.</p>
        <p><strong>The Cookies We Set</strong></p>
        <ul>
            <li>
                <p>Site preferences cookies</p>
                <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
            </li>
        </ul>
        <p><strong>Third Party Cookies</strong></p>
        <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
        <ul>
            <li>
                <p>From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.</p>
            </li>
        </ul>
        <p><strong>More Information</strong></p>
        <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
        <p>For more general information on cookies, please read <a href="https://www.cookiepolicygenerator.com/sample-cookies-policy/">the Cookies Policy article</a>.</p>
        <p>However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>
        <ul>
            <li>Email: hello@wanderbyway.com</li>
        </ul>
    </>
);

const FrenchPolicy = () => (
    <>
        <p><strong>Que sont les cookies</strong></p>
        <p>Comme c'est la pratique courante avec presque tous les sites web professionnels, ce site utilise des cookies, qui sont de petits fichiers téléchargés sur votre ordinateur, pour améliorer votre expérience. Cette page décrit quelles informations ils recueillent, comment nous les utilisons et pourquoi nous avons parfois besoin de stocker ces cookies. Nous partagerons également comment vous pouvez empêcher le stockage de ces cookies, mais cela peut dégrader ou "casser" certains éléments de la fonctionnalité du site.</p>
        <p><strong>Comment nous utilisons les cookies</strong></p>
        <p>Nous utilisons des cookies pour une variété de raisons détaillées ci-dessous. Malheureusement, dans la plupart des cas, il n'existe pas d'options standard dans l'industrie pour désactiver les cookies sans désactiver complètement la fonctionnalité et les caractéristiques qu'ils ajoutent à ce site. Il est recommandé de laisser tous les cookies activés si vous n'êtes pas sûr de les nécessiter ou non au cas où ils seraient utilisés pour fournir un service que vous utilisez.</p>
        <p><strong>Désactiver les cookies</strong></p>
        <p>Vous pouvez empêcher le paramétrage des cookies en ajustant les paramètres de votre navigateur (consultez l'aide de votre navigateur pour savoir comment faire). Soyez conscient que la désactivation des cookies affectera la fonctionnalité de ce site et de nombreux autres sites que vous visitez. Désactiver les cookies résultera généralement aussi dans la désactivation de certaines fonctionnalités et caractéristiques de ce site. Il est donc recommandé de ne pas désactiver les cookies. Cette Politique des Cookies a été créée avec l'aide du <a href="https://www.cookiepolicygenerator.com/cookie-policy-generator/">Générateur de Politique des Cookies</a>.</p>
        <p><strong>Les cookies que nous établissons</strong></p>
        <ul>
            <li>
                <p>Cookies de préférences du site</p>
                <p>Afin de vous offrir une excellente expérience sur ce site, nous fournissons la fonctionnalité pour définir vos préférences sur la manière dont ce site fonctionne lorsque vous l'utilisez. Afin de se souvenir de vos préférences, nous devons établir des cookies pour que cette information puisse être appelée chaque fois que vous interagissez avec une page affectée par vos préférences.</p>
            </li>
        </ul>
        <p><strong>Cookies tiers</strong></p>
        <p>Dans certains cas spéciaux, nous utilisons également des cookies fournis par des tiers de confiance. La section suivante détaille quels cookies tiers vous pourriez rencontrer à travers ce site.</p>
        <ul>
            <li>
                <p>De temps en temps, nous testons de nouvelles fonctionnalités et apportons des modifications subtiles à la manière dont le site est livré. Lorsque nous testons encore de nouvelles fonctionnalités, ces cookies peuvent être utilisés pour garantir que vous recevez une expérience cohérente sur le site tout en garantissant que nous comprenons quelles optimisations nos utilisateurs apprécient le plus.</p>
            </li>
        </ul>
        <p><strong>Plus d'informations</strong></p>
        <p>Nous espérons que cela a clarifié les choses pour vous et comme cela a été mentionné précédemment, s'il y a quelque chose dont vous n'êtes pas sûr de nécessiter ou non, il est généralement plus sûr de laisser les cookies activés au cas où cela interagirait avec l'une des fonctionnalités que vous utilisez sur notre site.</p>
        <p>Pour plus d'informations générales sur les cookies, veuillez lire <a href="https://www.cookiepolicygenerator.com/sample-cookies-policy/">l'article sur la Politique des Cookies</a>.</p>
        <p>Cependant, si vous recherchez encore plus d'informations, alors vous pouvez nous contacter par l'un de nos moyens de contact préférés :</p>
        <ul>
            <li>Email : hello@wanderbyway.com</li>
        </ul>
    </>
)

const policyObjects: TranslationLabelObject<JSX.Element> = {
    [Languages.EN]: <EnglishPolicy />,
    [Languages.FR]: <FrenchPolicy />
}

export default function GDPRPolicy() {
    const policy = useTranslation(policyObjects);
    return policy;
}