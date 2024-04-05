'use client';
import { IProduct } from '@/models/products';
import css from './productCard.module.scss';
// import { Link } from 'react-router-dom';
import MainBtn from '@/components/buttons/MainBtn';

import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from '@/stores/favorite.slice';
import { isInCart } from '@/stores/cart.slice';
import OutOfStock from '@/components/icons/OutOfStock';
import CheckIcon from '@/components/icons/CheckIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import FavoriteIcon from '@/components/icons/FavoriteIcon';
import BtnPlus from '@/components/icons/BtnPlus';
import { useAddOneMutation, useDeleteOneMutation } from '@/services/cartApi';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { PRODUCT_ROUTE } from '@/lib/utils/consts';
import Image from 'next/image';

export default function ProductCard({ product }: { product: IProduct }) {
  const url = process.env.NEXT_PUBLIC_BASE_URL_BD;
  const isFavor = useAppSelector((state) =>
    isFavorite(state.favorite, product || null)
  );
  const favorClass = isFavor ? css.active : css.inactive;
  const productId = product._id;
  const isProductInCart = useAppSelector((state) => isInCart(state, productId));
  const userId = useAppSelector((state) => state.user.user.id);
  const dispatch = useAppDispatch();

  const [deleteOne] = useDeleteOneMutation();
  const [addOne] = useAddOneMutation();

  const favoriteHandler = (product: IProduct) => {
    if (isFavor) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <li className={css.product}>
      <Link
        className={css.productLink}
        href={`${PRODUCT_ROUTE}/${product._id}`}
      >
        <Image
          className={css.productImg}
          width={200}
          height={200}
          priority={true}
          src={url + `/` + product.img}
          alt={product.title}
        />
        <h3 className={css.productTitle}>{product.title}</h3>
      </Link>
      <div className={css.productInfo}>
        <div className={css.productContainer}>
          <div className={css.productPriceLabel}>Цена:</div>
          <p className={css.productPrice}>{product.price}MDL</p>
        </div>
        <div className={css.productControls}>
          {isProductInCart ? (
            <div className={css.outOfStockContainer}>
              <p className={css.productText}>
                <CheckIcon />
                Добавлен
              </p>
              <MainBtn
                icon={true}
                version="outline"
                onClick={() => deleteOne({ userId, productId })}
              >
                <CloseIcon
                  width={24}
                  height={24}
                />
              </MainBtn>
            </div>
          ) : product.cnt <= 0 ? (
            <div className={css.outOfStockContainer}>
              <p className={css.productText}>Отсутствует</p>
              <OutOfStock className={css.productBtnContainer} />
            </div>
          ) : (
            <div className={css.productBtnsContainer}>
              <button
                onClick={() => favoriteHandler(product)}
                className={css.productBtnContainer}
              >
                <FavoriteIcon className={`${css.favoriteIcon} ${favorClass}`} />
              </button>
              <button
                onClick={() => addOne({ userId, productId })}
                className={css.productBtnContainer}
              >
                <BtnPlus />
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
