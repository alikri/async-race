import { createContext, ReactNode, useEffect, useState, SetStateAction, Dispatch, useMemo } from 'react';
import { CarState } from '../types';
import getCars from '../api/getCars';

interface CarProviderProps {
  children: ReactNode;
}

interface CarStateContextType {
  carState: CarState;
  setCarState: Dispatch<SetStateAction<CarState>>;
}

interface LoadStateContextType {
  loading: boolean;
  error: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  fetchAndUpdateCars: () => void;
}

// Create Contexts
const CarStateContext = createContext<CarStateContextType | undefined>(undefined);
const LoadStateContext = createContext<LoadStateContextType | undefined>(undefined);

const CarProvider = ({ children }: CarProviderProps) => {
  const [carState, setCarState] = useState<CarState>({ cars: [], totalCount: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAndUpdateCars = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCars(1, 7);
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

  useEffect(() => {
    fetchAndUpdateCars();
  }, []);

  const carStateValue = useMemo(
    () => ({
      carState,
      setCarState,
    }),
    [carState, setCarState],
  );

  const loadStateValue = useMemo(
    () => ({
      loading,
      error,
      setLoading,
      setError,
      fetchAndUpdateCars,
    }),
    [loading, error, setLoading, setError],
  );

  return (
    <CarStateContext.Provider value={carStateValue}>
      <LoadStateContext.Provider value={loadStateValue}>{children}</LoadStateContext.Provider>
    </CarStateContext.Provider>
  );
};

export { CarProvider, CarStateContext, LoadStateContext };
