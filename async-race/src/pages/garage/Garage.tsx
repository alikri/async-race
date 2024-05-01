import './garage.styles.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ControlPanel from '../../components/controlPanel/ControlPanel';
import SingleRaceRoad from '../../components/singRaceRoad/SingeRaceRoad';
import { getAllCars } from '../../redux/features/car/carSelectors';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchAndUpdateCars } from '../../redux/features/car/carThunks';
import { setPage } from '../../redux/features/paginationGarage/paginationGarageSlice';
import { selectRaceStatus } from '../../redux/features/raceResults/raceStatusSelectors';

const Garage = () => {
  const dispatch: AppDispatch = useDispatch();
  const allCars = useSelector(getAllCars);
  const isRaceInProgress = useSelector((state: RootState) => selectRaceStatus(state));
  const {
    currentGaragePage: currentPage,
    itemsPerGaragePage: itemsPerPage,
    totalGaragePages: totalPages,
  } = useSelector((state: RootState) => state.paginationGarage);
  useEffect(() => {
    dispatch(fetchAndUpdateCars({ page: currentPage, limit: itemsPerPage }));
  }, [currentPage, dispatch, itemsPerPage]);

  const handleNextPageClick = () => {
    dispatch(setPage(currentPage + 1));
    dispatch(fetchAndUpdateCars({ page: currentPage + 1, limit: itemsPerPage }));
  };

  const handlePreviousPageClick = () => {
    dispatch(setPage(currentPage - 1));
    dispatch(fetchAndUpdateCars({ page: currentPage - 1, limit: itemsPerPage }));
  };

  const displayCars = allCars && allCars.map(car => <SingleRaceRoad key={car.id} car={car} />);
  return (
    <div className="garage-container">
      <ControlPanel />
      <div className="pagination-container">
        <button
          className="pagination-buttons"
          type="button"
          disabled={currentPage === 1 || isRaceInProgress}
          onClick={handlePreviousPageClick}
        >
          Previous
        </button>
        <button
          className="pagination-buttons"
          type="button"
          disabled={currentPage === totalPages || isRaceInProgress}
          onClick={handleNextPageClick}
        >
          Next
        </button>
      </div>

      <div className="road-wrapper">{displayCars && displayCars}</div>
    </div>
  );
};

export default Garage;
