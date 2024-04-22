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
