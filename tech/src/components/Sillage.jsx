import { useEffect, useRef } from 'react';
import { instant } from '../lib/scrub';

/* ════════════════════════════════════════════════════════════
   LE SILLAGE — le flou du défilement, fait de particules.

   Florian, le 04/10/2026 : « plutôt que du flou, mets plein de particules
   qui forment du flou », au bord vers lequel on défile. Première version
   dans la trame de fond : « on ne les voit pas du tout ». Elle vivait
   DERRIÈRE le contenu, et le héros, les bandes teintées et les cartes la
   cachaient. Le sillage est donc un calque AU-DESSUS du contenu, comme le
   flou de bas d'écran qu'il remplace : fixe, transparent aux clics, sous
   l'en-tête et le menu.

   Quand on défile, le bord vers lequel on va (le bas en descendant, le haut
   en remontant) se couvre d'une brume de particules floues, étirées par la
   vitesse comme un flou de mouvement. Leur nombre, leur vitesse et leur
   course suivent le défilement. La brume ne dépasse pas un bon quart de
   l'écran et s'éteint en avançant : on lit au milieu, la vitesse se sent
   au bord. À l'arrêt, la boucle s'endort et le calque est vide.
   ════════════════════════════════════════════════════════════ */

const hasard = (a, b) => a + Math.random() * (b - a);
const couleurs = () => {
  const s = getComputedStyle(document.documentElement);
  return {
    trame: s.getPropertyValue('--trame').trim() || '28, 12, 179',
    vive: s.getPropertyValue('--trame-vive').trim() || '91, 75, 230',
  };
};

/* Un point flou, dessiné une fois par couleur : la tache d'un objet hors de
   la mise au point. Le dessiner ensuite ne coûte qu'une copie d'image. */
const taches = new Map();
function tache(couleur) {
  if (taches.has(couleur)) return taches.get(couleur);
  const t = document.createElement('canvas');
  t.width = t.height = 64;
  const g = t.getContext('2d');
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, `rgba(${couleur},1)`);
  r.addColorStop(0.35, `rgba(${couleur},0.6)`);
  r.addColorStop(1, `rgba(${couleur},0)`);
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  taches.set(couleur, t);
  return t;
}

export default function Sillage() {
  const toile = useRef(null);

  useEffect(() => {
    const canvas = toile.current;
    if (!canvas || instant()) return undefined;
    const ctx = canvas.getContext('2d');
    const tactile = window.matchMedia('(pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, tactile ? 1.5 : 2);
    let w = 0;
    let h = 0;
    let max = 360;
    const regler = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      max = w < 700 ? 170 : 360;
    };
    regler();

    const parts = [];
    let reserve = 0;
    let vit = 0;
    let dernierY = window.scrollY;
    let dernierT = 0;
    let raf = 0;
    let repos = 0;
    let c = couleurs();

    const boucle = (t) => {
      const ecoule = dernierT ? Math.min(Math.max(t - dernierT, 8), 100) : 16.67;
      const f = ecoule / 16.67;
      const y = window.scrollY;
      let dy = y - dernierY;
      /* Un saut (changement de page, ancre instantanée) n'est pas une vitesse. */
      if (Math.abs(dy) > 600) dy = 0;
      vit += ((dy / ecoule) * 16.67 - vit) * 0.4;
      if (Math.abs(vit) < 0.05) vit = 0;
      dernierY = y;
      dernierT = t;

      const v = Math.min(Math.abs(vit), 70);
      const sens = Math.sign(vit);
      if (v > 0.5 && sens && !document.documentElement.hasAttribute('data-menu-ouvert')) {
        reserve = Math.min(reserve + Math.min(10, v * 0.42) * f, 16);
        while (reserve >= 1 && parts.length < max) {
          reserve -= 1;
          const z = Math.random();
          const gros = Math.random() < 0.4;
          /* La course réelle : avec un frein de 0,92 par image, une particule
             lancée à vy parcourt vy / 0,08 avant de s'arrêter. Elle s'éteint
             exactement là, sans traîner immobile. */
          const vy = (h * (0.06 + 0.22 * z) * Math.min(1, v / 24) + 22) * 0.08 * hasard(0.8, 1.2);
          parts.push({
            x: hasard(-10, w + 10),
            y: sens > 0 ? h + hasard(2, 24) : -hasard(2, 24),
            dx: hasard(-0.3, 0.3),
            vy: -sens * vy,
            course: vy / 0.08,
            parcouru: 0,
            age: 0,
            gros,
            taille: gros ? 14 + 22 * z : 2.5 + 5 * z,
            force: gros ? 0.09 + 0.09 * z : 0.22 + 0.26 * z,
          });
        }
      } else reserve = 0;

      ctx.clearRect(0, 0, w, h);
      if (parts.length || v > 0.5) {
        /* Sous les particules, un voile très léger au même bord : il lie la
           brume, la vitesse le fait apparaître et disparaître. */
        const voile = Math.min(0.09, v * 0.005);
        if (voile > 0.004 && sens) {
          const haut = h * 0.24 * Math.min(1, v / 24) + 30;
          const y0 = sens > 0 ? h : 0;
          const y1 = sens > 0 ? h - haut : haut;
          const g = ctx.createLinearGradient(0, y0, 0, y1);
          g.addColorStop(0, `rgba(${c.vive},${voile.toFixed(3)})`);
          g.addColorStop(1, `rgba(${c.vive},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(0, Math.min(y0, y1), w, haut);
        }
        const frein = Math.pow(0.92, f);
        const fine = tache(c.trame);
        const large = tache(c.vive);
        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i];
          p.parcouru += Math.abs(p.vy * f);
          p.y += p.vy * f;
          p.x += p.dx * f;
          p.vy *= frein;
          p.age += f;
          if (p.parcouru > p.course * 0.95 || p.age > 90 || p.y < -70 || p.y > h + 70) {
            parts.splice(i, 1);
            continue;
          }
          /* Pleine contre le bord, elle s'éteint en avançant. */
          const e = Math.pow(1 - p.parcouru / p.course, 1.1) * Math.min(1, p.age / 2);
          /* Étirée dans le sens du mouvement : un flou de mouvement. */
          const etire = 1 + Math.min(3.2, Math.abs(p.vy) * 0.15);
          const lw = p.taille;
          const lh = p.taille * etire;
          ctx.globalAlpha = p.force * e;
          ctx.drawImage(p.gros ? large : fine, p.x - lw / 2, p.y - lh / 2, lw, lh);
        }
        ctx.globalAlpha = 1;
        repos = 0;
      } else {
        repos += 1;
      }
      /* Plus rien à dessiner depuis un moment : la boucle s'endort. */
      if (repos > 20) {
        raf = 0;
        dernierT = 0;
        return;
      }
      raf = requestAnimationFrame(boucle);
    };

    const reveiller = () => {
      if (raf) return;
      c = couleurs();
      dernierY = window.scrollY;
      dernierT = 0;
      repos = 0;
      raf = requestAnimationFrame(boucle);
    };
    window.addEventListener('scroll', reveiller, { passive: true });
    window.addEventListener('resize', regler);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', reveiller);
      window.removeEventListener('resize', regler);
    };
  }, []);

  return <canvas className="sillage" ref={toile} aria-hidden="true" />;
}
