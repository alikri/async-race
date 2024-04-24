import { RootState } from '../../store';

export const selectDriveDataById = (state: RootState, carId: number) => {
  const driveMode = state.drive.driveModes.find(mode => mode.id === carId);
  return driveMode || null;
};

export const selectRaceStatusById = (state: RootState, carId: number) => {
  const driveMode = state.drive.raceStatus.find(status => status.id === carId);
  return driveMode || null;
};

export const selectWinnerId = (state: RootState) => {
  const driveMode = state.drive.winner;
  return driveMode || null;
};
