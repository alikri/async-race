import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import './navigation.styles.scss';
import { getAllCars } from '../../redux/features/car/carSelectors';
import { resetRaceResults } from '../../redux/features/raceResults/raceResultsSlice';
import { resetCarState } from '../../redux/features/driveSettings/driveSettingsThunks';

const Navigation = () => {
  const dispatch: AppDispatch = useDispatch();
  const allCars = useSelector(getAllCars);
  const handleRouteToWinners = () => {
    dispatch(resetRaceResults());
    allCars.forEach(car => {
      dispatch(resetCarState(car.id));
    });
  };
  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <button type="button" className="nav-link">
          <Link to="/">Garage</Link>
        </button>
        <button type="button" className="nav-link" onClick={handleRouteToWinners}>
          <Link to="winners">Winners</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
