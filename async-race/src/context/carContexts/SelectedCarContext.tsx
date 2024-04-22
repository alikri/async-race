import { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';
import { ProviderProps } from '../../types';
import { CarData } from '../../components/car/Car';

export interface SelectedCarContextType {
  selectedCar: CarData | null;
  setSelectedCar: Dispatch<SetStateAction<CarData | null>>;
}

// Initial value for the context
const initialSelectedCarIdValue: SelectedCarContextType = {
  selectedCar: null,
  setSelectedCar: () => {},
};

// Context definition with initial value
const SelectedCarContext = createContext<SelectedCarContextType>(initialSelectedCarIdValue);

// Provider component
const SelectedCarProvider = ({ children }: ProviderProps) => {
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);

  const selectedCarValue = useMemo(
    () => ({
      selectedCar,
      setSelectedCar,
    }),
    [selectedCar],
  );

  return <SelectedCarContext.Provider value={selectedCarValue}>{children}</SelectedCarContext.Provider>;
};

export { SelectedCarProvider, SelectedCarContext };
