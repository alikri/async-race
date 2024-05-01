import CarIcon from './CarIcon';

type Props = {
  carColor: string;
};

const Car = ({ carColor }: Props) => {
  return (
    <div className="car-wrapper">
      <CarIcon color={carColor} />
    </div>
  );
};

export default Car;
