import { createAsyncThunk } from '@reduxjs/toolkit';
import getCar from '../../../api/carAPI/getCar';
import createWinner from '../../../api/winnersAPI/createWinner';
import deleteWinner from '../../../api/winnersAPI/deleteWinner';
import getWinners, { FetchWinnersResponse } from '../../../api/winnersAPI/getWinners';
import { SortField, SortOrder, WinnerRequestData } from '../../../types';
import { RootState } from '../../store';
import updateWinner from '../../../api/winnersAPI/updateWinner';

interface FetchWinnersParams {
  page: number;
  limit: number;
  sort: SortField;
  order: SortOrder;
}
export const fetchWinners = createAsyncThunk<FetchWinnersResponse, FetchWinnersParams, { rejectValue: string }>(
  'winners/fetchWinners',
  async ({ page, limit, sort, order }, { rejectWithValue }) => {
    try {
      const response = await getWinners({ page, limit, sort, order });
      const winnersWithCarColors = await Promise.all(
        response.winners.map(async winner => {
          try {
            const car = await getCar(winner.id);
            return { ...winner, carColor: car.color, name: car.name };
          } catch (error) {
            console.error(`Failed to fetch car for winner with ID ${winner.id}:`, error);
            return winner;
          }
        }),
      );

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
