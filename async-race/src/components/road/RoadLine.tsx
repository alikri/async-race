import './roadLine.styles.scss';
import Car, { CarData } from '../car/Car';
import ButtonMedium from '../button/buttonMedium/ButtonMedium';
import ButtonSmall from '../button/buttonSmall/ButtonSmall';

type Props = {
  car: CarData;
};

const RoadLine = ({ car }: Props) => {
  return (
    <div className="road-line">
      <div className="car-settings-wrapper">
        <div className="car-update">
          <ButtonMedium title="Select" />
          <ButtonMedium title="Remove" />
        </div>
        <div className="car-settings">
          <ButtonSmall title="A" />
          <ButtonSmall title="B" />
        </div>
      </div>
      <div className="car-name-container">{car.name}</div>
      <div className="car-container">
        <Car car={car} />
      </div>
      <div className="race-road" />
      <div className="finish" />
    </div>
  );
};

export default RoadLine;
