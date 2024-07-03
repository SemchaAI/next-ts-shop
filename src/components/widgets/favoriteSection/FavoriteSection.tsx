'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/lib/utils/hooks';
import { useDeleteOneFavoriteMutation } from '@/services/favoriteApi';
import { setError } from '@/stores/errors.slice';

import MainBtn from '@/components/shared/buttons/MainBtn';
import CloseIcon from '@/components/shared/icons/CloseIcon';

import css from './favoriteSection.module.scss';

export default function FavoriteSection() {
  const url = process.env.NEXT_PUBLIC_BASE_URL_BD;
  const dispatch = useAppDispatch();
  const { items: favorItems } = useAppSelector((state) => state.favorite);
  const { id: userId } = useAppSelector((state) => state.user.user);
  const [deleteFavorite] = useDeleteOneFavoriteMutation();

  const removeHandler = async (productId: string): Promise<void> => {
    if (userId === null) {
      dispatch(
        setError({
          critical: false,
          message: 'Login required',
          statusCode: 401,
        })
      );
      return;
    }
    deleteFavorite({ userId, productId });
  };

  // if (!favorItems) return <div>Loading...</div>;

  if (favorItems.length === 0)
    return <div className={css.emptyFavorite}>Favorite is empty</div>;

  return (
    <section className={css.favorite}>
      <div className="wrapper">
        <div className={css.favoriteContainer}>
          <h1 className={css.favoriteTitle}>Favorite</h1>
          <div className={css.favoriteBlock}>
            <ul className={css.favoriteItems}>
              <AnimatePresence mode="popLayout">
                {favorItems.map((item, i) => (
                  <motion.li
                    layout
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, translateX: [0, -2000] }}
                    transition={{ duration: 0.6 }}
                    className={css.favoriteItem}
                    key={item._id}
                  >
                    <div className={css.favoriteItemContainer}>
                      <Link
                        className={css.productLink}
                        href={`product/${item._id}`}
                      >
                        <Image
                          priority={i > 1 ? false : true}
                          // loading={i > 1 ? 'lazy' : 'eager'}
                          width={200}
                          height={200}
                          sizes="(max-width: 375px) 200px,200px"
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
                            onClick={() => removeHandler(item._id)}
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
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
