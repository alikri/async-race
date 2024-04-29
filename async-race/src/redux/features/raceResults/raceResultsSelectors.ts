import { RootState } from '../../store';

export const selectWinner = (state: RootState) => {
  return state.raceResults.winner;
};

export const selectRaceResults = (state: RootState) => {
  return state.raceResults;
};
