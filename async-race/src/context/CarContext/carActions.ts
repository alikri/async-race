import { Dispatch } from 'react';
import { Car, ActionType, CarAction } from './types';
import createCar from '../../api/createCar';

export const createCarAction = (car: Car) => async (dispatch: Dispatch<CarAction>) => {
  dispatch({ type: ActionType.CREATE_CAR_REQUEST });
  try {
    const response = await createCar(car.name, car.color);

    dispatch({ type: ActionType.CREATE_CAR_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: ActionType.CREATE_CAR_FAILURE, payload: error as Error });
  }
};

export const updateCar = (car: Car) => async (dispatch: Dispatch<CarAction>) => {
  dispatch({ type: ActionType.UPDATE_CAR_REQUEST });
};

export const deleteCar = (id: number) => async (dispatch: Dispatch<CarAction>) => {
  dispatch({ type: ActionType.DELETE_CAR_REQUEST });
};
