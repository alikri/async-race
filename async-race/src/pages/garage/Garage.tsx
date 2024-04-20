import Car from '../../components/car/Car';
import ControlPanel from '../../components/controlPanel/ControlPanel';

const Garage = () => {
  return (
    <div className="garage-container">
      <ControlPanel />
      <Car />
    </div>
  );
};

export default Garage;
