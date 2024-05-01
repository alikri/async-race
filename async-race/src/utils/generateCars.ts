import createCar from '../api/carAPI/createCar';
import { CARS_NUMBER_TO_GENERATE } from '../constants';
import { carModels, carNames } from './randomCarsData';

export interface CarsGenerator {
  getRandomCarName: () => string;
  getRandomColor: () => string;
}

export const getRandomCarName = () => {
  const randomNameIndex = Math.floor(Math.random() * carNames.length);
  const randomModelIndex = Math.floor(Math.random() * carModels.length);
  return `${carNames[randomNameIndex]} ${carModels[randomModelIndex]}`;
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// const createM = async () => {
//   const promises = [];

//   for (let i = 0; i < CARS_NUMBER_TO_GENERATE; i += 1) {
//     const { getRandomCarName, getRandomColor } = generateCar();
//     const name = getRandomCarName();
//     const color = getRandomColor();
//     promises.push(createCar({ name, color }));
//   }

//   try {
//     await Promise.all(promises);
//   } catch (error) {
//     console.error('Error creating cars:', error);
//   }
// };

// export default createM;
