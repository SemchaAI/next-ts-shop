import Link from 'next/link';
import { ChangeTheme } from '../theme/ChangeTheme';
import css from './mainHeader.module.scss';
import UserSection from './UserSection';
import HeaderNavigation from '../navigations/HeaderNavigation';

export function MainHeader() {
  console.log('header');
  return (
    <header className={css.header}>
      <div className="wrapper">
        <div className={css.headerContainer}>
          <Link
            className={`${css.logoLink} ${css.headerBlock}`}
            href="/"
          >
            ЛОГО
          </Link>
          <UserSection className={css.headerBlock} />
          <div className={css.headerBlock}>
            <HeaderNavigation />
            <ChangeTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
