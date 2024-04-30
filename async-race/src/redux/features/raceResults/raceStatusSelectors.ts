import { RootState } from '../../store';

export const selectWinner = (state: RootState) => {
  return state.raceStatus.winner;
};

export const selectRaceStatus = (state: RootState) => {
  return state.raceStatus.raceInProgress;
};
