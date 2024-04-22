import { ChangeEvent } from 'react';
import './inputColor.styles.scss';

interface Props {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputColor = ({ name, value, onChange }: Props) => {
  return (
    <div className="color-input-wrapper">
      <input className="color-input" type="color" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputColor;
