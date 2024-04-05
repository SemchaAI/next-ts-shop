'use client';
import Link from 'next/link';
import Image from 'next/image';

import css from './favoritePanel.module.scss';
import MainBtn from '@/components/buttons/MainBtn';
import CloseIcon from '@/components/icons/CloseIcon';

import type { IProduct } from '@/models/products';

import { initFavorite, removeFavorite } from '@/stores/favorite.slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';

const url = process.env.NEXT_PUBLIC_BASE_URL_BD;

export default function FavoritePanel() {
  const { items: favorItems } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();
  console.log('init favorite');
  console.log('favorItems', favorItems);

  useEffect(() => {
    dispatch(initFavorite());
  }, [dispatch]);

  const removeHandler = (item: IProduct) => {
    dispatch(removeFavorite(item));
  };

  // if (!favorItems) return <div>Loading...</div>;

  if (favorItems.length === 0)
    return <div className={css.emptyFavorite}>Избранного нет</div>;

  return (
    <div className={css.favoriteBlock}>
      <ul className={css.favoriteItems}>
        {favorItems.map((item) => (
          <li
            className={css.favoriteItem}
            key={item._id}
          >
            <div className={css.favoriteItemContainer}>
              <Link
                className={css.productLink}
                href={`product/${item._id}`}
              >
                <Image
                  priority={true}
                  width="200"
                  height="200"
                  className={css.favoriteItemImg}
                  src={url + '/' + item.img}
                  alt={item.title}
                />
              </Link>
              <div className={css.favoriteItemInfo}>
                <div className={css.favoriteItemTitle}>{item.title}</div>
                <div className={css.favoriteItemDescription}>
                  {item.description}
                </div>
                <div className={css.favoriteControls}>
                  <div className={css.favoriteItemPrice}>
                    <span>Цена:</span>
                    {item.price}
                    <b>MDL</b>
                  </div>
                  <MainBtn
                    onClick={() => removeHandler(item)}
                    icon={true}
                  >
                    <CloseIcon
                      width={24}
                      height={24}
                    />
                  </MainBtn>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
