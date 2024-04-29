import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createWinner from '../../../api/winnersAPI/createWinner';
import getWinners from '../../../api/winnersAPI/getWinners';
import { WinnerData } from '../../../types';
import updateWinner from '../../../api/winnersAPI/updateWinner';
import { RootState } from '../../store';
import deleteWinner from '../../../api/winnersAPI/deleteWinner';

interface WinnersState {
  winners: WinnerData[];
  totalCount: number;
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
};

export const fetchWinners = createAsyncThunk('winners/fetchWinners', async () => {
  const response = await getWinners();
  return response;
});

export const removeWinner = createAsyncThunk('winners/removeWinner', async (id: number, { rejectWithValue }) => {
  try {
    await deleteWinner(id);
    return id;
  } catch (error) {
    console.error('Winner with this id does not exist', error);
    return rejectWithValue(id);
  }
});

export const saveWinner = createAsyncThunk('winners/saveWinner', async (winnerData: WinnerData, { getState }) => {
  const state = getState() as RootState;
  const data = state.winners.winners;

  const isWinnerInList = data.some((currWinner: WinnerData) => currWinner.id === winnerData.id);

  if (isWinnerInList) {
    const previousWinnerData = data.find((data: WinnerData) => data.id === winnerData.id);
    if (previousWinnerData) {
      const updateWinnerData = {
        ...previousWinnerData,
        wins: previousWinnerData.wins + 1,
        time: previousWinnerData.time < winnerData.time ? previousWinnerData.time : winnerData.time,
      };
      const updatedWinner = await updateWinner(updateWinnerData);
      return updatedWinner;
    }
    return null;
  }
  const newWinner = await createWinner(winnerData);
  return newWinner;
});

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(saveWinner.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.winners.findIndex(winner => winner.id === action.payload?.id);
          if (index !== -1) {
            state.winners[index] = action.payload;
          } else {
            state.winners.push(action.payload);
          }
        } else {
          console.error('Failed to save winner due to invalid data');
        }
      })
      .addCase(removeWinner.fulfilled, (state, action) => {
        state.winners = state.winners.filter(winner => winner.id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(removeWinner.rejected, (state, action) => {
        console.error('Failed to delete winner with ID:', action.payload);
      });
  },
});

export default winnersSlice.reducer;
