import { useEffect, useMemo, useRef } from 'react';
import { enterProgress, makeScrub, instant } from '../lib/scrub';

/* ============================================================
   Le rendu d'une scène axonométrique (voir lib/axono.js).

   La scène ne tourne pas : elle SE CONSTRUIT. Chaque descripteur porte un
   numéro de groupe `g` ; à mesure que le schéma entre dans l'écran, les
   groupes se posent l'un après l'autre, du sol vers les volumes puis les
   étiquettes. C'est le geste d'un plan qu'on dessine, pas celui d'un objet
   qu'on fait pivoter — et c'est ce qui distingue chaque univers : le
   tempo et la direction d'arrivée sont réglés par CSS, par univers.

   Accessibilité : le schéma est décoratif, la légende sous lui porte
   l'information. `titre` alimente le <title> SVG pour les lecteurs d'écran.
   ============================================================ */

function Piece({ p }) {
  const common = { className: p.cls, style: { '--g': p.g || 0 } };
  if (p.t === 'polygon') return <polygon {...common} points={p.points} />;
  if (p.t === 'line') return <line {...common} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} />;
  if (p.t === 'circle') return <circle {...common} cx={p.cx} cy={p.cy} r={p.r} />;
  if (p.t === 'ellipse') return <ellipse {...common} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} />;
  if (p.t === 'text') {
    return (
      <text {...common} x={p.x} y={p.y} textAnchor={p.anchor === 'start' ? undefined : p.anchor}>
        {p.txt}
      </text>
    );
  }
  return null;
}

export default function Axono({ scene, titre, className = '', max = 760 }) {
  const hote = useRef(null);
  const s = useMemo(() => (typeof scene === 'function' ? scene() : scene), [scene]);

  useEffect(() => {
    const el = hote.current;
    if (!el) return undefined;
    if (instant()) {
      el.style.setProperty('--av', String(s.groupes + 1));
      return undefined;
    }
    /* --av = combien de groupes sont déjà posés. Le CSS compare --g à --av
       pour chaque pièce : au-delà, la pièce n'est pas encore arrivée. */
    return makeScrub(
      () => enterProgress(el, 0.92, 0.34),
      (p) => el.style.setProperty('--av', String(p * (s.groupes + 0.8))),
    );
  }, [s]);

  return (
    <div className={`axono ${className}`} ref={hote} style={{ '--ax-max': `${max}px` }}>
      <svg
        viewBox={s.viewBox}
        role="img"
        aria-label={titre}
        preserveAspectRatio="xMidYMid meet"
        style={{ aspectRatio: `${s.w} / ${s.h}` }}
      >
        <title>{titre}</title>
        {s.pieces.map((p, i) => <Piece key={i} p={p} />)}
      </svg>
    </div>
  );
}
