// src/redux/slices/driveSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DriveMode } from '../../../types';
import { startCarEngine, stopCarEngine } from '../../../api/handleDrive';

interface DriveState {
  driveModes: DriveMode[];
}

const initialState: DriveState = {
  driveModes: [],
};

export const startEngine = createAsyncThunk('drive/startEngine', async (id: number, { rejectWithValue }) => {
  try {
    const data = await startCarEngine(id);
    return { id, drive: true, driveData: data };
  } catch (error) {
    console.error('Error starting car engine:', error);
    return rejectWithValue('Failed to start engine');
  }
});

export const stopEngine = createAsyncThunk('drive/stopEngine', async (id: number, { rejectWithValue }) => {
  try {
    const data = await stopCarEngine(id);
    return { id, drive: false, driveData: data };
  } catch (error) {
    console.error('Error stopping car engine:', error);
    return rejectWithValue('Failed to stop engine');
  }
});

const driveSlice = createSlice({
  name: 'drive',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(startEngine.fulfilled, (state, action: PayloadAction<DriveMode>) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
        if (existingMode) {
          existingMode.drive = true;
          existingMode.driveData = action.payload.driveData;
        } else {
          state.driveModes.push(action.payload);
        }
      })
      .addCase(stopEngine.fulfilled, (state, action: PayloadAction<DriveMode>) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
        if (existingMode) {
          existingMode.drive = false;
          existingMode.driveData = action.payload.driveData;
        } else {
          state.driveModes.push(action.payload);
        }
      });
  },
});

export default driveSlice.reducer;
