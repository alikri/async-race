import { RootState } from '../../store';

export const selectDriveDataById = (state: RootState, carId: number) => {
  const driveMode = state.drive.driveModes.find(mode => mode.id === carId);
  return driveMode || null;
};

export const selectDriveData = (state: RootState) => {
  const { driveModes } = state.drive;
  return driveModes || null;
};
