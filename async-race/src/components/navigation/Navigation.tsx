import { useSelector } from 'react-redux';
import './navigation.styles.scss';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { selectRaceStatus } from '../../redux/features/raceResults/raceStatusSelectors';

const Navigation = () => {
  const isRaceInProgress = useSelector((state: RootState) => selectRaceStatus(state));
  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <button type="button" className="nav-link">
          <Link to="/">Garage</Link>
        </button>
        <button type="button" className="nav-link" disabled={isRaceInProgress}>
          <Link to="winners">Winners</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
