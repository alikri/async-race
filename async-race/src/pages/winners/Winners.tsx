import './winners.styles.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WinnersTable from '../../components/winnersTable/WinnersTable';
import { AppDispatch, RootState } from '../../redux/store';
import { selectWinners } from '../../redux/features/winners/winnersSelector';
import { resetRaceResults } from '../../redux/features/raceResults/raceStatusSlice';
import { setWinnerCurrentPage } from '../../redux/features/winnerSortingPagination/winnerSortingPaginationSlice';
import { fetchWinners } from '../../redux/features/winners/winnersSlice';

const Winners = () => {
  const dispatch: AppDispatch = useDispatch();
  const winnersState = useSelector((state: RootState) => selectWinners(state));
  const { currentWinnersPage, itemsPerWinnersPage, totalWinnersPages, sortField, sortOrder } = useSelector(
    (state: RootState) => state.winnerSortingPaginationSlice,
  );

  useEffect(() => {
    dispatch(resetRaceResults());
  }, [dispatch, winnersState]);

  const handleNextPageClick = () => {
    dispatch(setWinnerCurrentPage(currentWinnersPage + 1));
    dispatch(
      fetchWinners({ page: currentWinnersPage + 1, limit: itemsPerWinnersPage, sort: sortField, order: sortOrder }),
    );
  };

  const handlePreviousPageClick = () => {
    dispatch(setWinnerCurrentPage(currentWinnersPage - 1));
    dispatch(
      fetchWinners({ page: currentWinnersPage - 1, limit: itemsPerWinnersPage, sort: sortField, order: sortOrder }),
    );
  };

  return (
    <div className="winners-view-wrapper">
      <div className="winners-view">
        <h2>
          Winners (Page {currentWinnersPage} of {totalWinnersPages})
        </h2>
        <WinnersTable winners={winnersState.winners} />
        <div className="pagination-container">
          <button
            className="pagination-buttons"
            type="button"
            disabled={currentWinnersPage === 1}
            onClick={handlePreviousPageClick}
          >
            Previous
          </button>
          <button
            className="pagination-buttons"
            type="button"
            disabled={currentWinnersPage === totalWinnersPages}
            onClick={handleNextPageClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Winners;
