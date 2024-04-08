import type { TError, IErrorState } from '@/models/errors';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IErrorState = {
  errors: [],
  lastAI: 0,
  timeout: 5000,
};
export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  selectors: {
    isCritical(state) {
      return state.errors.some((item) => item.critical);
    },
    isError(state) {
      state.errors.length > 0;
    },
  },
  reducers: {
    deleteError: (state, action: PayloadAction<number>) => {
      state.errors = state.errors.filter((item) => item.id !== action.payload);
    },
    setError: (state, action: PayloadAction<TError>) => {
      const currId = state.lastAI++;
      state.errors.push({
        id: currId,
        message: action.payload.message,
        critical: action.payload.critical,
      });
    },
  },
});

// selectors
export const { isCritical, isError } = errorsSlice.selectors;

// actions
export const { setError, deleteError } = errorsSlice.actions;
