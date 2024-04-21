import './controlPanel.styles.scss';

import InputText from '../input/inputText/inputText';
import ButtonMedium from '../button/buttonMedium/buttonMedium';
import InputColor from '../input/inputColor/InputColor';

const ControlPanel = () => {
  return (
    <>
      <div className="form-wrapper">
        <InputText />
        <InputColor />
        <ButtonMedium title="Create" />
      </div>
      <div className="form-wrapper">
        <InputText />
        <InputColor />
        <ButtonMedium title="Update" />
      </div>
      <div className="race-control-container">
        <div className="title-container">
          <h2>Garage</h2>
          <div className="garage-count-wrapper">
            <h3>50</h3>
          </div>
        </div>

        <div className="race-control-wrapper">
          <ButtonMedium title="Race" />
          <ButtonMedium title="Reset" />
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
