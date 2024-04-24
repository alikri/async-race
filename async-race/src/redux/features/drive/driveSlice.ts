import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DriveMode } from '../../../types';
import { driveCarEngine, startCarEngine, stopCarEngine } from '../../../api/carAPI/handleDrive';

interface CarStatus {
  id: number;
  finished: boolean;
  finishTime: number | null;
  broken: boolean;
}
interface RejectedCarResponse {
  id: number;
  drive: boolean;
}

interface DriveState {
  driveModes: DriveMode[];
  raceStatus: CarStatus[];
  winner: number | null;
}

const initialState: DriveState = {
  driveModes: [],
  raceStatus: [],
  winner: null,
};

export const startCarDrive = createAsyncThunk('drive/startEngine', async (id: number, { rejectWithValue }) => {
  try {
    const data = await startCarEngine(id);

    return { id, drive: true, driveData: data, reset: false, broken: false };
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
    return { id, drive: false, driveData: data, reset: false, broken: false };
  } catch (error) {
    console.error('Error stopping car engine:', error);
    return rejectWithValue('Failed to stop engine');
  }
});

export const resetCarState = createAsyncThunk('drive/resetCar', async (id: number) => {
  return { id, reset: true };
});

const driveSlice = createSlice({
  name: 'drive',
  initialState,
  reducers: {
    stopAnimationDriveMode(state, action: PayloadAction<{ id: number }>) {
      const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
      if (existingMode) {
        existingMode.drive = false;
        if (!existingMode.broken) {
          const statusIndex = state.raceStatus.findIndex(status => status.id === action.payload.id);
          if (statusIndex >= 0) {
            state.raceStatus[statusIndex].finished = true;
            state.raceStatus[statusIndex].finishTime = Date.now();
          } else {
            state.raceStatus.push({
              id: action.payload.id,
              finished: true,
              finishTime: Date.now(),
              broken: false,
            });
          }
        }
        if (state.winner === null) {
          const eligibleCars = state.raceStatus.filter(car => car.finished && !car.broken);
          if (eligibleCars.length > 0) {
            eligibleCars.sort((a, b) => (a.finishTime ?? Number.MAX_VALUE) - (b.finishTime ?? Number.MAX_VALUE));
            state.winner = eligibleCars[0].id;
          }
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(startCarDrive.fulfilled, (state, action: PayloadAction<DriveMode>) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
        if (existingMode) {
          existingMode.drive = true;
          existingMode.driveData = action.payload.driveData;
          existingMode.reset = false;
          existingMode.broken = action.payload.broken;
        } else {
          state.driveModes.push(action.payload);
        }
      })
      .addCase(stopCarDrive.fulfilled, (state, action: PayloadAction<DriveMode>) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
        if (existingMode) {
          existingMode.drive = false;
          existingMode.driveData = action.payload.driveData;
          existingMode.reset = false;
          existingMode.broken = action.payload.broken;
        } else {
          state.driveModes.push(action.payload);
        }
      })
      .addCase(resetCarState.fulfilled, (state, action: PayloadAction<{ id: number; reset: boolean }>) => {
        const existingMode = state.driveModes.find(mode => mode.id === action.payload.id);
        if (existingMode) {
          existingMode.reset = action.payload.reset;
          existingMode.drive = false;
          existingMode.broken = false;
        }
      })
      .addCase(switchToDriveMode.rejected, (state, action) => {
        const actionPayload = action.payload as RejectedCarResponse;
        const existingMode = state.driveModes.find(mode => mode.id === actionPayload.id);
        if (existingMode) {
          existingMode.drive = actionPayload.drive;
          existingMode.broken = true;
        }
      });
  },
});

export const { stopAnimationDriveMode } = driveSlice.actions;

export default driveSlice.reducer;
