import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getCars from '../../../api/getCars';
import createCar from '../../../api/createCar';
import updateCar from '../../../api/updateCar';
import { CreateCarData, UpdateCarData } from '../../../types';
import { CarData } from '../../../components/car/Car';
import deleteCar from '../../../api/deleteCar';
import { RootState } from '../../store';

interface CarState {
  cars: CarData[];
  totalCount: number;
}

const initialState: CarState = {
  cars: [],
  totalCount: 0,
};

export const fetchAndUpdateCars = createAsyncThunk('cars/fetchAndUpdate', async () => {
  const response = await getCars();
  return response;
});

export const addCar = createAsyncThunk('cars/addCar', async (newCarData: CreateCarData) => {
  const newCar = await createCar(newCarData);
  return newCar;
});

export const updateExistingCar = createAsyncThunk('cars/updateCar', async (updateCarData: UpdateCarData) => {
  const updatedCar = await updateCar(updateCarData);
  return { updatedCar, id: updateCarData.id };
});

export const deleteExistingCar = createAsyncThunk<number, number, { state: RootState }>(
  'cars/deleteCar',
  async (carId, { rejectWithValue }) => {
    try {
      await deleteCar(carId);
      return carId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

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
      });
  },
});

export default carsSlice.reducer;
