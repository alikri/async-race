import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
  totalItems: 0,
};

export const paginationWinnerSlice = createSlice({
  name: 'paginationWinner',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      state.totalPages = Math.ceil(action.payload / state.itemsPerPage);
    },
  },
});

export const { setPage, setTotalPages, setTotalItems } = paginationWinnerSlice.actions;
export default paginationWinnerSlice.reducer;
