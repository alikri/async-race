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
    addRaceStatus(state, action: PayloadAction<RaceStatus>) {
      const existingIndex = state.raceStatuses.findIndex(status => status.id === action.payload.id);
      if (existingIndex !== -1) {
        state.raceStatuses[existingIndex] = action.payload;
      } else {
        state.raceStatuses.push(action.payload);
      }
    },
    updateRaceTime(state, action: PayloadAction<RaceStatus>) {
      const index = state.raceStatuses.findIndex(status => status.id === action.payload.id);
      if (index !== -1) {
        state.raceStatuses[index].time = action.payload.time;
      }
    },
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

export const { addRaceStatus, resetRaceResults, updateRaceTime, updateWinner } = raceResultsSlice.actions;

export default raceResultsSlice.reducer;

export const selectRaceResults = (state: RootState) => state.raceResults;
