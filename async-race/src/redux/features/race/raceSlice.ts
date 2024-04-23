import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { startCarDrive, switchToDriveMode } from '../drive/driveSlice';

interface RaceResult {
  carId: number;
  result: string;
}

interface RaceState {
  isRacing: boolean;
  raceResults: RaceResult[];
  resetState: boolean;
  error: string | null;
}

const initialState: RaceState = {
  isRacing: false,
  raceResults: [],
  resetState: false,
  error: null,
};

export const initiateCarRace = createAsyncThunk<RaceResult, number, { rejectValue: string }>(
  'race/initiateCarRace',
  async (carId, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(startCarDrive(carId)).unwrap();
      await dispatch(switchToDriveMode(carId));
      return { carId, result: 'Success' };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  },
);

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    resetRace(state, action: PayloadAction<boolean>) {
      state.resetState = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initiateCarRace.fulfilled, (state, action: PayloadAction<RaceResult>) => {
        state.isRacing = true;
        state.raceResults.push(action.payload);
      })
      .addCase(
        initiateCarRace.rejected,
        (state, action: PayloadAction<string | undefined, string, never, SerializedError>) => {
          state.isRacing = false;
          state.error = action.payload || 'An unknown error occurred';
        },
      );
  },
});

export const { resetRace, clearError } = raceSlice.actions;
export default raceSlice.reducer;
