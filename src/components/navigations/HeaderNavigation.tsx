'use client';
import css from './headerNavigation.module.scss';
import MainLink from '../links/MainLink';
import { useGetCartProductsQuery } from '@/services/cartApi';
// import { useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Badge from '../badge/Badge';
import { useEffect } from 'react';
import { initFavorite } from '@/stores/favorite.slice';

interface IProps {
  navigationText: {
    cart: string;
    favorite: string;
    admin: string;
    login: string;
  };
}

export default function HeaderNavigation({ navigationText }: IProps) {
  console.log('navigationText', navigationText);
  const { isAuth, user } = useAppSelector((state) => state.user);
  const isAdmin = user.role === 'ADMIN';
  useGetCartProductsQuery(user.id, {
    skip: !isAuth,
    refetchOnMountOrArgChange: true,
  });
  const inCart = useAppSelector((state) => state.cart.items.length);
  const inFavorite = useAppSelector((state) => state.favorite.items.length);

  const dispatch = useAppDispatch();
  console.log('init favorite');

  useEffect(() => {
    dispatch(initFavorite());
  }, [dispatch]);

  console.log('nav');
  return (
    <nav className={css.headerNav}>
      {isAdmin && <MainLink to="/admin">{navigationText.admin}</MainLink>}
      {isAuth && (
        <>
          <MainLink to="/cart">
            {navigationText.cart}
            <Badge inBadge={inCart} />
          </MainLink>
          <MainLink to="/favorite">
            {navigationText.favorite}
            <Badge inBadge={inFavorite} />
          </MainLink>
        </>
      )}
      <MainLink to="/login">{navigationText.login}</MainLink>
    </nav>
  );
}
