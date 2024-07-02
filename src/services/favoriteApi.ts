import {
  FAVORITE_ROUTE,
  FAVORITE_ROUTE_ADD,
  FAVORITE_ROUTE_DELETE,
  FAVORITE_TAG,
} from '@/lib/utils/consts';
import type { IUserProduct } from '@/models/cart-favorite';
import { baseApi } from '@/services/api/baseApi';

export const favoriteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFavoriteProducts: build.query({
      query: (userId: string) => ({
        url: FAVORITE_ROUTE,
        params: {
          userId,
        },
      }),
      providesTags: [FAVORITE_TAG],
    }),
    addOneFavorite: build.mutation({
      query: (body: IUserProduct) => ({
        url: FAVORITE_ROUTE_ADD,
        method: 'POST',
        body,
      }),
      invalidatesTags: [FAVORITE_TAG],
    }),
    deleteOneFavorite: build.mutation({
      query: ({ userId, productId }: IUserProduct) => ({
        url: FAVORITE_ROUTE_DELETE,
        method: 'DELETE',
        body: { userId, productId },
      }),
      invalidatesTags: [FAVORITE_TAG],
    }),
  }),
});

export const {
  useLazyGetFavoriteProductsQuery,
  useAddOneFavoriteMutation,
  useDeleteOneFavoriteMutation,
} = favoriteApi;
