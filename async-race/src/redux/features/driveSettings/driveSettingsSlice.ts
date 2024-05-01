import { createSlice } from '@reduxjs/toolkit';
import { DriveMode } from '../../../types';
import { resetCarState, startCarDrive, stopCarDrive, switchToDriveMode } from './driveSettingsThunks';
import setImmediateDriveMode from './driveSettingsActions';

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
        if (existingIndex !== -1 && state.driveModes[existingIndex].reset !== true) {
          state.driveModes[existingIndex].drive = false;
          state.driveModes[existingIndex].broken = true;
        }
      });
  },
});

export default driveSlice.reducer;
