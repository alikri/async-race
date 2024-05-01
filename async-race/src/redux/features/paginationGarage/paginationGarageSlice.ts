import { createSlice } from '@reduxjs/toolkit';
import { CARS_PER_GARAGE_PAGE } from '../../../constants';

const initialState = {
  currentGaragePage: 1,
  totalGaragePages: 1,
  itemsPerGaragePage: CARS_PER_GARAGE_PAGE,
  totalGarageItems: 0,
};

export const paginationGarageSlice = createSlice({
  name: 'paginationGarage',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentGaragePage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalGarageItems = action.payload;
      state.totalGaragePages = Math.ceil(action.payload / state.itemsPerGaragePage);
    },
  },
});

export const { setPage, setTotalItems } = paginationGarageSlice.actions;
export default paginationGarageSlice.reducer;
