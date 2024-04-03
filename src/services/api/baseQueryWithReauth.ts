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

// import { setToken } from '@/stores/user.slice';
import { IAuthResponse, ILogoutResponse } from '@/models/user';
import { USER_ROUTE_REFRESH, USER_ROUTE_LOGOUT } from '@/lib/utils/consts';
import { reset, setToken } from '@/stores/user.slice';

const AUTH_ERROR_CODES = new Set([401]);

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: NonNullable<unknown>
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  let result = await baseQuery(args, api, extraOptions);
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
        IAuthResponse,
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
        localStorage.setItem('user', JSON.stringify(refreshResult.data));
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
        // api.dispatch(reset());
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
