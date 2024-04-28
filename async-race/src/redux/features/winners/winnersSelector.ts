import { RootState } from '../../store';

export const selectWinners = (state: RootState) => state.winners;

export const selectCars = (state: RootState) => state.cars.cars;
