import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

/* Scroll à inertie (Lenis) synchronisé avec GSAP ScrollTrigger.
   C'est la « respiration » du site : le scroll devient fluide et pondéré,
   et toutes les scènes ScrollTrigger restent calées dessus.
   Désactivé si prefers-reduced-motion (scroll natif). Touch = natif (perf). */

let lenis = null;
let tick = null;

/* Le défilement « tiré à la main » (04/10/2026). La molette ne fait plus
   glisser la page vers sa cible en ralentissant (lerp) : elle la TIRE au
   bout d'un ressort. La page démarre avec un peu d'inertie, suit la main,
   et se pose avec un très léger rebond. Une raideur, un amortissement, et
   la vitesse se conserve d'un cran de molette à l'autre.
   Lenis n'a pas d'option pour ça : on remplace le pas de son animation
   (Animate.advance) quand elle est en mode lerp, c'est-à-dire pour la
   molette et le pavé tactile. Les défilements programmés (ancres, retour en
   haut) gardent leur durée et leur courbe. Écrit pour Lenis 1.3.x : à
   revérifier si la version change (animate.isRunning, .value, .to, .lerp,
   .duration, .easing, .stop(), .onUpdate). */
const RESSORT = { raideur: 56, amorti: 11.1 };
function tirerALaMain(instance) {
  const anim = instance.animate;
  if (!anim || typeof anim.advance !== 'function') return;
  const avancer = anim.advance.bind(anim);
  let vitesse = 0;
  anim.advance = (dt) => {
    if (!anim.isRunning || (anim.duration && anim.easing) || !anim.lerp) {
      vitesse = 0;
      avancer(dt);
      return;
    }
    const pas = Math.min(dt, 1 / 30) / 2;
    for (let i = 0; i < 2; i++) {
      vitesse += (RESSORT.raideur * (anim.to - anim.value) - RESSORT.amorti * vitesse) * pas;
      anim.value += vitesse * pas;
    }
    if (anim.value < 0) { anim.value = 0; vitesse = 0; }
    else if (anim.value > instance.limit) { anim.value = instance.limit; vitesse = 0; }
    let fini = false;
    if (Math.abs(anim.to - anim.value) < 0.5 && Math.abs(vitesse) < 4) {
      anim.value = anim.to;
      vitesse = 0;
      fini = true;
      anim.stop();
    }
    anim.onUpdate?.(anim.value, fini);
  };
}

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
    lerp: 0.07,           // garde Lenis en mode « lerp » : c'est le ressort de tirerALaMain qui fait le mouvement
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    syncTouch: false,
  });

  tirerALaMain(lenis);
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
