import makeApiRequest from '../utils/apiRequest';
import { DriveResponse } from '../types';

export const startCarEngine = async (id: number): Promise<DriveResponse> => {
  try {
    const { data } = await makeApiRequest<DriveResponse>({
      endpoint: '/engine',
      method: 'PATCH',
      params: { id: id.toString(), status: 'started' },
    });
    return data;
  } catch (error) {
    console.error('Failed to start car engine');
    throw error;
  }
};

export const stopCarEngine = async (id: number): Promise<DriveResponse> => {
  try {
    const { data } = await makeApiRequest<DriveResponse>({
      endpoint: '/engine',
      method: 'PATCH',
      params: { id: id.toString(), status: 'stopped' },
    });
    return data;
  } catch (error) {
    console.error('Failed to stop car engine');
    throw error;
  }
};
