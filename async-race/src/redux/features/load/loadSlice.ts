import { createSlice } from '@reduxjs/toolkit';

const loadSlice = createSlice({
  name: 'load',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = loadSlice.actions;
export default loadSlice.reducer;
