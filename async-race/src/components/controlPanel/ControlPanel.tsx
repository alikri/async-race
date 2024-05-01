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
import { initiateRace, resetRaceStatus } from '../../redux/features/raceResults/raceStatusSlice';
import { setTotalItems } from '../../redux/features/paginationGarage/paginationGarageSlice';
import { resetCarName, resetUpdateCarName, setFormData } from '../../redux/features/userInput/userInputSlice';
import { clearSelectedCar } from '../../redux/features/selectedCar/selectedCarSlice';
import { selectRaceStatus } from '../../redux/features/raceResults/raceStatusSelectors';
import { updateWinnerCarDetails } from '../../redux/features/winners/winnersSlice';

const ControlPanel = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCar = useSelector(getSelectedCar);
  const cars = useSelector(getAllCars);
  const isRaceInProgress = useSelector((state: RootState) => selectRaceStatus(state));
  const totalCarsCount = useSelector((state: RootState) => state.cars.totalCount);
  const [isGeneratingCars, setIsGeneratingCars] = useState(false);
  const { formData } = useSelector((state: RootState) => state.userInput);
  const { currentGaragePage, itemsPerGaragePage, totalGaragePages } = useSelector(
    (state: RootState) => state.paginationGarage,
  );

  useEffect(() => {
    dispatch(setTotalItems(totalCarsCount));
  }, [dispatch, totalCarsCount]);

  useEffect(() => {
    if (selectedCar !== null) {
      dispatch(
        setFormData({
          updateCarName: selectedCar.name,
          updateColor: selectedCar.color,
        }),
      );
    }
  }, [dispatch, selectedCar]);

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
      dispatch(updateWinnerCarDetails(updateCarData));
    }
  };

  const handleRaceClick = () => {
    dispatch(initiateRace());
    cars.forEach(async car => {
      await dispatch(startCarDrive(car.id))
        .unwrap()
        .then(() => dispatch(switchToDriveMode(car.id)))
        .catch(error => console.error('Failed to start race', error));
    });
  };

  const handleResetClick = () => {
    dispatch(resetRaceStatus());
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
    } catch (error) {
      console.error('Failed to generate cars:', error);
    }
  };
  return (
    <>
      <div className="form-wrapper">
        <InputText name="carName" value={formData.carName} onChange={handleInputChange} />
        <InputColor name="color" value={formData.color} onChange={handleInputChange} />
        <button disabled={isRaceInProgress} className="button-big" type="button" onClick={handleCreateClick}>
          Create
        </button>
      </div>
      <div className="form-wrapper">
        <InputText name="updateCarName" value={formData.updateCarName} onChange={handleInputChange} />
        <InputColor name="updateColor" value={formData.updateColor} onChange={handleInputChange} />
        <button
          disabled={!selectedCar || isRaceInProgress}
          className="button-big"
          type="button"
          onClick={handleUpdateClick}
        >
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
          <button disabled={isRaceInProgress} className="button-big" type="button" onClick={handleRaceClick}>
            Race
          </button>
          <button disabled={!isRaceInProgress} className="button-big" type="button" onClick={handleResetClick}>
            Reset
          </button>
          <button
            disabled={isGeneratingCars || isRaceInProgress}
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
