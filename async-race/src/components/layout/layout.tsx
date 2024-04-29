/* eslint-disable react-hooks/exhaustive-deps */
import './layout.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchWinners, saveWinner } from '../../redux/features/winners/winnersSlice';
import { fetchAndUpdateCars } from '../../redux/features/car/carThunks';
import { selectWinner } from '../../redux/features/raceResults/raceResultsSelectors';
import WinnerAnnouncement from '../winnerAnouncment/WinnerAnouncement';
import { WinnerDataForModal } from '../../types';
import { getCarFromState } from '../../redux/features/car/carSelectors';
import { setPage, setTotalItems } from '../../redux/features/paginationGarage/paginationGarageSlice';
import {
  setTotalWinnerItems,
  setWinnerCurrentPage,
} from '../../redux/features/winnerSortingPagination/winnerSortingPaginationSlice';

const Layout = () => {
  const dispatch: AppDispatch = useDispatch();
  const raceWinner = useSelector((state: RootState) => selectWinner(state));
  const [modalWinner, setModalWinner] = useState<null | WinnerDataForModal>();
  const { currentGaragePage, itemsPerGaragePage, totalGaragePages } = useSelector(
    (state: RootState) => state.paginationGarage,
  );
  const { currentWinnersPage, itemsPerWinnersPage, totalWinnersPages, sortField, sortOrder } = useSelector(
    (state: RootState) => state.winnerSortingPaginationSlice,
  );
  const garageCarCount = useSelector((state: RootState) => state.cars.totalCount);
  const winnersCount = useSelector((state: RootState) => state.winners.totalCount);

  useEffect(() => {
    if (raceWinner) {
      const winnerData = {
        id: raceWinner.id,
        time: raceWinner.time,
        wins: 1,
      };

      const carData = getCarFromState(raceWinner.id);
      if (carData) {
        const winnerDataForModal = {
          ...winnerData,
          name: carData.name,
        };

        setModalWinner(winnerDataForModal);
      }

      const saveData = async () => {
        await dispatch(saveWinner(winnerData)).unwrap();
        dispatch(
          fetchWinners({ page: currentWinnersPage, limit: itemsPerWinnersPage, sort: sortField, order: sortOrder }),
        );
        dispatch(fetchAndUpdateCars({ page: currentGaragePage, limit: itemsPerGaragePage }));
      };

      saveData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, raceWinner]);

  useEffect(() => {
    dispatch(fetchWinners({ page: currentWinnersPage, limit: itemsPerWinnersPage, sort: sortField, order: sortOrder }));
    dispatch(fetchAndUpdateCars({ page: currentGaragePage, limit: itemsPerGaragePage }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTotalItems(garageCarCount));
  }, [garageCarCount]);

  useEffect(() => {
    dispatch(setTotalWinnerItems(winnersCount));
  }, [winnersCount]);

  useEffect(() => {
    if (currentGaragePage > 1 && currentGaragePage > totalGaragePages) {
      dispatch(setPage(currentGaragePage - 1));
    }
  }, [totalGaragePages]);

  useEffect(() => {
    if (currentWinnersPage > 1 && currentWinnersPage > totalWinnersPages) {
      dispatch(setWinnerCurrentPage(currentWinnersPage - 1));
    }
  }, [totalWinnersPages]);

  return (
    <section className="main-wrapper">
      <WinnerAnnouncement winner={modalWinner || null} />
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
