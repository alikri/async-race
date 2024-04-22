import { useContext } from 'react';
import { CarStateContext, LoadStateContext } from './carContext';

export const useCarState = () => {
  const context = useContext(CarStateContext);
  if (context === undefined) {
    throw new Error('useCarState must be used within a CarStateProvider');
  }
  return context;
};

export const useLoadState = () => {
  const context = useContext(LoadStateContext);
  if (context === undefined) {
    throw new Error('useLoadState must be used within a LoadStateProvider');
  }
  return context;
};
