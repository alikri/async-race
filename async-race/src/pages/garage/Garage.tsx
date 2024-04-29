/* eslint-disable no-console */
import './garage.styles.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ControlPanel from '../../components/controlPanel/ControlPanel';
import RoadLine from '../../components/road/RoadLine';
import { getError, getLoading } from '../../redux/features/load/loadSelectors';
import { getAllCars } from '../../redux/features/car/carSelectors';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchAndUpdateCars } from '../../redux/features/car/carThunks';
import { resetRaceResults } from '../../redux/features/raceResults/raceResultsSlice';
import { setPage } from '../../redux/features/paginationGarage/paginationGarageSlice';
import { resetCarState } from '../../redux/features/drive/driveThunks';

const Garage = () => {
  const dispatch: AppDispatch = useDispatch();
  const allCars = useSelector(getAllCars);
  const isLoading = useSelector(getLoading);
  const error = useSelector(getError);
  const [isRacing, setIsRacing] = useState(false);
  const {
    currentGaragePage: currentPage,
    itemsPerGaragePage: itemsPerPage,
    totalGaragePages: totalPages,
  } = useSelector((state: RootState) => state.paginationGarage);

  useEffect(() => {
    dispatch(resetRaceResults());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAndUpdateCars({ page: currentPage, limit: itemsPerPage }));
    dispatch(resetRaceResults());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAndUpdateCars({ page: currentPage, limit: itemsPerPage }));
  }, [currentPage, dispatch, itemsPerPage]);

  const resetRaceState = () => {
    dispatch(resetRaceResults());
    allCars.forEach(car => {
      dispatch(resetCarState(car.id));
    });
  };

  const handleNextPageClick = () => {
    dispatch(setPage(currentPage + 1));
    dispatch(fetchAndUpdateCars({ page: currentPage + 1, limit: itemsPerPage }));
    resetRaceState();
    setIsRacing(false);
  };

  const handlePreviousPageClick = () => {
    dispatch(setPage(currentPage - 1));
    dispatch(fetchAndUpdateCars({ page: currentPage - 1, limit: itemsPerPage }));
    resetRaceState();
    setIsRacing(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayCars =
    allCars && allCars.map(car => <RoadLine isRacing={isRacing} setIsRacing={setIsRacing} key={car.id} car={car} />);
  return (
    <div className="garage-container">
      <ControlPanel setIsRacing={setIsRacing} isRacing={isRacing} />
      <div className="pagination-container">
        <button
          className="pagination-buttons"
          type="button"
          disabled={currentPage === 1}
          onClick={handlePreviousPageClick}
        >
          Previous
        </button>
        <button
          className="pagination-buttons"
          type="button"
          disabled={currentPage === totalPages}
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
