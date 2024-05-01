import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCar, createMultipleCars, deleteExistingCar, fetchAndUpdateCars, updateExistingCar } from './carThunks';
import { CarData } from '../../../types';

interface CarState {
  cars: CarData[];
  totalCount: number;
}

const initialState: CarState = {
  cars: [],
  totalCount: 0,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        fetchAndUpdateCars.fulfilled,
        (state, action: PayloadAction<{ cars: CarData[]; totalCount: number }>) => {
          state.cars = action.payload.cars;
          state.totalCount = action.payload.totalCount;
        },
      )
      .addCase(addCar.fulfilled, (state, action: PayloadAction<CarData>) => {
        state.cars.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(updateExistingCar.fulfilled, (state, action: PayloadAction<{ updatedCar: CarData; id: number }>) => {
        const index = state.cars.findIndex(car => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = { ...state.cars[index], ...action.payload.updatedCar };
        }
      })
      .addCase(deleteExistingCar.fulfilled, (state, action: PayloadAction<number>) => {
        state.cars = state.cars.filter(car => car.id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(createMultipleCars.fulfilled, (state, action) => {
        state.totalCount += action.payload;
      });
  },
});

export default carsSlice.reducer;
