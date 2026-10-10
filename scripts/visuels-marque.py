"""Les visuels de la marque qui vivent hors du site : la bannière de la page
LinkedIn et les fonds d'écran.

Même principe que le site (src/lib/net3d.js) : de vrais réseaux en volume,
tournés dans l'espace et projetés en perspective. On y ajoute une profondeur
de champ : le sujet est net, ce qui passe devant ou derrière se perd dans le
flou, comme dans un objectif.

- Le R est celui du logo (logo/geometrie.json) : traits 3, nœuds 5,5,
  jonction 7 pour 92 de haut. On change sa taille, jamais ces rapports.
- Les trois réseaux sont ceux de l'accueil (components/ReseauTaille.jsx) :
  un nœud et ses futurs clients en pointillé pour Create, 7 nœuds pour
  Define, 26 pour Elevate. Le réseau grandit avec l'entreprise : il porte
  une donnée, il ne décore pas.
- Les dégradés reçoivent un grain très fin : sans lui, un dégradé sombre se
  découpe en bandes sur un écran.

Lancer :
  ~/.claude/skills/seo/.venv/bin/python scripts/visuels-marque.py banniere
  ~/.claude/skills/seo/.venv/bin/python scripts/visuels-marque.py fonds
  (ajouter --apercu <dossier> pour une version réduite, plus rapide)
Les fichiers vont dans ~/Developer/Reskope-Plaquettes (LinkedIn, Fonds d'écran).
"""
import asyncio, base64, json, os, sys
from playwright.async_api import async_playwright

DEPOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXE = os.path.expanduser('~/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell')
PLAQUETTES = os.path.expanduser('~/Developer/Reskope-Plaquettes')
GEO = json.load(open(os.path.join(DEPOT, 'logo', 'geometrie.json'), encoding='utf-8'))
b64 = lambda p: base64.b64encode(open(os.path.join(DEPOT, p), 'rb').read()).decode()

INDIGO, CREME, ENCRE = '#1c0cb3', '#f0eee8', '#0e0b1f'
MARQUES = {
    'create': {'nom': 'Create', 'pour': 'Créer ou reprendre', 'n': 1, 'vif': '#f2a93b', 'clair': '#f5c36b', 'action': '#9c4f06'},
    'define': {'nom': 'Define', 'pour': '1 à 10 personnes', 'n': 7, 'vif': '#2fae8e', 'clair': '#7fe0c2', 'action': '#0b6b52'},
    'elevate': {'nom': 'Elevate', 'pour': '10 à 250 personnes', 'n': 26, 'vif': '#3b9de8', 'clair': '#8cc8f5', 'action': '#0b3d91'},
}


# ── Le moteur, commun aux deux visuels ──────────────────────────────────
MOTEUR = r"""
const OR = Math.PI * (3 - Math.sqrt(5));
const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const melange = (a, b, t) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
const rgba = (h, a) => { const [r, g, b] = hex(h); return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a)).toFixed(4)})`; };
const lerp3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
function hasard(graine) { let s = Math.imul(graine, 2654435761) >>> 0; return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }

/* Rotation Y puis X, comme net3d.js, puis le déplacement. */
function tourner([x, y, z], ax, ay) {
  const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
  const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}
const placer = (p, o) => { const q = tourner(p, o.ax || 0, o.ay || 0); return [q[0] + o.x, q[1] + o.y, q[2] + o.z]; };

/* Le réseau d'une entreprise de n personnes, comme ReseauTaille (spirale
   d'or, chaque nœud relié à ses deux plus proches aînés), mais en volume. */
function reseau(n, rayon, graine) {
  const h = hasard(graine);
  const k = rayon / Math.sqrt(n);
  const noeuds = Array.from({ length: n }, (_, i) => {
    if (i === 0) return [0, 0, 0];
    const r = k * Math.sqrt(i + 0.5), a = i * OR;
    const epaisseur = Math.sqrt(Math.max(0, rayon * rayon - r * r));
    return [Math.cos(a) * r, Math.sin(a) * r, (h() * 2 - 1) * epaisseur * 0.85];
  });
  const liens = [];
  for (let i = 1; i < n; i++) {
    noeuds.slice(0, i)
      .map((m, j) => ({ j, d: Math.hypot(m[0] - noeuds[i][0], m[1] - noeuds[i][1], m[2] - noeuds[i][2]) }))
      .sort((u, v) => u.d - v.d).slice(0, 2)
      .forEach(({ j }) => liens.push([j, i]));
  }
  return { noeuds, liens };
}

function scene() {
  const el = [];
  return {
    el,
    lien: (p0, p1, s) => el.push({ t: 'l', p0, p1, ...s }),
    noeud: (p, s) => el.push({ t: 'n', p, ...s }),
  };
}

/* Le réseau d'une marque. Les mesures sont celles de ReseauTaille (un
   rayon de 40 dans une boîte de 100), mises à l'échelle du rayon voulu. */
function poserMarque(sc, m, c) {
  const u = m.rayon / 40, e = m.noeud || 1;
  if (m.n <= 1) {
    const centre = placer([0, 0, 0], m);
    const futurs = [0, 1, 2, 3, 4].map((i) => {
      const a = -Math.PI / 2 + (i / 5) * Math.PI * 2 + 0.3;
      return placer([Math.cos(a) * 30 * u, Math.sin(a) * 30 * u, 0], m);
    });
    futurs.forEach((p) => sc.lien(centre, p, { w: 0.9 * u * c.trait, couleur: c.futur, a: c.aFutur, tirets: [2.4 * u, 2.4 * u] }));
    futurs.forEach((p) => sc.noeud(p, { r: 4.2 * u * e, couleur: c.futur, a: Math.min(1, c.aFutur + 0.25), contour: 1.1 * u * c.trait, tirets: [2 * u, 1.6 * u], fond: c.fondFutur }));
    sc.noeud(centre, { r: 7 * u * e, couleur: c.coeur, a: 1, halo: c.halo, lueur: c.lueur });
    return { coeur: centre, bord: futurs };
  }
  const { noeuds, liens } = reseau(m.n, m.rayon, m.graine || m.n);
  const P = noeuds.map((p) => placer(p, m));
  liens.forEach(([i, j]) => sc.lien(P[i], P[j], { w: 0.9 * u * c.trait, couleur: c.lien, a: c.aLien }));
  P.forEach((p, i) => sc.noeud(p, i === 0
    ? { r: 5.6 * u * e, couleur: c.coeur, a: 1, halo: c.halo, lueur: c.lueur }
    : { r: (3.2 + (i % 3) * 0.5) * u * e, couleur: c.noeud, a: c.aNoeud, halo: c.halo, lueur: c.lueur * 0.6 }));
  return { coeur: P[0], bord: P };
}

/* Le R du logo en volume, comme buildR3D : la face avant aux proportions
   officielles, une face arrière, et les entretoises qui les relient. */
function poserR(sc, R, c) {
  const S = R.hauteur / 92;
  const base = GEO.r_noeuds.map(([x, y]) => [(x - 70) * S, (y - 76) * S]);
  const avant = base.map(([x, y]) => placer([x, y, -R.profondeur / 2], R));
  const arriere = base.map(([x, y]) => placer([x, y, R.profondeur / 2], R));
  const T = GEO.trait * S, N = GEO.noeud * S, J = GEO.jonction * S;
  GEO.r_liens.forEach(([a, b]) => sc.lien(arriere[a], arriere[b], { w: T * 0.4, couleur: c.r, a: c.aArriere }));
  base.forEach((_, i) => sc.lien(avant[i], arriere[i], { w: T * 0.22, couleur: c.r, a: c.aEntretoise, a2: c.aArriere * 0.7 }));
  arriere.forEach((p, i) => sc.noeud(p, { r: (i === 3 ? J : N) * 0.46, couleur: c.r, a: c.aArriere }));
  GEO.r_liens.forEach(([a, b]) => sc.lien(avant[a], avant[b], { w: T, couleur: c.r, a: 1, bloom: 1 }));
  avant.forEach((p, i) => sc.noeud(p, { r: i === 3 ? J : N, couleur: c.r, a: 1, bloom: 1 }));
  return avant;
}

/* Le rendu : chaque élément est projeté, puis rangé par flou (la distance
   au plan net) ; chaque paquet est dessiné à part et flouté d'un coup, du
   plus lointain au plus proche. Les longs liens sont coupés en tronçons :
   leur flou suit la profondeur. */
function rendre(ctx, sc, o) {
  const { L, H, dpr, f } = o;
  const cx = o.cx ?? L / 2, cy = o.cy ?? H / 2, focus = o.focus || 0;
  const proj = ([X, Y, Z]) => { const s = f / (f + Z); return { x: cx + X * s, y: cy + Y * s, s }; };
  const items = [];
  for (const e of sc.el) {
    if (e.t === 'n') { items.push({ ...e, z: e.p[2] }); continue; }
    const n = Math.max(1, Math.ceil(Math.abs(e.p0[2] - e.p1[2]) / (o.pas || 40)));
    for (let i = 0; i < n; i++) {
      const t0 = i / n, t1 = (i + 1) / n;
      const A = lerp3(e.p0, e.p1, t0), B = lerp3(e.p0, e.p1, t1);
      items.push({ ...e, A, B, t0, t1, coupe: n > 1, z: (A[2] + B[2]) / 2 });
    }
  }
  const bande = o.bande || 0;
  const flou = (z) => Math.min(o.flouMax, (z > focus ? o.flouLoin : o.flouPres) * Math.max(0, Math.abs(z - focus) - bande));
  const niveau = (b) => (b < 0.45 ? 0 : 1 + Math.round(2 * Math.log2(b / 0.45)));
  const rayonDe = (lv) => (lv === 0 ? 0 : 0.45 * 2 ** ((lv - 1) / 2));
  const paquets = new Map();
  for (const it of items) {
    const lv = niveau(flou(it.z));
    const cote = it.z >= focus ? 1 : -1;
    const cle = `${cote}:${lv}`;
    if (!paquets.has(cle)) paquets.set(cle, { cote, lv, items: [] });
    paquets.get(cle).items.push(it);
  }
  const rang = (p) => (p.cote === 1 ? -p.lv : p.lv + 0.5);
  const ordre = [...paquets.values()].sort((p, q) => rang(p) - rang(q));

  const dessiner = (c, it) => {
    if (it.t === 'n') {
      const P = proj(it.p), r = it.r * P.s;
      if (it.halo && it.lueur) {
        const R = r * it.halo;
        const g = c.createRadialGradient(P.x, P.y, r * 0.5, P.x, P.y, R);
        g.addColorStop(0, rgba(it.couleur, it.a * it.lueur));
        g.addColorStop(1, rgba(it.couleur, 0));
        c.fillStyle = g; c.beginPath(); c.arc(P.x, P.y, R, 0, Math.PI * 2); c.fill();
      }
      c.beginPath(); c.arc(P.x, P.y, r, 0, Math.PI * 2);
      if (it.contour) {
        if (it.fond) { c.fillStyle = it.fond; c.fill(); }
        c.setLineDash((it.tirets || []).map((v) => v * P.s));
        c.lineWidth = it.contour * P.s; c.strokeStyle = rgba(it.couleur, it.a); c.stroke();
        c.setLineDash([]);
      } else { c.fillStyle = rgba(it.couleur, it.a); c.fill(); }
      return;
    }
    const A = proj(it.A), B = proj(it.B), s = (A.s + B.s) / 2;
    const c0 = it.couleur2 ? melange(it.couleur, it.couleur2, it.t0) : it.couleur;
    const c1 = it.couleur2 ? melange(it.couleur, it.couleur2, it.t1) : it.couleur;
    const a0 = it.a2 != null ? it.a + (it.a2 - it.a) * it.t0 : it.a;
    const a1 = it.a2 != null ? it.a + (it.a2 - it.a) * it.t1 : it.a;
    const style = (k) => {
      if (c0 === c1 && a0 === a1) return rgba(c0, a0 * k);
      const g = c.createLinearGradient(A.x, A.y, B.x, B.y);
      g.addColorStop(0, rgba(c0, a0 * k)); g.addColorStop(1, rgba(c1, a1 * k));
      return g;
    };
    c.lineCap = it.coupe || it.tirets ? 'butt' : 'round';
    c.setLineDash((it.tirets || []).map((v) => v * s));
    const trait = (k, w) => { c.strokeStyle = style(k); c.lineWidth = w; c.beginPath(); c.moveTo(A.x, A.y); c.lineTo(B.x, B.y); c.stroke(); };
    if (it.lueur) trait(it.lueur, it.w * s * 3.4);
    trait(1, it.w * s);
    c.setLineDash([]);
  };

  const hors = document.createElement('canvas');
  hors.width = ctx.canvas.width; hors.height = ctx.canvas.height;
  const h = hors.getContext('2d');
  for (const p of ordre) {
    p.items.sort((u, v) => v.z - u.z);
    if (p.lv === 0) { p.items.forEach((it) => dessiner(ctx, it)); continue; }
    h.setTransform(1, 0, 0, 1, 0, 0); h.clearRect(0, 0, hors.width, hors.height);
    h.setTransform(dpr, 0, 0, dpr, 0, 0);
    p.items.forEach((it) => dessiner(h, it));
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.filter = `blur(${(rayonDe(p.lv) * dpr).toFixed(2)}px)`;
    ctx.drawImage(hors, 0, 0);
    ctx.restore();
  }
  /* Le halo : ce qui brille est redessiné, flouté à deux rayons, puis ajouté. */
  const brillants = items.filter((it) => it.bloom);
  if (brillants.length && o.bloom) {
    h.setTransform(1, 0, 0, 1, 0, 0); h.clearRect(0, 0, hors.width, hors.height);
    h.setTransform(dpr, 0, 0, dpr, 0, 0);
    brillants.forEach((it) => dessiner(h, it));
    for (const [rayon, force] of o.bloom) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = o.bloomMode || 'lighter';
      ctx.globalAlpha = force;
      ctx.filter = `blur(${(rayon * dpr).toFixed(2)}px)`;
      ctx.drawImage(hors, 0, 0);
      ctx.restore();
    }
  }
}

/* Une lumière douce, elliptique. */
function lueur(c, L, H, g) {
  c.save();
  c.translate(g.x, g.y); c.scale(g.rx, g.ry);
  const gr = c.createRadialGradient(0, 0, 0, 0, 0, 1);
  g.stops.forEach(([t, col, a]) => gr.addColorStop(t, rgba(col, a)));
  c.fillStyle = gr;
  c.fillRect(-g.x / g.rx, -g.y / g.ry, L / g.rx, H / g.ry);
  c.restore();
}

/* Le grain : un bruit d'un ou deux niveaux, le même sur les trois canaux,
   qui empêche les dégradés de se découper en bandes. */
function grain(ctx, amp) {
  if (!amp) return;
  const { width: w, height: hh } = ctx.canvas;
  const img = ctx.getImageData(0, 0, w, hh), d = img.data, h = hasard(99);
  for (let i = 0; i < d.length; i += 4) { const n = (h() + h() - 1) * amp; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  ctx.putImageData(img, 0, 0);
}
"""


def polices():
    return ''.join(
        f"@font-face {{ font-family: 'Reskope Sans'; src: url(data:font/woff2;base64,{b64(f'public/fonts/ReskopeSans-{nom}.woff2')}) format('woff2'); font-weight: {poids}; }}\n"
        for nom, poids in (('Regular', 400), ('Medium', 500), ('SemiBold', 600))
    )


def page(largeur, hauteur, dpr, script, calques='', css=''):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
{polices()}
html, body {{ margin: 0; background: #000; }}
.v {{ position: relative; width: {largeur}px; height: {hauteur}px; overflow: hidden; font-family: 'Reskope Sans', sans-serif; }}
.v canvas {{ position: absolute; inset: 0; width: 100%; height: 100%; }}
{css}
</style></head><body><div class="v"><canvas id="c" width="{round(largeur * dpr)}" height="{round(hauteur * dpr)}"></canvas>{calques}</div>
<script>
const GEO = {json.dumps({k: GEO[k] for k in ('r_noeuds', 'r_liens', 'trait', 'noeud', 'jonction')})};
{MOTEUR}
(async () => {{
  try {{
  await document.fonts.ready;
  const L = {largeur}, H = {hauteur}, dpr = {dpr};
  const ctx = document.getElementById('c').getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
{script}
  }} catch (e) {{ window.__erreur = String(e && e.stack || e); }}
  window.__fini = true;
}})();
</script></body></html>"""


# ── La bannière de la page LinkedIn ─────────────────────────────────────
# Format de LinkedIn : 1512 × 256 (aide LinkedIn, octobre 2026), rendu en
# double définition. Sur ordinateur, le logo de la page se pose sur le coin
# bas gauche ; sur téléphone, les bords sont rognés : tout ce qui compte
# tient entre x = 330 et x = 1340.
BL, BH = 1512, 256
COLONNES = (('create', 940), ('define', 1118), ('elevate', 1296))
RAYONS = {'create': 36, 'define': 43, 'elevate': 50}

THEMES_BANNIERE = {
    'indigo': {
        'fichier': 'Reskope - bannière LinkedIn 3024x512.png',
        'fond': [
            ('lineaire', [[0, '#13087f'], [0.42, '#1a0ba8'], [1, '#1c0cb3']]),
            ('lueur', {'x': 1118, 'y': 118, 'rx': 600, 'ry': 250, 'stops': [[0, '#4b37ee', 0.5], [1, '#4b37ee', 0]]}),
        ],
        'texte': CREME, 'sur': 'rgba(240, 238, 232, 0.72)', 'pour': 'rgba(240, 238, 232, 0.7)', 'mere': CREME,
        'nom': 'clair', 'coeur': 'clair', 'noeud': 'vif', 'lien': 'vif', 'futur': 'clair',
        'aLien': 0.62, 'aNoeud': 1, 'aFutur': 0.62, 'fondFutur': '#1c0cb3', 'halo': 2.6, 'lueur': 0.28, 'aPont': 0.8, 'grain': 1.4,
    },
    'creme': {
        'fichier': 'Reskope - bannière LinkedIn crème 3024x512.png',
        'fond': [
            ('lineaire', [[0, '#ebe8e0'], [0.45, '#f0eee8'], [1, '#f3f1ec']]),
            ('lueur', {'x': 1118, 'y': 118, 'rx': 600, 'ry': 250, 'stops': [[0, '#ffffff', 0.7], [1, '#ffffff', 0]]}),
        ],
        'texte': ENCRE, 'sur': INDIGO, 'pour': '#6e6a61', 'mere': INDIGO,
        'nom': 'action', 'coeur': 'action', 'noeud': 'vif', 'lien': 'action', 'futur': 'vif',
        'aLien': 0.5, 'aNoeud': 1, 'aFutur': 0.75, 'fondFutur': '#f3f1ec', 'halo': 0, 'lueur': 0, 'aPont': 0.85, 'grain': 1,
    },
}


def banniere(theme):
    t = THEMES_BANNIERE[theme]
    couleurs = {}
    for cle, m in MARQUES.items():
        lien = m[t['lien']] if t['lien'] in m else None
        couleurs[cle] = {
            'coeur': m[t['coeur']], 'noeud': m[t['noeud']], 'futur': m[t['futur']],
            'lien': lien, 'mix': [m['vif'], INDIGO],
            'aLien': t['aLien'], 'aNoeud': t['aNoeud'], 'aFutur': t['aFutur'], 'fondFutur': t['fondFutur'],
            'halo': t['halo'], 'lueur': t['lueur'], 'trait': 1.45,
        }
    reseaux = [{'cle': cle, 'x': x, **MARQUES[cle], 'rayon': RAYONS[cle]} for cle, x in COLONNES]
    script = f"""
  const T = {json.dumps(t)}, C = {json.dumps(couleurs)}, R = {json.dumps(reseaux)};
  /* Le fond */
  for (const [type, v] of T.fond) {{
    if (type === 'lineaire') {{ const g = ctx.createLinearGradient(0, 0, L, 0); v.forEach(([p, c]) => g.addColorStop(p, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, L, H); }}
    else lueur(ctx, L, H, v);
  }}
  /* Les trois réseaux, de face mais en volume */
  const sc = scene(), y = 100, poses = [];
  const tours = {{ create: [0.95, 0.35], define: [0.42, -0.6], elevate: [0.32, -0.5] }};
  for (const m of R) {{
    const c = {{ ...C[m.cle] }};
    if (!c.lien) c.lien = melange(c.mix[0], c.mix[1], 0.45);
    const [ax, ay] = tours[m.cle];
    poses.push({{ m, ...poserMarque(sc, {{ n: m.n, rayon: m.rayon, x: m.x - L / 2, y: y - H / 2, z: 0, ax, ay, graine: m.n * 3 + 1, noeud: 1.18 }}, c) }});
  }}
  /* Le fil qui passe d'un moment au suivant, d'un réseau à l'autre */
  for (let i = 0; i < R.length - 1; i++) {{
    const a = R[i], b = R[i + 1];
    sc.lien([a.x + a.rayon + 16 - L / 2, y - H / 2, 0], [b.x - b.rayon - 16 - L / 2, y - H / 2, 0],
      {{ w: 1.5, couleur: a.vif, couleur2: b.vif, a: T.aPont }});
  }}
  rendre(ctx, sc, {{ L, H, dpr, f: 900, focus: 0, flouLoin: 0.012, flouPres: 0.012, flouMax: 1.6 }});
"""
    noms = ''.join(
        f"""<div class="b-m" style="left:{x}px"><p class="b-l"><span style="color:{t['mere']}">Reskope</span> <span style="color:{MARQUES[cle][t['nom']]}">{MARQUES[cle]['nom']}</span></p><p class="b-p">{MARQUES[cle]['pour']}</p></div>"""
        for cle, x in COLONNES
    )
    calques = f"""<div class="b-t"><p class="b-s">Création d’entreprise, TPE et PME</p><p class="b-h">Cabinet de conseil<br>à Valenciennes et Lille</p></div>{noms}"""
    css = f"""
.b-t {{ position: absolute; left: 330px; top: 50%; transform: translateY(-52%); color: {t['texte']}; }}
.b-s {{ margin: 0 0 12px; font-size: 16px; font-weight: 500; letter-spacing: 0.01em; color: {t['sur']}; }}
.b-h {{ margin: 0; font-size: 43px; line-height: 1.06; font-weight: 600; letter-spacing: -0.025em; }}
.b-m {{ position: absolute; top: 150px; transform: translateX(-50%); text-align: center; white-space: nowrap; }}
.b-l {{ margin: 0; font-size: 20px; font-weight: 500; letter-spacing: -0.01em; }}
.b-p {{ margin: 5px 0 0; font-size: 15px; color: {t['pour']}; }}
"""
    return page(BL, BH, 2, script, calques, css), t['fichier']


# ── Les fonds d'écran ───────────────────────────────────────────────────
# Une photographie d'un réseau : un champ dense de nœuds en profondeur, net
# au plan du R et de plus en plus flou de part et d'autre (le lointain se
# perd dans la brume, ce qui passe tout près de l'objectif devient bokeh).
# Le R, lumineux, est au point. Autour, les trois marques, chacune avec la
# taille de réseau de l'accueil (1, 7 et 26 nœuds), reliées au R par des arcs
# où circule la donnée. Rien de fort sous la barre des menus ni sous le Dock.
# Les fichiers sont rendus à la taille exacte de l'écran, puis reçoivent un
# grain fin : sans lui, un dégradé sombre se découpe en bandes.
ECRANS = {
    'MacBook Air 13 (2560x1664)': (2560, 1664, 1, None),
    'écran 16-9 (3840x2160)': (1920, 1080, 2, None),
}

THEMES_FOND = {
    'nuit': {
        'base': '#0a0452',
        'lueurs': [
            {'x': 0.44, 'y': 0.46, 'rx': 0.78, 'ry': 0.9, 'stops': [[0, '#2c1bd6', 1], [0.36, '#1c0cb3', 1], [0.74, '#11077d', 1], [1, '#0a0452', 1]]},
            {'x': 0.40, 'y': 0.47, 'rx': 0.2, 'ry': 0.32, 'stops': [[0, '#7566ff', 0.34], [1, '#7566ff', 0]]},
            {'x': 0.08, 'y': 1.03, 'rx': 0.42, 'ry': 0.34, 'stops': [[0, '#f2a93b', 0.11], [1, '#f2a93b', 0]]},
            {'x': 0.95, 'y': 0.0, 'rx': 0.44, 'ry': 0.36, 'stops': [[0, '#3b9de8', 0.14], [1, '#3b9de8', 0]]},
        ],
        'brume': '#6f60ff', 'r': CREME, 'aArriere': 0.5, 'aEntretoise': 0.5,
        'bloom': [[9, 0.55], [34, 0.5]], 'bloomMode': 'lighter',
        'trame': CREME, 'aLoin': 0.62, 'aMilieu': 0.85, 'aLienLoin': 0.2, 'aLienMilieu': 0.32,
        'bokeh': CREME, 'aBokeh': [0.1, 0.26], 'fil': CREME,
        'coeur': 'clair', 'noeud': 'vif', 'lien': 'vif', 'futur': 'clair', 'fondFutur': 'rgba(28,12,179,0.9)',
        'aLien': 0.72, 'halo': 2.8, 'lueur': 0.36,
        'vignette': '#03011f', 'aVignette': 0.6, 'grain': 2.2,
    },
    'jour': {
        'base': '#e6e2d8',
        'lueurs': [
            {'x': 0.44, 'y': 0.46, 'rx': 0.8, 'ry': 0.92, 'stops': [[0, '#fcfbf8', 1], [0.45, '#f0eee8', 1], [1, '#e6e2d8', 1]]},
            {'x': 0.08, 'y': 1.03, 'rx': 0.42, 'ry': 0.34, 'stops': [[0, '#f2a93b', 0.14], [1, '#f2a93b', 0]]},
            {'x': 0.95, 'y': 0.0, 'rx': 0.44, 'ry': 0.36, 'stops': [[0, '#3b9de8', 0.13], [1, '#3b9de8', 0]]},
        ],
        'brume': '#f4f2ed', 'r': INDIGO, 'aArriere': 0.42, 'aEntretoise': 0.42,
        'bloom': [[12, 0.16], [40, 0.12]], 'bloomMode': 'source-over',
        'trame': INDIGO, 'aLoin': 0.5, 'aMilieu': 0.62, 'aLienLoin': 0.14, 'aLienMilieu': 0.22,
        'bokeh': INDIGO, 'aBokeh': [0.05, 0.12], 'fil': INDIGO,
        'coeur': 'action', 'noeud': 'vif', 'lien': 'action', 'futur': 'action', 'fondFutur': 'rgba(244,242,237,0.95)',
        'aLien': 0.55, 'halo': 0, 'lueur': 0,
        'vignette': '#7d745f', 'aVignette': 0.26, 'grain': 1.6,
    },
}

SCENE_FOND = r"""
  const T = __T__, C = __C__, U = L / 2560, K = U;
  const f = 1.1 * L, h = hasard(7);
  const RX = 0.4, RY = 0.47;
  const ecran = (fx, fy, z) => [(fx - 0.5) * L * (f + z) / f, (fy - 0.5) * H * (f + z) / f, z];
  const brume = (Z) => 1 / (1 + Math.max(0, Z - 800 * U) / (3200 * U));
  const teinte = (c, Z) => melange(T.brume, c, brume(Z));

  /* Le fond : une nuit indigo (ou un jour crème), éclairée autour du R */
  ctx.fillStyle = T.base; ctx.fillRect(0, 0, L, H);
  for (const g of T.lueurs) lueur(ctx, L, H, { ...g, x: g.x * L, y: g.y * H, rx: g.rx * L, ry: g.ry * H });

  const sc = scene();

  /* Le champ : trois profondeurs, chacune avec ses nœuds reliés à leurs voisins */
  const BANDES = [
    { n: 420, z0: 900, z1: 3800, mini: 30, lien: 150, r: [2.6, 6], a: T.aLoin, al: T.aLienLoin, w: 1.5 },
    { n: 92, z0: 180, z1: 900, mini: 80, lien: 270, r: [3.6, 8], a: T.aMilieu, al: T.aLienMilieu, w: 1.7 },
    { n: 30, z0: -260, z1: 180, mini: 140, lien: 340, r: [5, 10], a: 0.95, al: 0.4, w: 2 },
  ];
  const dansLeR = (fx, fy) => ((fx - RX) / 0.18) ** 2 + ((fy - RY) / 0.24) ** 2 < 1;
  for (const b of BANDES) {
    const pts = [];
    for (let essai = 0; essai < b.n * 40 && pts.length < b.n; essai++) {
      const fx = h() * 1.2 - 0.1, fy = h() * 1.2 - 0.1;
      if (dansLeR(fx, fy)) continue;
      if (pts.some((q) => Math.hypot((q.fx - fx) * L, (q.fy - fy) * H) < b.mini * U)) continue;
      pts.push({ fx, fy, z: (b.z0 + h() * (b.z1 - b.z0)) * U });
    }
    pts.forEach((p) => { p.P = ecran(p.fx, p.fy, p.z); });
    pts.forEach((p, i) => {
      pts.map((q, j) => ({ j, d: Math.hypot((q.fx - p.fx) * L, (q.fy - p.fy) * H) }))
        .filter((x) => x.j > i && x.d < b.lien * U).sort((u, v) => u.d - v.d).slice(0, 2)
        .forEach(({ j }) => sc.lien(p.P, pts[j].P, { w: b.w * K, couleur: teinte(T.trame, p.z), a: b.al * brume(p.z) }));
      sc.noeud(p.P, { r: (b.r[0] + h() * (b.r[1] - b.r[0])) * K, couleur: teinte(T.trame, p.z), a: b.a * brume(p.z) * (0.55 + h() * 0.45) });
    });
  }

  /* Quelques fils tendus de tout près de l'objectif jusqu'au plan net : leur
     flou se résout en route, c'est ce qui donne la profondeur de champ */
  for (let i = 0, n = 0; n < 11 && i < 300; i++) {
    const a = [h() * 1.1 - 0.05, h() * 1.1 - 0.05], b = [a[0] + (h() - 0.5) * 0.3, a[1] + (h() - 0.5) * 0.3];
    if (dansLeR(a[0], a[1]) || dansLeR(b[0], b[1]) || (Math.abs(a[0] - 0.45) < 0.22 && Math.abs(a[1] - 0.5) < 0.22)) continue;
    n++;
    const A = ecran(a[0], a[1], (-1100 + h() * 400) * U), B = ecran(b[0], b[1], (250 + h() * 500) * U);
    sc.lien(A, B, { w: 2.2 * K, couleur: T.trame, a: T.aLienMilieu * 0.9 });
    sc.noeud(B, { r: 4.4 * K, couleur: T.trame, a: T.aMilieu * 0.8 });
  }

  /* Les trois marques, chacune avec la taille de réseau de l'accueil */
  const MQ = {
    create: { fx: 0.17, fy: 0.64, z: -240, rayon: 0.15 * H, ax: 1.0, ay: 0.35 },
    define: { fx: 0.67, fy: 0.72, z: 260, rayon: 0.18 * H, ax: 0.42, ay: -0.7 },
    elevate: { fx: 0.76, fy: 0.3, z: 820, rayon: 0.27 * H, ax: 0.3, ay: -0.5 },
  };
  const R0 = ecran(RX, RY, 0);
  const R3 = ecran(0.4, 0.47, 0);
  const poses = {};
  for (const cle of Object.keys(MQ)) {
    const m = MQ[cle], c = { ...C[cle], trait: 1.25 * K, aLien: T.aLien, aNoeud: 1, aFutur: 0.66, fondFutur: T.fondFutur, halo: T.halo, lueur: T.lueur };
    const [x, y] = ecran(m.fx, m.fy, m.z * U);
    poses[cle] = poserMarque(sc, { n: c.n, rayon: m.rayon, x, y, z: m.z * U, ax: m.ax, ay: m.ay, graine: c.n * 3 + 1, noeud: 0.82 }, c);
  }

  /* Le R, net, au point : la face avant aux proportions du logo */
  const HR = 0.31 * H;
  const avant = poserR(sc, { hauteur: HR, profondeur: HR * 0.2, x: R0[0], y: R0[1], z: 0, ax: 0.09, ay: -0.42 },
    { r: T.r, aArriere: T.aArriere, aEntretoise: T.aEntretoise });

  /* Des arcs partent du R vers chaque marque, la donnée y circule */
  const arc = (A, B, haut, c1, c2) => {
    const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 - haut, (A[2] + B[2]) / 2 - haut * 0.5];
    const pt = (t) => [0, 1, 2].map((k) => (1 - t) ** 2 * A[k] + 2 * (1 - t) * t * M[k] + t * t * B[k]);
    const N = 34;
    for (let i = 0; i < N; i++) {
      const t0 = i / N, t1 = (i + 1) / N;
      sc.lien(pt(t0), pt(t1), { w: 2.4 * K, couleur: melange(c1, c2, t0), couleur2: melange(c1, c2, t1), a: 0.5 + 0.35 * Math.sin(Math.PI * t0), a2: 0.5 + 0.35 * Math.sin(Math.PI * t1) });
    }
    [0.22, 0.5, 0.78].forEach((t) => sc.noeud(pt(t), { r: 3.4 * K, couleur: melange(c1, c2, t), a: 1, halo: 3, lueur: 0.5 }));
  };
  const DEP = { create: 4, define: 2, elevate: 1 };
  for (const cle of Object.keys(MQ)) {
    const clair = T.coeur === 'clair' ? C[cle].clair : C[cle].action;
    arc(avant[DEP[cle]], poses[cle].coeur, 0.1 * H, T.fil, T.coeur === 'clair' ? C[cle].clair : C[cle].action);
  }

  /* Des particules très fines, comme le sillage du site */
  for (let i = 0; i < 110; i++) {
    const z = (-300 + h() * 2600) * U, [x, y] = ecran(h() * 1.1 - 0.05, h() * 1.1 - 0.05, z);
    sc.noeud([x, y, z], { r: (1.1 + h() * 2.2) * K, couleur: teinte(T.trame, z), a: (0.18 + h() * 0.4) * brume(z) });
  }

  /* Le bokeh : ce qui passe tout près de l'objectif, loin du centre */
  for (let i = 0, n = 0; n < 15 && i < 400; i++) {
    const fx = h() * 1.1 - 0.05, fy = h() * 1.1 - 0.05;
    if (Math.abs(fx - 0.45) < 0.3 && Math.abs(fy - 0.5) < 0.3) continue;
    n++;
    const z = (-1250 + h() * 700) * U, a = T.aBokeh[0] + h() * (T.aBokeh[1] - T.aBokeh[0]);
    sc.noeud(ecran(fx, fy, z), { r: (26 + h() * 48) * K, couleur: T.bokeh, a, contour: 1.6 * K, fond: rgba(T.bokeh, a * 0.42) });
  }

  rendre(ctx, sc, { L, H, dpr, f, focus: 0, bande: 170 * U, flouLoin: 0.0046 / U * U, flouPres: 0.0105, flouMax: 30 * U, pas: 60 * U, bloom: T.bloom.map(([r, k]) => [r * U, k]), bloomMode: T.bloomMode });

  /* La vignette : les bords s'assombrissent, le regard reste sur le R */
  const vg = ctx.createRadialGradient(L * 0.43, H * 0.47, Math.min(L, H) * 0.34, L * 0.5, H * 0.5, Math.hypot(L, H) * 0.6);
  vg.addColorStop(0, rgba(T.vignette, 0)); vg.addColorStop(1, rgba(T.vignette, T.aVignette));
  ctx.fillStyle = vg; ctx.fillRect(0, 0, L, H);
"""


def fond(theme, ecran):
    t = THEMES_FOND[theme]
    largeur, hauteur, dpr, _ = ECRANS[ecran]
    couleurs = {
        cle: {'coeur': m[t['coeur']], 'noeud': m[t['noeud']], 'lien': m[t['lien']], 'futur': m[t['futur']], 'vif': m['vif'], 'clair': m['clair'], 'action': m['action'], 'n': m['n']}
        for cle, m in MARQUES.items()
    }
    script = SCENE_FOND.replace('__T__', json.dumps(t)).replace('__C__', json.dumps(couleurs))
    nom = f"Reskope - fond d'écran {theme} - {ecran}.png"
    return page(largeur, hauteur, dpr, script), nom, (largeur, hauteur), dpr, t['grain']


async def rendre_pages(travaux):
    """Chaque travail : (html, chemin, taille CSS, dpr, grain). Le grain est posé
    sur l'image finale, à sa taille réelle : sur le canevas il s'estomperait
    à la réduction, et un dégradé sombre se découperait en bandes."""
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=EXE)
        # Une page d'échauffement : le tout premier canevas du navigateur
        # sortait blanc à la capture (le processus graphique n'était pas prêt).
        chauffe = await b.new_page(viewport={'width': 64, 'height': 64})
        await chauffe.set_content('<canvas id="c" width="64" height="64"></canvas><script>document.getElementById("c").getContext("2d").fillRect(0, 0, 64, 64)</script>')
        await chauffe.screenshot()
        await chauffe.close()
        for html, chemin, (largeur, hauteur), dpr, grain in travaux:
            pg = await b.new_page(viewport={'width': largeur, 'height': hauteur}, device_scale_factor=dpr)
            pg.on('pageerror', lambda e: print('ERREUR PAGE', str(e)[:300]))
            await pg.set_content(html)
            await pg.wait_for_function('window.__fini === true', timeout=600000)
            erreur = await pg.evaluate('window.__erreur || null')
            if erreur:
                print('ERREUR', os.path.basename(chemin), erreur)
            # Laisser le compositeur peindre le canevas avant la capture : sans
            # cette attente, la première page sortait parfois blanche.
            await pg.evaluate("() => { document.getElementById('c').getContext('2d').getImageData(0, 0, 1, 1); return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); }")
            await pg.wait_for_timeout(300)
            await pg.screenshot(path=chemin, clip={'x': 0, 'y': 0, 'width': largeur, 'height': hauteur})
            await pg.close()
            if grain:
                grener(chemin, grain)
            print(os.path.basename(chemin), round(os.path.getsize(chemin) / 1048576, 2), 'Mo')
        await b.close()


def grener(chemin, amplitude):
    import numpy as np
    from PIL import Image
    im = np.asarray(Image.open(chemin).convert('RGB'), dtype=np.float32)
    bruit = np.random.default_rng(7).normal(0, amplitude, im.shape[:2]).astype(np.float32)
    Image.fromarray(np.clip(im + bruit[:, :, None], 0, 255).round().astype(np.uint8)).save(chemin, optimize=True)


def main():
    quoi = sys.argv[1] if len(sys.argv) > 1 else 'tout'
    apercu = sys.argv[sys.argv.index('--apercu') + 1] if '--apercu' in sys.argv else None
    seulement = sys.argv[sys.argv.index('--seulement') + 1] if '--seulement' in sys.argv else None
    travaux = []
    if quoi in ('banniere', 'tout'):
        dossier = apercu or os.path.join(PLAQUETTES, 'LinkedIn')
        os.makedirs(dossier, exist_ok=True)
        for theme in THEMES_BANNIERE:
            html, nom = banniere(theme)
            travaux.append((html, os.path.join(dossier, nom), (BL, BH), 2, THEMES_BANNIERE[theme]['grain']))
    if quoi in ('fonds', 'tout'):
        dossier = apercu or os.path.join(PLAQUETTES, "Fonds d'écran")
        os.makedirs(dossier, exist_ok=True)
        for theme in THEMES_FOND:
            for ecran in ECRANS:
                if seulement and seulement not in f'{theme} {ecran}':
                    continue
                html, nom, taille, dpr, grain = fond(theme, ecran)
                travaux.append((html, os.path.join(dossier, nom), taille, dpr, grain))
    asyncio.run(rendre_pages(travaux))


if __name__ == '__main__':
    main()
