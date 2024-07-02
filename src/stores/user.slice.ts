'use client';
import { IUserResponse } from '@/models/user';
import { userApi } from '@/services/userApi';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IUserResponse = {
  user: {
    email: '',
    password: '',
    name: '',
    id: null,
    isActivated: false,
    role: 'USER',
  },
  accessToken: '',
  refreshToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload.user;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = payload.user;
      }
    );
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = payload.user;
      }
    );
    builder.addMatcher(
      userApi.endpoints.refresh.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = payload.user;
      }
    );
    builder.addMatcher(
      userApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = '';
        state.user = initialState.user;
      }
    );
  },
});

// actions
export const { setUser, setToken, reset } = userSlice.actions;
