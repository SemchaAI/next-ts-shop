'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { useDeleteOneMutation } from '@/services/cartApi';
import { useAppSelector } from '@/lib/hooks';

import type { IProduct } from '@/models/products';
import { total } from '@/stores/cart.slice';
import MainBtn from '@/components/buttons/MainBtn';
import CloseIcon from '@/components/icons/CloseIcon';

import css from './cartPanel.module.scss';
const url = process.env.NEXT_PUBLIC_BASE_URL_BD;

export default function CartPanel() {
  const { items } = useAppSelector((state) => state.cart);
  const totalPrice = useAppSelector((state) => total(state));
  const { id: userId } = useAppSelector((state) => state.user.user);

  console.log('total', totalPrice);

  const [deleteOne] = useDeleteOneMutation();

  const removeHandler = async (productId: string): Promise<void> => {
    deleteOne({ userId, productId });
  };

  if (items.length === 0) {
    return <div className={css.emptyCart}>Корзина пуста</div>;
  }
  if (!items) {
    <div className={css.cartError}>Ошибка. Корзина не была загружена</div>;
  }

  return (
    <div className={css.cartBlock}>
      <ul className={css.cartItems}>
        <AnimatePresence mode="popLayout">
          {items.map((item: IProduct) => (
            <motion.li
              layout
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, translateX: [0, -2000] }}
              transition={{ duration: 0.6 }}
              className={css.cartItem}
              key={item._id}
            >
              <div className={css.cartItemContainer}>
                <Image
                  priority={true}
                  width="200"
                  height="200"
                  className={css.cartItemImg}
                  src={url + '/' + item.img}
                  alt={item.title}
                />
                <div className={css.cartItemInfo}>
                  <div className={css.cartItemTitle}>{item.title}</div>
                  <div className={css.cartItemDescription}>
                    {item.description}
                  </div>
                  <div className={css.cartItemPrice}>
                    <span>Цена:</span>
                    {item.price}
                    <b>MDL</b>
                  </div>
                </div>
              </div>
              <MainBtn
                version="outline"
                icon={true}
                onClick={() => removeHandler(item._id)}
              >
                <CloseIcon
                  width={24}
                  height={24}
                  className={css.cartItemBtnIcon}
                />
              </MainBtn>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className={css.cartOrder}>
        <h3 className={css.cartTotalTitle}>Итого</h3>
        <div className={css.cartTotal}>{totalPrice} MDL</div>
        <div className={css.cartDelivery}>
          Доставка <span>бесплатно</span>
        </div>
        <p className={css.cartPolicy}>
          <span className={css.asterisk}>*</span>Покупая у нас товары вы
          соглашаетесь с политикой конфиденциальности
        </p>
        <Link
          className={css.cartLink}
          href="/"
        >
          Заказать сейчас (temporal to home)
        </Link>
      </div>
    </div>
  );
}
