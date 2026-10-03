/* ════════════════════════════════════════════════════════════
   LE GUIDE GRATUIT : « LES 12 QUESTIONS À POSER À VOS FUTURS CLIENTS ».

   Donné sans rien demander en échange (pas d'adresse e-mail) : il sert
   vraiment, et c'est la meilleure présentation de la discovery. Deux pages
   A4, la police et le logo Reskope.

     node scripts/guide-questions.mjs
   PDF dans public/guides/ (servi par le site), copie dans
   ~/Developer/Reskope-Plaquettes/Guides. Impression par chrome-headless-shell.
   ════════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, rmSync, copyFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir, tmpdir } from 'node:os';

const DEPOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = join(homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const SORTIE = join(DEPOT, 'public', 'guides');
const PLAQUETTES = join(homedir(), 'Developer', 'Reskope-Plaquettes', 'Guides');
const NOM = '12-questions-futurs-clients';
const N = ' ';

const b64 = (f) => readFileSync(join(DEPOT, 'public', 'fonts', f)).toString('base64');
const POLICES = [['ReskopeSans-Regular.woff2', 400], ['ReskopeSans-Medium.woff2', 500], ['ReskopeSans-SemiBold.woff2', 600]]
  .map(([f, w]) => `@font-face{font-family:'Reskope Sans';src:url(data:font/woff2;base64,${b64(f)}) format('woff2');font-weight:${w}}`).join('');
const logo = readFileSync(join(DEPOT, 'logo', 'reskope-logo-indigo.svg'), 'utf8');
const LOGO = `<div class="logo">${logo.slice(logo.indexOf('<svg')).replace(/ width="[\d.]+" height="[\d.]+"/, '')}</div>`;

const BLOCS = [
  ['Le problème est-il réel${N}?', [
    'Racontez-moi la dernière fois que ce problème vous est arrivé.',
    'Qu’est-ce qui a été le plus pénible, ce jour-là${N}?',
    'Ça vous arrive souvent${N}? À quand remonte la dernière fois${N}?',
  ]],
  ['Comment ils font aujourd’hui', [
    'Comment vous débrouillez-vous aujourd’hui${N}?',
    'Qu’avez-vous déjà essayé pour régler ça, et pourquoi ça n’a pas marché${N}?',
    'Combien ça vous coûte aujourd’hui, en temps ou en argent${N}?',
  ]],
  ['Comment ils décident d’acheter', [
    'La dernière fois que vous avez payé pour régler ce genre de problème, comment avez-vous choisi${N}?',
    'Qui d’autre a son mot à dire avant d’acheter${N}?',
    'Qu’est-ce qui vous ferait changer de solution demain${N}?',
  ]],
  ['Où les trouver, et la suite', [
    'Où cherchez-vous quand vous avez ce genre de besoin${N}?',
    'Qui d’autre vit la même chose${N}? Vous pourriez me le présenter${N}?',
    'Je peux revenir vers vous quand j’aurai quelque chose à vous montrer${N}?',
  ]],
];

let numero = 0;
const insecable = (t) => t.replaceAll('${N}', N);
const blocs = BLOCS.map(([titre, qs]) => [insecable(titre), qs.map(insecable)]).map(([titre, qs]) => `
  <section class="bloc">
    <h2>${titre}</h2>
    <ol>${qs.map((q) => `<li><span class="n">${++numero}</span><span>«${N}${q}${N}»</span></li>`).join('')}</ol>
  </section>`).join('');

const PAGE = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Les 12 questions à poser à vos futurs clients · Reskope</title><style>${POLICES}
@page{size:A4;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Reskope Sans',sans-serif;color:#0E0B1F;font-size:10.5pt;line-height:1.5}
.p{width:210mm;height:297mm;padding:18mm 20mm 16mm;display:flex;flex-direction:column;break-after:page}
.p:last-child{break-after:auto}
.logo{width:40mm}.logo svg{display:block;width:100%;height:auto}
.sur{margin-top:11mm;font-size:9pt;font-weight:500;color:#1C0CB3}
h1{margin-top:2mm;font-size:25pt;font-weight:600;line-height:1.05;letter-spacing:-.02em;color:#0E0B1F}
.chapo{margin-top:4mm;max-width:150mm;font-size:11.5pt;color:#5C5951}
.regles{margin-top:8mm;padding:6mm 7mm;border-radius:4mm;background:#F0EEE8}
.regles h2{font-size:12pt;font-weight:600;color:#1C0CB3;margin-bottom:3mm}
.regles ol{list-style:none;display:grid;gap:3mm}
.regles li{display:grid;grid-template-columns:7mm 1fr;align-items:baseline}
.regles b{font-weight:600}
.regles .n{font-weight:600;color:#1C0CB3}
.bloc{margin-top:7mm}
.bloc h2{font-size:12.5pt;font-weight:600;color:#1C0CB3}
.bloc ol{list-style:none;margin-top:2.5mm;display:grid;gap:2.2mm}
.bloc li{display:grid;grid-template-columns:9mm 1fr;align-items:baseline;font-size:11pt}
.bloc .n{display:inline-grid;place-items:center;width:6.5mm;height:6.5mm;border-radius:50%;background:#1C0CB3;color:#F0EEE8;font-size:8.5pt;font-weight:600}
.pas{margin-top:8mm;padding:6mm 7mm;border-radius:4mm;border:.35mm solid #D9D4F5}
.pas h2{font-size:12pt;font-weight:600;margin-bottom:2.5mm}
.pas ul{list-style:none;display:grid;gap:2.2mm}
.pas li{display:grid;grid-template-columns:6mm 1fr}
.pas li::before{content:'×';color:#B42318;font-weight:600}
.pas em{font-style:normal;color:#5C5951}
.apres{margin-top:7mm}
.apres h2{font-size:12pt;font-weight:600;color:#1C0CB3;margin-bottom:2mm}
.fin{margin-top:auto;padding:6mm 7mm;border-radius:4mm;background:#1C0CB3;color:#F0EEE8}
.fin p{font-size:10.5pt}
.fin b{font-weight:600}
.fin .lien{margin-top:2mm;font-weight:600}
.pied{margin-top:4mm;font-size:8pt;color:#8A857B}
</style></head><body>
<div class="p">
  ${LOGO}
  <p class="sur">Le guide gratuit de Reskope</p>
  <h1>Les 12 questions à poser à vos futurs clients</h1>
  <p class="chapo">Avant d’investir vos économies ou un prêt, vérifiez que des gens achèteront vraiment. Ce sont les questions qu’on utilise en entretien, en version courte, à utiliser dès cette semaine.</p>
  <div class="regles">
    <h2>Trois règles avant de commencer</h2>
    <ol>
      <li><span class="n">1</span><span><b>Parlez de leur vie, pas de votre idée.</b> Si vous présentez votre projet, on vous fera des compliments, pas des réponses.</span></li>
      <li><span class="n">2</span><span><b>Demandez ce qu’ils ont fait, pas ce qu’ils feraient.</b> Le passé dit la vérité${N}; les intentions, rarement.</span></li>
      <li><span class="n">3</span><span><b>Écoutez plus que vous ne parlez.</b> Un bon entretien, c’est l’autre qui parle presque tout le temps.</span></li>
    </ol>
  </div>
  ${blocs.split('</section>').slice(0, 3).join('</section>')}</section>
  <p class="pied">reskope.fr · Valenciennes et Lille</p>
</div>
<div class="p">
  ${blocs.split('</section>').slice(3, 4).join('</section>')}</section>
  <div class="pas">
    <h2>Les trois questions à ne jamais poser</h2>
    <ul>
      <li><span>«${N}Vous achèteriez ça${N}?${N}» <em>Tout le monde dit oui, personne n’achète.</em></span></li>
      <li><span>«${N}Combien vous seriez prêt à payer${N}?${N}» <em>Personne ne le sait avant d’avoir payé.</em></span></li>
      <li><span>«${N}Vous trouvez que c’est une bonne idée${N}?${N}» <em>On vous répondra pour vous faire plaisir.</em></span></li>
    </ul>
  </div>
  <div class="apres">
    <h2>Après l’entretien</h2>
    <p>Notez les phrases exactes, pas votre interprétation. Au bout de dix à douze entretiens, les mêmes phrases reviennent${N}: c’est votre client idéal qui parle. Ce sont elles qui doivent écrire votre offre, votre prix et vos premiers messages.</p>
  </div>
  <div class="fin">
    <p><b>Vous préférez qu’on mène ces entretiens pour vous${N}?</b> C’est la mission «${N}Tester votre idée${N}»${N}: trois à quatre semaines, une heure et demie de votre temps par semaine, un prix fixe écrit avant de commencer. Et si la synthèse ne vous apprend rien, vous ne la payez pas.</p>
    <p class="lien">reskope.fr/tester-une-idee · 06${N}20${N}23${N}55${N}20</p>
  </div>
  <p class="pied">Reskope, cabinet de conseil à Valenciennes et Lille · Thomy Phanzu et Florian Bouchart</p>
</div>
</body></html>`;

function chrome(args, attendu) {
  return new Promise((ok, ko) => {
    if (existsSync(attendu)) rmSync(attendu);
    const profil = join(tmpdir(), `guide-${process.pid}-${Date.now()}`);
    const p = spawn(CHROME, ['--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', `--user-data-dir=${profil}`,
      '--virtual-time-budget=6000', '--run-all-compositor-stages-before-draw', ...args], { stdio: 'ignore' });
    let taille = -1, stable = 0, tours = 0;
    const t = setInterval(() => {
      tours++;
      if (existsSync(attendu)) { const s = statSync(attendu).size; stable = s > 0 && s === taille ? stable + 1 : 0; taille = s; }
      if (stable >= 2 || tours > 120) {
        clearInterval(t);
        try { p.kill('SIGKILL'); } catch { /* déjà fini */ }
        rmSync(profil, { recursive: true, force: true });
        if (stable >= 2) ok(taille); else ko(new Error(`Chrome bloqué : ${attendu}`));
      }
    }, 400);
  });
}

mkdirSync(SORTIE, { recursive: true });
const html = join(tmpdir(), `${NOM}.html`);
writeFileSync(html, PAGE);
await chrome(['--no-pdf-header-footer', `--print-to-pdf=${join(SORTIE, `${NOM}.pdf`)}`, `file://${html}`], join(SORTIE, `${NOM}.pdf`));
await chrome(['--window-size=794,2246', '--force-device-scale-factor=1', `--screenshot=${join(tmpdir(), `${NOM}.png`)}`, `file://${html}`], join(tmpdir(), `${NOM}.png`));
rmSync(html);
mkdirSync(PLAQUETTES, { recursive: true });
copyFileSync(join(SORTIE, `${NOM}.pdf`), join(PLAQUETTES, `${NOM}.pdf`));
console.log('PDF :', join(SORTIE, `${NOM}.pdf`), `(${Math.round(statSync(join(SORTIE, `${NOM}.pdf`)).size / 1024)} Ko) · aperçu :`, join(tmpdir(), `${NOM}.png`));
