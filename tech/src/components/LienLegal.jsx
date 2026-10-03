import { BASE } from '../profil';

/* ════════════════════════════════════════════════════════════
   UN LIEN VERS UNE PAGE LÉGALE : toujours celle du site principal.

   Les pages légales n'existent qu'une fois, sur le site principal, aux
   couleurs de Reskope (ce sont les mêmes textes pour tout le monde). Les
   anciennes adresses /pme/cgv… renvoient vers elles.
   ════════════════════════════════════════════════════════════ */
export default function LienLegal({ to, children, ...reste }) {
  return <a href={`${BASE}${to}/`} {...reste}>{children}</a>;
}
