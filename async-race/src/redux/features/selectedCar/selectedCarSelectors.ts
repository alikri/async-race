import { RootState } from '../../store';

const getSelectedCar = (state: RootState) => state.selectedCar.selectedCar;

export default getSelectedCar;
