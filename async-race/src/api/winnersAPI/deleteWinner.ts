import makeApiRequest from '../../utils/apiRequest';

const deleteWinner = async (id: number): Promise<void> => {
  const endpoint = `/winners/${id}`;

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

export default deleteWinner;
