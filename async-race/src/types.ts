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
