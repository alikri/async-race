import { createContext, ReactNode, useEffect, useState, SetStateAction, Dispatch, useMemo } from 'react';
import { CarState } from '../types';
import getCars from '../api/getCars';
import createCar from '../api/createCar';

interface CarProviderProps {
  children: ReactNode;
}

interface CreateCar {
  name: string;
  color: string;
}

export interface CarStateContextType {
  carState: CarState;
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
};

// Initial state for load state context
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

const CarProvider = ({ children }: CarProviderProps) => {
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

  const addCar = async (carData: CreateCar) => {
    const { name, color } = carData;
    try {
      const newCar = await createCar(name, color);
      setCarState(prev => ({
        ...prev,
        cars: [...prev.cars, newCar],
        totalCount: prev.totalCount + 1,
      }));
    } catch (error) {
      setError('Failed to add car');
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
