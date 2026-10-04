import { R_NODES, R_LINKS } from '../components/Logo';
import { MOT_LOGO, MOT_BOITE, R_BOITE, CORPS_MOT, BASE_MOT } from '../data/logoMot';

/* ════════════════════════════════════════════════════════════
   LES DONNÉES DES CARTES DE VISITE.

   Partagées par la carte en fenêtre (components/BusinessCard.jsx) et la
   carte posée dans le pied de page (components/CarteVivante.jsx). Elles
   vivent ici, hors des composants, pour que le rechargement à chaud de
   Vite reste possible. Les coordonnées restent encodées : les robots qui
   moissonnent les adresses ne les trouvent pas dans le code livré.
   ════════════════════════════════════════════════════════════ */

/* Le R et le mot du logo, aux proportions de l'en-tête (Logo.jsx, scripts/logo.py). */
export const GEO = { rNodes: R_NODES, rLinks: R_LINKS, trait: 3, noeud: 5.5, jonction: 7, motD: MOT_LOGO, rBoite: R_BOITE, motBoite: MOT_BOITE, corpsMot: CORPS_MOT, baseMot: BASE_MOT };

export const dec = (s) => (typeof atob !== 'undefined' ? atob(s) : '');

/* La police de la marque, embarquée dans le fichier téléchargé. */
const POLICES = [['ReskopeSans-Regular.woff2', 400], ['ReskopeSans-Medium.woff2', 500], ['ReskopeSans-SemiBold.woff2', 600]];
const enBase64 = (buf) => {
  const octets = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < octets.length; i += 0x8000) bin += String.fromCharCode(...octets.subarray(i, i + 0x8000));
  return btoa(bin);
};
export async function policesEmbarquees() {
  const regles = await Promise.all(POLICES.map(async ([fichier, poids]) => {
    const rep = await fetch(`${import.meta.env.BASE_URL}fonts/${fichier}`);
    if (!rep.ok) throw new Error(fichier);
    const b64 = enBase64(await rep.arrayBuffer());
    return `@font-face{font-family:'Reskope Sans';src:url(data:font/woff2;base64,${b64}) format('woff2');font-weight:${poids};}`;
  }));
  return regles.join('');
}

export const PERSONNES = {
  florian: {
    prenom: 'Florian',
    nomFamille: 'Bouchart',
    tel: 'KzMzIDYgMjAgMjMgNTUgMjA=',
    mail: 'Zmxvcmlhbi5ib3VjaGFydEBob3RtYWlsLmZy',
    fr: { titre: 'Cofondateur', domaine: ['Discovery, sites et outils'] },
    en: { titre: 'Co-founder', domaine: ['Discovery, websites and tools'] },
  },
  thomy: {
    prenom: 'Thomy',
    nomFamille: 'Phanzu',
    tel: 'KzMzIDcgNjEgMjUgNDQgNjU=',
    mail: 'dGhvbXlwaGFuenVAaWNsb3VkLmNvbQ==',
    fr: { titre: 'Cofondatrice', domaine: ['Business plan, marque', 'et financement'] },
    en: { titre: 'Co-founder', domaine: ['Business plan, brand', 'and funding'] },
  },
};
