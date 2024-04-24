import { WinnerData } from '../../types';
import makeApiRequest from '../../utils/apiRequest';

export interface FetchWinnersResponse {
  winners: WinnerData[];
  totalCount: number;
}

const getWinners = async ({
  page = 1,
  limit = 10,
  sort = 'id',
  order = 'ASC',
}: {
  page?: number;
  limit?: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
} = {}): Promise<FetchWinnersResponse> => {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.set('_page', page.toString());
  }
  if (limit !== undefined) {
    params.set('_limit', limit.toString());
  }
  if (sort !== undefined) {
    params.set('_sort', sort);
  }
  if (order !== undefined) {
    params.set('_order', order);
  }

  try {
    const { data, headers } = await makeApiRequest<WinnerData[]>({
      endpoint: '/winners',
      params,
    });

    const totalCount = headers.get('X-Total-Count');
    return {
      winners: data,
      totalCount: totalCount ? parseInt(totalCount, 10) : 0,
    };
  } catch (error) {
    console.error('Failed to fetch winners:', error);
    throw error;
  }
};

export default getWinners;
