import './winners.styles.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WinnersTable from '../../components/winnersTable/WinnersTable';
import { RootState } from '../../redux/store';
import { selectCars, selectWinners } from '../../redux/features/winners/winnersSelector';

const Winners = () => {
  const winnersState = useSelector((state: RootState) => selectWinners(state));
  const carsState = useSelector((state: RootState) => selectCars(state));
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const totalCount = Math.ceil(winnersState.totalCount / 10);
    setTotalPages(totalCount);
  }, [winnersState]);

  return (
    <div className="winners-view-wrapper">
      <div className="winners-view">
        <h2>
          Winners (Page {page} of {totalPages})
        </h2>
        <WinnersTable winners={winnersState.winners} cars={carsState} />
        <div className="pagination-container">
          <button className="pagination-buttons" type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button
            className="pagination-buttons"
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Winners;
