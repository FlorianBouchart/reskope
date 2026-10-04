import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { REVELATIONS } from '../lib/mouvement';
import { instant } from '../lib/scrub';

/* Reveal au scroll, piloté par IntersectionObserver (fiable sur mobile :
   pas de recalcul à refaire quand la barre d'URL iOS redimensionne le
   viewport, contrairement à ScrollTrigger). API conservée :
   <Reveal onMount? amount?> avec des <RevealItem as=...> à l'intérieur.
   Les éléments sont visibles par défaut (.reveal-item opacity:1) : aucun
   risque de contenu masqué si le JS échoue. */
export function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  amount = 0.2,
  onMount = false,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll('.reveal-item');
    if (!items.length) return;

    if (instant() || !REVELATIONS) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    // La mise au point (voir lib/mouvement.js) : de la profondeur, du flou au net.
    gsap.set(items, { opacity: 0, y: 22, z: -120, scale: 0.985, rotateX: -4, transformPerspective: 900, filter: 'blur(10px)' });
    const play = () =>
      gsap.to(items, {
        opacity: 1,
        y: 0,
        z: 0,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1.25,
        ease: 'expo.out',
        stagger: 0.08,
        clearProps: 'filter',
      });

    if (onMount) {
      const t = setTimeout(play, 60);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            play();
            obs.disconnect();
          }
        });
      },
      { rootMargin: `0px 0px -${Math.round(amount * 100)}% 0px` }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [onMount, amount]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

export function RevealItem({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`reveal-item ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
