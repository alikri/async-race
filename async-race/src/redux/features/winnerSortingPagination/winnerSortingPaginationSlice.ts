import { createSlice } from '@reduxjs/toolkit';
import { SortField, SortOrder } from '../../../types';
import { CARS_PER_WINNER_PAGE } from '../../../constants';

interface PaginationState {
  currentWinnersPage: number;
  totalWinnersPages: number;
  itemsPerWinnersPage: number;
  totalWinnersItems: number;
  sortField: SortField;
  sortOrder: SortOrder;
}

const initialState: PaginationState = {
  currentWinnersPage: 1,
  totalWinnersPages: 1,
  itemsPerWinnersPage: CARS_PER_WINNER_PAGE,
  totalWinnersItems: 0,
  sortField: SortField.ID,
  sortOrder: SortOrder.ASC,
};

export const winnerSortingPaginationSlice = createSlice({
  name: 'winnerSortingPagination',
  initialState,
  reducers: {
    setWinnerCurrentPage: (state, action) => {
      state.currentWinnersPage = action.payload;
    },
    setTotalWinnerItems: (state, action) => {
      state.totalWinnersItems = action.payload;
      state.totalWinnersPages = Math.ceil(action.payload / state.itemsPerWinnersPage);
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setWinnerCurrentPage, setTotalWinnerItems, setSortOrder, setSortField } =
  winnerSortingPaginationSlice.actions;
export default winnerSortingPaginationSlice.reducer;
