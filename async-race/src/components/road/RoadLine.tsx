import './roadLine.styles.scss';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Car, { CarData } from '../car/Car';
import { setSelectedCar } from '../../redux/features/selectedCar/selectedCarSlice';
import { AppDispatch } from '../../redux/store';
import { deleteExistingCar } from '../../redux/features/car/carAPI';
import { startEngine, stopEngine } from '../../redux/features/drive/driveSlice';
import debounce from '../../utils/debounce';

type Props = {
  car: CarData;
};

const RoadLine = ({ car }: Props) => {
  const [width, setWidth] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const distanceRef = useRef<HTMLDivElement>(null);

  const updateWidth = () => {
    if (distanceRef.current) {
      setWidth(distanceRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      updateWidth();
    }, 250);

    updateWidth();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car));
  };

  const handleDeleteCar = () => {
    dispatch(deleteExistingCar(car.id));
  };

  const handleStart = () => {
    dispatch(startEngine(car.id));
  };

  const handleStop = () => {
    dispatch(stopEngine(car.id));
  };

  return (
    <div className="road-line">
      <div className="car-settings-wrapper">
        <div className="car-update">
          <button className="button-medium" type="button" onClick={handleSelectCar}>
            Select
          </button>
          <button className="button-medium" type="button" onClick={handleDeleteCar}>
            Remove
          </button>
        </div>
        <div className="car-settings">
          <button className="button-small" type="button" onClick={handleStart}>
            A
          </button>
          <button className="button-small" type="button" onClick={handleStop}>
            B
          </button>
        </div>
      </div>
      <div className="car-name-container">{car.name}</div>
      <div className="car-container">
        <Car car={car} />
      </div>
      <div className="race-road" ref={distanceRef} />
      <div className="finish" />
    </div>
  );
};

export default RoadLine;
