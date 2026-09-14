/* ============================================================
   AXONOMÉTRIE — le même moteur que les plaquettes imprimées.

   Projection isométrique vraie : X = (x−y)·cos30, Y = (x+y)·sin30 − z.
   Un volume est fait de trois polygones (dessus, flanc droit, flanc
   gauche) pris dans les trois indigos de la charte, et les volumes sont
   peints du plus lointain au plus proche : c'est l'occlusion qui fait le
   relief, pas une ombre portée.

   Pourquoi pas Three.js ici : ces schémas ne tournent pas, ils se
   CONSTRUISENT au scroll. Du SVG déterministe se mesure, s'imprime, reste
   net à toutes les densités, et pèse mille fois moins qu'un canvas WebGL
   pour le même résultat. Net3D reste en place là où la caméra bouge
   vraiment (la home, la méthode).

   Les fonctions ci-dessous ne rendent rien : elles renvoient des
   DESCRIPTEURS ({ t, cls, ... }) que <Axono> transforme en éléments SVG.
   C'est ce qui permet de les révéler pièce par pièce au scroll.
   ============================================================ */

export const C30 = Math.cos(Math.PI / 6);
export const S30 = Math.sin(Math.PI / 6);

/** Projection d'un point de l'espace vers le plan de la feuille. */
export const PR = (x, y, z = 0) => [(x - y) * C30, (x + y) * S30 - z];

const n2 = (v) => Number(v.toFixed(2));

const poly = (pts, cls, g) => ({ t: 'polygon', cls, g, points: pts.map((p) => `${n2(p[0])},${n2(p[1])}`).join(' ') });
const seg = (a, b, cls, g) => ({ t: 'line', cls, g, x1: n2(a[0]), y1: n2(a[1]), x2: n2(b[0]), y2: n2(b[1]) });
const dot = (p, r, cls, g) => ({ t: 'circle', cls, g, cx: n2(p[0]), cy: n2(p[1]), r });
const ell = (p, rx, ry, cls, g) => ({ t: 'ellipse', cls, g, cx: n2(p[0]), cy: n2(p[1]), rx: n2(rx), ry: n2(ry) });
const word = (p, txt, dx, dy, anchor, cls, g) => ({
  t: 'text', cls, g, txt, anchor, x: n2(p[0] + dx), y: n2(p[1] + dy),
});

/* ---------- primitives ---------- */

/** Le plan de sol quadrillé : c'est lui qui donne l'échelle au schéma. */
export function plan(W, D, pas, z = 0, cls = 'ax-gr', bord = 'ax-bd', g = 0) {
  const suite = (T) => {
    const out = [];
    for (let k = 0; k * pas <= T; k += 1) out.push(k * pas);
    if (T % pas > pas * 0.15) out.push(T);
    return out;
  };
  const o = suite(W).map((i) => seg(PR(i, 0, z), PR(i, D, z), cls, g));
  suite(D).forEach((j) => o.push(seg(PR(0, j, z), PR(W, j, z), cls, g)));
  o.push(poly([PR(0, 0, z), PR(W, 0, z), PR(W, D, z), PR(0, D, z)], bord, g));
  return o;
}

/** Un volume. `plein` false = fil de fer, pour ce qui est payé mais dormant. */
export function volume(x, y, w, d, z0, z1, plein = true, g = 0) {
  const T = [PR(x, y, z1), PR(x + w, y, z1), PR(x + w, y + d, z1), PR(x, y + d, z1)];
  const B = [PR(x, y, z0), PR(x + w, y, z0), PR(x + w, y + d, z0), PR(x, y + d, z0)];
  if (plein) {
    return [
      poly([B[3], B[2], T[2], T[3]], 'ax-l', g),
      poly([B[1], B[2], T[2], T[1]], 'ax-r', g),
      poly(T, 'ax-t', g),
    ];
  }
  const o = [0, 1, 2, 3].map((i) => seg(T[i], T[(i + 1) % 4], 'ax-wf', g));
  o.push(seg(B[1], B[2], 'ax-wf', g), seg(B[2], B[3], 'ax-wf', g));
  [1, 2, 3].forEach((i) => o.push(seg(B[i], T[i], 'ax-wf', g)));
  return o;
}

/* Le libellé d'un volume, poussé hors de sa silhouette. Quatre positions :
   sans ça, une étiquette retombe systématiquement sur le volume voisin. */
function cartouche(out, pts, x, y, w, d, h, lignes, mode = 'droite', g = 0) {
  const n = lignes.length;
  const lar = Math.max(...lignes.map(([t]) => t.length)) * 1.32 + 4;
  let x0; let y0; let anc;
  if (mode === 'gauche') {
    const p = PR(x, y + d, h); x0 = p[0] - 3.4; y0 = p[1] + 1 - 1.8 * (n - 1); anc = 'end';
    pts.push([x0 + 1, y0 - 3.4], [x0 - lar, y0 + 3.4 * n]);
  } else if (mode === 'droite') {
    const p = PR(x + w, y, h); x0 = p[0] + 3.4; y0 = p[1] + 1 - 1.8 * (n - 1); anc = 'start';
    pts.push([x0 - 1, y0 - 3.4], [x0 + lar, y0 + 3.4 * n]);
  } else if (mode === 'bas') {
    x0 = PR(x + w / 2, y + d / 2, h)[0]; y0 = PR(x + w, y + d, 0)[1] + 5.4; anc = 'middle';
    pts.push([x0 - 19, y0 + 3.8 * n], [x0 + 19, y0 + 3.8 * n]);
  } else {
    x0 = PR(x + w / 2, y + d / 2, h)[0]; y0 = PR(x, y, h)[1] - 2.4 - 3.6 * (n - 1); anc = 'middle';
    pts.push([x0 - 19, y0 - 3.6], [x0 + 19, y0 - 3.6]);
  }
  lignes.forEach(([t, cls], i) => out.push(word([x0, y0 + i * 3.6], t, 0, 0, anc, cls, g)));
  pts.push(PR(x, y, 0), PR(x + w, y + d, 0));
}

/* La boîte : le viewBox est en millimètres, 1 unité = 1 mm. Les épaisseurs
   de trait restent donc constantes quelle que soit la taille d'affichage. */
function boite(pieces, pts, pad = 3) {
  const xs = pts.map((p) => p[0]); const ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs) - pad; const x1 = Math.max(...xs) + pad;
  const y0 = Math.min(...ys) - pad; const y1 = Math.max(...ys) + pad;
  return {
    viewBox: `${n2(x0)} ${n2(y0)} ${n2(x1 - x0)} ${n2(y1 - y0)}`,
    w: n2(x1 - x0),
    h: n2(y1 - y0),
    pieces,
    groupes: pieces.reduce((m, p) => Math.max(m, p.g || 0), 0) + 1,
  };
}

const eur = (v) => `${v.toLocaleString('fr-FR')} €`;

/* ---------- les scènes ---------- */

/* AUDIT — la facture logicielle mise en volume. Hauteur = coût annuel,
   partie pleine = ce qui sert, fil de fer au-dessus = payé jamais ouvert. */
export const OUTILS = [
  ['CRM', 2400, 10, 4],
  ['Stockage', 600, 8, 1],
  ['Signature', 432, 5, 0],
];

export function scFacture() {
  const W = 48; const D = 24; const CT = 11; const HMAX = 27;
  const ech = HMAX / Math.max(...OUTILS.map((o) => o[1]));
  const out = plan(W, D, 12, 0, 'ax-gr', 'ax-bd', 0);
  const pts = [PR(0, 0), PR(W, 0), PR(W, D), PR(0, D)];
  const faits = [];
  OUTILS.forEach(([nom, cout, paye, ouv], i) => {
    const x = 3 + i * 17; const y = 7; const h = cout * ech; const util = (h * ouv) / paye;
    out.push(...volume(x, y, CT, CT, 0, util, true, i + 1));
    if (h - util > 0.4) out.push(...volume(x, y, CT, CT, util, h, false, i + 1));
    faits.push([x, y, h, [[nom, 'ax-tl'], [eur(cout), 'ax-tv']], i + 1]);
  });
  faits.forEach(([x, y, h, lg, g]) => cartouche(out, pts, x, y, CT, CT, h, lg, 'droite', g));
  return boite(out, pts);
}

/* SOLUTIONS — deux plans superposés : en bas ce que fait le client, en
   haut ce qui se déclenche chez vous sans que personne y touche. */
export const SALLE = [[6, 22, 'Il réserve'], [20, 14, 'Il confirme'], [32, 6, 'Il vient']];
export const OUTILS_H = [[20, 3, 'Planning à jour'], [14, 17, 'Rappel la veille'], [4, 11, 'Avis demandé']];

export function scChantier(t = { bas: 'votre salle', haut: 'vos outils' }) {
  const W = 44; const D = 28; const ZH = 26;
  const out = plan(W, D, 11, 0, 'ax-gr', 'ax-bd', 0);
  const pts = [PR(0, 0), PR(W, 0), PR(W, D), PR(0, D),
    PR(0, 0, ZH), PR(W, 0, ZH), PR(W, D, ZH), PR(0, D, ZH)];
  const bas = SALLE.map(([x, y]) => [x, y]);
  for (let i = 0; i < bas.length - 1; i += 1) out.push(seg(PR(...bas[i]), PR(...bas[i + 1]), 'ax-ln', 1));
  bas.forEach(([x, y], i) => {
    out.push(dot(PR(x, y), 1.8, 'ax-nd', 1));
    out.push(word(PR(x, y), SALLE[i][2], -4, 1, 'end', 'ax-tl', 1));
    pts.push([PR(x, y)[0] - SALLE[i][2].length * 1.35 - 5, PR(x, y)[1]]);
  });
  const [cx, cy] = bas[bas.length - 1];
  out.push(seg(PR(cx, cy), PR(cx, cy, ZH), 'ax-ri', 2));
  out.push(poly([PR(0, 0, ZH), PR(W, 0, ZH), PR(W, D, ZH), PR(0, D, ZH)], 'ax-etage', 2));
  out.push(...plan(W, D, 22, ZH, 'ax-gr2', 'ax-bd2', 2));
  out.push(dot(PR(cx, cy, ZH), 2.2, 'ax-nd', 2));
  OUTILS_H.forEach(([x, y, lab]) => {
    out.push(seg(PR(cx, cy, ZH), PR(x, y, ZH), 'ax-ln', 3));
    out.push(dot(PR(x, y, ZH), 1.8, 'ax-nd', 3));
    out.push(word(PR(x, y, ZH), lab, 4, 1, 'start', 'ax-tl', 3));
    pts.push([PR(x, y, ZH)[0] + lab.length * 1.35 + 5, PR(x, y, ZH)[1]]);
  });
  out.push(word(PR(W, 0, ZH), t.haut, 4.6, 1, 'start', 'ax-tz', 3));
  out.push(word(PR(W, 0), t.bas, 4.6, 1, 'start', 'ax-tz', 1));
  pts.push([PR(W, 0, ZH)[0] + 24, PR(W, 0, ZH)[1]], [PR(W, 0)[0] + 24, PR(W, 0)[1]]);
  return boite(out, pts);
}

/* STRATÉGIE — trois ans de prévisionnel traversés par le plan du seuil.
   Peinture en trois passes (sous le plan, le plan, au-dessus) : sans ça,
   le plan recouvrirait les tours au lieu de les traverser. */
export const ANNEES = [['An 1', 82000], ['An 2', 118000], ['An 3', 145000]];
export const SEUIL = 104000;

export function scPrevisionnel(labelSeuil = 'seuil') {
  const W = 50; const D = 20; const CT = 11; const HMAX = 28;
  const ech = HMAX / Math.max(...ANNEES.map((a) => a[1]));
  const zs = SEUIL * ech;
  const out = plan(W, D, 12, 0, 'ax-gr', 'ax-bd', 0);
  const pts = [PR(0, 0), PR(W, 0), PR(W, D), PR(0, D)];
  const tours = [];
  ANNEES.forEach(([nom, val], i) => {
    const x = 3 + i * 17; const y = 5; const h = val * ech;
    out.push(...volume(x, y, CT, CT, 0, Math.min(h, zs), true, i + 1));
    tours.push([x, y, h, nom, val, i + 1]);
  });
  const S = [PR(-2, -2, zs), PR(W + 2, -2, zs), PR(W + 2, D + 2, zs), PR(-2, D + 2, zs)];
  out.push(poly(S, 'ax-seuil', 4));
  pts.push(...S);
  tours.forEach(([x, y, h, , , g]) => {
    if (h > zs) out.push(...volume(x, y, CT, CT, zs, h, true, g + 4));
  });
  tours.forEach(([x, y, h, nom, val, g]) => {
    cartouche(out, pts, x, y, CT, CT, h, [[nom, 'ax-tl'], [eur(val), 'ax-tv']], 'bas', g + 4);
  });
  out.push(word(S[1], `${labelSeuil} · ${eur(SEUIL)}`, 3.4, 1, 'start', 'ax-tz', 4));
  pts.push([S[1][0] + 22, S[1][1] + 3]);
  return boite(out, pts);
}

/* MARQUE — la carte de la clientèle. Position = ce qu'on dépense et à
   quelle fréquence on revient ; hauteur = le poids dans le chiffre
   d'affaires ; le volume plein et bagué est le segment visé. */
export const SEGMENTS = [
  [3, 3, 10, 'Étudiants', false],
  [22, 3, 13, 'Bureaux', false],
  [3, 20, 12, 'Familles', false],
  [22, 20, 18, 'Habitués', true],
];

export function scClientele() {
  const W = 38; const D = 34; const CT = 10; const HMAX = 19;
  const out = plan(W, D, 11, 0, 'ax-gr', 'ax-bd', 0);
  const pts = [PR(0, 0), PR(W, 0), PR(W, D), PR(0, D)];
  const ech = HMAX / Math.max(...SEGMENTS.map((s) => s[2]));
  const faits = [];
  [...SEGMENTS].sort((a, b) => a[0] + a[1] - (b[0] + b[1])).forEach(([x, y, poids, nom, cible], i) => {
    const h = poids * ech;
    out.push(...volume(x, y, CT, CT, 0, h, cible, i + 1));
    if (cible) out.push(ell(PR(x + CT / 2, y + CT / 2, h), CT * C30 + 2.6, CT * S30 + 1.5, 'ax-bd2', i + 1));
    faits.push([x, y, h, nom, cible, i + 1]);
  });
  const ou = { '3,3': 'haut', '22,3': 'droite', '3,20': 'gauche', '22,20': 'bas' };
  faits.forEach(([x, y, h, nom, cible, g]) => {
    cartouche(out, pts, x, y, CT, CT, h, [[nom, cible ? 'ax-tl' : 'ax-tq']], ou[`${x},${y}`] || 'droite', g);
  });
  return boite(out, pts);
}

/* LA FRISE — les cinq âges d'un projet. Les dalles avancent à la fois en x
   et en −y : en axonométrie, cette diagonale de l'espace donne une ligne
   parfaitement horizontale à l'écran. C'est ce qui permet une frise droite
   en vrai relief. */
function dalle(x, y, T, h, g) {
  const T4 = [PR(x, y, h), PR(x + T, y, h), PR(x + T, y + T, h), PR(x, y + T, h)];
  const B = [PR(x, y, 0), PR(x + T, y, 0), PR(x + T, y + T, 0), PR(x, y + T, 0)];
  const o = [
    poly([B[3], B[2], T4[2], T4[3]], 'ax-l', g),
    poly([B[1], B[2], T4[2], T4[1]], 'ax-r', g),
    poly(T4, 'ax-etage', g),
  ];
  const pas = T / 4;
  [1, 2, 3].forEach((k) => {
    o.push(seg(PR(x + k * pas, y, h), PR(x + k * pas, y + T, h), 'ax-gr2', g));
    o.push(seg(PR(x, y + k * pas, h), PR(x + T, y + k * pas, h), 'ax-gr2', g));
  });
  o.push(poly(T4, 'ax-bd2', g));
  return { o, pts: [B[0], B[2], T4[0], T4[2], PR(x, y + T, h), PR(x + T, y, h)] };
}

/* Le végétal d'une étape, construit comme le reste de la marque : des
   nœuds et des liens. On ne dessine pas une silhouette pleine, on fait
   pousser un réseau — c'est sa densité qui raconte la croissance. */
function plante(kind, cx, cy, e, g) {
  const L = []; const N = []; const P = [];
  const q = (dx, dy) => [cx + dx * e, cy + dy * e];
  const nd = (dx, dy, r = 1.25, cls = 'ax-nd') => { const a = q(dx, dy); N.push(dot(a, r * e, cls, g)); P.push(a); return a; };
  const ln = (a, b, cls = 'ax-ln') => L.push(seg(a, b, cls, g));

  if (kind === 0) {
    const gr = q(0, -3.8);
    ln(q(0, -10.4), gr, 'ax-ri');
    [[-3.2, 2], [3.4, 1.6], [0.4, 3.8]].forEach(([dx, dy]) => { ln(gr, q(dx, dy), 'ax-ln2'); nd(dx, dy, 1); });
    nd(0, -10.4, 1.25, 'ax-ndp'); nd(0, -3.8, 2.4);
  } else if (kind === 1) {
    ln(q(0, 0), q(0, -14.6));
    [[[0, -9.6], [-5.6, -13]], [[0, -6.2], [5.2, -10]]].forEach(([a, b]) => ln(q(...a), q(...b)));
    nd(0, 0, 1.05); nd(-5.6, -13, 1.3); nd(5.2, -10, 1.3); nd(0, -14.6, 1.45);
  } else if (kind === 2) {
    const cy2 = -19.8; const R = 4.4;
    ln(q(0, 0), q(0, -15.4)); ln(q(0, -15.4), q(0, cy2));
    [[[0, -10.6], [-6.6, -14.2]], [[0, -7], [6.2, -10.6]]].forEach(([a, b]) => ln(q(...a), q(...b)));
    const ring = [0, 1, 2, 3, 4, 5].map((j) => {
      const a = ((90 + 60 * j) * Math.PI) / 180;
      return [Math.cos(a) * R, cy2 + Math.sin(a) * R * 0.9];
    });
    ring.forEach((p, j) => { ln(q(...p), q(...ring[(j + 1) % 6])); ln(q(0, cy2), q(...p), 'ax-ln2'); });
    nd(0, 0, 1.05); nd(-6.6, -14.2, 1.25); nd(6.2, -10.6, 1.25);
    ring.forEach(([a, b]) => nd(a, b, 1.2));
    nd(0, cy2, 1.6);
  } else if (kind === 3) {
    const br = [[-7.8, -21.6], [0, -23.4], [7.8, -21.2]];
    const tp = [[-11.2, -27.4], [-4.6, -28.6], [4.2, -29], [10.8, -26.4]];
    ln(q(0, 0), q(0, -15.4));
    br.forEach((b) => ln(q(0, -15.4), q(...b)));
    [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]].forEach(([a, b]) => ln(q(...br[a]), q(...tp[b]), a === 1 ? 'ax-ln2' : 'ax-ln'));
    [0, 1, 2].forEach((j) => ln(q(...tp[j]), q(...tp[j + 1]), 'ax-ln2'));
    nd(0, 0, 1.1); nd(0, -15.4, 1.4);
    br.forEach(([a, b]) => nd(a, b, 1.15));
    tp.forEach(([a, b]) => nd(a, b, 1.3));
  } else {
    const arbre = (ox, h, sp) => {
      ln(q(ox, 0), q(ox, -h));
      const t = [[ox - sp, -h - 5.2], [ox, -h - 6.8], [ox + sp, -h - 4.8]];
      t.forEach(([a, b]) => ln(q(ox, -h), q(a, b)));
      ln(q(...t[0]), q(...t[1]), 'ax-ln2'); ln(q(...t[1]), q(...t[2]), 'ax-ln2');
      return t;
    };
    const a = arbre(-10.6, 13.4, 4.2); const b = arbre(0.6, 21.6, 5); const c = arbre(11, 15.2, 4.4);
    ln(q(...a[2]), q(...b[0]), 'ax-ln2'); ln(q(...b[2]), q(...c[0]), 'ax-ln2');
    [-10.6, 0.6, 11].forEach((ox) => nd(ox, 0, 1));
    [a, b, c].forEach((t) => t.forEach(([x, y]) => nd(x, y, 1.2)));
  }
  return { pieces: [...L, ...N], pts: P };
}

/** La frise des cinq âges. `etapes` = [[nom, horizon], …] (5 entrées). */
export function scFrise(etapes) {
  const T = 12; const K = 17; const HS = 2.2;
  const out = []; const pts = [];
  for (let i = 0; i < 4; i += 1) {
    const x = i * K; const y = -i * K;
    out.push(seg(PR(x + T, y + T / 2, 0), PR(x + K, y - K + T / 2, 0), 'ax-ri', 0));
  }
  etapes.forEach(([nom, horizon], i) => {
    const x = i * K; const y = -i * K; const g = i + 1;
    const d = dalle(x, y, T, HS, g);
    out.push(...d.o); pts.push(...d.pts);
    const c = PR(x + T / 2, y + T / 2, HS);
    const pl = plante(i, c[0], c[1], 1, g);
    out.push(...pl.pieces); pts.push(...pl.pts);
    const haut = Math.min(...pl.pts.map((p) => p[1])) - 4.6;
    out.push(word([c[0], haut], nom, 0, 0, 'middle', 'ax-tv', g));
    const bas = PR(x + T, y + T, 0)[1] + 5;
    out.push(word([c[0], bas], horizon, 0, 0, 'middle', 'ax-tz', g));
    pts.push([c[0] - 13, haut - 3.4], [c[0] + 13, haut - 3.4], [c[0] - 13, bas + 1.6], [c[0] + 13, bas + 1.6]);
  });
  return boite(out, pts, 2);
}

/** Une plante seule, sur sa dalle : la vignette d'une étape. */
export function scPlante(kind, e = 0.78) {
  const T = 7 * e; const HS = 1.6 * e;
  const d = dalle(0, 0, T, HS, 0);
  const c = PR(T / 2, T / 2, HS);
  const pl = plante(kind, c[0], c[1], e, 1);
  const pts = [...d.pts, ...pl.pts, [-13.2, 0], [13.2, 0], [0, -23.4], [0, 6.2]];
  return boite([...d.o, ...pl.pieces], pts, 1.2);
}

export const SCENES = {
  facture: scFacture,
  chantier: scChantier,
  previsionnel: scPrevisionnel,
  clientele: scClientele,
};
