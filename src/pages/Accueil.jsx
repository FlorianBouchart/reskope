import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Net3D from '../components/Net3D';
import NetWord from '../components/NetWord';
import { Reveal, RevealItem } from '../components/Reveal';
import { useLang } from '../i18n';
import { PROFILS } from '../data/univers';
import { PROFIL_SHAPES } from '../lib/net3d';

/* ============================================================
   L'ACCUEIL — une seule question : qui êtes-vous ?

   L'ancien accueil vendait l'audit, et l'audit seul. Il est devenu la page
   de l'univers correspondant, entier, sans une ligne réécrite. Ce qui le
   remplace ici ne vend rien : il trie.

   Trois portes, trois profils, et surtout DEUX offres au maximum par
   porte. On ne propose pas la même chose à une entreprise de trois
   personnes et à une PME de quatre-vingts, et chaque porte dit aussi ce
   qu'on ne proposera PAS — c'est ce qui rend le tri crédible.

   La densité du solide 3D dit la taille de la structure avant qu'on ait
   lu quoi que ce soit : quatre nœuds pour un porteur de projet, six pour
   une TPE, dix-huit pour une PME.
   ============================================================ */

const T = {
  fr: {
    metaTitle: 'Conseil & ingénierie numérique · TPE, PME et porteurs de projet',
    metaDesc:
      'Reskope accompagne les porteurs de projet, les TPE et les PME. Stratégie et modèle, direction artistique, solutions numériques, audit et cartographie. Dites-nous qui vous êtes, on vous emmène au bon endroit.',
    eyebrow: 'Reskope · conseil et ingénierie numérique',
    q1: 'Qui',
    q2: 'êtes-vous ?',
    lead: 'On ne propose pas la même chose à quelqu’un qui monte un projet, à une entreprise de trois personnes et à une PME de quatre-vingts. Dites-nous où vous en êtes, on vous emmène au bon endroit.',
    hint: 'Trois réponses',
    propose: 'Ce qu’on vous propose',
    ni: 'Vous n’êtes dans aucune de ces cases ?',
    niTexte: 'Ça arrive souvent, et ce n’est pas un problème. Trente minutes suffisent pour savoir si on peut vous être utiles, et on vous le dira franchement.',
    niCta: 'Nous écrire',
  },
  en: {
    metaTitle: 'Digital consulting & engineering · founders, small businesses and SMEs',
    metaDesc:
      'Reskope works with founders, small businesses and SMEs. Strategy and model, art direction, digital solutions, audit and mapping. Tell us who you are and we will take you to the right place.',
    eyebrow: 'Reskope · digital consulting and engineering',
    q1: 'Who',
    q2: 'are you?',
    lead: 'We do not offer the same thing to someone starting a project, to a three-person business and to an eighty-person SME. Tell us where you stand, and we will take you to the right place.',
    hint: 'Three answers',
    propose: 'What we offer you',
    ni: 'None of these boxes fit?',
    niTexte: 'That happens often, and it is not a problem. Thirty minutes is enough to know whether we can be useful, and we will tell you frankly.',
    niCta: 'Write to us',
  },
};

export default function Accueil() {
  const { lang } = useLang();
  const t = T[lang] || T.fr;

  return (
    <Page title={t.metaTitle} description={t.metaDesc}>

      {/* 1 — La question, plein écran. Rien d'autre : c'est la seule chose
             qu'on demande au visiteur, elle mérite tout l'espace. */}
      <header className="qui-hero" data-nav-dark="">
        <div className="container qui-hero__inner">
          <Reveal onMount>
            <RevealItem as="p" className="eyebrow qui-hero__eyebrow">{t.eyebrow}</RevealItem>
          </Reveal>
          <h1 className="qui-hero__t">
            <span className="qui-hero__mot">
              <span className="qui-hero__ghost">{t.q1}</span>
              <NetWord className="qui-hero__net" heightEm={1.12}>{t.q1}</NetWord>
            </span>{' '}
            <span className="qui-hero__suite">{t.q2}</span>
          </h1>
          <Reveal>
            <RevealItem as="p" className="lead qui-hero__lead">{t.lead}</RevealItem>
          </Reveal>
        </div>
        <div className="qui-hero__hint" aria-hidden="true">
          <span>{t.hint}</span>
          <i />
        </div>
      </header>

      {/* 2 — Les trois portes */}
      <div className="qui-portes">
        {PROFILS.map((p, i) => {
          const c = p[lang] || p.fr;
          return (
            <section className="qui-porte" key={p.id} aria-labelledby={`qui-${p.id}`}>
              <div className="container qui-porte__inner">

                <div className="qui-porte__fig" aria-hidden="true">
                  <Net3D
                    shape={PROFIL_SHAPES[p.shape]}
                    size={300}
                    nodeR={p.id === 'pme' ? 2.6 : 3.6}
                    speed={0.75 + i * 0.12}
                    focal={430}
                    className="qui-porte__solide"
                  />
                  <span className="qui-porte__num">{`0${i + 1}`}</span>
                </div>

                <div className="qui-porte__txt">
                  <Reveal>
                    <RevealItem as="p" className="qui-porte__taille">{c.taille}</RevealItem>
                    <RevealItem as="h2" className="qui-porte__q" id={`qui-${p.id}`}>{c.q}</RevealItem>
                    <RevealItem as="p" className="qui-porte__situ">{c.situation}</RevealItem>
                  </Reveal>

                  <Reveal className="qui-offres">
                    <RevealItem as="p" className="qui-offres__lab">{t.propose}</RevealItem>
                    {c.offres.map((o) => (
                      <RevealItem key={o.to}>
                        <Link className="qui-offre" to={o.to}>
                          <span className="qui-offre__haut">
                            <span className="qui-offre__nom">{o.nom}</span>
                            <span className="qui-offre__duree">{o.duree}</span>
                          </span>
                          <span className="qui-offre__quoi">{o.quoi}</span>
                          <span className="qui-offre__fleche" aria-hidden="true">→</span>
                        </Link>
                      </RevealItem>
                    ))}
                    {/* Dire ce qu'on ne fera pas, c'est ce qui rend le
                        reste croyable. */}
                    <RevealItem as="p" className="qui-franchise">{c.franchise}</RevealItem>
                  </Reveal>
                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* 3 — Pour tous ceux qui ne se reconnaissent dans aucune porte */}
      <section className="qui-ni">
        <div className="container">
          <Reveal className="qui-ni__box">
            <RevealItem as="h2" className="qui-ni__t">{t.ni}</RevealItem>
            <RevealItem as="p" className="qui-ni__d">{t.niTexte}</RevealItem>
            <RevealItem>
              <Link className="btn btn--primary" to="/contact">
                {t.niCta}
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

    </Page>
  );
}
