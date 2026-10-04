import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

/* Scroll à inertie (Lenis) synchronisé avec GSAP ScrollTrigger.
   C'est la « respiration » du site : le scroll devient fluide et pondéré,
   et toutes les scènes ScrollTrigger restent calées dessus.
   Désactivé si prefers-reduced-motion (scroll natif). Touch = natif (perf). */

let lenis = null;
let tick = null;

export function getLenis() {
  return lenis;
}

export function initSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return lenis;
  // SPA : c'est nous qui gérons la position au changement de page,
  // sinon le navigateur restaure l'ancien scroll (on arrivait en bas).
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    lerp: 0.07,           // un défilement qui a du poids : il glisse et se pose, sans traîner (0,1 avant le 04/10/2026)
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  // Dev only : accès à l'instance pour piloter/tester le scroll précisément.
  if (import.meta.env.DEV) window.__lenis = lenis;

  tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  if (tick) gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
  tick = null;
}

/* Le lissage d'une scène liée au défilement. Avec Lenis (souris, pavé
   tactile), le défilement est déjà lissé : un scrub chiffré ajoutait un
   second retard, et chaque scène traînait derrière la page à sa propre
   vitesse. C'était le côté « brouillon » (retour du 04/10/2026). La scène
   suit donc exactement le défilement lissé. Au doigt, le défilement est
   natif : on garde un léger lissage. */
export function scrubLisse(doigt = 0.5) {
  if (typeof window === 'undefined') return doigt;
  const souris = window.matchMedia('(pointer: fine)').matches;
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return souris && !reduit ? true : doigt;
}

/* Verrouille / déverrouille le scroll (ex. menu ouvert). */
export function lockScroll(locked) {
  if (lenis) {
    locked ? lenis.stop() : lenis.start();
  }
}

/* Va en haut (changement de page). */
export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}

/* Va jusqu'à un élément de la page, sous l'en-tête fixe. */
export function scrollToEl(el, offset = -96) {
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.1 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}
