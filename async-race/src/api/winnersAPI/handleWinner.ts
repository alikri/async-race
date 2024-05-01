import { WinnerData } from '../../types';
import createWinner from './createWinner';
import getWinner from './getWinner';
import updateWinner from './updateWinner';

async function handleWinner(winnerDetails: WinnerData) {
  try {
    const winnerResponse = await getWinner(winnerDetails.id);
    const updateWinnerData = {
      ...winnerResponse,
      wins: winnerResponse.wins + 1,
      time: winnerDetails.time < winnerResponse.time ? winnerDetails.time : winnerResponse.time,
    };
    const updated = await updateWinner(updateWinnerData);
    return updated;
  } catch (error) {
    const data = await createWinner(winnerDetails);
    return data;
  }
}

export default handleWinner;
