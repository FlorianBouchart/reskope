import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { URL_SITE } from '../site.config.mjs';

/* ════════════════════════════════════════════════════════════
   L'INSTANTANÉ — le vrai texte de chaque page, dans son HTML.

   Constat du 10/10/2026 : l'accueil, les trois espaces, les offres et la
   méthode n'exposaient que 170 à 260 mots à qui ne lance pas JavaScript
   (un titre, un résumé, une liste de liens). Or les robots des moteurs de
   réponse (ChatGPT, Perplexity, Copilot via Bing) ne l'exécutent pas, et
   Google indexe d'abord le HTML brut d'un site neuf. Le contenu réel,
   lui, n'existait qu'une fois l'application montée.

   Ce script tourne en dernier (après l'assemblage). Il sert `dist` en
   local, ouvre chaque page du plan du site dans un Chrome sans fenêtre,
   attend que l'application soit montée, et relève ce qu'elle affiche :
   titres, paragraphes, listes, liens, dans l'ordre. Il pose ce texte dans
   le bloc lisible sans JavaScript (.pre-seo), avant la liste des pages.

   Ce qui est écrit dans le HTML est donc exactement ce que la page
   affiche : il n'y a toujours pas deux versions du discours. Les pages par
   intention ont déjà tout leur texte (scripts/prerender.mjs) : on ne
   touche qu'aux pages qui en ont peu.

   Lancer seul : node scripts/instantane.mjs   (après npm run build)
   ════════════════════════════════════════════════════════════ */

const DIST = resolve(process.cwd(), 'dist');
const CHROME = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const SEUIL = 420; // en dessous de ce nombre de mots, la page reçoit son instantané
const ORIGINE = URL_SITE.replace(/\/$/, '');
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.ico': 'image/x-icon' };

if (!existsSync(CHROME)) {
  console.log('Instantané : Chrome sans fenêtre introuvable, étape passée (le site reste tel que le pré-rendu l’a écrit).');
  process.exit(0);
}

/* ── Un petit serveur de fichiers, comme GitHub Pages ───────── */
const serveur = createServer((req, res) => {
  let chemin = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let fichier = join(DIST, chemin);
  if (existsSync(fichier) && statSync(fichier).isDirectory()) fichier = join(fichier, 'index.html');
  if (!existsSync(fichier)) { res.writeHead(404, { 'Content-Type': TYPES['.html'] }); res.end(readFileSync(join(DIST, '404.html'))); return; }
  res.writeHead(200, { 'Content-Type': TYPES[extname(fichier)] || 'application/octet-stream' });
  res.end(readFileSync(fichier));
});
await new Promise((r) => serveur.listen(0, '127.0.0.1', r));
const LOCAL = `http://127.0.0.1:${serveur.address().port}`;

/* ── Chrome, piloté par son protocole de débogage ───────────── */
const profil = mkdtempSync(join(tmpdir(), 'reskope-instantane-'));
const chrome = spawn(CHROME, ['--remote-debugging-port=0', `--user-data-dir=${profil}`, '--no-first-run', '--hide-scrollbars', '--window-size=1280,900', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const port = await new Promise((ok, ko) => {
  let journal = '';
  const minuterie = setTimeout(() => ko(new Error('Chrome ne démarre pas')), 20000);
  chrome.stderr.on('data', (d) => { journal += d; const m = journal.match(/ws:\/\/127\.0\.0\.1:(\d+)\//); if (m) { clearTimeout(minuterie); ok(m[1]); } });
});
const onglet = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(onglet.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0;
const attente = new Map();
ws.addEventListener('message', (e) => { const d = JSON.parse(e.data); if (d.id && attente.has(d.id)) { attente.get(d.id)(d.result || d.error); attente.delete(d.id); } });
const cdp = (methode, params = {}) => new Promise((r) => { id += 1; attente.set(id, r); ws.send(JSON.stringify({ id, method: methode, params })); });
const ev = async (expression) => (await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }))?.result?.value;

await cdp('Page.enable');
await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
/* Mouvement réduit : tout le texte est en place tout de suite, sans séquence à dérouler. */
await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
/* Le bandeau de mesure d'audience ne fait pas partie du contenu. */
await cdp('Page.addScriptToEvaluateOnNewDocument', { source: `try { localStorage.setItem('reskope-mesure', JSON.stringify({ choix: 'non', date: Date.now() })); } catch {}` });

/* ── Le relevé, exécuté dans la page ────────────────────────── */
const RELEVER = `(async () => {
  const ORIGINE = ${JSON.stringify(ORIGINE)};
  const pause = (ms) => new Promise((r) => setTimeout(r, ms));
  /* On fait défiler la page : ce qui ne se monte qu'à l'approche se monte. */
  const haut = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  for (let y = 0; y < haut(); y += 700) { window.scrollTo(0, y); await pause(70); }
  window.scrollTo(0, 0); await pause(250);

  const racine = document.querySelector('main');
  if (!racine) return '';
  const HORS = 'script,style,svg,canvas,noscript,template,form,[hidden],[role="dialog"],iframe,video,audio,picture,img';
  const BLOCS = 'p,li,h1,h2,h3,h4,h5,h6,ul,ol,dl,dt,dd,blockquote,table,section,article,div,figure,figcaption,details,summary,header,footer,aside,nav';
  const propre = (t) => t.replace(/\\s+/g, ' ').trim();
  const ech = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const nu = (h) => propre(h.replace(/<[^>]+>/g, ''));
  const cache = (el) => el.getAttribute('aria-hidden') === 'true';
  /* Un titre découpé lettre à lettre porte son texte dans aria-label, et ses morceaux sont masqués. */
  const etiquette = (el) => {
    const e = el.getAttribute('aria-label');
    return e && el.children.length && [...el.children].every(cache) ? e : '';
  };
  const lien = (a) => {
    try {
      const u = new URL(a.href);
      if (u.protocol === 'tel:' || u.protocol === 'mailto:') return '';
      if (u.hostname === '127.0.0.1') return ORIGINE + (/\\/$|\\.[a-z0-9]+$/i.test(u.pathname) ? u.pathname : u.pathname + '/') + u.hash;
      return u.href;
    } catch { return ''; }
  };
  const enLigne = (el) => {
    let s = '';
    for (const n of el.childNodes) {
      if (n.nodeType === 3) s += ech(n.nodeValue);
      else if (n.nodeType === 1) {
        if (n.matches(HORS) || cache(n)) continue;
        if (n.tagName === 'BUTTON' && !n.hasAttribute('aria-expanded')) continue;
        const e = etiquette(n);
        if (e) { s += ech(e); continue; }
        if (n.tagName === 'BR') { s += ' '; continue; }
        const h = n.tagName === 'A' ? lien(n) : '';
        const dedans = enLigne(n);
        s += h && nu(dedans) ? ' <a href="' + h + '">' + propre(dedans.replace(/<[^>]+>/g, '')) + '</a> ' : ' ' + dedans + ' ';
      }
    }
    return s;
  };
  const sortie = [], vus = new Set();
  const poser = (balise, html) => {
    const t = nu(html);
    if (t.length < 2) return;
    const cle = t.toLowerCase();
    if (vus.has(cle)) return;
    vus.add(cle);
    sortie.push([balise, propre(html).replace(/ +([,.)])/g, '$1').replace(/\\( +/g, '(')]);
  };
  const aDesBlocs = (el) => Boolean(el.querySelector(BLOCS));
  const visiter = (el) => {
    if (el.nodeType !== 1 || el.matches(HORS) || cache(el)) return;
    const tag = el.tagName, e = etiquette(el);
    if (/^H[1-6]$/.test(tag)) { if (tag !== 'H1') poser(tag.toLowerCase(), e ? ech(e) : (nu(enLigne(el)) ? enLigne(el).replace(/<\\/?a[^>]*>/g, '') : ech(propre(el.textContent)))); return; }
    if (e) { poser('p', ech(e)); return; }
    if (tag === 'BUTTON') { if (el.hasAttribute('aria-expanded')) poser('h3', ech(propre(el.textContent))); return; }
    if (tag === 'LI' && !aDesBlocs(el)) { poser('li', enLigne(el)); return; }
    if (tag === 'DT' && !aDesBlocs(el)) { poser('h3', enLigne(el)); return; }
    if (tag === 'A' && !aDesBlocs(el)) { const h = lien(el), t = propre(el.textContent); if (h && t) poser('p', '<a href="' + h + '">' + ech(t) + '</a>'); return; }
    if (!aDesBlocs(el)) { poser('p', enLigne(el)); return; }
    for (const c of el.children) visiter(c);
  };
  for (const c of racine.children) visiter(c);

  /* Les éléments de liste qui se suivent reforment une liste. */
  let html = '', liste = false;
  for (const [balise, contenu] of sortie) {
    if (balise === 'li') { if (!liste) { html += '<ul>'; liste = true; } html += '<li>' + contenu + '</li>'; continue; }
    if (liste) { html += '</ul>'; liste = false; }
    html += '<' + balise + '>' + contenu + '</' + balise + '>';
  }
  if (liste) html += '</ul>';
  return html;
})()`;

const mots = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const routes = [...readFileSync(join(DIST, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

let faites = 0, passees = 0;
const bilan = [];
try {
  for (const route of routes) {
    const fichier = join(DIST, route, 'index.html');
    if (!existsSync(fichier)) continue;
    const avant = readFileSync(fichier, 'utf8').replace(/<section data-instantane>[\s\S]*?<\/section>\s*/g, '');
    if (mots(avant) >= SEUIL) { passees += 1; continue; }
    await cdp('Page.navigate', { url: LOCAL + route });
    /* L'application est montée quand le bloc statique a laissé la place à <main>. */
    let monte = false;
    for (let i = 0; i < 80 && !monte; i++) { await pause(150); monte = await ev(`Boolean(document.querySelector('main')) && !document.querySelector('.pre-seo')`); }
    if (!monte) { bilan.push(`  ! ${route} : application non montée, page laissée telle quelle`); continue; }
    await pause(900);
    const texte = await ev(RELEVER);
    if (!texte || mots(texte) < 40) { bilan.push(`  ! ${route} : relevé vide, page laissée telle quelle`); continue; }
    const marque = '<nav aria-label="Pages du site">';
    if (!avant.includes(marque)) { bilan.push(`  ! ${route} : repère introuvable`); continue; }
    const apres = avant.replace(marque, `<section data-instantane>${texte}</section>\n      ${marque}`);
    writeFileSync(fichier, apres);
    faites += 1;
    bilan.push(`  ${route.padEnd(44)} ${String(mots(avant)).padStart(4)} → ${mots(apres)} mots`);
  }
} finally {
  ws.close();
  chrome.kill('SIGKILL');
  serveur.close();
  await pause(600);
  try { rmSync(profil, { recursive: true, force: true }); } catch { /* le système le nettoiera */ }
}
console.log(`Instantané : ${faites} pages complétées avec leur vrai texte, ${passees} déjà complètes.`);
console.log(bilan.join('\n'));
