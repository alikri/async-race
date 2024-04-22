import { CarData } from '../../components/car/Car';
import { CarState, CarAction, ActionType } from './types';

function updateCarInArray(cars: CarData[], updatedCar: CarData) {
  return cars.map(car => (car.id === updatedCar.id ? updatedCar : car));
}

const carReducer = (state: CarState, action: CarAction): CarState => {
  switch (action.type) {
    case ActionType.CREATE_CAR_REQUEST:
    case ActionType.UPDATE_CAR_REQUEST:
    case ActionType.DELETE_CAR_REQUEST:
    case ActionType.GET_CARS_REQUEST:
      return { ...state, loading: true, error: null };

    case ActionType.CREATE_CAR_SUCCESS:
      return { ...state, cars: [...state.cars, action.payload], loading: false };

    case ActionType.UPDATE_CAR_SUCCESS:
      return { ...state, cars: updateCarInArray(state.cars, action.payload), loading: false };

    case ActionType.GET_CARS_SUCCESS:
      return { ...state, cars: action.payload.cars, totalCount: action.payload.totalCount, loading: false };

    case ActionType.DELETE_CAR_SUCCESS:
      // Assuming payload is the ID of the deleted car
      return { ...state, cars: state.cars.filter(car => car.id !== action.payload), loading: false };

    case ActionType.CREATE_CAR_FAILURE:
    case ActionType.UPDATE_CAR_FAILURE:
    case ActionType.DELETE_CAR_FAILURE:
    case ActionType.GET_CARS_FAILURE:
      // Assuming payload is of type Error
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default carReducer;
