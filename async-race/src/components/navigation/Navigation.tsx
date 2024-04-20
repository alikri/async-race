import './navigation.styles.scss';

import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav-wrapper">
      <div>
        <Link to="/">Garage</Link>
      </div>
      <div>
        <Link to="winners">Winners</Link>
      </div>
    </nav>
  );
};

export default Navigation;
