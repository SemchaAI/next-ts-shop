<<<<<<< Updated upstream
import { Metadata } from 'next';

import css from './favoritePage.module.scss';
import FavoritePanel from '@/components/widgets/favoritePanel/FavoritePanel';

=======
import FavoriteSection from '@/components/widgets/favoriteSection/FavoriteSection';
import { Metadata } from 'next';

>>>>>>> Stashed changes
export const metadata: Metadata = {
  title: 'Next ts shop | Favorite',
  description: 'Favorite page of shop on next 14',
};

export default function FavoritePage() {
  return (
<<<<<<< Updated upstream
    <section className={css.favorite}>
      <div className="wrapper">
        <div className={css.favoriteContainer}>
          <h1 className={css.favoriteTitle}>Избранное</h1>
          <FavoritePanel />
        </div>
      </div>
    </section>
=======
    <>
      <FavoriteSection />
    </>
>>>>>>> Stashed changes
  );
}
