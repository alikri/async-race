import './navigation.styles.scss';

import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <div className="nav-link">
          <Link to="/">Garage</Link>
        </div>
        <div className="nav-link">
          <Link to="winners">Winners</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
