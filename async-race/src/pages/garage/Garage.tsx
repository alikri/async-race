import './garage.styles.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ControlPanel from '../../components/controlPanel/ControlPanel';
import RoadLine from '../../components/road/RoadLine';
import { getError, getLoading } from '../../redux/features/load/loadSelectors';
import { getAllCars } from '../../redux/features/car/carSelectors';
import { AppDispatch } from '../../redux/store';
import { fetchAndUpdateCars } from '../../redux/features/car/carAPI';

const Garage = () => {
  const dispatch: AppDispatch = useDispatch();
  const allCars = useSelector(getAllCars);
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchAndUpdateCars());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayCars = allCars && allCars.map(car => <RoadLine key={car.id} car={car} />);
  return (
    <div className="garage-container">
      <ControlPanel />
      <div className="road-wrapper">{displayCars && displayCars}</div>
    </div>
  );
};

export default Garage;
