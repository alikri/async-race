import store, { RootState } from '../../store';

export const getAllCars = (state: RootState) => state.cars.cars;

export const getCarFromState = (carId: number) => {
  const state = store.getState();
  const carsArray = state.cars.cars;
  const car = carsArray.find(data => data.id === carId);
  return car || null;
};
