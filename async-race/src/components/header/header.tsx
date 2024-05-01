import './header.styles.scss';

import Navigation from '../navigation/Navigation';

const Header = () => {
  return (
    <header className="header">
      <div className="nav-container">
        <Navigation />
      </div>
      <div className="title-container">
        <h1>Async Race</h1>
      </div>
    </header>
  );
};

export default Header;
