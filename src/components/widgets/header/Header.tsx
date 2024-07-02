import Link from 'next/link';
import css from './header.module.scss';
// import HeaderControls from '@/components/entities/HeaderControls/HeaderControls';
import HeaderAdaptive from '@/components/entities/HeaderControls/HeaderAdaptive';

export default function Header() {
  return (
    <header className={css.header}>
      <div className="wrapper">
        <div className={css.headerContainer}>
          <div className={css.logo}>
            <Link
              className={css.logoLink}
              href="/"
            >
              logo
            </Link>
          </div>
          <HeaderAdaptive />
        </div>
      </div>
    </header>
  );
}
