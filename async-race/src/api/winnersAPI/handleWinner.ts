import { WinnerData } from '../../types';
import createWinner from './createWinner';
import getWinner from './getWinner';
import updateWinner from './updateWinner';

function logError(operation: string, id: number, error: unknown): string {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Failed to ${operation} winner with ID ${id}:`, errorMessage);
  return `Error ${operation} winner with ID ${id}: ${errorMessage}`;
}

async function handleWinnerCreation(winnerDetails: WinnerData, fetchError: unknown) {
  console.error(logError('fetch', winnerDetails.id, fetchError));
  try {
    return await createWinner({ id: winnerDetails.id, wins: 1, time: winnerDetails.time });
  } catch (createError) {
    throw new Error(logError('create', winnerDetails.id, createError));
  }
}

async function handleWinner(winnerDetails: WinnerData) {
  let winnerResponse;
  try {
    winnerResponse = await getWinner(winnerDetails.id);
  } catch (error) {
    return handleWinnerCreation(winnerDetails, error);
  }

  const updateWinnerData = {
    ...winnerResponse,
    wins: winnerResponse.wins + 1,
    time: winnerDetails.time < winnerResponse.time ? winnerDetails.time : winnerResponse.time,
  };

  try {
    return await updateWinner(updateWinnerData);
  } catch (error) {
    throw new Error(logError('update', winnerDetails.id, error));
  }
}

export default handleWinner;
