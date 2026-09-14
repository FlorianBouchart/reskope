import { useEffect } from 'react';

const BRAND = 'Reskope';

/* Enveloppe de page : contenu toujours visible (les entrées sont portées
   par les <Reveal>). Gère aussi le SEO par page : <title> et meta
   description mis à jour à l'affichage. */
export default function Page({ children, title, description, univers }) {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND}` : `${BRAND} · Conseil & ingénierie numérique`;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);

  /* `univers` bascule toute la page dans l'un des quatre mondes
     (audit, solutions, strategie, marque). Le réglage vit en CSS : sol,
     dominant, trame et tempo découlent du seul attribut. */
  return <main {...(univers ? { 'data-univers': univers } : {})}>{children}</main>;
}
