import { createSlice } from '@reduxjs/toolkit';

export type SortField = 'id' | 'time' | 'wins';
export type SortOrder = 'ASC' | 'DESC';

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
  itemsPerWinnersPage: 10,
  totalWinnersItems: 0,
  sortField: 'id',
  sortOrder: 'ASC',
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
