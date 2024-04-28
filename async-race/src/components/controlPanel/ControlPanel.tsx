/* eslint-disable no-console */
import './controlPanel.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import InputText from '../common/input/inputText/inputText';
import InputColor from '../common/input/inputColor/InputColor';
import getSelectedCar from '../../redux/features/selectedCar/selectedCarSelectors';
import { AppDispatch } from '../../redux/store';
import { addCar, updateExistingCar } from '../../redux/features/car/carAPI';
import { getAllCars } from '../../redux/features/car/carSelectors';
import { resetCarState, startCarDrive, switchToDriveMode } from '../../redux/features/drive/driveSlice';
import { resetRaceResults } from '../../redux/features/raceResults/raceResultsSlice';

interface Props {
  isRacing: boolean;
  setIsRacing: (isRacing: boolean) => void;
}

const ControlPanel = ({ setIsRacing, isRacing }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCar = useSelector(getSelectedCar);
  const cars = useSelector(getAllCars);

  const [formData, setFormData] = useState({
    carName: '',
    color: '',
    updateCarName: '',
    updateColor: '',
  });

  useEffect(() => {
    if (selectedCar !== null) {
      setFormData(prev => ({
        ...prev,
        updateCarName: selectedCar.name,
        updateColor: selectedCar.color,
      }));
    }
  }, [selectedCar]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateClick = () => {
    const createCarData = {
      name: formData.carName,
      color: formData.color,
    };

    dispatch(addCar(createCarData));
  };

  const handleUpdateClick = () => {
    if (selectedCar !== null) {
      const updateCarData = {
        id: selectedCar.id,
        name: formData.updateCarName,
        color: formData.updateColor,
      };

      dispatch(updateExistingCar(updateCarData));
    }
  };

  const handleRaceClick = () => {
    setIsRacing(true);
    cars.forEach(async car => {
      await dispatch(startCarDrive(car.id))
        .unwrap()
        .then(() => dispatch(switchToDriveMode(car.id)))
        .catch(error => console.error('Failed to start race', error));
    });
  };

  const handleResetClick = () => {
    setIsRacing(false);
    dispatch(resetRaceResults());
    cars.forEach(car => {
      dispatch(resetCarState(car.id));
    });
  };

  return (
    <>
      <div className="form-wrapper">
        <InputText name="carName" value={formData.carName} onChange={handleInputChange} />
        <InputColor name="color" value={formData.color} onChange={handleInputChange} />
        <button className="button-big" type="button" onClick={handleCreateClick}>
          Create
        </button>
      </div>
      <div className="form-wrapper">
        <InputText name="updateCarName" value={formData.updateCarName} onChange={handleInputChange} />
        <InputColor name="updateColor" value={formData.updateColor} onChange={handleInputChange} />
        <button className="button-big" type="button" onClick={handleUpdateClick}>
          Update
        </button>
      </div>
      <div className="race-control-container">
        <div className="title-container">
          <h2>Garage</h2>
          <div className="garage-count-wrapper">
            <h3>50</h3>
          </div>
        </div>
        <div className="race-control-wrapper">
          <button className="button-big" type="button" onClick={handleRaceClick}>
            Race
          </button>
          <button className="button-big" type="button" onClick={handleResetClick}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
