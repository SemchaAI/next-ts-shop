'use client';
import React, { useCallback, useEffect } from 'react';
import MainBtn from '../buttons/MainBtn';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useLazyLogoutQuery, useLazyTestQuery } from '@/services/userApi';
import { reset, setAuth, setToken, setUser } from '@/stores/user.slice';
import { reset as resetCart } from '@/stores/cart.slice';
import { reset as resetProduct } from '@/stores/product.slice';
import { reset as resetFavorite } from '@/stores/favorite.slice';
import LoadingSpinner from '../indicators/LoadingSpinner';

import css from './userSection.module.scss';

export default function UserSection({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const { user, isAuth, isLoading } = useAppSelector((state) => state.user);
  const [trigger, { data }] = useLazyTestQuery();
  const [logout] = useLazyLogoutQuery();

  const logoutHandler = useCallback(() => {
    logout(null);
    dispatch(reset());
    dispatch(resetCart());
    dispatch(resetProduct());
    dispatch(resetFavorite());
  }, []);

  useEffect(() => {
    let user;
    if (typeof window !== 'undefined') {
      user = localStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        dispatch(setAuth(true));
        dispatch(setUser(user.user));
        dispatch(setToken(user.accessToken));
      }
    }
  }, []);

  const clickHandler = useCallback(async () => {
    await trigger(null);
  }, []);

  console.log('userSection');
  const classes = `${css.user} ${className}`;
  return (
    <>
      {isLoading ? (
        <div className={css.loadingSpinner}>
          <LoadingSpinner />
        </div>
      ) : (
        isAuth && (
          <div className={classes}>
            {user.name}
            <MainBtn
              version="contain"
              onClick={logoutHandler}
            >
              Logout
            </MainBtn>
            <MainBtn
              onClick={clickHandler}
              version="contain"
            >
              Test -{data === undefined ? 'false' : 'true'}
            </MainBtn>
          </div>
        )
      )}
    </>
  );
}
