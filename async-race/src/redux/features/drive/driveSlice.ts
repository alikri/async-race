import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DriveMode } from '../../../types';
import { driveCarEngine, startCarEngine, stopCarEngine } from '../../../api/handleDrive';
import { AppDispatch } from '../../store';

interface DriveState {
  driveModes: DriveMode[];
}

interface RejectedCarResponse {
  id: number;
  drive: boolean;
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

// eslint-disable-next-line consistent-return
export const switchToDriveMode = createAsyncThunk('drive/switchToDrive', async (id: number, { rejectWithValue }) => {
  try {
    await driveCarEngine(id);
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

export const initiateCarRace = (carId: number) => async (dispatch: AppDispatch) => {
  try {
    await dispatch(startCarDrive(carId)).unwrap();
    await dispatch(switchToDriveMode(carId));
  } catch (error) {
    console.error('Failed to initiate race for car:', error);
  }
};

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
      .addCase(switchToDriveMode.rejected, (state, action) => {
        const actionPayload = action.payload as RejectedCarResponse;
        const existingMode = state.driveModes.find(mode => mode.id === actionPayload.id);
        if (existingMode) {
          existingMode.drive = actionPayload.drive;
        }
      });
  },
});

export default driveSlice.reducer;
