import './roadLine.styles.scss';
import Car from '../car/Car';

const RoadLine = () => {
  return (
    <div className="road-line">
      <div className="finish-line">
        <div className="start-line" />
        <div className="car-container">
          <Car />
        </div>
      </div>
    </div>
  );
};

export default RoadLine;
