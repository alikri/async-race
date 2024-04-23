import { RootState } from '../../store';

export const getAllCars = (state: RootState) => state.cars.cars;
export const getTotalCount = (state: RootState) => state.cars.totalCount;
