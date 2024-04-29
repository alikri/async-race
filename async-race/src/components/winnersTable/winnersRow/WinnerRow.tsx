import '../winnersTable.scss';
import { WinnerData } from '../../../types';
import Car from '../../car/Car';

interface WinnerRowProps {
  winner: WinnerData;
}

const WinnerRow = ({ winner }: WinnerRowProps) => {
  return (
    <tr className="table-row">
      <td>{winner.id}</td>
      <td>
        {winner && (
          <div className="winner-car-container">
            <Car carColor={winner.carColor} />
          </div>
        )}
      </td>
      <td>{winner.name}</td>
      <td>{winner.wins}</td>
      <td>{winner.time}</td>
    </tr>
  );
};

export default WinnerRow;
