import './App.scss';
import ControlPanel from './components/controlPanel/ControlPanel';

import Header from './components/header/header';

const App = () => {
  return (
    <div className="main-container">
      <Header />
      <ControlPanel />
    </div>
  );
};

export default App;
