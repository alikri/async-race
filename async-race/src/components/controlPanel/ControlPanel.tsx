/* eslint-disable no-console */
import './controlPanel.styles.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import InputText from '../common/input/inputText/inputText';
import ButtonBig from '../common/button/buttonBig/ButtonBig';
import InputColor from '../common/input/inputColor/InputColor';
import { useCarState, useSelectedCar } from '../../context/carContexts/contextHook';

const ControlPanel = () => {
  const { addCar, updateExistingCar } = useCarState();
  const { selectedCar } = useSelectedCar();

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

    addCar(createCarData);
  };

  const handleUpdateClick = () => {
    if (selectedCar !== null) {
      const updateCarData = {
        id: selectedCar.id,
        name: formData.updateCarName,
        color: formData.updateColor,
      };
      updateExistingCar(updateCarData);
    }
  };

  const handleRaceClick = () => console.log('Race button clicked');
  const handleResetClick = () => console.log('Reset button clicked');

  return (
    <>
      <div className="form-wrapper">
        <InputText name="carName" value={formData.carName} onChange={handleInputChange} />
        <InputColor name="color" value={formData.color} onChange={handleInputChange} />
        <ButtonBig title="Create" onClick={handleCreateClick} />
      </div>
      <div className="form-wrapper">
        <InputText name="updateCarName" value={formData.updateCarName} onChange={handleInputChange} />
        <InputColor name="updateColor" value={formData.updateColor} onChange={handleInputChange} />
        <ButtonBig title="Update" onClick={handleUpdateClick} />
      </div>
      <div className="race-control-container">
        <div className="title-container">
          <h2>Garage</h2>
          <div className="garage-count-wrapper">
            <h3>50</h3>
          </div>
        </div>
        <div className="race-control-wrapper">
          <ButtonBig title="Race" onClick={handleRaceClick} />
          <ButtonBig title="Reset" onClick={handleResetClick} />
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
