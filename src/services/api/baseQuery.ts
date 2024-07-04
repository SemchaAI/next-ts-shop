import { RootState } from '@/lib/features/storesInit/appStore';
import {
  type BaseQueryFn,
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  NonNullable<unknown>,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL_BD}/api`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    console.log((getState() as RootState).user, 'BaseQuery-USER');
    const { accessToken } = (getState() as RootState).user;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});
