import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { instant } from '../lib/scrub';
import NetWord from './NetWord';
import { Reveal, RevealItem } from './Reveal';

/* En-tête de page : le premier mot du titre se forme via la trame réseau
   (NetWord), les mots suivants arrivent mot par mot via SplitText (delay pour
   laisser le NetWord se former d'abord). Le lead suit via Reveal standard. */
export default function PageHeader({ eyebrow, title, lead, tone = 'default', action }) {
  const word = title.split(' ')[0];
  const rest = title.slice(word.length).replace(/^\s+/, '');
  const restRef = useRef(null);

  useGSAP(
    () => {
      if (instant() || !restRef.current || !rest) return;

      let split = null;
      try {
        // aria: 'none' : par défaut SplitText pose un aria-label sur l'élément découpé,
        // aria-label interdit sur un paragraphe ou un span (le texte devient muet pour
        // un lecteur d'écran). Les lignes et les mots restent lisibles tels quels.
        split = new SplitText(restRef.current, { type: 'words', aria: 'none' });
        gsap.from(split.words, { z: -90, transformPerspective: 900, autoAlpha: 0, filter: 'blur(8px)', clearProps: 'filter',
          yPercent: 65,
          duration: 1.13,
          ease: 'expo.out',
          stagger: 0.072,
          delay: 0.55,
        });
      } catch {
        gsap.from(restRef.current, { z: -90, transformPerspective: 900, autoAlpha: 0, filter: 'blur(8px)', clearProps: 'filter',
          y: 30,
          duration: 1.15,
          ease: 'expo.out',
          delay: 0.45,
        });
      }

      return () => split?.revert();
    },
    { scope: restRef }
  );

  return (
    <header className={`pagehead${tone === 'eco' ? ' pagehead--eco' : ''}`}>
      <div className={`container${action ? ' pagehead__inner' : ''}`}>
        <div className="pagehead__main">
          {eyebrow && (
            <Reveal onMount>
              <RevealItem as="p" className="eyebrow eyebrow--index">
                {eyebrow}
              </RevealItem>
            </Reveal>
          )}

          <h1 className="pagehead__title">
            <span className="pagehead__title-word">
                {/* Le mot posé en transparent réserve la place que le dessin du
                  réseau occupera. C'est une mesure, pas un texte : il porte le
                  mot pour la largeur, et le lecteur d'écran lit celui-ci. */}
              <span className="pagehead__title-ghost">{word}</span>
              <NetWord className="pagehead__netword">{word}</NetWord>
            </span>
            {rest && (
              <>
                {' '}
                <span className="pagehead__title-rest" ref={restRef}>
                  {rest}
                </span>
              </>
            )}
          </h1>

          {lead && (
            <Reveal>
              <RevealItem as="p" className="lead pagehead__lead">
                {lead}
              </RevealItem>
            </Reveal>
          )}
        </div>

        {action && <div className="pagehead__action">{action}</div>}
      </div>
    </header>
  );
}
