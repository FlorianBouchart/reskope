import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProfil, BASE } from '../profil';

/* ════════════════════════════════════════════════════════════
   VERS UNE PAGE DE LA MAISON — qui on est, contact, pages légales.

   Ces pages n'existent plus qu'une fois, sur le site principal, aux couleurs
   de Reskope : trois « à propos » et trois formulaires, c'était trois textes
   à tenir et un visiteur qui ne savait plus où il était. Un lien interne
   resté vers /contact ou /a-propos arrive ici et repart aussitôt vers la
   bonne page. Le message que l'atelier a préparé suit le visiteur.
   ════════════════════════════════════════════════════════════ */
export default function VersMaison({ vers }) {
  const { profil } = useProfil();
  const { state } = useLocation();
  useEffect(() => {
    if (state?.message) {
      try { sessionStorage.setItem('reskope-message', state.message); } catch { /* stockage bloqué : le message ne suit pas */ }
    }
    window.location.replace(`${BASE}${typeof vers === 'function' ? vers(profil) : vers}`);
  }, [vers, profil, state]);
  return null;
}
