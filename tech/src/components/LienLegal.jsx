import { Link } from 'react-router-dom';
import { useProfil, BASE } from '../profil';

/* ════════════════════════════════════════════════════════════
   UN LIEN VERS UNE PAGE LÉGALE, QUI MÈNE TOUJOURS À UNE VRAIE PAGE.

   Les pages légales n'existent en fichier que dans l'espace PME et sur le
   site principal. Depuis l'espace TPE, un <Link to="/cgv"> menait à
   /tpe/cgv : la page s'affichait au clic, mais un rechargement, un lien
   partagé ou un moteur recevaient une erreur 404. Depuis l'espace TPE, on
   va donc à la page du site principal, qui dit la même chose.
   ════════════════════════════════════════════════════════════ */
export default function LienLegal({ to, children, ...reste }) {
  const { profil } = useProfil();
  if (profil === 'pme') return <Link to={to} {...reste}>{children}</Link>;
  return <a href={`${BASE}${to}/`} {...reste}>{children}</a>;
}
