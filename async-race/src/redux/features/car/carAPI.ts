import { createAsyncThunk } from '@reduxjs/toolkit';
import getCars from '../../../api/getCars';
import { CreateCarData, UpdateCarData } from '../../../types';
import createCar from '../../../api/createCar';
import updateCar from '../../../api/updateCar';
import { RootState } from '../../store';
import deleteCar from '../../../api/deleteCar';

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
