import './buttonMedium.styles.scss';

type Props = {
  title: string;
};

const ButtonMedium = ({ title }: Props) => {
  return (
    <button className="button-medium" type="button">
      {title}
    </button>
  );
};

export default ButtonMedium;
