import { RootState } from '../../store';

export const selectDriveDataById = (state: RootState, carId: number) => {
  const driveMode = state.drive.driveModes.find(mode => mode.id === carId);
  return driveMode || null;
};

export const selectDriveCarsNumber = (state: RootState) => {
  const carNumber = state.drive.driveModes.length;
  return carNumber;
};

export const selectDriveData = (state: RootState) => {
  const { driveModes } = state.drive;
  return driveModes || null;
};

export const selectAllBrokenStatuses = (state: RootState) => {
  return state.drive.driveModes.map(mode => ({ id: mode.id, broken: mode.broken }));
};
