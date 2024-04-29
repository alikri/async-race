/* eslint-disable prefer-destructuring */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface RaceStatus {
  id: number;
  time: number;
}

interface RaceResultState {
  winner: RaceStatus | null;
}

const initialState: RaceResultState = {
  winner: null,
};

const raceResultsSlice = createSlice({
  name: 'raceResults',
  initialState,
  reducers: {
    resetRaceResults(state) {
      state.winner = null;
    },
    updateWinner(state, action: PayloadAction<RaceStatus>) {
      if (state.winner === null) {
        state.winner = action.payload;
      }
    },
  },
});

export const { resetRaceResults, updateWinner } = raceResultsSlice.actions;

export default raceResultsSlice.reducer;

export const selectRaceResults = (state: RootState) => state.raceResults;
