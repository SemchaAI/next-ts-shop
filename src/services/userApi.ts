import type {
  IAuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@/models/user';
import {
  USER_ROUTE_LOGIN,
  USER_ROUTE_LOGOUT,
  USER_ROUTE_REGISTRATION,
  USER_ROUTE_TEST,
  USER_TAG,
} from '@/lib/utils/consts';
import { baseApi } from '@/services/api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IAuthResponse, LoginRequest>({
      query: (body) => ({
        url: USER_ROUTE_LOGIN,
        method: 'POST',
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
    test: build.query({
      query: () => ({
        url: USER_ROUTE_TEST,
        method: 'GET',
      }),
      providesTags: [USER_TAG],
    }),
    register: build.mutation<IAuthResponse, RegisterRequest>({
      query: (body) => ({
        url: USER_ROUTE_REGISTRATION,
        method: 'POST',
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
    logout: build.query({
      query: () => ({
        url: USER_ROUTE_LOGOUT,
        method: 'POST',
      }),
      providesTags: [USER_TAG],
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyTestQuery,
  useRegisterMutation,
  useLazyLogoutQuery,
} = userApi;
