import { WinnerData } from '../../types';
import makeApiRequest from '../../utils/apiRequest';

const getWinner = async (id: number): Promise<WinnerData> => {
  try {
    const { data } = await makeApiRequest<WinnerData>({
      endpoint: `/winners/${id}`,
    });

    return data;
  } catch (error) {
    console.error(`Failed to fetch winner with ID ${id}:`, error);
    throw error;
  }
};

export default getWinner;
