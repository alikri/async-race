import store, { RootState } from '../../store';

export const getAllCars = (state: RootState) => state.cars.cars;
export const getTotalCount = (state: RootState) => state.cars.totalCount;
export const getCarById = (state: RootState, carId: number) => {
  const car = state.cars.cars.find(data => data.id === carId);
  return car || null;
};

export const getCarFromState = (carId: number) => {
  const state = store.getState();
  const carsArray = state.cars.cars;
  const car = carsArray.find(data => data.id === carId);
  return car || null;
};
