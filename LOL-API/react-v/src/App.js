import React, {useState, useEffect} from 'react';
import Header from './components/Header';

import './App.css';
import { detectarDevice } from './Helpers/Device';

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
    </div>
  );
}

export default App;
