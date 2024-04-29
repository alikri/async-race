/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import './controlPanel.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import InputText from '../common/input/inputText/inputText';
import InputColor from '../common/input/inputColor/InputColor';
import getSelectedCar from '../../redux/features/selectedCar/selectedCarSelectors';
import { AppDispatch, RootState } from '../../redux/store';
import { addCar, createMultipleCars, fetchAndUpdateCars, updateExistingCar } from '../../redux/features/car/carThunks';
import { getAllCars } from '../../redux/features/car/carSelectors';
import {
  resetCarState,
  startCarDrive,
  switchToDriveMode,
} from '../../redux/features/driveSettings/driveSettingsThunks';
import { resetRaceResults } from '../../redux/features/raceResults/raceResultsSlice';
import { setTotalItems } from '../../redux/features/paginationGarage/paginationGarageSlice';
import { resetCarName, resetUpdateCarName, setFormData } from '../../redux/features/userInput/userInputSlice';
import { clearSelectedCar } from '../../redux/features/selectedCar/selectedCarSlice';

interface Props {
  isRacing: boolean;
  setIsRacing: (isRacing: boolean) => void;
}

const ControlPanel = ({ setIsRacing, isRacing }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCar = useSelector(getSelectedCar);
  const cars = useSelector(getAllCars);
  const totalCarsCount = useSelector((state: RootState) => state.cars.totalCount);
  const [isGeneratingCars, setIsGeneratingCars] = useState(false);
  const { formData } = useSelector((state: RootState) => state.userInput);
  const { currentGaragePage, itemsPerGaragePage, totalGaragePages } = useSelector(
    (state: RootState) => state.paginationGarage,
  );

  useEffect(() => {
    dispatch(setTotalItems(totalCarsCount));
  }, [totalCarsCount]);

  useEffect(() => {
    if (selectedCar !== null) {
      dispatch(
        setFormData({
          updateCarName: selectedCar.name,
          updateColor: selectedCar.color,
        }),
      );
    }
  }, [selectedCar]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleCreateClick = () => {
    const createCarData = {
      name: formData.carName,
      color: formData.color,
    };

    dispatch(addCar(createCarData));
    dispatch(resetCarName());
  };

  const handleUpdateClick = () => {
    if (selectedCar !== null) {
      const updateCarData = {
        id: selectedCar.id,
        name: formData.updateCarName,
        color: formData.updateColor,
      };

      dispatch(updateExistingCar(updateCarData));
      dispatch(clearSelectedCar());
      dispatch(resetUpdateCarName());
    }
  };

  const handleRaceClick = () => {
    setIsRacing(true);
    dispatch(resetRaceResults());
    cars.forEach(async car => {
      await dispatch(startCarDrive(car.id))
        .unwrap()
        .then(() => dispatch(switchToDriveMode(car.id)))
        .catch(error => console.error('Failed to start race', error));
    });
  };

  const handleResetClick = () => {
    setIsRacing(false);
    cars.forEach(car => {
      dispatch(resetCarState(car.id));
    });
  };

  const handleGenerateCars = async () => {
    setIsGeneratingCars(true);
    try {
      await dispatch(createMultipleCars()).unwrap();
      dispatch(fetchAndUpdateCars({ page: currentGaragePage, limit: itemsPerGaragePage }));
      setIsGeneratingCars(false);
      console.log('Cars have been generated successfully.');
    } catch (error) {
      console.error('Failed to generate cars:', error);
    }
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
        <button disabled={!selectedCar} className="button-big" type="button" onClick={handleUpdateClick}>
          Update
        </button>
      </div>
      <div className="race-control-container">
        <div className="title-container">
          <h2>Garage</h2>
          <div className="garage-count-wrapper">
            <h3> {totalCarsCount}</h3>
          </div>
          <h3>
            (Page {currentGaragePage} of {totalGaragePages})
          </h3>
        </div>
        <div className="race-control-wrapper">
          <button disabled={isRacing} className="button-big" type="button" onClick={handleRaceClick}>
            Race
          </button>
          <button disabled={!isRacing} className="button-big" type="button" onClick={handleResetClick}>
            Reset
          </button>
          <button
            disabled={isGeneratingCars}
            className="button-generate-cars"
            type="button"
            onClick={handleGenerateCars}
          >
            Generate Cars
          </button>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
