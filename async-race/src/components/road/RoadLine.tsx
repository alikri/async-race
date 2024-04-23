import './roadLine.styles.scss';
import { useDispatch } from 'react-redux';
import Car, { CarData } from '../car/Car';
import ButtonSmall from '../common/button/buttonSmall/ButtonSmall';
import { setSelectedCar } from '../../redux/features/selectedCar/selectedCarSlice';

type Props = {
  car: CarData;
};

const RoadLine = ({ car }: Props) => {
  const dispatch = useDispatch();

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car));
  };

  return (
    <div className="road-line">
      <div className="car-settings-wrapper">
        <div className="car-update">
          <button className="button-medium" type="button" onClick={handleSelectCar}>
            Select
          </button>
          <button className="button-medium" type="button">
            Remove
          </button>
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
