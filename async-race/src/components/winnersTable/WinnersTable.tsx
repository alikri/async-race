import './winnersTable.scss';
import { WinnerData } from '../../types';
import { CarData } from '../car/Car';
import WinnerRow from './winnersRow/WinnerRow';

interface WinnersTableProps {
  winners: WinnerData[];
  cars: CarData[];
}

const WinnersTable = ({ winners, cars }: WinnersTableProps) => {
  return (
    <table className="winners-table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best Time (seconds)</th>
        </tr>
      </thead>
      <tbody>
        {winners.map(winner => (
          <WinnerRow key={winner.id} winner={winner} car={cars.find(car => car.id === winner.id)} />
        ))}
      </tbody>
    </table>
  );
};

export default WinnersTable;
