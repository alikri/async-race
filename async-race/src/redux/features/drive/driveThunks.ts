import { createAsyncThunk } from '@reduxjs/toolkit';
import { driveCarEngine, startCarEngine, stopCarEngine } from '../../../api/carAPI/handleDrive';
import setImmediateDriveMode from './driveActions';

export const startCarDrive = createAsyncThunk('drive/startEngine', async (id: number, { rejectWithValue }) => {
  try {
    const data = await startCarEngine(id);
    return {
      id,
      drive: false,
      driveData: data,
      reset: false,
      broken: false,
      finished: false,
    };
  } catch (error) {
    console.error('Error starting car engine:', error);
    return rejectWithValue('Failed to start engine');
  }
});

export const switchToDriveMode = createAsyncThunk(
  'drive/switchToDrive',
  async (id: number, { dispatch, rejectWithValue }) => {
    dispatch(setImmediateDriveMode({ id, drive: true }));

    try {
      await driveCarEngine(id);
      return null;
    } catch (error) {
      console.error('Error starting car engine:', error);
      return rejectWithValue({ id, drive: false });
    }
  },
);

export const stopCarDrive = createAsyncThunk('drive/stopEngine', async (id: number, { rejectWithValue }) => {
  try {
    const data = await stopCarEngine(id);
    return {
      id,
      drive: false,
      driveData: data,
      reset: false,
      broken: false,
      finished: true,
    };
  } catch (error) {
    console.error('Error stopping car engine:', error);
    return rejectWithValue('Failed to stop engine');
  }
});

export const resetCarState = createAsyncThunk('drive/resetCar', async (id: number) => {
  return { id, reset: true, drive: false, broken: false, finished: false };
});
