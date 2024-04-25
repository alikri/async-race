import '../winnersTable.scss';
import { WinnerData } from '../../../types';
import Car, { CarData } from '../../car/Car';

interface WinnerRowProps {
  winner: WinnerData;
  car: CarData | undefined;
}

const WinnerRow = ({ winner, car }: WinnerRowProps) => {
  return (
    <tr className="table-row">
      <td>{winner.id}</td>
      <td>
        {car && (
          <div className="winner-car-container">
            <Car car={car} />
          </div>
        )}
      </td>
      <td>{car?.name}</td>
      <td>{winner.wins}</td>
      <td>{winner.time}</td>
    </tr>
  );
};

export default WinnerRow;
