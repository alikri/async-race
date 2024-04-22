import { Dispatch } from 'react';
import { ActionType, CarAction } from './types';
import createCar from '../../api/createCar';
import updateCar from '../../api/updateCar';
import { CarData } from '../../components/car/Car';

export const createCarAction = (car: CarData) => async (dispatch: Dispatch<CarAction>) => {
  dispatch({ type: ActionType.CREATE_CAR_REQUEST });
  try {
    const response = await createCar(car.name, car.color);

    dispatch({ type: ActionType.CREATE_CAR_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: ActionType.CREATE_CAR_FAILURE, payload: error as Error });
  }
};

export const updateCarAction = (car: CarData) => async (dispatch: Dispatch<CarAction>) => {
  dispatch({ type: ActionType.UPDATE_CAR_REQUEST });

  try {
    const response = await updateCar(car.id, car.name, car.color);

    dispatch({ type: ActionType.UPDATE_CAR_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: ActionType.UPDATE_CAR_FAILURE, payload: error as Error });
  }
};

export const deleteCar = (id: number) => async (dispatch: Dispatch<CarAction>) => {
  dispatch({ type: ActionType.DELETE_CAR_REQUEST });
};
