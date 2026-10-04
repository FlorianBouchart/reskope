import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { openCalModal, isCalConfigured } from '../lib/cal';
import { CONTACT } from '../data/site';

/* ════════════════════════════════════════════════════════════
   LA BARRE DE CONTACT, SUR TÉLÉPHONE.

   L'objectif du site est un rendez-vous ou un appel. Sur téléphone, une
   fois l'écran d'arrivée passé, les deux boutons restent sous le pouce :
   réserver 30 minutes, ou appeler. La barre se retire quand le pied de page
   (qui porte déjà tous les contacts) arrive, quand le menu ou le bandeau
   des cookies est ouvert, et sur les pages de contact elles-mêmes.
   ════════════════════════════════════════════════════════════ */

const SANS_BARRE = /\/(contact|merci)\/?$/;

export default function BarreContact() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const exclue = SANS_BARRE.test(pathname);

  useEffect(() => {
    if (exclue) return undefined;
    let piedVisible = false;
    let attente = 0;
    const regler = () => {
      attente = 0;
      const passe = window.scrollY > window.innerHeight * 0.7;
      const menu = document.documentElement.hasAttribute('data-menu-ouvert');
      const bandeau = Boolean(document.querySelector('.mesure.mesure--la'));
      setVisible(passe && !piedVisible && !menu && !bandeau);
    };
    const planifier = () => { if (!attente) attente = requestAnimationFrame(regler); };
    const pied = document.querySelector('.footer2');
    const io = pied && 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => { piedVisible = e.isIntersecting; planifier(); })
      : null;
    if (io) io.observe(pied);
    const menu = new MutationObserver(planifier);
    menu.observe(document.documentElement, { attributes: true, attributeFilter: ['data-menu-ouvert'] });
    window.addEventListener('scroll', planifier, { passive: true });
    planifier();
    return () => {
      cancelAnimationFrame(attente);
      io?.disconnect();
      menu.disconnect();
      window.removeEventListener('scroll', planifier);
    };
  }, [pathname, exclue]);

  if (exclue) return null;

  const reserver = () => {
    if (!isCalConfigured) { navigate('/contact'); return; }
    openCalModal().catch(() => navigate('/contact'));
  };

  return (
    <div className={`bcx${visible ? ' is-on' : ''}`} aria-hidden={!visible}>
      <button type="button" className="bcx__res" onClick={reserver} tabIndex={visible ? 0 : -1}>
        Réserver 30 min offertes
      </button>
      <a className="bcx__tel" href={`tel:${CONTACT.telephoneLien}`} tabIndex={visible ? 0 : -1} aria-label={`Appeler le ${CONTACT.telephone}`}>
        Appeler
      </a>
    </div>
  );
}
