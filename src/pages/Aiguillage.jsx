import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import ReseauTaille from '../components/ReseauTaille';
import NetWord from '../components/NetWord';
import Duo from '../components/Duo';
import Booking from '../components/Booking';
import { gsap, useGSAP } from '../lib/gsap';
import { instant } from '../lib/scrub';
import { apparaitre } from '../lib/mouvement';
import { openCalModal, isCalConfigured } from '../lib/cal';
import { ESPACES, adresseEspace } from '../data/espaces';
import { MARQUES, MARQUE_DE_L_ESPACE } from '../data/marques';
import { PORTES_CREATION } from '../data/offres';
import { CONTACT } from '../data/site';
import { RENDEZ_VOUS } from '../data/rendezvous';

const BASE = import.meta.env.BASE_URL;

/* ════════════════════════════════════════════════════════════
   L'ACCUEIL — tout comprendre en dix à vingt secondes.

   Le visiteur doit savoir, sans chercher : ce qu'est Reskope (un cabinet
   de conseil, à Valenciennes et à Lille), ce qu'il peut nous demander dans
   sa situation, et comment nous joindre. Donc, dans l'ordre :
   - la phrase d'identité, la question, la promesse (le travail d'un
     cabinet, au prix d'une petite équipe) et les deux façons de nous
     joindre tout de suite (l'agenda, le téléphone) ;
   - les trois marques, chacune avec SES offres, cliquables sans entrer :
     Create pour qui se lance, Define pour une entreprise de 1 à 10
     personnes, Elevate de 10 à 250. Même R, même méthode, un réseau qui
     grandit avec l'entreprise (un nœud, sept, vingt-six) ;
   - puis, pour qui prend le temps : la preuve (Desrèves), les deux
     personnes qui feront le travail, et l'agenda.

   Pas de barrière pour autant : un lien profond, un favori ou un moteur
   mènent directement aux pages, et le sélecteur de l'en-tête permet de
   changer de marque à tout moment.
   ════════════════════════════════════════════════════════════ */

/* Les offres d'une situation. Create : ses quatre missions, dans cette
   application. Define et Elevate : leurs offres, sur leur page d'offres. */
function offresDe(e) {
  if (e.id === 'creation') return PORTES_CREATION.map((p) => ({ nom: p.court, vers: p.slug, ici: true }));
  return (e.offres || []).map((nom) => ({ nom, vers: `${adresseEspace(e.id)}offres/` }));
}

/* Une carte : toute la carte mène à l'espace (le lien « Entrer » la
   recouvre), et ses offres, posées au-dessus, mènent chacune à la sienne. */
function Carte({ e }) {
  const m = MARQUES[MARQUE_DE_L_ESPACE[e.id]];
  const nom = `Reskope ${m.nom}`;
  const etiquette = `Entrer dans ${nom} : ${m.fr.qui}`;
  const fleche = <>Entrer<span className="aig__fleche" aria-hidden="true">→</span></>;
  return (
    <article className={`aig__carte aig--${m.id}`} data-cursor-label="Entrer" data-incliner>
      <span className="aig__ciel" aria-hidden="true" />
      <span className="aig__reseau" aria-hidden="true"><ReseauTaille n={e.noeuds} /></span>
      <h2 className="aig__marque">
        <span className="aig__mere" aria-hidden="true">Reskope</span>
        <span className="aig__nom" aria-hidden="true"><NetWord className="aig__netword" heightEm={1}>{m.nom}</NetWord></span>
        <span className="sr-only">{nom}</span>
      </h2>
      <p className="aig__moment">{m.fr.moment}</p>
      <p className="aig__qui">{m.fr.qui}</p>
      {e.repere && <p className="aig__repere">{e.repere}</p>}
      <ul className="aig__offres" aria-label={`Ce que ${nom} fait pour vous`}>
        {offresDe(e).map((o) => (
          <li key={o.nom}>
            {o.ici
              ? <Link to={o.vers} data-cursor-label="Voir">{o.nom}</Link>
              : <a href={o.vers} data-cursor-label="Voir">{o.nom}</a>}
          </li>
        ))}
      </ul>
      {/* Create est dans cette application ; Define et Elevate sont servis à
          part, on y va par un vrai chargement de page. */}
      {e.id === 'creation'
        ? <Link to="/creation" className="aig__entrer" aria-label={etiquette}>{fleche}</Link>
        : <a href={adresseEspace(e.id)} className="aig__entrer" aria-label={etiquette}>{fleche}</a>}
    </article>
  );
}

export default function Aiguillage() {
  const racine = useRef(null);
  const preuve = useRef(null);
  const navigate = useNavigate();

  /* L'agenda en pop-up ; s'il ne peut pas s'ouvrir, le formulaire. */
  const reserver = () => {
    if (!isCalConfigured) { navigate('/contact'); return; }
    openCalModal().catch(() => navigate('/contact'));
  };

  useGSAP(() => {
    if (instant()) return;
    const q = gsap.utils.selector(racine);
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(q('.aig__surtitre'), { z: -70, transformPerspective: 900, y: 16, autoAlpha: 0, filter: 'blur(8px)', clearProps: 'filter', duration: 1.05, ease: 'expo.out' }, 0)
      .from(q('.aig__q'), { z: -170, transformPerspective: 900, y: 50, rotateX: -6, autoAlpha: 0, filter: 'blur(8px)', clearProps: 'filter', duration: 1.35, ease: 'expo.out' }, 0)
      .from(q('.aig__sous, .aig__actions, .aig__rassure'), { z: -70, transformPerspective: 900, y: 20, autoAlpha: 0, filter: 'blur(8px)', clearProps: 'filter', duration: 1.05, ease: 'expo.out', stagger: 0.1 }, 0.25)
      .from(q('.aig__carte'), {
        z: -130, transformPerspective: 900, y: 70, rotateX: -5, autoAlpha: 0, filter: 'blur(8px)', clearProps: 'filter', duration: 1.25, ease: 'expo.out', stagger: 0.14,
      }, 0.35)
      .from(q('.aig__fil'), { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.inOut' }, 0.8)
      .from(q('.rt__n'), {
        scale: 0, transformOrigin: 'center center', duration: 0.5, ease: 'back.out(2.2)',
        stagger: { each: 0.012, from: 'start' },
      }, 0.7)
      .from(q('.rt__l'), { autoAlpha: 0, duration: 0.6, ease: 'power2.out', stagger: 0.01 }, 0.9)
      .from(q('.aig__offres li'), { z: -60, transformPerspective: 900, y: 10, autoAlpha: 0, filter: 'blur(6px)', clearProps: 'filter', duration: 0.9, ease: 'expo.out', stagger: 0.035 }, 0.75);
    apparaitre(q('.aig__pourquoi > *'), { declencheur: q('.aig__pourquoi')[0] });
    const p = preuve.current;
    if (p) apparaitre(p.querySelectorAll('.aig__preuve-anim'), { declencheur: p, stagger: 0.1 });
  }, { scope: racine });

  return (
    <Page className="aig">
      <div ref={racine}>
        <section className="aig__in container" aria-labelledby="aig-q">
          <p className="eyebrow aig__surtitre">Reskope, cabinet de conseil à Valenciennes et Lille</p>
          <h1 className="aig__q" id="aig-q">Où en est votre entreprise&nbsp;?</h1>
          <p className="aig__sous">
            Le travail d’un cabinet de conseil, au prix d’une petite équipe. Choisissez votre situation&nbsp;: on ne vous
            montre que ce qui vous concerne.
          </p>
          <div className="aig__actions">
            <button type="button" className="btn btn--primary" onClick={reserver}>
              Réserver 30 min offertes<span className="btn__arrow" aria-hidden="true">→</span>
            </button>
            <a className="aig__tel lien-souligne" href={`tel:${CONTACT.telephoneLien}`}>ou appeler le {CONTACT.telephone}</a>
          </div>
          {/* Deux visages près du bouton, et ce qui rassure au moment de cliquer. */}
          <p className="aig__rassure">
            <span className="aig__visages" aria-hidden="true">
              <img src={`${BASE}thomy-480.webp`} alt="" width="34" height="34" />
              <img src={`${BASE}florian-480.webp`} alt="" width="34" height="34" />
            </span>
            <span>Thomy et Florian vous répondent sous 24 h · sans engagement · prix fixe</span>
          </p>

          <div className="aig__choix-cadre">
            {/* Le fil qui relie les trois marques : le même réseau, qui grandit. */}
            <span className="aig__fil" aria-hidden="true" />
            <ul className="aig__choix">
              {ESPACES.map((e) => (
                <li key={e.id}><Carte e={e} /></li>
              ))}
            </ul>
          </div>

          <div className="aig__pourquoi">
            <p className="aig__pourquoi-amorce">Une seule façon de travailler, trois façons d’en parler.</p>
            <p className="aig__pourquoi-detail">
              On va voir sur le terrain, on vous aide à décider, et on construit la suite, avec un prix fixe écrit avant de
              commencer. Seule la façon d’en parler change, entre quelqu’un qui se lance et le dirigeant d’une entreprise de
              quatre-vingts personnes.
            </p>
          </div>
        </section>

        {/* La preuve : la méthode, appliquée d'abord à une vraie marque. */}
        <section className="aig__preuve container" ref={preuve} aria-labelledby="aig-preuve">
          <p className="eyebrow aig__preuve-anim">La preuve</p>
          <h2 className="aig__preuve-titre aig__preuve-anim" id="aig-preuve">
            Notre méthode, on l’a d’abord appliquée à notre propre marque.
          </h2>
          <p className="aig__preuve-texte aig__preuve-anim">
            <strong>Desrèves</strong>, la marque d’accessoires en soie de Florian, lancée en 2025&nbsp;: un grand chantier de
            restructuration, et une nouvelle cible, trouvée avec la même discovery que celle qu’on vous propose.
          </p>
          <p className="aig__preuve-note aig__preuve-anim">
            <span className="aig__preuve-chiffre">18/20</span>
            <span>la note de son business plan, la meilleure de la promotion.</span>
          </p>
          <Link to="/exemple" className="lien-fleche aig__preuve-anim">
            Voir un exemple complet de mission <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>

      <Duo titre="Deux personnes sur votre dossier, du premier échange à la fin." />
      <Booking c={RENDEZ_VOUS} />
    </Page>
  );
}
