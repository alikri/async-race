import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    carName: '',
    color: '',
    updateCarName: '',
    updateColor: '',
  },
};

export const userInputSlice = createSlice({
  name: 'userInput',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: state => {
      state.formData = initialState.formData;
    },
    resetCarName: state => {
      state.formData.carName = initialState.formData.carName;
    },
    resetUpdateCarName: state => {
      state.formData.updateCarName = initialState.formData.updateCarName;
    },
  },
});

export const { setFormData, resetFormData, resetCarName, resetUpdateCarName } = userInputSlice.actions;

export default userInputSlice.reducer;
