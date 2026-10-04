import { OFFRES } from '../src/data/offres.js';
import { ORIGINE, BASE } from '../site.config.mjs';

/* ════════════════════════════════════════════════════════════
   L'ENTREPRISE, TELLE QUE LES MOTEURS LA LISENT.

   Une seule fiche pour les deux applications : le pré-rendu de l'espace
   « en projet » (scripts/prerender.mjs) et celui des espaces TPE et PME
   (tech/scripts/prerender.mjs) la posent sous le même @id. Deux fiches
   différentes sous un même identifiant, ce sont deux versions de
   l'entreprise pour Google : il n'en faut qu'une.

   Les faits sont ceux des mentions légales (même nom, même téléphone, même
   commune) : Google compare ces données d'une source à l'autre, la fiche
   Google Business Profile devra dire la même chose. Pas de numéro de rue
   (choix de Florian), pas d'e-mail, pas de prix : le site dit « prix fixe,
   écrit avant de commencer ». Un balisage qui ment est pire que pas de
   balisage.
   ════════════════════════════════════════════════════════════ */

export const RACINE = `${ORIGINE}${BASE}/`;
export const ID_CABINET = `${RACINE}#cabinet`;
export const ID_SITE = `${RACINE}#site`;

/* Les villes et les territoires, chacun avec sa page Wikipédia : « Nord »
   tout court ne désigne rien pour une machine. */
const lieu = (type, name, wiki) => ({ '@type': type, name, sameAs: `https://fr.wikipedia.org/wiki/${wiki}` });
export const ZONE = [
  lieu('City', 'Valenciennes', 'Valenciennes'),
  lieu('City', 'Lille', 'Lille'),
  lieu('AdministrativeArea', 'Nord', 'Nord_(d%C3%A9partement)'),
  lieu('AdministrativeArea', 'Hauts-de-France', 'Hauts-de-France'),
];

/* Les offres des TPE et des PME. Les pages /tpe/offres et /pme/offres les
   déclarent aussi, une par une. */
export const OFFRES_ENTREPRISES = {
  pme: [
    ['Audit et cartographie des outils numériques', 'On recense poste par poste les outils que vous payez, ce qu’ils coûtent et ce qu’ils servent vraiment.'],
    ['Mise en ordre et liaison des outils', 'On relie les outils qui ne se parlent pas pour qu’une information saisie une fois ne soit jamais retapée.'],
    ['Outils métier sur mesure', 'Automatisation, écran ou petit outil interne construit à la taille exacte de ce qui manque.'],
    ['Formation et suivi', 'On forme les équipes sur leurs propres dossiers, puis on revient une demi-journée par mois.'],
  ],
  tpe: [
    ['Création de site internet et boutique en ligne', 'Un site qui dit en une phrase ce que vous faites, et une boutique si vous vendez.'],
    ['Prise de rendez-vous en ligne', 'Vos disponibilités réelles, la réservation en autonomie et les confirmations automatiques.'],
    ['Identité de marque', 'Le positionnement d’abord, puis les mots, les couleurs et le logo qui en découlent.'],
    ['Aide au lancement', 'Le modèle économique, les chiffres et le dossier à présenter avant d’ouvrir ou d’emprunter.'],
  ],
};

/* Dans le catalogue de l'entreprise, une offre n'a pas besoin de répéter qui
   la propose ni où : la fiche le dit déjà. Seule, sur sa page, elle le dit. */
const offreNue = (name, description, url) => ({ '@type': 'Service', name, description, ...(url ? { url } : {}) });
export const service = (name, description, url) => ({ ...offreNue(name, description, url), provider: { '@id': ID_CABINET }, areaServed: ZONE });

const offre = (s) => ({ '@type': 'Offer', itemOffered: s });
const catalogue = (name, url, services) => ({ '@type': 'OfferCatalog', name, url, itemListElement: services.map(offre) });

const CATALOGUE = {
  '@type': 'OfferCatalog',
  name: 'Les offres Reskope',
  itemListElement: [
    catalogue('Reskope Create : créer ou reprendre une entreprise', `${RACINE}nos-offres/`,
      OFFRES.filter((o) => o.statut !== 'plustard')
        .map((o) => offreNue(o.nom, o.accroche, o.slug ? `${RACINE}${o.slug.slice(1)}/` : `${RACINE}nos-offres/`))),
    catalogue('Reskope Define : TPE de 1 à 10 personnes', `${RACINE}tpe/offres/`,
      OFFRES_ENTREPRISES.tpe.map(([n, d]) => offreNue(n, d, `${RACINE}tpe/offres/`))),
    catalogue('Reskope Elevate : PME de 10 à 250 personnes', `${RACINE}pme/offres/`,
      OFFRES_ENTREPRISES.pme.map(([n, d]) => offreNue(n, d, `${RACINE}pme/offres/`))),
  ],
};

export const personne = (name, jobTitle) => ({ '@type': 'Person', name, jobTitle, worksFor: { '@id': ID_CABINET }, url: `${RACINE}qui-on-est/` });

export const CABINET = {
  '@type': 'ProfessionalService',
  '@id': ID_CABINET,
  name: 'Reskope',
  slogan: 'On vous aide à décider, et on construit la suite.',
  description: 'Conseil aux entreprises à Valenciennes et à Lille. Pour la personne qui crée ou reprend une entreprise : tester son idée, trouver son client idéal, construire son business plan, convaincre la banque. Pour les TPE : site internet, rendez-vous en ligne, identité de marque. Pour les PME : audit des outils numériques, outils qui se parlent, outils sur mesure.',
  url: RACINE,
  logo: { '@type': 'ImageObject', url: `${RACINE}logo/reskope-logo-carre.png`, width: 400, height: 400 },
  image: `${RACINE}og-image.png`,
  telephone: '+33620235520',
  foundingDate: '2026-08',
  founder: [personne('Thomy Phanzu', 'Cofondatrice'), personne('Florian Bouchart', 'Cofondateur')],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Trith-Saint-Léger',
    postalCode: '59125',
    addressRegion: 'Hauts-de-France',
    addressCountry: 'FR',
  },
  areaServed: ZONE,
  identifier: { '@type': 'PropertyValue', propertyID: 'SIRET', value: '93928500300017' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+33620235520',
    url: `${RACINE}contact/`,
    areaServed: 'FR',
    availableLanguage: 'French',
  },
  knowsAbout: [
    'Création d’entreprise', 'Reprise d’entreprise', 'Business plan', 'Prévisionnel financier',
    'Financement bancaire', 'Étude de marché', 'Persona', 'Discovery client', 'Identité de marque',
    'Création de site internet', 'Prise de rendez-vous en ligne', 'Audit des outils numériques',
    'Système d’information', 'Automatisation', 'Numérique responsable',
  ],
  knowsLanguage: ['fr'],
  brand: [
    { '@type': 'Brand', name: 'Reskope Create', url: `${RACINE}creation/` },
    { '@type': 'Brand', name: 'Reskope Define', url: `${RACINE}tpe/` },
    { '@type': 'Brand', name: 'Reskope Elevate', url: `${RACINE}pme/` },
  ],
  hasOfferCatalog: CATALOGUE,
};

/* Le site lui-même : Google en tire le nom affiché au-dessus des résultats. */
export const SITE_WEB = {
  '@type': 'WebSite',
  '@id': ID_SITE,
  url: RACINE,
  name: 'Reskope',
  inLanguage: 'fr',
  publisher: { '@id': ID_CABINET },
};

/* Le type de chaque page : une page de contact et une page « qui on est »
   se déclarent comme telles. */
export const typeDePage = (route) => (/contact$/.test(route) ? 'ContactPage' : /(qui-on-est|a-propos)$/.test(route) ? 'AboutPage' : 'WebPage');
