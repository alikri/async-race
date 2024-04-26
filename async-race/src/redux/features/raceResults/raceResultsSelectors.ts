import { RootState } from '../../store';

export const selectRaceCarsFinished = (state: RootState) => {
  const carsFinishedNumber = state.raceResults.raceStatuses.length;
  return carsFinishedNumber;
};

export const selectWinner = (state: RootState) => {
  return state.raceResults.winner;
};

export const selectArrivedCars = (state: RootState) => {
  return state.raceResults.raceStatuses;
};

export const selectRaceResults = (state: RootState) => {
  return state.raceResults;
};
