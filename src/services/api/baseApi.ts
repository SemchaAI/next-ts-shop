import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { PRODUCT_TAG, TYPE_TAG, CART_TAG, USER_TAG } from '@/lib/utils/consts';

export const baseApi = createApi({
  tagTypes: [CART_TAG, USER_TAG, PRODUCT_TAG, TYPE_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
