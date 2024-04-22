import { useContext } from 'react';
import { CarStateContext, CarStateContextType, LoadStateContext, LoadStateContextType } from './carContext';

export const useCarState = (): CarStateContextType => {
  const context = useContext(CarStateContext);
  if (context === undefined) {
    throw new Error('useCarState must be used within a CarStateProvider');
  }
  return context;
};

export const useLoadState = (): LoadStateContextType => {
  const context = useContext(LoadStateContext);
  if (context === undefined) {
    throw new Error('useLoadState must be used within a LoadStateProvider');
  }
  return context;
};
