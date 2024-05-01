import { CarData } from '../../types';
import makeApiRequest from '../../utils/apiRequest';

const getCar = async (id: number): Promise<CarData> => {
  try {
    const { data } = await makeApiRequest<CarData>({
      endpoint: `/garage/${id}`,
    });

    return data;
  } catch (error) {
    console.error(`Failed to fetch winner with ID ${id}:`, error);
    throw error;
  }
};

export default getCar;
