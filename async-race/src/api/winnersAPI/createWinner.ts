import makeApiRequest from '../../utils/apiRequest';
import { WinnerData, WinnerRequestData } from '../../types';

const createWinner = async (winner: WinnerRequestData): Promise<WinnerData> => {
  const endpoint = '/winners';
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
  };

  const { id, wins, time } = winner;
  const body = {
    id,
    wins,
    time,
  };

  try {
    const response = await makeApiRequest<WinnerData>({
      endpoint,
      method,
      headers,
      body,
    });

    return response.data;
  } catch (error) {
    console.error('Failed to create car:', error);
    throw error;
  }
};

export default createWinner;
