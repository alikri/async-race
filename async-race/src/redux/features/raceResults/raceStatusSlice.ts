/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-destructuring */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface RaceStatus {
  id: number;
  time: number;
}

interface RaceStatusState {
  winner: RaceStatus | null;
  raceInProgress: boolean;
}

const initialState: RaceStatusState = {
  winner: null,
  raceInProgress: false,
};

const raceStatusSlice = createSlice({
  name: 'raceStatus',
  initialState,
  reducers: {
    resetRaceResults(state) {
      state.winner = null;
      state.raceInProgress = false;
    },
    updateWinner(state, action: PayloadAction<RaceStatus>) {
      if (state.winner === null) {
        state.winner = action.payload;
      }
    },
    initiateRace(state) {
      state.winner = null;
      state.raceInProgress = true;
    },
    resetRaceStatus(state) {
      state.raceInProgress = false;
    },
  },
});

export const { resetRaceResults, updateWinner, initiateRace, resetRaceStatus } = raceStatusSlice.actions;

export default raceStatusSlice.reducer;

export const selectRaceResults = (state: RootState) => state.raceStatus;
