import StarRate from '@/components/entities/rate/StarRate';
import css from './productRate.module.scss';
import type { IRating } from '@/models/products';

export default function ProductRate({ mediumRate, rates }: IRating) {
  const rateString = rates <= 1 ? 'rate' : 'rates';
  return (
    <div className={css.rateContainer}>
      <span className={css.productInfoLabel}>Rating:</span>
      <div className={css.ratingRow}>
        <StarRate
          rate={mediumRate}
          className={css.productRate}
        />
        <div className={css.ratingInfo}>
          <span className={css.rate}>{mediumRate.toFixed(1)}</span>
          <span>
            by {rates} {rateString}
          </span>
        </div>
      </div>
    </div>
  );
}
