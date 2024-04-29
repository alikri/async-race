/* eslint-disable consistent-return */
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
import calculateDriveTimeInMilliseconds from '../../utils/calculateTimeImMilliseconds';
import { updateWinner } from '../../redux/features/raceResults/raceResultsSlice';
import { selectWinner } from '../../redux/features/raceResults/raceResultsSelectors';
import { removeWinner } from '../../redux/features/winners/winnersSlice';
import { selectWinnerById } from '../../redux/features/winners/winnersSelector';

type Props = {
  car: CarData;
  isRacing: boolean;
  setIsRacing: (isRacing: boolean) => void;
};

const RoadLine = ({ car, isRacing, setIsRacing }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const distanceRef = useRef<HTMLDivElement>(null);
  const roadDistanceRef = useRef<number>(0);
  const carRef = useRef<HTMLDivElement>(null);
  const driveData = useSelector((state: RootState) => selectDriveDataById(state, car.id));
  const [travelTime, setTravelTime] = useState(0);
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const raceWinner = useSelector((state: RootState) => selectWinner(state));
  const winnerFromWinnerList = useSelector((state: RootState) => selectWinnerById(state, car.id));

  useEffect(() => {
    if (driveData && carRef.current && distanceRef && driveData.drive) {
      const totalWidth = carRef.current.offsetWidth + roadDistanceRef.current + EXTRA_CAR_GAP;
      const finishTime = calculateDriveTimeInMilliseconds(driveData.driveData.velocity, totalWidth);
      const newTravelTime = calculateDriveTime(driveData.driveData.velocity, totalWidth);
      timerRef.current = setTimeout(() => {
        dispatch(updateWinner({ id: car.id, time: newTravelTime }));
      }, finishTime);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driveData?.drive]);

  useEffect(() => {
    if (timerRef.current && raceWinner) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raceWinner]);

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
    if (driveData && carRef.current && isRacing && driveData.drive) {
      const calculatedTime = Math.round(driveData.driveData.distance / driveData.driveData.velocity);
      const totalWidth = carRef.current.offsetWidth + roadDistanceRef.current + EXTRA_CAR_GAP;
      cancelAnimation = animateCar(carRef.current, calculatedTime, totalWidth, driveData.drive);

      const newTravelTime = calculateDriveTime(driveData.driveData.velocity, totalWidth);

      if (newTravelTime !== travelTime) {
        setTravelTime(newTravelTime);
      }
    }

    return () => {
      if (cancelAnimation) {
        cancelAnimation();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driveData?.drive]);

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
    if (winnerFromWinnerList) {
      dispatch(removeWinner(car.id));
    }
  };

  const handleStart = async () => {
    setIsRacing(true);
    await dispatch(startCarDrive(car.id))
      .unwrap()
      .then(() => dispatch(switchToDriveMode(car.id)))
      .catch(error => console.error('Failed to start or switch drive mode:', error));
  };

  const handleStop = async () => {
    setIsRacing(false);
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
