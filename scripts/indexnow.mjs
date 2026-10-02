/* ════════════════════════════════════════════════════════════
   PRÉVENIR BING (ET LES AUTRES) QUE LE SITE A CHANGÉ.

   IndexNow : un seul envoi, partagé par Bing, Yandex, Seznam, Naver et Yep.
   Bing nourrit aussi la recherche de ChatGPT, de Copilot et de DuckDuckGo.
   Google n'y participe pas : pour lui, c'est le plan du site et la Search
   Console.

     node scripts/indexnow.mjs          toutes les adresses du plan du site
     node scripts/indexnow.mjs /contact/ /tpe/    seulement celles-là

   À lancer APRÈS la publication : le moteur vient lire la clé sur le site
   (public/<clé>.txt), puis les pages. La clé n'a rien de secret, elle
   prouve seulement que l'envoi vient du propriétaire du site.
   ════════════════════════════════════════════════════════════ */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { URL_SITE } from '../site.config.mjs';

const RACINE = process.cwd();
const fichier = readdirSync(resolve(RACINE, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!fichier) throw new Error('Aucune clé IndexNow dans public/ (un fichier <32 caractères hexadécimaux>.txt).');
const cle = fichier.slice(0, -4);
const site = new URL(URL_SITE);

const demandees = process.argv.slice(2);
const adresses = demandees.length
  ? demandees.map((a) => new URL(a, URL_SITE).href)
  : [...readFileSync(resolve(RACINE, 'dist', 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const reponse = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: site.host, key: cle, keyLocation: `${site.origin}/${fichier}`, urlList: adresses }),
});
console.log(`IndexNow : ${adresses.length} adresses envoyées, réponse ${reponse.status} ${reponse.statusText}`);
if (reponse.status >= 300) console.log(await reponse.text());
