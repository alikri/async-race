import React, { createContext, useReducer, useMemo, ReactNode } from 'react';
import { CarState, CarContextType } from './types';
import carReducer from './carReducer';

interface CarProviderProps {
  children: ReactNode;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

const CarProvider = ({ children }: CarProviderProps) => {
  const initialState: CarState = { cars: [], loading: false, error: null };
  const [state, dispatch] = useReducer(carReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};

export { CarProvider, CarContext };
