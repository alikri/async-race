import { RootState } from '../../store';

export const selectWinners = (state: RootState) => state.winners;

export const selectCars = (state: RootState) => state.cars.cars;

export const selectWinnerById = (state: RootState, winnerId: number) => {
  const winner = state.winners.winners.find(data => data.id === winnerId);
  return winner || null;
};
