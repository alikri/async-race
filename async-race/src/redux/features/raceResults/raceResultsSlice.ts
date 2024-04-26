/* eslint-disable prefer-destructuring */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface RaceStatus {
  id: number;
  time: number;
}

interface RaceResultState {
  raceStatuses: RaceStatus[];
  winner: RaceStatus | null;
}

const initialState: RaceResultState = {
  raceStatuses: [],
  winner: null,
};

const raceResultsSlice = createSlice({
  name: 'raceResults',
  initialState,
  reducers: {
    resetRaceResults(state) {
      state.raceStatuses = [];
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
