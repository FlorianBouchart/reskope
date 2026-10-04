/* Espaces insécables du français dans les chaînes d'un fichier de données :
   avant : ; ? ! et à l'intérieur des guillemets « ». Seules les chaînes entre
   apostrophes droites sont touchées, jamais le code autour.
     node scripts/insecables.mjs src/data/intentions.js */
import { readFileSync, writeFileSync } from 'node:fs';
const NB = ' ';
for (const f of process.argv.slice(2)) {
  const s = readFileSync(f, 'utf8');
  let n = 0;
  const t = s.replace(/'([^'\n\\]*)'/g, (m, c) => {
    const d = c
      .replace(/ ([:;?!])/g, `${NB}$1`)
      .replace(/« /g, `«${NB}`)
      .replace(/ »/g, `${NB}»`);
    if (d !== c) n++;
    return `'${d}'`;
  });
  writeFileSync(f, t);
  console.log(`${f} : ${n} chaînes corrigées`);
}
