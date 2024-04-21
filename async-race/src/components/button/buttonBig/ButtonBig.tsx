import './buttonBig.styles.scss';

type Props = {
  title: string;
};

const ButtonBig = ({ title }: Props) => {
  return (
    <button className="button-big" type="button">
      {title}
    </button>
  );
};

export default ButtonBig;
