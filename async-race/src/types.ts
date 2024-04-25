import { ReactNode } from 'react';
import { CarData } from './components/car/Car';

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
export interface WinnerData {
  id: number;
  wins: number;
  time: number;
}
