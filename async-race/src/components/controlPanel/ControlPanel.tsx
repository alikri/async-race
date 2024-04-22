/* eslint-disable no-console */
import './controlPanel.styles.scss';
import { ChangeEvent, useState } from 'react';
import InputText from '../common/input/inputText/inputText';
import ButtonBig from '../common/button/buttonBig/ButtonBig';
import InputColor from '../common/input/inputColor/InputColor';
import { useCarState } from '../../context/contextHook';

const ControlPanel = () => {
  const [formData, setFormData] = useState({
    createText: '',
    createColor: '',
    updateText: '',
    updateColor: '',
  });

  const context = useCarState();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateClick = () => {
    console.log('Create button clicked with data:', formData.createText, formData.createColor);
  };

  const handleUpdateClick = () => {
    console.log('Update button clicked with data:', formData.updateText, formData.updateColor);
  };

  const handleRaceClick = () => console.log('Race button clicked');
  const handleResetClick = () => console.log('Reset button clicked');

  return (
    <>
      <div className="form-wrapper">
        <InputText name="createText" value={formData.createText} onChange={handleInputChange} />
        <InputColor name="createColor" value={formData.createColor} onChange={handleInputChange} />
        <ButtonBig title="Create" onClick={handleCreateClick} />
      </div>
      <div className="form-wrapper">
        <InputText name="updateText" value={formData.updateText} onChange={handleInputChange} />
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
