import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OFFRE } from '../data/offres';
import { mesurer } from '../lib/mesure';
import { apparaitre } from '../lib/mouvement';
import { openCalModal, isCalConfigured } from '../lib/cal';

/* ════════════════════════════════════════════════════════════
   LA BOUSSOLE — trois questions pour trouver la bonne mission.

   Un premier petit oui, sans engagement : on répond en trois clics, et on
   voit tout de suite la mission qui correspond, ce qu'elle dure et ce
   qu'elle demande. Rien n'est envoyé ; seule la mesure d'audience, si le
   visiteur l'a acceptée, compte les missions recommandées.

   La première question pèse double : c'est l'étape du projet qui décide
   de la mission. La deuxième départage. La troisième ne change pas la
   mission, elle change ce qu'on propose ensuite (l'agenda si c'est pressé,
   le guide gratuit si on se renseigne).
   ════════════════════════════════════════════════════════════ */
const QUESTIONS = [
  {
    q: 'Où en est votre projet ?',
    choix: [
      { t: 'Une idée, pas encore de clients', pour: 'idee' },
      { t: 'Un projet décidé, le business plan reste à écrire', pour: 'bp' },
      { t: 'Un dossier écrit, bientôt devant les financeurs', pour: 'dossier' },
      { t: 'Une entreprise qui tourne, des ventes à comprendre', pour: 'clients' },
    ],
  },
  {
    q: 'Qu’est-ce qui vous inquiète le plus ?',
    choix: [
      { t: 'Savoir si des clients achèteront vraiment', pour: 'idee' },
      { t: 'Chiffrer, financer, tout mettre en ordre', pour: 'bp' },
      { t: 'Les questions de la banque', pour: 'dossier' },
      { t: 'Pourquoi des clients achètent, ou partent', pour: 'clients' },
    ],
  },
  {
    q: 'Quand devez-vous décider ?',
    choix: [
      { t: 'Ce mois-ci', quand: 'vite' },
      { t: 'D’ici trois mois', quand: 'bientot' },
      { t: 'Je me renseigne', quand: 'plus-tard' },
    ],
  },
];

function recommander(reponses) {
  const score = {};
  reponses.forEach((r, i) => { if (r.pour) score[r.pour] = (score[r.pour] || 0) + (i === 0 ? 2 : 1); });
  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
}

export default function Boussole() {
  const [reponses, setReponses] = useState([]);
  const racine = useRef(null);
  const navigate = useNavigate();
  const etape = reponses.length;
  const fini = etape === QUESTIONS.length;
  const mission = fini ? OFFRE[recommander(reponses)] : null;
  const quand = fini ? reponses[2].quand : null;

  /* Chaque nouvelle étape se met au point, et le clavier la suit. */
  const avancer = (r) => {
    const suite = [...reponses, r];
    setReponses(suite);
    if (suite.length === QUESTIONS.length) mesurer('boussole', { mission: recommander(suite), quand: r.quand });
    requestAnimationFrame(() => {
      const bloc = racine.current?.querySelector('.bsl__etape');
      if (!bloc) return;
      apparaitre(bloc.children, { stagger: 0.05, duration: 0.9 });
      bloc.querySelector('[tabindex="-1"]')?.focus({ preventScroll: true });
    });
  };
  const reserver = () => {
    if (!isCalConfigured) { navigate('/contact', { state: { situation: mission.id } }); return; }
    openCalModal().catch(() => navigate('/contact', { state: { situation: mission.id } }));
  };

  return (
    <div className="bsl" ref={racine}>
      <div className="bsl__tete">
        <h2 className="bsl__titre" id="bsl-t">Vous hésitez&nbsp;? Trois questions pour trouver votre mission.</h2>
        <ol className="bsl__progres" aria-label={`Étape ${Math.min(etape + 1, 3)} sur 3`}>
          {QUESTIONS.map((_, i) => <li key={i} className={i < etape ? 'is-fait' : i === etape ? 'is-ici' : ''} />)}
        </ol>
      </div>

      {!fini ? (
        <fieldset className="bsl__etape" key={etape}>
          <legend className="bsl__q" tabIndex={-1}>{QUESTIONS[etape].q}</legend>
          <div className="bsl__choix">
            {QUESTIONS[etape].choix.map((c) => (
              <button type="button" key={c.t} className="bsl__bouton" onClick={() => avancer(c)}>{c.t}</button>
            ))}
          </div>
          {etape > 0 && (
            <button type="button" className="bsl__retour" onClick={() => setReponses(reponses.slice(0, -1))}>
              ← Question précédente
            </button>
          )}
        </fieldset>
      ) : (
        <div className="bsl__etape bsl__resultat" aria-live="polite">
          <p className="bsl__pour" tabIndex={-1}>La mission qui vous correspond</p>
          <p className="bsl__mission">{mission.nom}</p>
          <p className="bsl__accroche">{mission.accroche}</p>
          <p className="bsl__faits">{mission.faits.duree} · {mission.faits.temps} · prix fixe, écrit avant</p>
          {mission.garantie && <p className="bsl__garantie"><strong>Garantie&nbsp;:</strong> {mission.garantie}</p>}
          <div className="bsl__actions">
            {quand === 'plus-tard' ? (
              <a href={`${import.meta.env.BASE_URL}guides/12-questions-futurs-clients.pdf`} className="btn btn--primary" download>
                Le guide gratuit (PDF)<span className="btn__arrow" aria-hidden="true">↓</span>
              </a>
            ) : (
              <button type="button" className="btn btn--primary" onClick={reserver}>
                {quand === 'vite' ? 'Réserver 30 min cette semaine' : 'Réserver 30 min offertes'}
                <span className="btn__arrow" aria-hidden="true">→</span>
              </button>
            )}
            <Link to={mission.slug} className="btn btn--ghost">Voir la mission</Link>
          </div>
          <button type="button" className="bsl__retour" onClick={() => setReponses([])}>Recommencer</button>
        </div>
      )}
    </div>
  );
}
