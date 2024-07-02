import type { ISlice } from '@/models/cart-favorite';
import { IProduct } from '@/models/products';
import { cartApi } from '@/services/cartApi';
import { userApi } from '@/services/userApi';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ISlice = {
  _id: null,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // setCartProducts: (state, action: PayloadAction<IProduct[]>) => {
    //   state.items = action.payload;
    // },
    setCart(state, action: PayloadAction<ISlice>) {
      state._id = action.payload._id;
      state.items = action.payload.items;
    },
    reset: () => initialState,
  },
  selectors: {
    isInCart: (state, _id: string | null) => {
      if (!_id) return false;
      const event = (item: IProduct) => item._id === _id;
      return state.items.some(event);
    },
    total: (state) => state.items.reduce((acc, item) => acc + item.price, 0),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCartProducts.matchFulfilled,
      (state, { payload }) => {
        state.items = payload;
        state._id = payload._id;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.addOne.matchFulfilled,
      (state, { payload }) => {
        state.items = [...state.items, payload];
      }
    );
    builder.addMatcher(
      cartApi.endpoints.deleteOne.matchFulfilled,
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
export const { isInCart, total } = cartSlice.selectors;

// actions
export const { reset, setCart } = cartSlice.actions;
