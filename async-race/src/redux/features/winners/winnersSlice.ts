import { createSlice } from '@reduxjs/toolkit';
import { fetchWinners, removeWinner, saveWinner } from './winnersThunks';
import { WinnerData } from '../../../types';

interface WinnersState {
  winners: WinnerData[];
  totalCount: number;
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(saveWinner.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.winners.findIndex(winner => winner.id === action.payload?.id);
          if (index !== -1) {
            state.winners[index] = action.payload;
          } else {
            state.winners.push(action.payload);
          }
        } else {
          console.error('Failed to save winner due to invalid data');
        }
      })
      .addCase(removeWinner.fulfilled, (state, action) => {
        state.winners = state.winners.filter(winner => winner.id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(removeWinner.rejected, (state, action) => {
        console.error('Failed to delete winner with ID:', action.payload);
      });
  },
});

export default winnersSlice.reducer;
