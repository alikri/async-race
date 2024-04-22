import makeApiRequest from '../utils/apiRequest';

const deleteCar = async (id: number): Promise<void> => {
  const endpoint = `/garage/${id}`;

  try {
    await makeApiRequest<void>({
      endpoint,
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Failed to delete car:', error);
    throw error;
  }
};

export default deleteCar;
