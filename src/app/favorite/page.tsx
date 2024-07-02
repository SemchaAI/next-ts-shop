import FavoriteSection from '@/components/widgets/favoriteSection/FavoriteSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next ts shop | Favorite',
  description: 'Favorite page of shop on next 14',
};

export default function FavoritePage() {
  return (
    <>
      <FavoriteSection />
    </>
  );
}
