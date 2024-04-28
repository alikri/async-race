/* eslint-disable no-console */
import './layout.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchWinners, saveWinner } from '../../redux/features/winners/winnersSlice';
import { fetchAndUpdateCars } from '../../redux/features/car/carAPI';
import { selectWinner } from '../../redux/features/raceResults/raceResultsSelectors';
import { resetRaceResults } from '../../redux/features/raceResults/raceResultsSlice';
import { selectWinners } from '../../redux/features/winners/winnersSelector';

const Layout = () => {
  const dispatch: AppDispatch = useDispatch();
  const winnersState = useSelector((state: RootState) => selectWinners(state));
  const raceWinner = useSelector((state: RootState) => selectWinner(state));

  useEffect(() => {
    if (raceWinner) {
      console.log(raceWinner, 'Winner inside Layout');
      const winnerData = {
        id: raceWinner.id,
        time: raceWinner.time,
        wins: 1,
      };

      dispatch(saveWinner(winnerData));
    }
  }, [dispatch, raceWinner]);

  useEffect(() => {
    dispatch(fetchWinners());
    dispatch(fetchAndUpdateCars());
  }, [dispatch]);

  return (
    <section className="main-wrapper">
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
