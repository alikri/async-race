import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import carsReducer from './features/car/carSlice';
import loadReducer from './features/load/loadSlice';
import selectedCarReducer from './features/selectedCar/selectedCarSlice';
import driveReducer from './features/driveSettings/driveSettingsSlice';
import raceStatusReducer from './features/raceResults/raceStatusSlice';
import winnersReducer from './features/winners/winnersSlice';
import winnerSortingPaginationReducer from './features/winnerSortingPagination/winnerSortingPaginationSlice';
import paginationGarageReducer from './features/paginationGarage/paginationGarageSlice';
import userInputReducer from './features/userInput/userInputSlice';

const store = configureStore({
  reducer: {
    cars: carsReducer,
    load: loadReducer,
    selectedCar: selectedCarReducer,
    drive: driveReducer,
    raceStatus: raceStatusReducer,
    winners: winnersReducer,
    winnerSortingPaginationSlice: winnerSortingPaginationReducer,
    paginationGarage: paginationGarageReducer,
    userInput: userInputReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
