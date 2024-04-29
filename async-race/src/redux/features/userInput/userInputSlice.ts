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
  },
});

export const { setFormData, resetFormData } = userInputSlice.actions;

export default userInputSlice.reducer;
