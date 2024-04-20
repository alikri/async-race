import './controlPanel.styles.scss';

import Input from '../input/input';
import ButtonMedium from '../button/buttonMedium/buttonMedium';

const ControlPanel = () => {
  return (
    <>
      <div className="form-wrapper">
        <Input />
        <ButtonMedium title="Create" />
      </div>
      <div className="form-wrapper">
        <Input />
        <ButtonMedium title="Update" />
      </div>
    </>
  );
};

export default ControlPanel;
