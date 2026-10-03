import './mesure.css';

/* ════════════════════════════════════════════════════════════
   LA MESURE D'AUDIENCE, SEULEMENT AVEC L'ACCORD DU VISITEUR.

   Google Analytics dépose des cookies : en France, il faut l'accord du
   visiteur AVANT (article 82 de la loi Informatique et Libertés, lignes
   directrices de la CNIL). Tant qu'il n'a pas dit oui, rien de Google
   n'est chargé : ni script, ni cookie, ni requête. Pas de mode « avancé »
   de Google (des envois sans cookie avant l'accord) : c'est encore de la
   collecte.

   Refuser est aussi simple qu'accepter : deux boutons identiques, côte à
   côte. La réponse est gardée six mois (recommandation de la CNIL), puis
   la question revient. Le bouton « Cookies » du pied de page la rouvre à
   tout moment, et retirer son accord efface les cookies de mesure.

   Un seul fichier pour les deux applications : copie identique dans
   tech/src/lib/mesure.js. La politique de confidentialité décrit tout ça.
   ════════════════════════════════════════════════════════════ */

const ID = 'G-FHRC1RYNQZ';
const CLE = 'reskope-mesure';
const SIX_MOIS = 182 * 24 * 3600 * 1000;
/* Treize mois au plus pour les cookies de mesure (CNIL), au lieu des deux
   ans de Google. En secondes. */
const TREIZE_MOIS = 13 * 30 * 24 * 3600;
/* Google seulement sur le vrai site : en développement ou sur un aperçu
   local, les visites ne sont pas celles des visiteurs. */
const ACTIF = import.meta.env.PROD && /(^|\.)reskope\.fr$/.test(window.location.hostname);

const TEXTES = {
  fr: {
    titre: 'Mesure d’audience',
    texte: 'Avec votre accord, on utilise Google Analytics pour savoir quelles pages vous sont utiles. Si vous refusez, rien n’est déposé. Vous pouvez changer d’avis en bas de chaque page.',
    plus: 'En savoir plus',
    non: 'Refuser',
    oui: 'Accepter',
  },
  en: {
    titre: 'Audience measurement',
    texte: 'With your consent, we use Google Analytics to see which pages are useful to you. If you decline, nothing is stored. You can change your mind at the bottom of every page.',
    plus: 'Learn more',
    non: 'Decline',
    oui: 'Accept',
  },
};

function lireChoix() {
  try {
    const v = JSON.parse(localStorage.getItem(CLE));
    if (v && (v.choix === 'oui' || v.choix === 'non') && Date.now() - v.date < SIX_MOIS) return v.choix;
  } catch { /* stockage bloqué ou valeur illisible : on redemande */ }
  return null;
}

function garderChoix(choix) {
  try {
    localStorage.setItem(CLE, JSON.stringify({ choix, date: Date.now() }));
  } catch { /* stockage bloqué : la question reviendra */ }
}

/* L'espace des entreprises peut être en anglais ; le reste du site est en
   français. */
function langue() {
  try {
    if (/^\/(tpe|pme)(\/|$)/.test(window.location.pathname) && localStorage.getItem('reskope-lang') === 'en') return 'en';
  } catch { /* stockage bloqué */ }
  return 'fr';
}

/* L'espace PME a sa propre page ; l'espace TPE et le reste du site
   renvoient à celle du site principal, qui dit la même chose. */
const pageConfidentialite = () => (/^\/pme(\/|$)/.test(window.location.pathname) ? '/pme/confidentialite/' : '/confidentialite/');

/* Google attend l'objet `arguments` lui-même, pas un tableau : d'où une
   fonction classique, et pas une fonction fléchée. */
function gtag() {
  window.dataLayer.push(arguments);
}

function chargerGoogle() {
  window[`ga-disable-${ID}`] = false;
  if (window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  // Aucune publicité : seuls les cookies de mesure sont permis.
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
  gtag('js', new Date());
  gtag('config', ID, { cookie_expires: TREIZE_MOIS, allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(script);
}

function couperGoogle() {
  window[`ga-disable-${ID}`] = true;
  if (window.gtag) window.gtag('consent', 'update', { analytics_storage: 'denied' });
  // Les cookies de mesure (_ga et _ga_<identifiant>) sont posés sur le domaine.
  const domaine = window.location.hostname.replace(/^www\./, '');
  for (const morceau of document.cookie.split(';')) {
    const nom = morceau.split('=')[0].trim();
    if (nom !== '_ga' && !nom.startsWith('_ga_')) continue;
    for (const d of ['', `; domain=${domaine}`, `; domain=.${domaine}`]) document.cookie = `${nom}=; Max-Age=0; path=/${d}`;
  }
}

const el = (balise, attributs = {}, ...enfants) => {
  const n = document.createElement(balise);
  for (const [k, v] of Object.entries(attributs)) n.setAttribute(k, v);
  n.append(...enfants);
  return n;
};

let bandeau = null;

function fermer() {
  const b = bandeau;
  if (!b) return;
  bandeau = null;
  b.classList.remove('mesure--la');
  let parti = false;
  const partir = () => { if (!parti) { parti = true; b.remove(); } };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return partir();
  b.addEventListener('transitionend', partir, { once: true });
  setTimeout(partir, 700);
}

function repondre(choix) {
  garderChoix(choix);
  if (ACTIF) {
    if (choix === 'oui') chargerGoogle();
    else couperGoogle();
  }
  fermer();
}

/* Le bandeau se pose en tête du document (un lecteur d'écran ou le clavier
   le trouvent d'abord), mais s'affiche dans le coin, par-dessus la page :
   il ne la décale pas. data-nosnippet : Google ne s'en sert pas comme
   extrait dans ses résultats. */
function ouvrir() {
  if (bandeau) return;
  // Un bandeau qui finit de partir (ou un doublon du rechargement à chaud) laisse la place.
  document.querySelectorAll('.mesure').forEach((n) => n.remove());
  const l = langue();
  const t = TEXTES[l];
  const non = el('button', { type: 'button', class: 'mesure__bouton' }, t.non);
  const oui = el('button', { type: 'button', class: 'mesure__bouton' }, t.oui);
  non.addEventListener('click', () => repondre('non'));
  oui.addEventListener('click', () => repondre('oui'));
  bandeau = el('section', { class: 'mesure', 'aria-labelledby': 'mesure-titre', lang: l, 'data-nosnippet': '' },
    el('p', { class: 'mesure__titre', id: 'mesure-titre' }, t.titre),
    el('p', { class: 'mesure__texte' }, `${t.texte} `, el('a', { class: 'lien-souligne mesure__plus', href: pageConfidentialite() }, t.plus)),
    el('div', { class: 'mesure__choix' }, non, oui),
  );
  document.body.prepend(bandeau);
  requestAnimationFrame(() => requestAnimationFrame(() => bandeau?.classList.add('mesure--la')));
}

/* Au chargement de chaque page : la réponse déjà donnée s'applique, sinon
   la question se pose. */
export function lancerMesure() {
  const choix = lireChoix();
  if (choix === 'oui' && ACTIF) chargerGoogle();
  if (!choix) ouvrir();
}

/* Le bouton « Cookies » du pied de page : la question revient, et le
   clavier va droit au premier bouton. */
export function rouvrirMesure() {
  ouvrir();
  bandeau?.querySelector('button')?.focus({ preventScroll: true });
}
