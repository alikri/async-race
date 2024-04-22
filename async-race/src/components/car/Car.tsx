import { useState } from 'react';
import './car.styles.scss';
import CarIcon from './CarIcon';

export interface CarData {
  name: string;
  color: string;
  id: number;
}

type Props = {
  car: CarData;
};

const Car = ({ car }: Props) => {
  return (
    <div className="car-wrapper">
      <CarIcon color={car.color} />
    </div>
  );
};

export default Car;
