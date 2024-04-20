import './garage.styles.scss';

import ControlPanel from '../../components/controlPanel/ControlPanel';
import RoadLine from '../../components/road/RoadLine';

const Garage = () => {
  return (
    <div className="garage-container">
      <ControlPanel />
      <div className="road-wrapper">
        <RoadLine />
        <RoadLine />
        <RoadLine />
      </div>
    </div>
  );
};

export default Garage;
