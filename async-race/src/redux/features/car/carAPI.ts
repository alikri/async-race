import { createAsyncThunk } from '@reduxjs/toolkit';
import getCars from '../../../api/carAPI/getCars';
import { CreateCarData, UpdateCarData } from '../../../types';
import createCar from '../../../api/carAPI/createCar';
import updateCar from '../../../api/carAPI/updateCar';
import { RootState } from '../../store';
import deleteCar from '../../../api/carAPI/deleteCar';
import { CARS_NUMBER_TO_GENERATE } from '../../../constants';
import { getRandomCarName, getRandomColor } from '../../../utils/generateCars';

export const fetchAndUpdateCars = createAsyncThunk(
  'cars/fetchAndUpdate',
  async (params: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await getCars(params.page, params.limit);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch cars');
    }
  },
);

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

export const createMultipleCars = createAsyncThunk(
  'cars/createMultipleCars',
  async (_, { dispatch, rejectWithValue }) => {
    const promises = [];

    for (let i = 0; i < CARS_NUMBER_TO_GENERATE; i += 1) {
      const name = getRandomCarName();
      const color = getRandomColor();
      promises.push(createCar({ name, color }));
    }

    try {
      await Promise.all(promises);
      return CARS_NUMBER_TO_GENERATE;
    } catch (error) {
      console.error('Error creating cars:', error);
      return rejectWithValue('Failed to create multiple cars');
    }
  },
);
