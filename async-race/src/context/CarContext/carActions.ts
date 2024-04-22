import { Dispatch } from 'react';
import { ActionType, CarAction } from './types';
import createCar from '../../api/createCar';
import updateCar from '../../api/updateCar';
import { CarData } from '../../components/car/Car';
import deleteCar from '../../api/deleteCar';

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

export const deleteCarAction = (id: number) => async (dispatch: Dispatch<CarAction>) => {
  dispatch({ type: ActionType.DELETE_CAR_REQUEST });

  try {
    await deleteCar(id);
    dispatch({ type: ActionType.DELETE_CAR_SUCCESS, payload: id });
  } catch (error) {
    console.error('Failed to delete car:', error);
    dispatch({ type: ActionType.DELETE_CAR_FAILURE, payload: error as Error });
  }
};
