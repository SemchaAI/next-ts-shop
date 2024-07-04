'use client';

import { useAppSelector } from '@/lib/utils/hooks';
import { useLazyGetCartProductsQuery } from '@/services/cartApi';
import { useLazyGetFavoriteProductsQuery } from '@/services/favoriteApi';
import { useLazyRefreshQuery } from '@/services/userApi';
import { useEffect } from 'react';

export default function AppInit({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.user);
  const [refresh] = useLazyRefreshQuery();
  const [getCartProducts] = useLazyGetCartProductsQuery();
  const [getFavoriteProducts] = useLazyGetFavoriteProductsQuery();

  let isLogout: boolean = true;

  if (typeof window !== 'undefined') {
    isLogout = JSON.parse(localStorage.getItem('isLogout') || 'true');
  }
  useEffect(() => {
    async function init() {
      const user = await refresh();
      console.log('userINIT', user);
    }
    console.log('isLogout', isLogout);
    if (user.id === null && !isLogout) {
      init();
    }
  }, []);

  useEffect(() => {
    const userId = user.id;
    async function init() {
      if (userId) {
        const cart = await getCartProducts(userId);
        console.log('cart', cart);
        localStorage.setItem('cart', JSON.stringify(cart.data));

        await getFavoriteProducts(userId);
      }
    }
    init();
  }, [user, getCartProducts, getFavoriteProducts]);
  return <> {children}</>;
}
