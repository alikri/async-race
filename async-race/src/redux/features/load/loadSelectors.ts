import { RootState } from '../../store';

export const getLoading = (state: RootState): boolean => state.load.loading;

export const getError = (state: RootState): string | null => state.load.error;
