import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rootReducer } from './rootReducer';

import { baseApi } from '@/services/api/baseApi';

export function makeStore() {
  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    // reducer: persistReducer(
    //   persistConfig,
    //   rootReducer
    // ) as unknown as typeof rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    //   }),
    // .concat(baseApi.middleware),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
}

export const appStore = makeStore();
// export const persistedStore = persistStore(appStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
