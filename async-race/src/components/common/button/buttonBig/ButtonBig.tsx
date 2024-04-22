import { MouseEventHandler } from 'react';
import './buttonBig.styles.scss';

type Props = {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const ButtonBig = ({ title, onClick }: Props) => {
  return (
    <button className="button-big" type="button" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonBig;
