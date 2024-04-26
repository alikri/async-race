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
import updateWinner from '../../api/winnersAPI/updateWinner';
import createWinner from '../../api/winnersAPI/createWinner';
import { getAllCars } from '../../redux/features/car/carSelectors';

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
        console.log(winners);
        const data = await getWinners();
        setWinners(data.winners);
        const isWinnerInList = data.winners.some(currWinner => currWinner.id === winnerData.id);
        console.log(isWinnerInList, 'IS WINNER IN LIST');
        if (isWinnerInList) {
          const previousWinnerData = data.winners.find(data => data.id === winner.id);
          if (previousWinnerData) {
            const updateWinnerData = {
              ...previousWinnerData,
              wins: previousWinnerData.wins + 1,
              time: previousWinnerData.time < winner.time ? previousWinnerData.time : winner.time,
            };
            console.log(updateWinnerData, 'UPDATE WINNER DATA');
            const updatedWinnerResponse = await updateWinner(updateWinnerData);
            setWinners(winners => {
              const mappedValues = winners.map(curr => {
                if (curr.id === updatedWinnerResponse.id) {
                  return { ...curr, wins: updateWinnerData.wins, time: updateWinnerData.time };
                }
                return curr;
              });
              return mappedValues;
            });
          }
        } else {
          const updatedWinnerResponse = await createWinner(winnerData);
          console.log(updatedWinnerResponse, 'updatedWinnerResponse');
          setWinners(winners => {
            const existingWinnerIndex = winners.findIndex(curr => curr.id === updatedWinnerResponse.id);

            if (existingWinnerIndex !== -1) {
              return winners.map(curr => {
                if (curr.id === updatedWinnerResponse.id) {
                  return { ...curr, wins: updatedWinnerResponse.wins, time: updatedWinnerResponse.time };
                }
                return curr;
              });
            }
            return [...winners, updatedWinnerResponse];
          });
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
