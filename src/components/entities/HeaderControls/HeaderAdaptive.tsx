'use client';
import { useEffect, useState } from 'react';
import css from './headerControls.module.scss';
import BurgerMenu from '@/components/shared/icons/BurgerMenu';
import HeaderControls from './HeaderControls';
import Link from 'next/link';
import CloseIcon from '@/components/shared/icons/CloseIcon';
import { usePathname } from 'next/navigation';

const routes = [
  {
    name: 'First',
    path: '/',
  },
  {
    name: 'Second',
    path: '/',
  },
  {
    name: 'Third',
    path: '/',
  },
];

export default function HeaderAdaptive() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    console.log('pathname', pathname);
    setActive(() => false);
  }, [pathname]);

  const classes = `${css.headerContainer} ${
    active ? `${css.headerContainerActive} fadeIn` : ''
  }`;
  return (
    <>
      <div className={classes}>
        {active && (
          <div
            onClick={() => setActive(!active)}
            className={css.closeBtn}
          >
            <CloseIcon
              width={24}
              height={24}
            />
          </div>
        )}
        <nav className={css.nav}>
          <ul className={css.navList}>
            {routes.map((route) => (
              <li
                className={css.navItem}
                key={route.name}
              >
                <Link
                  className={css.navLink}
                  href={route.path}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <HeaderControls />
      </div>
      {active && (
        <div
          onClick={() => setActive(!active)}
          className={`${css.mobOverlay} fadeIn`}
        ></div>
      )}
      <div
        onClick={() => setActive(!active)}
        className={`fadeIn ${css.burgerMenu}`}
      >
        <BurgerMenu
          width={24}
          height={24}
        />
      </div>
    </>
  );
}
