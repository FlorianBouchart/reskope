import { gsap } from './gsap';
import { instant } from './scrub';

/* ════════════════════════════════════════════════════════════
   LE MOUVEMENT RESKOPE : UNE ARRIVÉE SIMPLE.

   Un texte qui arrive monte de quelques pixels et apparaît : ni zoom, ni
   profondeur, ni flou. La « mise au point » (recul en profondeur, flou puis
   net) a été retirée le 04/10/2026 : à l'entrée d'une page, elle donnait
   un effet de zoom que Florian n'aimait pas du tout. Le flou ne sert plus
   que là où il a un sens (le verre de l'en-tête, la traversée de scènes de
   l'accueil PME). Le volume et la vitesse passent par les scènes en 3D et
   par les particules du fond, qui suivent la vitesse du défilement.

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
  y: 18,
  autoAlpha: 0,
  duration: 0.9,
  ease: 'power3.out',
};

/** Fait apparaître des éléments à la manière Reskope. `declencheur` : l'élément
    dont l'entrée à l'écran lance l'apparition (sinon, tout de suite). */
export function apparaitre(cibles, { declencheur, start = 'top 86%', ...autres } = {}) {
  if (instant() || (declencheur && !REVELATIONS)) return null;
  return gsap.from(cibles, {
    ...MISE_AU_POINT,
    stagger: 0.08,
    ...(declencheur ? { scrollTrigger: { trigger: declencheur, start, once: true } } : {}),
    ...autres,
  });
}
