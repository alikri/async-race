import { CarState, CarAction, ActionType, Car } from './types';

function updateCarInArray(cars: Car[], updatedCar: Car) {
  return cars.map(car => (car.id === updatedCar.id ? updatedCar : car));
}

const carReducer = (state: CarState, action: CarAction): CarState => {
  switch (action.type) {
    case ActionType.CREATE_CAR_REQUEST:
    case ActionType.UPDATE_CAR_REQUEST:
    case ActionType.DELETE_CAR_REQUEST:
    case ActionType.GENERATE_CARS_REQUEST:
      return { ...state, loading: true, error: null };

    case ActionType.CREATE_CAR_SUCCESS:
      return { ...state, cars: [...state.cars, action.payload], loading: false };

    case ActionType.UPDATE_CAR_SUCCESS:
      return { ...state, cars: updateCarInArray(state.cars, action.payload), loading: false };

    case ActionType.GENERATE_CARS_SUCCESS:
      return { ...state, cars: action.payload, loading: false };

    case ActionType.DELETE_CAR_SUCCESS:
      return { ...state, cars: state.cars.filter(car => car.id !== action.payload), loading: false };

    case ActionType.CREATE_CAR_FAILURE:
    case ActionType.UPDATE_CAR_FAILURE:
    case ActionType.DELETE_CAR_FAILURE:
    case ActionType.GENERATE_CARS_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default carReducer;
