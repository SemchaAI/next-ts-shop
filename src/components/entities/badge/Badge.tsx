'use client';
import css from './badge.module.scss';
import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';
export default function Badge({ inBadge }: { inBadge: number }) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (inBadge === 0) return;
    animate(scope.current, {
      scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
      transition: { duration: 0.5 },
    });
  }, [inBadge, scope, animate]);

  return (
    <>
      {inBadge > 0 && (
        <div
          ref={scope}
          className={css.badge}
        >
          {inBadge}
        </div>
      )}
    </>
  );
}
