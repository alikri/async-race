import makeApiRequest from '../../utils/apiRequest';
import { WinnerData } from '../../types';

const updateCar = async (winner: WinnerData): Promise<WinnerData> => {
  const { id, wins, time } = winner;
  const endpoint = `/winners/${id}`;
  const method = 'PUT';
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
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
    console.error('Failed to update car:', error);
    throw error;
  }
};

export default updateCar;
