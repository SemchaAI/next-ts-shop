import type { ISlice } from '@/models/cart-favorite';
import { IProduct } from '@/models/products';
import { favoriteApi } from '@/services/favoriteApi';
import { userApi } from '@/services/userApi';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ISlice = {
  _id: null,
  items: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,

  reducers: {
    // setCartProducts: (state, action: PayloadAction<IProduct[]>) => {
    //   state.items = action.payload;
    // },
    reset: () => initialState,
  },
  selectors: {
    isInFavorite: (state, _id: string | null) => {
      if (!_id) return false;
      const event = (item: IProduct) => item._id === _id;
      return state.items.some(event);
    },
    total: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      favoriteApi.endpoints.getFavoriteProducts.matchFulfilled,
      (state, { payload }) => {
        state.items = payload;
        state._id = payload._id;
      }
    );
    builder.addMatcher(
      favoriteApi.endpoints.addOneFavorite.matchFulfilled,
      (state, { payload }) => {
        state.items = [...state.items, payload];
      }
    );
    builder.addMatcher(
      favoriteApi.endpoints.deleteOneFavorite.matchFulfilled,
      (state, { payload }) => {
        state.items = state.items.filter((item) => item._id !== payload._id);
      }
    );
    builder.addMatcher(
      userApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        state._id = null;
        state.items = [];
      }
    );
  },
});

// selectors
export const { isInFavorite, total } = favoriteSlice.selectors;

// actions
export const { reset } = favoriteSlice.actions;
