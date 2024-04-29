import './navigation.styles.scss';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <button type="button" className="nav-link">
          <Link to="/">Garage</Link>
        </button>
        <button type="button" className="nav-link" disabled={false}>
          <Link to="winners">Winners</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
