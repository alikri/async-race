import { ChangeEvent } from 'react';
import './inputText.styles.scss';

interface Props {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({ name, value, onChange }: Props) => {
  return (
    <div className="text-input-wrapper">
      <input className="text-input" type="text" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputText;
