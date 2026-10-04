import { Link, useLocation } from 'react-router-dom';
import { useT, useLang } from '../i18n';
import { INTENTIONS } from '../data/intentions';
import { useProfil } from '../profil.jsx';
import { SITE as ADRESSE } from '../data/seo';

/* Fil d'Ariane — situe le visiteur et donne à Google la hiérarchie du site.
   Rendu uniquement sur les pages intérieures (jamais sur l'accueil, où il
   n'aurait rien à afficher). Le JSON-LD BreadcrumbList accompagne le rendu
   visuel : c'est lui qui produit le chemin sous le lien dans les résultats. */

const SITE = `${ADRESSE.origine}${ADRESSE.base}`;

/* Pages absentes du menu principal : leur libellé n'est pas dans t.nav.tabs */
const EXTRA = {
  fr: {
    ...Object.fromEntries(INTENTIONS.map((p) => [p.route, p.fil])),
    '/contact': 'Contact',
    '/merci': 'Message envoyé',
    '/mentions-legales': 'Mentions légales',
    '/confidentialite': 'Confidentialité',
    '/cgu': 'CGU',
    '/cgv': 'CGV',
  },
  en: {
    ...Object.fromEntries(INTENTIONS.map((p) => [p.route, p.fil])),
    '/contact': 'Contact',
    '/merci': 'Message sent',
    '/mentions-legales': 'Legal notice',
    '/confidentialite': 'Privacy',
    '/cgu': 'Terms of use',
    '/cgv': 'Terms of sale',
  },
};

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const { profil } = useProfil();
  const t = useT();

  /* Une adresse pré-rendue finit par une barre (/offres/) : sans la ranger,
     aucun libellé ne se trouvait et le fil n'apparaissait jamais. */
  const route = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/';
  if (route === '/' || route === '') return null;

  const label = t.nav.tabs?.[route] || EXTRA[lang]?.[route];
  if (!label) return null; // route inconnue (404) : pas de fil d'Ariane

  const home = lang === 'fr' ? 'Accueil' : 'Home';

  /* Le schema du fil (avec l'espace dans l'adresse) est écrit au build par
     scripts/prerender.mjs ; ici, seulement le fil visible. */
  const marque = profil === 'tpe' ? 'Reskope Define' : 'Reskope Elevate';

  return (
    <nav className="crumb" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumb'}>
      <div className="container crumb__inner">
        <ol>
          <li>
            <a href={`${SITE}/`}>{home}</a>
          </li>
          <li aria-hidden="true" className="crumb__sep">
            <span className="crumb__node" />
          </li>
          <li>
            <Link to="/">{marque}</Link>
          </li>
          <li aria-hidden="true" className="crumb__sep">
            <span className="crumb__node" />
          </li>
          <li>
            <span aria-current="page">{label}</span>
          </li>
        </ol>
      </div>
    </nav>
  );
}
