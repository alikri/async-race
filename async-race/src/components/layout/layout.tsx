import './layout.styles.scss';

import { Outlet } from 'react-router-dom';
import Header from '../header/header';

const Layout = () => {
  return (
    <section className="main-wrapper">
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
