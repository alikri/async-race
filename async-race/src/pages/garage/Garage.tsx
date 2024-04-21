/* eslint-disable no-unused-vars */
import './garage.styles.scss';
import { useEffect, useState } from 'react';

import ControlPanel from '../../components/controlPanel/ControlPanel';
import RoadLine from '../../components/road/RoadLine';
import { CarData } from '../../components/car/Car';
import fetchCars from '../../components/api/garageApi';
// import makeApiRequest from '../../utils/apiRequest';

const Garage = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCars = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchCars(1, 7);
      setCars(response.cars);
    } catch (err) {
      setError('Failed to fetch cars. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const displayCars = cars && cars.map(car => <RoadLine key={car.id} car={car} />);
  return (
    <div className="garage-container">
      <ControlPanel />
      <div className="road-wrapper">{displayCars && displayCars}</div>
    </div>
  );
};

export default Garage;
