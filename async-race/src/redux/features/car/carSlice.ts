import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarData } from '../../../components/car/Car';
import { addCar, createMultipleCars, deleteExistingCar, fetchAndUpdateCars, updateExistingCar } from './carAPI';

interface CarState {
  cars: CarData[];
  totalCount: number;
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  totalCount: 0,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchAndUpdateCars.fulfilled,
        (state, action: PayloadAction<{ cars: CarData[]; totalCount: number }>) => {
          state.cars = action.payload.cars;
          state.totalCount = action.payload.totalCount;
          state.error = null;
        },
      )
      .addCase(fetchAndUpdateCars.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Failed to fetch cars';
      })
      .addCase(addCar.fulfilled, (state, action: PayloadAction<CarData>) => {
        state.cars.push(action.payload);
        state.totalCount += 1;
        state.error = null;
      })
      .addCase(addCar.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Failed to add car';
      })
      .addCase(updateExistingCar.fulfilled, (state, action: PayloadAction<{ updatedCar: CarData; id: number }>) => {
        const index = state.cars.findIndex(car => car.id === action.payload.id);
        if (index !== -1) {
          state.cars[index] = { ...state.cars[index], ...action.payload.updatedCar };
        }
        state.error = null;
      })
      .addCase(updateExistingCar.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Failed to update car';
      })
      .addCase(deleteExistingCar.fulfilled, (state, action: PayloadAction<number>) => {
        state.cars = state.cars.filter(car => car.id !== action.payload);
        state.totalCount -= 1;
        state.error = null;
      })
      .addCase(deleteExistingCar.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Failed to delete car';
      })
      .addCase(createMultipleCars.fulfilled, (state, action) => {
        state.totalCount += action.payload;
        state.error = null;
      })
      .addCase(createMultipleCars.rejected, (state, action) => {
        state.error = 'Failed to create multiple cars';
      });
  },
});

export default carsSlice.reducer;
