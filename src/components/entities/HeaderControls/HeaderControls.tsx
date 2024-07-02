'use client';
import { useAppSelector } from '@/lib/utils/hooks';
import css from './headerControls.module.scss';

import MainBtn from '@/components/shared/buttons/MainBtn';
import { useLogoutMutation } from '@/services/userApi';
import { useCallback } from 'react';
import MainLink from '@/components/shared/links/MainLink';
import Cart from '@/components/shared/icons/Cart';
import FavoriteIcon from '@/components/shared/icons/FavoriteIcon';
import Badge from '../badge/Badge';
import { ChangeTheme } from '@/components/features/theme/ChangeTheme';

export default function HeaderControls() {
  const { user } = useAppSelector((state) => state.user);
  const inFavorite = useAppSelector((state) => state.favorite.items.length);
  const inCart = useAppSelector((state) => state.cart.items.length);

  const [logout] = useLogoutMutation();

  const logoutHandler = useCallback(() => {
    logout(null);
    localStorage.removeItem('isLogout');
  }, []);

  if (user.isActivated) {
    return (
      <>
        <div className={css.navButtons}>
          {user.role === 'ADMIN' && (
            <MainLink
              mode="link"
              version="text"
              to={'/admin'}
            >
              Admin
            </MainLink>
          )}
          <MainLink
            mode="link"
            version="text"
            to={'/favorite'}
          >
            <div className={css.icon}>
              <FavoriteIcon className={css.headerIcon} />
              <Badge inBadge={inFavorite} />
            </div>
          </MainLink>
          <MainLink
            mode="link"
            version="text"
            to={'/cart'}
          >
            <div className={css.icon}>
              <Cart className={css.headerIcon} />
              <Badge inBadge={inCart} />
            </div>
          </MainLink>
          <ChangeTheme />
          <MainBtn
            onClick={logoutHandler}
            version="contain"
          >
            Log out
          </MainBtn>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={css.navButtons}>
        <MainLink
          mode="button"
          version="contain"
          to="/login"
        >
          Sign in
        </MainLink>
        <MainLink
          mode="button"
          version="contain"
          to="/registration"
        >
          Sign up
        </MainLink>
      </div>
    </>
  );
}
