import React, {useState, useEffect} from 'react';
import { detectarDevice } from './Helpers/Device';

import './App.css';

import Header from './components/Header';
import Routes from './routes'

function App() {

  const [currentDevice, setCurrentDevice] = useState(detectarDevice());

  useEffect(() => {
    const updateDevice = () => {
      setCurrentDevice(detectarDevice())
    }
    window.addEventListener('resize', updateDevice);
    updateDevice();
    return () => {
      window.removeEventListener('resize', updateDevice);
    }
  }, [currentDevice]);

  return (
    <div className="App">
      <Header currentDevice={currentDevice}/>
      <Routes/>
    </div>
  );
}

export default App;
