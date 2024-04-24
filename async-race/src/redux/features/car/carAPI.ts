import { createAsyncThunk } from '@reduxjs/toolkit';
import getCars from '../../../api/carAPI/getCars';
import { CreateCarData, UpdateCarData } from '../../../types';
import createCar from '../../../api/carAPI/createCar';
import updateCar from '../../../api/carAPI/updateCar';
import { RootState } from '../../store';
import deleteCar from '../../../api/carAPI/deleteCar';

export const fetchAndUpdateCars = createAsyncThunk('cars/fetchAndUpdate', async (_, { rejectWithValue }) => {
  try {
    const response = await getCars();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to fetch cars');
  }
});

export const addCar = createAsyncThunk('cars/addCar', async (newCarData: CreateCarData, { rejectWithValue }) => {
  try {
    const newCar = await createCar(newCarData);
    return newCar;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to add car');
  }
});

export const updateExistingCar = createAsyncThunk(
  'cars/updateCar',
  async (updateCarData: UpdateCarData, { rejectWithValue }) => {
    try {
      const updatedCar = await updateCar(updateCarData);
      return { updatedCar, id: updateCarData.id };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update car');
    }
  },
);

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
