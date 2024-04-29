import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createWinner from '../../../api/winnersAPI/createWinner';
import getWinners, { FetchWinnersResponse } from '../../../api/winnersAPI/getWinners';
import { WinnerData, WinnerRequestData } from '../../../types';
import updateWinner from '../../../api/winnersAPI/updateWinner';
import { RootState } from '../../store';
import deleteWinner from '../../../api/winnersAPI/deleteWinner';
import getCar from '../../../api/carAPI/getCar';

interface WinnersState {
  winners: WinnerData[];
  totalCount: number;
}
interface FetchWinnersParams {
  page: number;
  limit: number;
  sort: 'id' | 'wins' | 'time';
  order: 'ASC' | 'DESC';
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
};

export const fetchWinners = createAsyncThunk<FetchWinnersResponse, FetchWinnersParams, { rejectValue: string }>(
  'winners/fetchWinners',
  async ({ page, limit, sort, order }, { rejectWithValue }) => {
    try {
      const response = await getWinners({ page, limit, sort, order });
      const winnersWithCarColors = await Promise.all(
        response.winners.map(async winner => {
          try {
            const car = await getCar(winner.id);
            return { ...winner, carColor: car.color, name: car.name }; // Merge car color into winner data
          } catch (error) {
            console.error(`Failed to fetch car for winner with ID ${winner.id}:`, error);
            return winner; // Return the winner without car color if fetching car fails
          }
        }),
      );
      // Return both winners and totalCount
      return { winners: winnersWithCarColors, totalCount: response.totalCount };
    } catch (error) {
      console.error('Failed to fetch winners:', error);
      return rejectWithValue('Failed to fetch winners');
    }
  },
);

export const removeWinner = createAsyncThunk('winners/removeWinner', async (id: number, { rejectWithValue }) => {
  try {
    await deleteWinner(id);
    return id;
  } catch (error) {
    console.error('Winner with this id does not exist', error);
    return rejectWithValue(id);
  }
});

export const saveWinner = createAsyncThunk(
  'winners/saveWinner',
  async (winnerData: WinnerRequestData, { getState }) => {
    const state = getState() as RootState;
    const data = state.winners.winners;

    const isWinnerInList = data.some((currWinner: WinnerRequestData) => currWinner.id === winnerData.id);

    if (isWinnerInList) {
      const previousWinnerData = data.find((data: WinnerRequestData) => data.id === winnerData.id);
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
  },
);

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
