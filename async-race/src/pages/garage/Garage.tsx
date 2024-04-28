/* eslint-disable no-console */
import './garage.styles.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ControlPanel from '../../components/controlPanel/ControlPanel';
import RoadLine from '../../components/road/RoadLine';
import { getError, getLoading } from '../../redux/features/load/loadSelectors';
import { getAllCars, getTotalCount } from '../../redux/features/car/carSelectors';
import { AppDispatch } from '../../redux/store';
import { fetchAndUpdateCars } from '../../redux/features/car/carAPI';
import { resetRaceResults } from '../../redux/features/raceResults/raceResultsSlice';

const Garage = () => {
  const dispatch: AppDispatch = useDispatch();
  const allCars = useSelector(getAllCars);
  const isLoading = useSelector(getLoading);
  const totalCarsCount = useSelector(getTotalCount);
  const error = useSelector(getError);
  const [isRacing, setIsRacing] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const totalPageCount = Math.ceil(totalCarsCount / 10);
    setTotalPages(totalPageCount);
    dispatch(resetRaceResults());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAndUpdateCars());
    dispatch(resetRaceResults());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayCars =
    allCars && allCars.map(car => <RoadLine isRacing={isRacing} setIsRacing={setIsRacing} key={car.id} car={car} />);
  return (
    <div className="garage-container">
      <ControlPanel setIsRacing={setIsRacing} isRacing={isRacing} />
      <div className="pagination-container">
        <button className="pagination-buttons" type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button
          className="pagination-buttons"
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <div className="road-wrapper">{displayCars && displayCars}</div>
    </div>
  );
};

export default Garage;
