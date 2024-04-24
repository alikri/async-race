import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAndUpdateWinners,
  addWinner,
  updateExistingWinner,
  deleteExistingWinner,
  fetchWinner,
} from './winnersAPI';
import { WinnerData } from '../../../types';

interface WinnersState {
  winners: WinnerData[];
  loading: boolean;
  error: string | null;
}

const initialState: WinnersState = {
  winners: [],
  loading: false,
  error: null,
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAndUpdateWinners.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAndUpdateWinners.fulfilled, (state, action) => {
        state.winners = action.payload.winners;
        state.loading = false;
      })
      .addCase(fetchAndUpdateWinners.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(addWinner.pending, state => {
        state.loading = true;
      })
      .addCase(addWinner.fulfilled, (state, action) => {
        state.winners.push(action.payload);
        state.loading = false;
      })
      .addCase(addWinner.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateExistingWinner.fulfilled, (state, action) => {
        const index = state.winners.findIndex(winner => winner.id === action.payload.id);
        if (index !== -1) {
          state.winners[index] = action.payload.updatedWinner;
        }
      })
      .addCase(deleteExistingWinner.fulfilled, (state, action) => {
        state.winners = state.winners.filter(winner => winner.id !== action.payload);
      })
      .addCase(fetchWinner.pending, state => {
        state.loading = true;
      })
      .addCase(fetchWinner.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchWinner.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default winnersSlice.reducer;
