import type {
  IUser,
  IUserResponse,
  LoginRequest,
  RegisterRequest,
} from '@/models/user';
import {
  USER_ROUTE_LOGIN,
  USER_ROUTE_LOGOUT,
  USER_ROUTE_REGISTRATION,
  USER_ROUTE_REFRESH,
  USER_TAG,
  USER_ROUTE,
} from '@/lib/utils/consts';
import { baseApi } from '@/services/api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IUserResponse, LoginRequest>({
      query: (body) => ({
        url: USER_ROUTE_LOGIN,
        method: 'POST',
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
    register: build.mutation<IUserResponse, RegisterRequest>({
      query: (body) => ({
        url: USER_ROUTE_REGISTRATION,
        method: 'POST',
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
    refresh: build.query<IUserResponse, void>({
      query: () => ({
        url: USER_ROUTE_REFRESH,
        method: 'GET',
      }),
      providesTags: [USER_TAG],
    }),
    getUser: build.query<IUserResponse, void>({
      query: () => ({
        url: USER_ROUTE,
        method: 'GET',
      }),
      providesTags: [USER_TAG],
    }),
    logout: build.mutation({
      query: () => ({
        url: USER_ROUTE_LOGOUT,
        method: 'POST',
      }),
      invalidatesTags: [USER_TAG],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyRefreshQuery,
  useLazyGetUserQuery,
} = userApi;
