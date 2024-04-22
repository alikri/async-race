/* eslint-disable no-unused-vars */
import { Dispatch } from 'react';
import { CarData } from '../../components/car/Car';
import { FetchCarsResponse } from '../../api/getCars';

export interface CarState {
  cars: CarData[];
  totalCount?: number;
  loading: boolean;
  error: Error | null;
}

export enum ActionType {
  CREATE_CAR_REQUEST = 'CREATE_CAR_REQUEST',
  CREATE_CAR_SUCCESS = 'CREATE_CAR_SUCCESS',
  CREATE_CAR_FAILURE = 'CREATE_CAR_FAILURE',
  UPDATE_CAR_REQUEST = 'UPDATE_CAR_REQUEST',
  UPDATE_CAR_SUCCESS = 'UPDATE_CAR_SUCCESS',
  UPDATE_CAR_FAILURE = 'UPDATE_CAR_FAILURE',
  DELETE_CAR_REQUEST = 'DELETE_CAR_REQUEST',
  DELETE_CAR_SUCCESS = 'DELETE_CAR_SUCCESS',
  DELETE_CAR_FAILURE = 'DELETE_CAR_FAILURE',
  GET_CARS_REQUEST = 'GET_CARS_REQUEST',
  GET_CARS_SUCCESS = 'GET_CARS_SUCCESS',
  GET_CARS_FAILURE = 'GET_CARS_FAILURE',
}

// Request Actions
export interface CreateCarRequestAction {
  type: ActionType.CREATE_CAR_REQUEST;
}

export interface UpdateCarRequestAction {
  type: ActionType.UPDATE_CAR_REQUEST;
}

export interface DeleteCarRequestAction {
  type: ActionType.DELETE_CAR_REQUEST;
}

export interface GetCarsRequestAction {
  type: ActionType.GET_CARS_REQUEST;
}

// Success Actions
export interface CreateCarSuccessAction {
  type: ActionType.CREATE_CAR_SUCCESS;
  payload: CarData;
}

export interface UpdateCarSuccessAction {
  type: ActionType.UPDATE_CAR_SUCCESS;
  payload: CarData;
}

export interface DeleteCarSuccessAction {
  type: ActionType.DELETE_CAR_SUCCESS;
  payload: number;
}

export interface GetCarsSuccessAction {
  type: ActionType.GET_CARS_SUCCESS;
  payload: FetchCarsResponse;
}

// Failure Actions
export interface CreateCarFailureAction {
  type: ActionType.CREATE_CAR_FAILURE;
  payload: Error;
}

export interface UpdateCarFailureAction {
  type: ActionType.UPDATE_CAR_FAILURE;
  payload: Error;
}

export interface DeleteCarFailureAction {
  type: ActionType.DELETE_CAR_FAILURE;
  payload: Error;
}

export interface GetCarsFailureAction {
  type: ActionType.GET_CARS_FAILURE;
  payload: Error;
}

// Union of All Actions
export type CarAction =
  | CreateCarRequestAction
  | CreateCarSuccessAction
  | CreateCarFailureAction
  | UpdateCarRequestAction
  | UpdateCarSuccessAction
  | UpdateCarFailureAction
  | DeleteCarRequestAction
  | DeleteCarSuccessAction
  | DeleteCarFailureAction
  | GetCarsRequestAction
  | GetCarsSuccessAction
  | GetCarsFailureAction;

export interface CarContextType {
  state: CarState;
  dispatch: Dispatch<CarAction>;
}
