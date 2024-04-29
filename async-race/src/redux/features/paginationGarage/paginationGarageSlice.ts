import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 7,
  totalItems: 0,
};

export const paginationGarageSlice = createSlice({
  name: 'paginationGarage',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      state.totalPages = Math.ceil(action.payload / state.itemsPerPage);
    },
  },
});

export const { setPage, setTotalItems } = paginationGarageSlice.actions;
export default paginationGarageSlice.reducer;
