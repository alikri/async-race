/* eslint-disable prefer-destructuring */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface RaceStatus {
  id: number;
  time: number;
  broken: boolean;
  arrived: boolean;
}

interface RaceResultState {
  raceStatuses: RaceStatus[];
  winner: RaceStatus | null;
}

const initialState: RaceResultState = {
  raceStatuses: [],
  winner: null,
};

function updateWinner(state: RaceResultState) {
  if (state.winner === null || state.winner.broken) {
    const eligibleCars = state.raceStatuses.filter(status => !status.broken);
    if (eligibleCars.length > 0) {
      eligibleCars.sort((a, b) => a.time - b.time);
      state.winner = eligibleCars[0];
    } else {
      state.winner = null;
    }
  }
}

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
    markAsBroken(state, action: PayloadAction<{ id: number; broken: boolean }>) {
      const index = state.raceStatuses.findIndex(status => status.id === action.payload.id);
      if (index !== -1) {
        state.raceStatuses[index].broken = action.payload.broken;
        updateWinner(state);
      }
    },
    resetRaceResults(state) {
      state.raceStatuses = [];
      state.winner = null;
    },
    markAnimationComplete(state, action: PayloadAction<number>) {
      // action payload is the car ID
      const index = state.raceStatuses.findIndex(status => status.id === action.payload);
      if (index !== -1) {
        state.raceStatuses[index].arrived = true;
      }
    },
  },
});

export const { addRaceStatus, resetRaceResults, updateRaceTime, markAsBroken } = raceResultsSlice.actions;

export default raceResultsSlice.reducer;

export const selectRaceResults = (state: RootState) => state.raceResults;
