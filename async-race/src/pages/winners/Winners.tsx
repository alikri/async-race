/* eslint-disable no-console */
/* eslint-disable consistent-return */
import './winners.styles.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getWinners from '../../api/winnersAPI/getWinners';
import { WinnerData } from '../../types';
import { CarData } from '../../components/car/Car';
import getCar from '../../api/carAPI/getCar';
import WinnersTable from '../../components/winnersTable/WinnersTable';
import { RootState } from '../../redux/store';
import { selectWinner } from '../../redux/features/raceResults/raceResultsSelectors';
import handleWinner from '../../api/winnersAPI/handleWinner';

const Winners = () => {
  const [winners, setWinners] = useState<WinnerData[]>([]);
  const [cars, setCars] = useState<CarData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const winner = useSelector((state: RootState) => selectWinner(state));

  useEffect(() => {
    const updateWinnerAsync = async () => {
      if (winner) {
        console.log(winner);
        const winnerData = {
          id: winner.id,
          time: winner.time,
          wins: 1,
        };

        try {
          const updatedWinnerResponse = await handleWinner(winnerData);
          setWinners(winners => {
            const mappedValues = winners.map(curr => {
              if (curr.id === updatedWinnerResponse.id) {
                return { ...curr, wins: updatedWinnerResponse.wins, time: updatedWinnerResponse.time };
              }
              return curr;
            });
            return mappedValues;
          });
          console.log(updatedWinnerResponse, 'HANDLE WINNER RESPONSE');
        } catch (error) {
          console.error('Error updating winner:', error);
        }
      }
    };

    updateWinnerAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

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
