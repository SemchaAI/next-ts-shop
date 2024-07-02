import {
  type FetchBaseQueryMeta,
  type FetchArgs,
  type FetchBaseQueryError,
  type BaseQueryApi,
} from '@reduxjs/toolkit/query';

import { baseQuery } from './baseQuery';

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };

import type { IUserResponse, ILogoutResponse } from '@/models/user';
import { USER_ROUTE_REFRESH, USER_ROUTE_LOGOUT } from '@/lib/utils/consts';

const AUTH_ERROR_CODES = new Set([401]);

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: NonNullable<unknown>
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  let result = await baseQuery(args, api, extraOptions);
  if (typeof result.error?.status === 'number' && result.error.status === 403) {
    localStorage.removeItem('user');
    localStorage.removeItem('isLogout');
    api.dispatch({
      type: 'user/reset',
    });
    api.dispatch({
      type: 'errors/setError',
      payload: {
        critical: false,
        statusCode: 403,
        message: 'Access denied. You are logged out.',
      },
    });
  }
  if (
    typeof result.error?.status === 'number' &&
    AUTH_ERROR_CODES.has(result.error.status)
  ) {
    try {
      const refreshResult = (await baseQuery(
        { url: USER_ROUTE_REFRESH },
        api,
        extraOptions
      )) as QueryReturnValue<
        IUserResponse,
        FetchBaseQueryError,
        FetchBaseQueryMeta
      >;
      console.log('refreshResult', refreshResult);
      if (refreshResult.data) {
        // store the new token
        // api.dispatch(setToken(refreshResult.data.accessToken));
        api.dispatch({
          type: 'user/setToken',
          payload: refreshResult.data.accessToken,
        });
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: refreshResult.data.user,
            accessToken: refreshResult.data.accessToken,
          })
        );

        // Retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        (await baseQuery(
          {
            url: USER_ROUTE_LOGOUT,
            method: 'POST',
          },
          api,
          extraOptions
        )) as QueryReturnValue<
          ILogoutResponse,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >;
        localStorage.removeItem('user');
        localStorage.removeItem('isLogout');
        api.dispatch({
          type: 'user/reset',
        });
        // window.location.href = '/login';
        // redirect('/login');
      }
    } catch (e) {
      console.log(e);
    }
  }
  return result;
}
