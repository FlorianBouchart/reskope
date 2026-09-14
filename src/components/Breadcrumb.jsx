import { Link, useLocation } from 'react-router-dom';
import { useT, useLang } from '../i18n';
import { UNIVERS, PAR_SLUG } from '../data/univers';

/* Fil d'Ariane — situe le visiteur et donne à Google la hiérarchie du site.
   Rendu uniquement sur les pages intérieures (jamais sur l'accueil, où il
   n'aurait rien à afficher). Le JSON-LD BreadcrumbList accompagne le rendu
   visuel : c'est lui qui produit le chemin sous le lien dans les résultats. */

const SITE = 'https://floops10.github.io/reskope';

/* Pages absentes du menu principal : leur libellé n'est pas dans t.nav.tabs */
const EXTRA = {
  fr: {
    '/contact': 'Contact',
    '/merci': 'Message envoyé',
    '/mentions-legales': 'Mentions légales',
    '/confidentialite': 'Confidentialité',
    '/cgu': 'CGU',
    '/cgv': 'CGV',
  },
  en: {
    '/contact': 'Contact',
    '/merci': 'Message sent',
    '/mentions-legales': 'Legal notice',
    '/confidentialite': 'Privacy',
    '/cgu': 'Terms of use',
    '/cgv': 'Terms of sale',
  },
};

/* À quel univers appartient une page. C'est ce rattachement qui évite
   qu'un dirigeant venu pour un audit croise la direction artistique : le
   fil d'Ariane le ramène toujours dans SON métier, jamais à la racine
   d'un catalogue où les quatre offres se côtoient. */
const PARENT = Object.fromEntries(
  UNIVERS.flatMap((u) => (u.fr.preuves || []).map((p) => [p.to, u.slug])),
);

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const t = useT();

  if (pathname === '/' || pathname === '') return null;

  const uni = PAR_SLUG[pathname];
  const label = uni ? uni[lang].nom : (t.nav.tabs?.[pathname] || EXTRA[lang]?.[pathname]);
  if (!label) return null; // route inconnue (404) : pas de fil d'Ariane

  const home = lang === 'fr' ? 'Accueil' : 'Home';

  /* Un seul rattachement possible par page : on ne met jamais deux
     univers dans le même fil, ce serait exactement le mélange qu'on veut
     éviter. Une page transversale (méthode, contact) n'a pas de parent. */
  const pSlug = uni ? null : PARENT[pathname];
  const parent = pSlug ? { to: pSlug, nom: PAR_SLUG[pSlug][lang].nom } : null;

  const chaine = [
    { name: home, item: `${SITE}/` },
    ...(parent ? [{ name: parent.nom, item: `${SITE}${parent.to}` }] : []),
    { name: label, item: `${SITE}${pathname}` },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: chaine.map((e, i) => ({
      '@type': 'ListItem', position: i + 1, name: e.name, item: e.item,
    })),
  };

  return (
    <nav className="crumb" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumb'}>
      <div className="container crumb__inner">
        <ol>
          <li>
            <Link to="/">{home}</Link>
          </li>
          <li aria-hidden="true" className="crumb__sep">
            <span className="crumb__node" />
          </li>
          {parent && (
            <>
              <li>
                <Link to={parent.to}>{parent.nom}</Link>
              </li>
              <li aria-hidden="true" className="crumb__sep">
                <span className="crumb__node" />
              </li>
            </>
          )}
          <li>
            <span aria-current="page">{label}</span>
          </li>
        </ol>
      </div>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </nav>
  );
}
