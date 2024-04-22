// import makeApiRequest from '../utils/apiRequest';
// import { CarData } from '../components/car/Car';

// const updateCar = async (id: number): Promise<CarData> => {
//   const endpoint = `/garage/${id}`;
//   const method = 'PUT';
//   const headers = {
//     'Content-Type': 'application/json',
//   };
//   const body = {
//     name,
//     color,
//   };

//   try {
//     const response = await makeApiRequest<CarData>({
//       endpoint,
//       method,
//       headers,
//       body,
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Failed to create car:', error);
//     throw error;
//   }
// };

// export default updateCar;
