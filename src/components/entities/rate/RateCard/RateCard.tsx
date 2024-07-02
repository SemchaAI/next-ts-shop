import { IRate } from '@/models/products';
import React from 'react';
import StarRate from '../StarRate';
import css from './rateCard.module.scss';

export default function RateCard({ _id, rate, message, userId, name }: IRate) {
  return (
    <div className={css.rateCard}>
      <div className={css.rateInfo}>
        <p>{name}</p>
        <StarRate rate={rate} />
      </div>
      <div className={css.messageContainer}>
        <p className={css.message}>{message}</p>
      </div>
    </div>
  );
}
