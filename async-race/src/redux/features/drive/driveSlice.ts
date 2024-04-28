import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { DriveMode } from '../../../types';
import { driveCarEngine, startCarEngine, stopCarEngine } from '../../../api/carAPI/handleDrive';

interface RejectedCarResponse {
  id: number;
  drive: boolean;
}

interface DriveState {
  driveModes: DriveMode[];
}

const initialState: DriveState = {
  driveModes: [],
};

export const setImmediateDriveMode = createAction<{ id: number; drive: boolean }>('drive/setImmediateDriveMode');

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

const driveSlice = createSlice({
  name: 'drive',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(startCarDrive.fulfilled, (state, action) => {
        const existingIndex = state.driveModes.findIndex(mode => mode.id === action.payload.id);
        if (existingIndex !== -1) {
          state.driveModes[existingIndex] = { ...state.driveModes[existingIndex], ...action.payload };
        } else {
          state.driveModes.push(action.payload);
        }
      })
      .addCase(stopCarDrive.fulfilled, (state, action) => {
        const existingIndex = state.driveModes.findIndex(mode => mode.id === action.payload.id);
        if (existingIndex !== -1) {
          state.driveModes[existingIndex] = { ...state.driveModes[existingIndex], ...action.payload };
        } else {
          state.driveModes.push(action.payload);
        }
      })
      .addCase(setImmediateDriveMode, (state, action) => {
        const { id, drive } = action.payload;
        const existingIndex = state.driveModes.findIndex(mode => mode.id === id);
        if (existingIndex !== -1) {
          state.driveModes[existingIndex].drive = drive;
        }
      })
      .addCase(resetCarState.fulfilled, (state, action) => {
        const existingIndex = state.driveModes.findIndex(mode => mode.id === action.payload.id);
        if (existingIndex !== -1) {
          state.driveModes[existingIndex] = {
            ...state.driveModes[existingIndex],
            reset: true,
            drive: false,
            broken: false,
            finished: false,
          };
        }
      })
      .addCase(switchToDriveMode.rejected, (state, action) => {
        const actionPayload = action.payload as RejectedCarResponse;
        const existingIndex = state.driveModes.findIndex(mode => mode.id === actionPayload.id);
        if (existingIndex !== -1) {
          state.driveModes[existingIndex].drive = false;
          state.driveModes[existingIndex].broken = true;
        }
      });
  },
});

export default driveSlice.reducer;
