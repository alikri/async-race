import './garage.styles.scss';

import ControlPanel from '../../components/controlPanel/ControlPanel';
import RoadLine from '../../components/road/RoadLine';
import { useCarState, useLoadState } from '../../context/carContext/contextHook';

const Garage = () => {
  const { carState } = useCarState();
  const { loading, error } = useLoadState();
  const { cars } = carState;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayCars = cars && cars.map(car => <RoadLine key={car.id} car={car} />);
  return (
    <div className="garage-container">
      <ControlPanel />
      <div className="road-wrapper">{displayCars && displayCars}</div>
    </div>
  );
};

export default Garage;
