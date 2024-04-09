'use client';
import { IUser, IUserStore } from '@/models/user';
import { userApi } from '@/services/userApi';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IUserStore = {
  user: {
    role: 'USER',
    id: '',
    name: '',
    email: '',
    isActivated: false,
  },
  isAuth: false,
  isLoading: false,
  accessToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    reset: () => initialState,
    isAdmin: (state) => {
      state.user.role === 'ADMIN';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = payload.user;
      }
    );
  },
});

// actions
export const { setAuth, setToken, setUser, setLoading, reset, isAdmin } =
  userSlice.actions;
