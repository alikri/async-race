import './controlPanel.styles.scss';

import InputText from '../input/inputText/inputText';
import ButtonBig from '../button/buttonBig/ButtonBig';
import InputColor from '../input/inputColor/InputColor';

const ControlPanel = () => {
  return (
    <>
      <div className="form-wrapper">
        <InputText />
        <InputColor />
        <ButtonBig title="Create" />
      </div>
      <div className="form-wrapper">
        <InputText />
        <InputColor />
        <ButtonBig title="Update" />
      </div>
      <div className="race-control-container">
        <div className="title-container">
          <h2>Garage</h2>
          <div className="garage-count-wrapper">
            <h3>50</h3>
          </div>
        </div>

        <div className="race-control-wrapper">
          <ButtonBig title="Race" />
          <ButtonBig title="Reset" />
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
