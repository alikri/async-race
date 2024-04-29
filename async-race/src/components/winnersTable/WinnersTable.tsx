import './winnersTable.scss';
import { useSelector } from 'react-redux';
import { WinnerData } from '../../types';
import { CarData } from '../car/Car';
import WinnerRow from './winnersRow/WinnerRow';
import arrowDown from '../images/icons/arrow-up.svg';
import arrowUp from '../images/icons/arrow-down.svg';
import { RootState } from '../../redux/store';

interface WinnersTableProps {
  winners: WinnerData[];
  cars: CarData[];
}

const WinnersTable = ({ winners, cars }: WinnersTableProps) => {
  const { sortOrder } = useSelector((state: RootState) => state.winnerSortingPaginationSlice);
  return (
    <table className="winners-table">
      <thead>
        <tr>
          <th>
            <div className="table-header">
              <div> Number </div>
              {sortOrder === 'DESC' ? (
                <div className="arrow-wrapper">
                  <img src={arrowDown} alt="Arrow Down" />
                </div>
              ) : (
                <div className="arrow-wrapper">
                  <img src={arrowUp} alt="Arrow Up" />
                </div>
              )}
            </div>
          </th>
          <th>Car</th>
          <th>Name</th>
          <th>
            <div className="table-header">
              <div> Wins </div>
              {sortOrder === 'DESC' ? (
                <div className="arrow-wrapper">
                  <img src={arrowDown} alt="Arrow Down" />
                </div>
              ) : (
                <div className="arrow-wrapper">
                  <img src={arrowUp} alt="Arrow Up" />
                </div>
              )}
            </div>
          </th>
          <th>
            <div className="table-header">
              <div> Best Time (seconds) </div>
              {sortOrder === 'DESC' ? (
                <div className="arrow-wrapper">
                  <img src={arrowDown} alt="Arrow Down" />
                </div>
              ) : (
                <div className="arrow-wrapper">
                  <img src={arrowUp} alt="Arrow Up" />
                </div>
              )}
            </div>
          </th>
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
