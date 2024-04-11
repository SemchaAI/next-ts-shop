import Link from 'next/link';
import { ChangeTheme } from '../theme/ChangeTheme';
import css from './mainHeader.module.scss';
import UserSection from './UserSection';
import HeaderNavigation from '../navigations/HeaderNavigation';
import LocaleSwitcher from '../lang/LocaleSwitcher';
import { useTranslations } from 'next-intl';
import CustomSelect from '../lang/CustomSelect';

export function MainHeader() {
  const t = useTranslations('home');

  const navigationText = {
    cart: t('navigation.cart'),
    favorite: t('navigation.favorite'),
    admin: t('navigation.admin'),
    login: t('navigation.login'),
  };

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
            <HeaderNavigation navigationText={navigationText} />
            <div style={{ display: 'flex', minWidth: '100px' }}>
              <LocaleSwitcher />
            </div>
            <ChangeTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
