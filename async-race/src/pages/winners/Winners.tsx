import './winners.styles.scss';
import { useEffect, useState } from 'react';
import getWinners from '../../api/winnersAPI/getWinners';
import { WinnerData } from '../../types';
import { CarData } from '../../components/car/Car';
import getCar from '../../api/carAPI/getCar';
import WinnersTable from '../../components/winnersTable/WinnersTable';

const Winners = () => {
  const [winners, setWinners] = useState<WinnerData[]>([]);
  const [cars, setCars] = useState<CarData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchWinners = async () => {
      const data = await getWinners();
      setWinners(data.winners);
      const totalCount = Math.ceil(data.totalCount / 10);
      setTotalPages(totalCount);
      const carPromises = data.winners.map((winner: WinnerData) => getCar(winner.id));
      const cars = await Promise.all(carPromises);
      setCars(cars);
    };
    fetchWinners();
  }, [page]);

  return (
    <div className="winners-view-wrapper">
      <div className="winners-view">
        <h2>
          Winners (Page {page} of {totalPages})
        </h2>
        <WinnersTable winners={winners} cars={cars} />
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
