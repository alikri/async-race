import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DriveMode } from '../../../types';
import { driveCarEngine, startCarEngine, stopCarEngine } from '../../../api/handleDrive';

interface DriveState {
  driveModes: DriveMode[];
}

const initialState: DriveState = {
  driveModes: [],
};

export const startCarDrive = createAsyncThunk('drive/startEngine', async (id: number, { rejectWithValue }) => {
  try {
    const data = await startCarEngine(id);

    return { id, drive: true, driveData: data };
  } catch (error) {
    console.error('Error starting car engine:', error);
    return rejectWithValue('Failed to start engine');
  }
});

export const brakeCarEngine = createAsyncThunk('drive/brakeEngine', async (id: number, { rejectWithValue }) => {
  try {
    const isDrive = await driveCarEngine(id);

    if (!isDrive.success) {
      throw new Error('Braking failed.');
    }
    return { id, drive: false };
  } catch (error) {
    console.error('Error starting car engine:', error);
    return rejectWithValue({ id, drive: false });
  }
});

export const stopCarDrive = createAsyncThunk('drive/stopEngine', async (id: number, { rejectWithValue }) => {
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
      .addCase(startCarDrive.fulfilled, (state, action: PayloadAction<DriveMode>) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
        if (existingMode) {
          existingMode.drive = true;
          existingMode.driveData = action.payload.driveData;
        } else {
          state.driveModes.push(action.payload);
        }
      })
      .addCase(stopCarDrive.fulfilled, (state, action: PayloadAction<DriveMode>) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
        if (existingMode) {
          existingMode.drive = false;
          existingMode.driveData = action.payload.driveData;
        } else {
          state.driveModes.push(action.payload);
        }
      })
      .addCase(brakeCarEngine.fulfilled, (state, action) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
        if (existingMode) {
          existingMode.drive = false;
        }
      })
      .addCase(brakeCarEngine.rejected, (state, action) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.meta.arg);
        if (existingMode) {
          existingMode.drive = false;
        }
        console.error('Failed to brake:', action.error?.message);
      });
  },
});

export default driveSlice.reducer;
