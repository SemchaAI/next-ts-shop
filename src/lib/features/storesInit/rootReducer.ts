import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from '@/stores/user.slice';
import { favoriteSlice } from '@/stores/favorite.slice';
import { cartSlice } from '@/stores/cart.slice';
import { productSlice } from '@/stores/product.slice';

// very important to be initialized here
import { baseApi } from '@/services/api/baseApi';

export const rootReducer = combineReducers({
  [productSlice.name]: productSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
