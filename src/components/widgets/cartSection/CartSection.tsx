'use client';
import { useAppDispatch, useAppSelector } from '@/lib/utils/hooks';
import { useDeleteOneMutation } from '@/services/cartApi';

import css from './cartSection.module.scss';
import Image from 'next/image';
import MainBtn from '@/components/shared/buttons/MainBtn';
import CloseIcon from '@/components/shared/icons/CloseIcon';
import Link from 'next/link';
import { total } from '@/stores/cart.slice';
import { setError } from '@/stores/errors.slice';
import { IProduct } from '@/models/products';

export default function CartSection() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => total(state));
  const { id: userId } = useAppSelector((state) => state.user.user);

  const url = process.env.NEXT_PUBLIC_BASE_URL_BD;

  const [deleteOne] = useDeleteOneMutation();

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
    deleteOne({ userId, productId });
  };

  if (items.length === 0) {
    return <div className={css.emptyCart}>Cart is empty</div>;
  }
  if (!items) {
    <div className={css.cartError}>Error. Cart wasn`t loaded</div>;
  }
  return (
    <section className={css.cart}>
      <div className="wrapper">
        <div className={css.cartContainer}>
          <h1 className={css.cartTitle}>Cart</h1>
          <div className={css.cartBlock}>
            <ul className={css.cartItems}>
              {/* <AnimatePresence mode="popLayout"> */}
              {items.map((item: IProduct, i) => (
                <li
                  // layout
                  // initial={{ opacity: 1 }}
                  // exit={{ opacity: 0, translateX: [0, -2000] }}
                  // transition={{ duration: 0.6 }}
                  className={css.cartItem}
                  key={item._id}
                >
                  <div className={css.cartItemContainer}>
                    <Link
                      className={css.productLink}
                      href={`product/${item._id}`}
                    >
                      <Image
                        priority={i > 1 ? false : true}
                        width={200}
                        height={200}
                        sizes="(max-width: 375px) 200px,200px"
                        className={css.cartItemImg}
                        src={url + '/' + item.img}
                        alt={item.title}
                      />
                    </Link>
                    <div className={css.cartItemInfo}>
                      <h3 className={css.cartItemTitle}>{item.title}</h3>
                      <div className={css.cartItemDescription}>
                        {item.description}
                      </div>
                      <div className={css.cartItemPrice}>
                        <span>Price:</span>
                        {item.price}
                        <b>MDL</b>
                      </div>
                    </div>
                  </div>
                  <div className={css.btnsContainer}>
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
                  </div>
                </li>
              ))}
              {/* </AnimatePresence> */}
            </ul>
            <div className={css.cartOrder}>
              <h3 className={css.cartTotalTitle}>Total</h3>
              <div className={css.cartTotal}>{totalPrice} MDL</div>
              <div className={css.cartDelivery}>
                Delivery <span>free</span>
              </div>
              <p className={css.cartPolicy}>
                <span className={css.asterisk}>*</span>By purchasing goods from
                us you agree to the privacy policy
              </p>
              <Link
                className={css.cartLink}
                href="/"
              >
                Purchase now (temporal to home)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
