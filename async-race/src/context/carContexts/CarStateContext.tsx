import { createContext, useEffect, useState, SetStateAction, Dispatch, useMemo } from 'react';
import { CarState, CreateCarData, ProviderProps, UpdateCarData } from '../../types';
import getCars from '../../api/getCars';
import createCar from '../../api/createCar';
import updateCar from '../../api/updateCar';

export interface CarStateContextType {
  carState: CarState;
  setCarState: Dispatch<SetStateAction<CarState>>;
  addCar: (newCarData: CreateCarData) => Promise<void>;
  updateExistingCar: (updateCarData: UpdateCarData) => Promise<void>;
}

export interface LoadStateContextType {
  loading: boolean;
  error: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  fetchAndUpdateCars: () => void;
}

const initialCarState: CarStateContextType = {
  carState: {
    cars: [],
    totalCount: 0,
  },
  setCarState: () => {},
  addCar: async () => {},
  updateExistingCar: async () => {},
};

const initialLoadState: LoadStateContextType = {
  loading: false,
  error: null,
  setLoading: () => {},
  setError: () => {},
  fetchAndUpdateCars: () => Promise.resolve(),
};

// Create Contexts
const CarStateContext = createContext<CarStateContextType>(initialCarState);
const LoadStateContext = createContext<LoadStateContextType>(initialLoadState);

const CarProvider = ({ children }: ProviderProps) => {
  const [carState, setCarState] = useState<CarState>({ cars: [], totalCount: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAndUpdateCars = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCars();
      setCarState({
        cars: response.cars,
        totalCount: response.totalCount,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addCar = async (newCarData: CreateCarData) => {
    try {
      const newCar = await createCar(newCarData);
      setCarState(prev => ({
        ...prev,
        cars: [...prev.cars, newCar],
        totalCount: prev.totalCount + 1,
      }));
    } catch (error) {
      setError('Failed to add car');
    }
  };

  const updateExistingCar = async (newCarData: UpdateCarData) => {
    try {
      const updatedCar = await updateCar(newCarData);
      setCarState(prev => ({
        ...prev,
        cars: prev.cars.map(car => (car.id === updatedCar.id ? { ...car, ...updatedCar } : car)),
      }));
    } catch (error) {
      setError('Failed to update car');
    }
  };

  useEffect(() => {
    fetchAndUpdateCars();
  }, []);

  const carStateValue = useMemo(
    () => ({
      carState,
      setCarState,
      addCar,
      updateExistingCar,
    }),
    [carState],
  );

  const loadStateValue = useMemo(
    () => ({
      loading,
      error,
      setLoading,
      setError,
      fetchAndUpdateCars,
    }),
    [loading, error, setError],
  );

  return (
    <CarStateContext.Provider value={carStateValue}>
      <LoadStateContext.Provider value={loadStateValue}>{children}</LoadStateContext.Provider>
    </CarStateContext.Provider>
  );
};

export { CarProvider, CarStateContext, LoadStateContext };
