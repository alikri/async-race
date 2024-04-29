import './winnersTable.scss';
import { useDispatch, useSelector } from 'react-redux';
import { WinnerData } from '../../types';
import WinnerRow from './winnersRow/WinnerRow';
import arrowDown from '../images/icons/arrow-up.svg';
import arrowUp from '../images/icons/arrow-down.svg';
import { AppDispatch, RootState } from '../../redux/store';
import {
  SortField,
  SortOrder,
  setSortField,
  setSortOrder,
} from '../../redux/features/winnerSortingPagination/winnerSortingPaginationSlice';
import { fetchWinners } from '../../redux/features/winners/winnersSlice';

interface WinnersTableProps {
  winners: WinnerData[];
}

const WinnersTable = ({ winners }: WinnersTableProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { sortOrder, sortField, currentWinnersPage, itemsPerWinnersPage } = useSelector(
    (state: RootState) => state.winnerSortingPaginationSlice,
  );
  const handleSort = (field: SortField) => () => {
    let newOrder: SortOrder = 'ASC';
    if (sortField === field) {
      newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    }
    dispatch(setSortField(field));
    dispatch(setSortOrder(newOrder));

    dispatch(fetchWinners({ page: currentWinnersPage, limit: itemsPerWinnersPage, sort: field, order: newOrder }));
  };

  const headers: { label: string; field?: SortField }[] = [
    { label: 'ID', field: 'id' },
    { label: 'Car' },
    { label: 'Name' },
    { label: 'Wins', field: 'wins' },
    { label: 'Best Time (seconds)', field: 'time' },
  ];

  return (
    <table className="winners-table">
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header.label}>
              <div className="table-header">
                <div>{header.label}</div>
                {header.field && (
                  <button type="button" className="arrow-wrapper" onClick={handleSort(header.field)}>
                    <img src={sortOrder === 'ASC' && sortField === header.field ? arrowDown : arrowUp} alt="Sort" />
                  </button>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {winners.map(winner => (
          <WinnerRow key={winner.id} winner={winner} />
        ))}
      </tbody>
    </table>
  );
};

export default WinnersTable;
