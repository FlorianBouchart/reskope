/* ════════════════════════════════════════════════════════════
   LE FORMULAIRE DE RÉTRACTATION, À JOINDRE AUX PROPOSITIONS FAITES
   À DES PARTICULIERS.

   Le texte suit le modèle de l'annexe à l'article R221-1 du Code de la
   consommation, adapté à des prestations de services (pas de vente de
   biens). Les CGV l'annoncent : « un modèle de formulaire de rétractation
   est joint à la proposition ».

     node scripts/formulaire-retractation.mjs
   PDF A4 dans Impression/Formulaire de rétractation, copie dans
   ~/Developer/Reskope-Plaquettes. Impression par chrome-headless-shell.
   ════════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, rmSync, copyFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir, tmpdir } from 'node:os';

const DEPOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = join(homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell');
const SORTIE = join(DEPOT, 'Impression', 'Formulaire de rétractation');
const PLAQUETTES = join(homedir(), 'Developer', 'Reskope-Plaquettes');
const NOM = 'reskope-formulaire-retractation';

const b64 = (f) => readFileSync(join(DEPOT, 'public', 'fonts', f)).toString('base64');
const POLICES = [['ReskopeSans-Regular.woff2', 400], ['ReskopeSans-Medium.woff2', 500], ['ReskopeSans-SemiBold.woff2', 600]]
  .map(([f, w]) => `@font-face{font-family:'Reskope Sans';src:url(data:font/woff2;base64,${b64(f)}) format('woff2');font-weight:${w}}`).join('');
const logo = readFileSync(join(DEPOT, 'logo', 'reskope-logo-indigo.svg'), 'utf8');
const LOGO = `<div class="logo">${logo.slice(logo.indexOf('<svg')).replace(/ width="[\d.]+" height="[\d.]+"/, '')}</div>`;

const champ = (libelle, lignes = 1) => `<div class="champ"><span>${libelle}</span>${'<i></i>'.repeat(lignes)}</div>`;

const PAGE = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>${POLICES}
@page{size:A4;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
body{width:210mm;height:297mm;font-family:'Reskope Sans',sans-serif;color:#0E0B1F;font-size:10.5pt;line-height:1.5}
.p{padding:20mm 22mm 18mm;height:297mm;display:flex;flex-direction:column}
.logo{width:46mm}.logo svg{display:block;width:100%;height:auto}
h1{margin-top:12mm;font-size:22pt;font-weight:600;letter-spacing:-.02em;color:#1C0CB3}
.sous{margin-top:2mm;font-size:9.5pt;color:#5C5951}
.note{margin-top:8mm;padding:4mm 5mm;border-radius:3mm;background:#F0EEE8;font-size:10pt}
.dest{margin-top:7mm}
.dest b{font-weight:600}
.texte{margin-top:6mm}
.champ{margin-top:6mm}
.champ span{display:block;font-weight:500;font-size:10pt}
.champ i{display:block;height:8.5mm;border-bottom:.25mm solid #B9B4C7}
.renvoi{margin-top:5mm;font-size:9pt;color:#5C5951}
.pied{margin-top:auto;font-size:8.5pt;color:#5C5951;line-height:1.45}
</style></head><body><div class="p">
  ${LOGO}
  <h1>Formulaire de rétractation</h1>
  <p class="sous">Pour les clients particuliers (consommateurs) · articles L221-5 et R221-1 du Code de la consommation</p>
  <p class="note">Complétez et renvoyez ce formulaire uniquement si vous souhaitez vous rétracter du contrat. Vous disposez de quatorze jours à compter de la conclusion du contrat, c’est-à-dire de la signature de la proposition.</p>
  <p class="dest">À l’attention de&nbsp;: <b>Reskope, Florian Bouchart</b>, entrepreneur individuel, SIRET 939&nbsp;285&nbsp;003&nbsp;00017, 156 Chemin de la Clouterie, Cité Canu, 59125 Trith-Saint-Léger. E-mail&nbsp;: florian.bouchart@hotmail.fr</p>
  <p class="texte">Je / Nous (*) vous notifie / notifions (*) par la présente ma / notre (*) rétractation du contrat portant sur la prestation de services ci-dessous&nbsp;:</p>
  ${champ('Prestation (intitulé de la proposition)')}
  ${champ('Proposition n° et date de signature (contrat conclu le)')}
  ${champ('Nom du (des) consommateur(s)')}
  ${champ('Adresse du (des) consommateur(s)', 2)}
  ${champ('Signature du (des) consommateur(s), uniquement en cas d’envoi sur papier')}
  ${champ('Date')}
  <p class="renvoi">(*) Rayez la mention inutile.</p>
  <p class="pied">Envoi par e-mail à florian.bouchart@hotmail.fr, ou par courrier à l’adresse ci-dessus. Si vous avez demandé expressément que la prestation commence avant la fin du délai de rétractation, le travail réalisé jusqu’à la réception de votre rétractation reste dû (article L221-25). Une prestation entièrement exécutée avant la fin du délai, à votre demande expresse, ne peut plus faire l’objet d’une rétractation (article L221-28).</p>
</div></body></html>`;

function chrome(args, attendu) {
  return new Promise((ok, ko) => {
    if (existsSync(attendu)) rmSync(attendu);
    const profil = join(tmpdir(), `retractation-${process.pid}-${Date.now()}`);
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
await chrome(['--window-size=794,1123', '--force-device-scale-factor=1', `--screenshot=${join(SORTIE, 'apercu.png')}`, `file://${html}`], join(SORTIE, 'apercu.png'));
rmSync(html);
mkdirSync(PLAQUETTES, { recursive: true });
copyFileSync(join(SORTIE, `${NOM}.pdf`), join(PLAQUETTES, `${NOM}.pdf`));
console.log('PDF :', join(SORTIE, `${NOM}.pdf`), '· copie :', PLAQUETTES);
