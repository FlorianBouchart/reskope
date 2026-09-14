import { Link } from 'react-router-dom';
import Axono from './Axono';
import { Reveal, RevealItem } from './Reveal';
import { useLang } from '../i18n';
import { AGES } from '../data/univers';
import { scPlante } from '../lib/axono';

/* ============================================================
   L'AIGUILLAGE — la question qui range tout le site.

   On ne demande pas au visiteur quelle offre il veut : il n'en sait rien,
   et un catalogue de quatre métiers qui ne s'adressent pas aux mêmes gens
   le perd immédiatement. On lui demande OÙ IL EN EST — ça, il le sait
   toujours. Chaque âge mène vers le métier qui lui correspond, et il
   n'entre jamais dans les trois autres.

   Les cinq végétaux sont ceux des plaquettes, au trait près : un prospect
   qui a le livret en main reconnaît la page avant d'avoir lu le titre.
   ============================================================ */

const T = {
  fr: {
    eyebrow: 'Par où commencer',
    titre: 'Où en êtes-vous ?',
    lead: 'Un projet ne se ressemble pas d’une année sur l’autre. Dites-nous à quelle étape vous êtes, on vous emmène au bon endroit.',
    suite: 'Voir',
  },
  en: {
    eyebrow: 'Where to start',
    titre: 'Where do you stand?',
    lead: 'A project does not look the same from one year to the next. Tell us which stage you are at, and we will take you to the right place.',
    suite: 'See',
  },
};

export default function Aiguillage() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;
  const ages = AGES[lang] || AGES.fr;

  return (
    <section className="aig" aria-labelledby="aig-t">
      <div className="container">
        <Reveal>
          <RevealItem as="p" className="eyebrow eyebrow--index">{t.eyebrow}</RevealItem>
          <RevealItem as="h2" className="h2" id="aig-t">{t.titre}</RevealItem>
          <RevealItem as="p" className="lead aig__lead">{t.lead}</RevealItem>
        </Reveal>

        <Reveal className="aig__rang">
          {ages.map(([nom, horizon, phrase, to], i) => (
            <RevealItem key={nom}>
              <Link className="aig__c" to={to}>
                <span className="aig__fig" aria-hidden="true">
                  <Axono scene={() => scPlante(i)} titre={nom} max={150} />
                </span>
                <span className="aig__h">{horizon}</span>
                <span className="aig__n">{nom}</span>
                <span className="aig__p">{phrase}</span>
                <span className="aig__a">{t.suite} <span aria-hidden="true">→</span></span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
