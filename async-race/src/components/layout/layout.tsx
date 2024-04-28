/* eslint-disable no-console */
import './layout.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchWinners, saveWinner } from '../../redux/features/winners/winnersSlice';
import { fetchAndUpdateCars } from '../../redux/features/car/carAPI';
import { selectWinner } from '../../redux/features/raceResults/raceResultsSelectors';
import WinnerAnnouncement from '../winnerAnouncment/WinnerAnouncement';
import { WinnerData, WinnerDataForModal } from '../../types';
import { getCarById, getCarFromState } from '../../redux/features/car/carSelectors';

const Layout = () => {
  const dispatch: AppDispatch = useDispatch();
  const raceWinner = useSelector((state: RootState) => selectWinner(state));
  const carName = useSelector((state: RootState) => (raceWinner ? getCarById(state, raceWinner.id) : null));
  const [modalWinner, setModalWinner] = useState<null | WinnerDataForModal>();

  useEffect(() => {
    if (raceWinner) {
      console.log(raceWinner, 'Winner inside Layout');
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

      dispatch(saveWinner(winnerData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, raceWinner]);

  useEffect(() => {
    dispatch(fetchWinners());
    dispatch(fetchAndUpdateCars());
  }, [dispatch]);

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
