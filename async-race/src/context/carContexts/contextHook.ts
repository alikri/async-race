import { useContext } from 'react';
import { CarStateContext, CarStateContextType, LoadStateContext, LoadStateContextType } from './CarStateContext';
import { SelectedCarContextType, SelectedCarContext } from './SelectedCarContext';

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

export const useSelectedCar = (): SelectedCarContextType => {
  const context = useContext(SelectedCarContext);
  if (!context) {
    throw new Error('useSelectedCar must be used within a SelectedCarProvider');
  }
  return context;
};
