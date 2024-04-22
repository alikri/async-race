/* eslint-disable no-unused-vars */
import { Dispatch } from 'react';

export interface Car {
  id: number;
  name: string;
  color: string;
}

// State type
export interface CarState {
  cars: Car[];
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
  GENERATE_CARS_REQUEST = 'GENERATE_CARS_REQUEST',
  GENERATE_CARS_SUCCESS = 'GENERATE_CARS_SUCCESS',
  GENERATE_CARS_FAILURE = 'GENERATE_CARS_FAILURE',
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

export interface GenerateCarsRequestAction {
  type: ActionType.GENERATE_CARS_REQUEST;
}

// Success Actions
export interface CreateCarSuccessAction {
  type: ActionType.CREATE_CAR_SUCCESS;
  payload: Car;
}

export interface UpdateCarSuccessAction {
  type: ActionType.UPDATE_CAR_SUCCESS;
  payload: Car;
}

export interface DeleteCarSuccessAction {
  type: ActionType.DELETE_CAR_SUCCESS;
  payload: number;
}

export interface GenerateCarsSuccessAction {
  type: ActionType.GENERATE_CARS_SUCCESS;
  payload: Car[];
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

export interface GenerateCarsFailureAction {
  type: ActionType.GENERATE_CARS_FAILURE;
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
  | GenerateCarsRequestAction
  | GenerateCarsSuccessAction
  | GenerateCarsFailureAction;

export interface CarContextType {
  state: CarState;
  dispatch: Dispatch<CarAction>;
}
