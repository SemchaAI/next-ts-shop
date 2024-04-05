import { Metadata } from 'next';

import css from './favoritePage.module.scss';
import FavoritePanel from '@/components/widgets/favoritePanel/FavoritePanel';

export const metadata: Metadata = {
  title: 'Next ts shop | Favorite',
  description: 'Favorite page of shop on next 14',
};

export default function FavoritePage() {
  return (
    <section className={css.favorite}>
      <div className="wrapper">
        <div className={css.favoriteContainer}>
          <h1 className={css.favoriteTitle}>Избранное</h1>
          <FavoritePanel />
        </div>
      </div>
    </section>
  );
}
