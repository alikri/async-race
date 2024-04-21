import { useState } from 'react';
import './car.styles.scss';
import CarIcon from './CarIcon';

export interface CarData {
  name: string;
  color: string;
  id?: number;
}

type Props = {
  car: CarData;
};

const Car = ({ car }: Props) => {
  const [color] = useState(car.color || 'black');

  return (
    <div className="car-wrapper">
      <CarIcon color={color} />
    </div>
  );
};

export default Car;
