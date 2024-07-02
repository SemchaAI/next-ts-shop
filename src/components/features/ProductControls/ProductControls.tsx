'use client';
import { useAppDispatch, useAppSelector } from '@/lib/utils/hooks';

import { isInCart } from '@/stores/cart.slice';
import { isInFavorite } from '@/stores/favorite.slice';
import { setError } from '@/stores/errors.slice';

import { useAddOneMutation, useDeleteOneMutation } from '@/services/cartApi';
import {
  useAddOneFavoriteMutation,
  useDeleteOneFavoriteMutation,
} from '@/services/favoriteApi';

import OutOfStock from '@/components/shared/icons/OutOfStock';
import FavoriteIcon from '@/components/shared/icons/FavoriteIcon';
import BtnClose from '@/components/shared/icons/BtnClose';
import BtnPlus from '@/components/shared/icons/BtnPlus';

import type { IChangeCommon } from '@/models/cart-favorite';
import type { IProduct } from '@/models/products';

import css from './productControls.module.scss';

interface ProductProps {
  product: IProduct;
}

export default function ProductControls({ product }: ProductProps) {
  const productId = product._id;
  // PRODUCT CONTROLS VARIABLES
  const isProductInCart = useAppSelector((state) => isInCart(state, productId));
  const isProductInFavorite = useAppSelector((state) =>
    isInFavorite(state, productId)
  );
  const outOfStock = product.cnt <= 0;

  const userId = useAppSelector((state) => state.user.user.id);
  const dispatch = useAppDispatch();

  const [deleteOne] = useDeleteOneMutation();
  const [addOne] = useAddOneMutation();

  const [deleteOneFavorite] = useDeleteOneFavoriteMutation();
  const [addOneFavorite] = useAddOneFavoriteMutation();
  const isActive = isProductInFavorite ? css.active : css.inactive;

  const CartHandler = ({ userId, productId }: IChangeCommon) => {
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
    if (isProductInCart) {
      deleteOne({ userId, productId });
    } else {
      addOne({ userId, productId });
    }
  };
  const FavoriteHandler = ({ userId, productId }: IChangeCommon) => {
    if (userId === null) {
      dispatch(
        setError({
          critical: false,
          message: 'Favorites not loaded. Login required.',
          statusCode: 401,
        })
      );
      return;
    }
    if (isProductInFavorite) {
      deleteOneFavorite({ userId, productId });
    } else {
      addOneFavorite({ userId, productId });
    }
  };

  return (
    <div className={css.productControls}>
      {outOfStock ? (
        <>
          <div className={css.productBtnsContainer}>
            <button
              onClick={() =>
                FavoriteHandler({
                  userId,
                  productId,
                })
              }
              className={css.productBtnContainer + ' ' + css.favorBtn}
              aria-label="Add/delete from favorite"
            >
              <FavoriteIcon className={`${css.favoriteIcon} ${isActive}`} />
            </button>
          </div>
          <div className={css.outOfStockContainer}>
            <p className={css.productText}>Out of stock</p>
            <OutOfStock className={css.productBtnContainer} />
          </div>
        </>
      ) : (
        <div className={css.productBtnsContainer}>
          <button
            onClick={() =>
              FavoriteHandler({
                userId,
                productId,
              })
            }
            className={css.productBtnContainer + ' ' + css.favorBtn}
            aria-label="Add/delete from favorite"
          >
            <FavoriteIcon className={`${css.favoriteIcon} ${isActive}`} />
          </button>
          <button
            onClick={() =>
              CartHandler({
                userId,
                productId,
              })
            }
            className={css.productBtnContainer}
            aria-label="Add/ delete from cart"
          >
            {isProductInCart ? (
              <BtnClose
                width={24}
                height={24}
                className={`${css.icon} ${css.active}`}
              />
            ) : (
              <BtnPlus
                width={24}
                height={24}
                className={`${css.icon} ${css.inactive}`}
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
