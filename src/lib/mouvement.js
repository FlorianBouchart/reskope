import { gsap } from './gsap';
import { instant } from './scrub';

/* ════════════════════════════════════════════════════════════
   LE MOUVEMENT RESKOPE : LA MISE AU POINT.

   Un élément qui arrive vient de la profondeur et se met au point, comme
   sous un objectif : il recule à peine, il est flou puis net, et il se
   pose. Pas de bascule spectaculaire, pas de glissement à plat : c'est la
   profondeur de champ qui fait sentir le volume. Départ franc, arrivée très
   douce (expo), un peu plus lent qu'un réflexe : c'est ce qui fait premium.

   Une seule grammaire pour tout le site (copie identique dans tech/). Les
   scènes en volume (réseaux, R, 3D) gardent leur propre chorégraphie.
   ════════════════════════════════════════════════════════════ */
/* LES APPARITIONS AU DÉFILEMENT : COUPÉES (04/10/2026).
   Retour d'un premier lecteur : « trop d'animations, trop lourd ». Un
   paragraphe, une liste, une FAQ qui « poppent » quand on arrive dessus,
   c'est du bruit : le contenu est simplement là. Ce qui reste animé, ce
   sont les scènes qui en mettent plein la vue (le R qui se forme, les
   réseaux, la frise, le vol de la méthode, les portraits) et l'entrée de
   chaque page. Le premium passe par le défilement lui-même (Lenis, lourd
   et soyeux). Remettre à true pour retrouver les apparitions. */
export const REVELATIONS = false;

export const MISE_AU_POINT = {
  z: -120,
  y: 22,
  scale: 0.985,
  rotateX: -4,
  transformPerspective: 900,
  filter: 'blur(10px)',
  autoAlpha: 0,
  duration: 1.25,
  ease: 'expo.out',
};

/** Fait apparaître des éléments à la manière Reskope. `declencheur` : l'élément
    dont l'entrée à l'écran lance l'apparition (sinon, tout de suite). */
export function apparaitre(cibles, { declencheur, start = 'top 86%', ...autres } = {}) {
  if (instant() || (declencheur && !REVELATIONS)) return null;
  return gsap.from(cibles, {
    ...MISE_AU_POINT,
    stagger: 0.08,
    clearProps: 'filter',
    ...(declencheur ? { scrollTrigger: { trigger: declencheur, start, once: true } } : {}),
    ...autres,
  });
}
