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
    </>
  );
};

export default ControlPanel;
