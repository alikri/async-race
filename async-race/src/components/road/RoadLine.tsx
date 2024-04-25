/* eslint-disable no-console */
import './roadLine.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Car, { CarData } from '../car/Car';
import { setSelectedCar } from '../../redux/features/selectedCar/selectedCarSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteExistingCar } from '../../redux/features/car/carAPI';
import { switchToDriveMode, startCarDrive, stopCarDrive, resetCarState } from '../../redux/features/drive/driveSlice';
import debounce from '../../utils/debounce';

import animateCar from '../../utils/animateCar';
import { UPDATE_IN, EXTRA_CAR_GAP } from '../../constants';
import { selectDriveDataById } from '../../redux/features/drive/driveSelectors';
import calculateDriveTime from '../../utils/canculateDriveTime';

type Props = {
  car: CarData;
};

const RoadLine = ({ car }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const distanceRef = useRef<HTMLDivElement>(null);
  const roadDistanceRef = useRef<number>(0);
  const carRef = useRef<HTMLDivElement>(null);
  const driveData = useSelector((state: RootState) => selectDriveDataById(state, car.id));
  const [travelTime, setTravelTime] = useState(0);

  const updateWidth = () => {
    if (distanceRef.current) {
      roadDistanceRef.current = distanceRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      updateWidth();
    }, UPDATE_IN);

    updateWidth();

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let cancelAnimation: () => void;
    if (driveData && carRef.current) {
      const calculatedTime = Math.round(driveData.driveData.distance / driveData.driveData.velocity);
      const totalWidth = carRef.current.offsetWidth + roadDistanceRef.current + EXTRA_CAR_GAP;
      cancelAnimation = animateCar(carRef.current, calculatedTime, totalWidth, driveData.drive);

      const newTravelTime = calculateDriveTime(driveData.driveData.velocity, totalWidth);

      if (newTravelTime !== travelTime) {
        setTravelTime(newTravelTime);
        console.log('Updated travel time:', newTravelTime);
      }
    }

    return () => {
      if (cancelAnimation) {
        cancelAnimation();
      }
    };
  }, [driveData, car.id, dispatch, travelTime]);

  useEffect(() => {
    if (driveData?.reset && carRef.current) {
      carRef.current.style.transform = 'translateX(0px)';
    }
  }, [driveData]);

  const handleSelectCar = () => {
    dispatch(setSelectedCar(car));
  };

  const handleDeleteCar = () => {
    dispatch(deleteExistingCar(car.id));
  };

  const handleStart = async () => {
    await dispatch(startCarDrive(car.id))
      .unwrap()
      .then(() => dispatch(switchToDriveMode(car.id)))
      .catch(error => console.error('Failed to start or switch drive mode:', error));
  };

  const handleStop = async () => {
    await dispatch(stopCarDrive(car.id))
      .unwrap()
      .then(() => dispatch(resetCarState(car.id)))
      .catch(error => console.error('Failed to reset car race', error));
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
      <div className="car-container" ref={carRef}>
        <Car car={car} />
      </div>
      <div className="race-road" ref={distanceRef} />
      <div className="finish" />
    </div>
  );
};

export default RoadLine;
