import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarData } from '../../../types';

interface SelectedCarState {
  selectedCar: CarData | null;
}

const initialState: SelectedCarState = {
  selectedCar: null,
};

const selectedCar = createSlice({
  name: 'selectedCar',
  initialState,
  reducers: {
    setSelectedCar(state, action: PayloadAction<CarData | null>) {
      state.selectedCar = action.payload;
    },
    clearSelectedCar(state) {
      state.selectedCar = null;
    },
  },
});

export const { setSelectedCar, clearSelectedCar } = selectedCar.actions;
export default selectedCar.reducer;
