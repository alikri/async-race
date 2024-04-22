import React, { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';
import { ProviderProps } from '../../types';

export interface SelectedCarContextType {
  selectedCarId: number;
  setSelectedCarId: Dispatch<SetStateAction<number>>;
}

// Initial value for the context
const initialSelectedCarIdValue: SelectedCarContextType = {
  selectedCarId: 0,
  setSelectedCarId: () => {},
};

// Context definition with initial value
const SelectedCarContext = createContext<SelectedCarContextType>(initialSelectedCarIdValue);

// Provider component
const SelectedCarProvider = ({ children }: ProviderProps) => {
  const [selectedCarId, setSelectedCarId] = useState<number>(0);

  const selectedCarIdValue = useMemo(
    () => ({
      selectedCarId,
      setSelectedCarId,
    }),
    [selectedCarId, setSelectedCarId],
  );

  return <SelectedCarContext.Provider value={selectedCarIdValue}>{children}</SelectedCarContext.Provider>;
};

export { SelectedCarProvider, SelectedCarContext };
