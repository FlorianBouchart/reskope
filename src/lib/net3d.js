import { R_NODES, R_LINKS } from '../components/Logo';

/* ============================================================
   Moteur 3D réseau maison — de VRAIS objets en volume (nœuds
   [x,y,z] + liens), tournés dans l'espace et projetés en
   perspective image par image. Pas des SVG plats inclinés :
   les nœuds parallaxent entre eux pendant la rotation.
   ============================================================ */

/* Rotation Y puis X, puis projection perspective (focale f). */
export function project(nodes, ax, ay, f = 460) {
  const cx = Math.cos(ax), sx = Math.sin(ax);
  const cy = Math.cos(ay), sy = Math.sin(ay);
  return nodes.map(([x, y, z]) => {
    const x1 = x * cy - z * sy;
    const z1 = x * sy + z * cy;
    const y1 = y * cx - z1 * sx;
    const z2 = y * sx + z1 * cx;
    const s = f / (f + z2);
    return { x: x1 * s, y: y1 * s, z: z2, s };
  });
}

export const lerp3 = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/* — Le « R » de la marque EXTRUDÉ en volume : deux faces (avant/arrière)
   reliées par des entretoises → une vraie lettre 3D en fil de réseau. — */
export function buildR3D(depth = 15, scale = 0.62) {
  const base = R_NODES.map(([x, y]) => [(x - 66) * scale, (y - 76) * scale]);
  const n = base.length;
  const nodes = [
    ...base.map(([x, y]) => [x, y, depth]),
    ...base.map(([x, y]) => [x, y, -depth]),
  ];
  const links = [
    ...R_LINKS.map(([a, b]) => [a, b]),
    ...R_LINKS.map(([a, b]) => [a + n, b + n]),
    ...base.map((_, i) => [i, i + n]),
  ];
  return { nodes, links, hub: 3, hub2: 3 + n };
}

/* — Les 4 glyphes de marque en VRAIS solides réseau — */

/* Loupe : anneau 3D + moyeu + manche qui plonge en profondeur */
function shapeAudit() {
  const ring = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return [Math.cos(a) * 26 - 8, Math.sin(a) * 26 - 8, 0];
  });
  const nodes = [...ring, [-8, -8, 0], [24, 30, 12], [40, 46, 24]];
  const links = [
    ...ring.map((_, i) => [i, (i + 1) % 6]),
    ...ring.map((_, i) => [i, 6]),
    [1, 7], [7, 8],
  ];
  return { nodes, links, hub: 6 };
}

/* Lien : deux amas tétraédriques reliés par un pont */
function shapeLink() {
  const nodes = [
    [-26, -16, 0], [-40, -30, 10], [-12, -34, -8], [-38, 2, -10],   // amas A
    [26, 18, 6], [40, 32, -6], [12, 36, 12], [38, 0, 14],           // amas B
  ];
  const links = [
    [0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1],
    [4, 5], [4, 6], [4, 7], [5, 6], [6, 7], [7, 5],
    [0, 4],
  ];
  return { nodes, links, hub: 0, hub2: 4 };
}

/* Burst : étoile octaédrique (6 branches sur les 3 axes) + ceinture */
function shapeBurst() {
  const nodes = [
    [0, 0, 0],
    [42, 0, 0], [-42, 0, 0],
    [0, 42, 0], [0, -42, 0],
    [0, 0, 42], [0, 0, -42],
  ];
  const links = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 3], [3, 2], [2, 4], [4, 1],
    [1, 5], [5, 2], [2, 6], [6, 1],
  ];
  return { nodes, links, hub: 0 };
}

/* Boucle : anneau de 8 nœuds + triangle interne surélevé */
function shapeLoop() {
  const ring = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return [Math.cos(a) * 40, Math.sin(a) * 40, 0];
  });
  const tri = Array.from({ length: 3 }, (_, j) => {
    const a = (j / 3) * Math.PI * 2 + Math.PI / 2;
    return [Math.cos(a) * 15, Math.sin(a) * 15, 18];
  });
  const nodes = [...ring, ...tri];
  const links = [
    ...ring.map((_, i) => [i, (i + 1) % 8]),
    [8, 9], [9, 10], [10, 8],
    [8, 0], [9, 3], [10, 6],
  ];
  return { nodes, links };
}

export const GLYPH_SHAPES = [shapeAudit(), shapeLink(), shapeBurst(), shapeLoop()];

/* — Les trois profils de la page d'accueil, en vrais solides —

   L'accueil ne demande pas quelle offre on veut (personne ne le sait), il
   demande QUI ON EST. Et la réponse se voit avant de se lire : la densité
   du solide dit la taille de la structure. Une graine tient en quatre
   nœuds, une PME en dix-huit. C'est le même langage que la frise du
   livret, ramené à la question qui range tout le site. */

/* Le porteur de projet : un point, trois racines, et l'idée au-dessus. */
function shapeGraine() {
  const nodes = [
    [0, -4, 0],                                  // la graine
    [-20, 22, -10], [22, 18, 8], [2, 30, 16],    // les racines
    [0, -44, 0],                                 // l'idée qui tombe
  ];
  const links = [[0, 1], [0, 2], [0, 3], [0, 4]];
  return { nodes, links, hub: 0 };
}

/* La TPE : un amas compact, tout le monde se parle, un seul décideur. */
function shapeAmas() {
  const nodes = [
    [0, 0, 0],
    [-30, -18, 12], [28, -22, -8], [34, 16, 14], [-8, 32, -14], [-34, 12, -6],
  ];
  const links = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 1],
  ];
  return { nodes, links, hub: 0 };
}

/* La PME : une trame 3×3×2. Dense, régulière, et c'est exactement le
   problème — dix-huit points reliés, plus personne ne sait qui fait quoi. */
function shapeTrame() {
  const nodes = [];
  const pas = 30;
  for (let z = 0; z < 2; z += 1) {
    for (let y = 0; y < 3; y += 1) {
      for (let x = 0; x < 3; x += 1) {
        nodes.push([(x - 1) * pas, (y - 1) * pas, (z - 0.5) * pas * 1.2]);
      }
    }
  }
  const idx = (x, y, z) => z * 9 + y * 3 + x;
  const links = [];
  for (let z = 0; z < 2; z += 1) {
    for (let y = 0; y < 3; y += 1) {
      for (let x = 0; x < 3; x += 1) {
        if (x < 2) links.push([idx(x, y, z), idx(x + 1, y, z)]);
        if (y < 2) links.push([idx(x, y, z), idx(x, y + 1, z)]);
        if (z < 1 && (x + y) % 2 === 0) links.push([idx(x, y, z), idx(x, y, z + 1)]);
      }
    }
  }
  return { nodes, links, hub: idx(1, 1, 0), hub2: idx(1, 1, 1) };
}

export const PROFIL_SHAPES = {
  createur: shapeGraine(),
  tpe: shapeAmas(),
  pme: shapeTrame(),
};
