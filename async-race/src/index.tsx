import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import Layout from './components/layout/layout';
import Garage from './pages/garage/Garage';
import Winners from './pages/winners/Winners';
import { CarProvider } from './context/carContexts/CarStateContext';
import { SelectedCarProvider } from './context/carContexts/SelectedCarContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Garage />} />
      <Route index element={<Winners />} />
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CarProvider>
      <SelectedCarProvider>
        <RouterProvider router={router} />
      </SelectedCarProvider>
    </CarProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
