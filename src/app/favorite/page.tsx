'use client';
import MainBtn from '@/components/buttons/MainBtn';
import CloseIcon from '@/components/icons/CloseIcon';

import css from './favoritePage.module.scss';
import { IProduct } from '@/models/products';
import { removeFavorite } from '@/stores/favorite.slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import Image from 'next/image';

const url = process.env.NEXT_PUBLIC_BASE_URL_BD;

export default function FavoritePage() {
  const { items: favorItems } = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();

  const removeHandler = (item: IProduct) => {
    dispatch(removeFavorite(item));
  };
  return (
    <section className={css.favorite}>
      <div className="wrapper">
        <div className={css.favoriteContainer}>
          <h1 className={css.favoriteTitle}>Избранное</h1>
          {favorItems.length > 0 ? (
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
                        <div className={css.favoriteItemTitle}>
                          {item.title}
                        </div>
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
          ) : (
            <div className={css.emptyFavorite}>Избранного нет</div>
          )}
        </div>
      </div>
    </section>
  );
}
