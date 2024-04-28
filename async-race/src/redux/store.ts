import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import carsReducer from './features/car/carSlice';
import loadReducer from './features/load/loadSlice';
import selectedCarReducer from './features/selectedCar/selectedCarSlice';
import driveReducer from './features/drive/driveSlice';
import raceResultsReducer from './features/raceResults/raceResultsSlice';
import winnersReducer from './features/winners/winnersSlice';
import paginationWinnerReducer from './features/paginationWinners/paginationWinnerSlice';
import paginationGarageReducer from './features/paginationGarage/paginationGarageSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    load: loadReducer,
    selectedCar: selectedCarReducer,
    drive: driveReducer,
    raceResults: raceResultsReducer,
    winners: winnersReducer,
    paginationWinner: paginationWinnerReducer,
    paginationGarage: paginationGarageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
