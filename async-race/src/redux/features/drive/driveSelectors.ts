import { RootState } from '../../store';

export const selectDriveDataById = (state: RootState, carId: number) => {
  const driveMode = state.drive.driveModes.find(mode => mode.id === carId);
  return driveMode || null;
};

export const selectRaceStatusById = (state: RootState, carId: number) => {
  const raceStatusData = state.drive.raceStatus.find(status => status.id === carId);
  return raceStatusData || null;
};

export const selectWinnerId = (state: RootState) => {
  const winnerId = state.drive.winner;
  return winnerId || null;
};
