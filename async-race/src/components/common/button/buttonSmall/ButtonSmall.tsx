import './buttonSmall.styles.scss';

type Props = {
  title: string;
};

const ButtonSmall = ({ title }: Props) => {
  return (
    <button className="button-small" type="button">
      {title}
    </button>
  );
};

export default ButtonSmall;
