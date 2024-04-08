import { IProduct } from '@/models/products';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { cookies } from 'next/headers';

interface IFavoriteSlice {
  items: IProduct[];
}
const initialState: IFavoriteSlice = {
  items: [],
};

// if (typeof window !== 'undefined') {
//   const favorStore = localStorage.getItem('favorite');
//   // const cookieStore = cookies().get('favorite');
//   // if (cookieStore !== undefined) {
//   //   initialState.items = JSON.parse(cookieStore.value);
//   // }
//   if (favorStore !== null) {
//     initialState.items = JSON.parse(favorStore);
//   }
// }

// #######################################
// I DOESNT FOUND BEST WAY FOR SYNC FAVORITE
// ONLY TO STORE IT ON SERVER
// NOW I USE LOCALSTORAGE BECAUSE DONT WANT TO CHANGE BACKEND
// I USE IT IN 3 MORE PROJECTS
// NOW BECAUSE OF SYNC BETWEEN CLIENT AND SERVER
// FAVOR PANEL  RERENDER TWICE (WITH INIT STATE [] AND AFTER IT CHANGES)
// COOKIES DOESNT WANT TO WORK OUTSIDE PAGE.TSX COMPONENT

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,

  reducers: {
    initFavorite: (state) => {
      // console.log(document.cookie);
      const favoriteStore = localStorage.getItem('favorite');
      if (favoriteStore) {
        state.items = JSON.parse(favoriteStore);
      }
    },
    addFavorite: (state, action: PayloadAction<IProduct>) => {
      console.log('add');
      state.items.push(action.payload);
      //document.cookie = 'favorite=' + JSON.stringify(state.items);
      localStorage.setItem('favorite', JSON.stringify(state.items));
    },
    removeFavorite: (state, action: PayloadAction<IProduct>) => {
      console.log('remove');
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      //document.cookie = 'favorite=' + JSON.stringify(state.items);
      localStorage.setItem('favorite', JSON.stringify(state.items));
    },
    favoriteHandler: (state, action: PayloadAction<IProduct>) => {
      console.log('payload', action.payload);
      const reducersPath = favoriteSlice.actions;
      console.log(isFavorite(state, action.payload));
      // isFavorite(state, action.payload)
      //   ? reducersPath.removeFavorite(action.payload)
      reducersPath.addFavorite(action.payload);
    },
    reset: () => initialState,
  },
});

export const isFavorite = (state: IFavoriteSlice, product: IProduct | null) => {
  if (!product) return false;
  const items = state.items;
  return items.some((e) => e._id === product._id);
};

// selectors
// export const { getUser, getIsAuth, getIsLoading } = userSlice.selectors;

// actions
export const {
  reset,
  initFavorite,
  addFavorite,
  removeFavorite,
  favoriteHandler,
} = favoriteSlice.actions;
