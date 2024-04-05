'use client';
import css from './headerNavigation.module.scss';
import MainLink from '../links/MainLink';
import { useGetCartProductsQuery } from '@/services/cartApi';
// import { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@/lib/hooks';
import Badge from '../badge/Badge';

export default function HeaderNavigation() {
  const { isAuth, user } = useAppSelector((state) => state.user);
  const isAdmin = user.role === 'ADMIN';
  useGetCartProductsQuery(user.id, {
    skip: !isAuth,
    refetchOnMountOrArgChange: true,
  });
  const inCart = useAppSelector((state) => state.cart.items.length);
  const inFavorite = useAppSelector((state) => state.favorite.items.length);

  console.log('nav');
  return (
    <nav className={css.headerNav}>
      {isAdmin && <MainLink to="/admin">Admin</MainLink>}
      {isAuth && (
        <>
          <MainLink to="/cart">
            Cart
            <Badge inBadge={inCart} />
          </MainLink>
          <MainLink to="/favorite">
            Favorite
            <Badge inBadge={inFavorite} />
          </MainLink>
        </>
      )}
      <MainLink to="/login">Sign in/up</MainLink>
    </nav>
  );
}
