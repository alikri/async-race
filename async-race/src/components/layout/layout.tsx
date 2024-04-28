import './layout.styles.scss';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { AppDispatch } from '../../redux/store';
import { fetchWinners } from '../../redux/features/winners/winnersSlice';
import { fetchAndUpdateCars } from '../../redux/features/car/carAPI';

const Layout = () => {
  const dispatch: AppDispatch = useDispatch();

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
