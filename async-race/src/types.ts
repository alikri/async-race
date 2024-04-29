import { ReactNode } from 'react';

export interface CarData {
  name: string;
  color: string;
  id: number;
}

export interface CarState {
  cars: CarData[];
  totalCount: number;
}

export interface UpdateCarData {
  id: number;
  name: string;
  color: string;
}

export interface CreateCarData {
  name: string;
  color: string;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface DriveResponse {
  velocity: number;
  distance: number;
}

export interface DriveMode {
  id: number;
  drive: boolean;
  driveData: DriveResponse;
  reset: boolean;
  broken: boolean;
  finished: boolean;
}

// winner types
export interface WinnerRequestData {
  id: number;
  wins: number;
  time: number;
}
export interface WinnerData {
  id: number;
  wins: number;
  time: number;
  carColor: string;
  name: string;
}

export interface WinnerDataForModal {
  id: number;
  wins: number;
  time: number;
  name: string;
}

// enums
export enum SortField {
  ID = 'id',
  TIME = 'time',
  WINS = 'wins',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
