import { useState } from 'react';
import './car.styles.scss';
import CarIcon from './CarIcon';

const Car = () => {
  const [color] = useState('black');

  return (
    <div className="car-wrapper">
      <CarIcon color={color} />
    </div>
  );
};

export default Car;
