import { RootState } from '../../store';

const selectDriveDataById = (state: RootState, carId: number) => {
  const driveMode = state.drive.driveModes.find(mode => mode.id === carId);
  return driveMode || null;
};

export default selectDriveDataById;
