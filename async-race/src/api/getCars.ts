import { CarData } from '../components/car/Car';
import makeApiRequest from '../utils/apiRequest';

export interface FetchCarsResponse {
  cars: CarData[];
  totalCount: number;
}

const getCars = async (page: number = 1, limit: number = 7): Promise<FetchCarsResponse> => {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.set('_page', page.toString());
  }
  if (limit !== undefined) {
    params.set('_limit', limit.toString());
  }

  try {
    const { data, headers } = await makeApiRequest<CarData[]>({
      endpoint: '/garage',
      params,
    });

    const totalCount = headers.get('X-Total-Count');
    return {
      cars: data,
      totalCount: totalCount ? parseInt(totalCount, 10) : 0,
    };
  } catch (error) {
    console.error('Failed to fetch cars:', error);
    throw error;
  }
};

export default getCars;
