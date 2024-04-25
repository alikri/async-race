import { createAsyncThunk } from '@reduxjs/toolkit';
import getWinners from '../../../api/winnersAPI/getWinners';
import createWinner from '../../../api/winnersAPI/createWinner';
import updateWinner from '../../../api/winnersAPI/updateWinner';
import deleteWinner from '../../../api/winnersAPI/deleteWinner';
import { WinnerData } from '../../../types';
import getWinner from '../../../api/winnersAPI/getWinner';

export const fetchAndUpdateWinners = createAsyncThunk('winners/fetchAndUpdate', async (_, { rejectWithValue }) => {
  try {
    const response = await getWinners();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to fetch winners');
  }
});

export const addWinner = createAsyncThunk(
  'winners/addWinner',
  async (newWinnerData: WinnerData, { rejectWithValue }) => {
    try {
      const newWinner = await createWinner(newWinnerData);
      return newWinner;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to add winner');
    }
  },
);

export const updateExistingWinner = createAsyncThunk(
  'winners/updateWinner',
  async (updateWinnerData: WinnerData, { rejectWithValue }) => {
    try {
      const updatedWinner = await updateWinner(updateWinnerData);
      return { updatedWinner, id: updateWinnerData.id };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to update winner');
    }
  },
);

export const deleteExistingWinner = createAsyncThunk(
  'winners/deleteWinner',
  async (winnerId: number, { rejectWithValue }) => {
    try {
      await deleteWinner(winnerId);
      return winnerId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const getExistingWinner = createAsyncThunk('winners/fetchWinner', async (id: number, { rejectWithValue }) => {
  try {
    const winnerData = await getWinner(id);
    return winnerData;
  } catch (error) {
    console.error(`Failed to fetch winner with ID ${id}:`, error);
    try {
      const newWinner = await createWinner({ id, wins: 1, time: 0 });
      return newWinner;
    } catch (createError) {
      console.error('Failed to create a new winner:', createError);
      return rejectWithValue('Failed to create a new winner:');
    }
  }
});
