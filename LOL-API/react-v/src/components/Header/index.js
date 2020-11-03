import React, { useState } from 'react';
import bars from '../../bars-solid.svg';
import times from '../../times-solid.svg';
import './style.css';

const Header = ({currentDevice}) => {

  let isMobile = currentDevice === 'mobile';
  let isTablet = currentDevice === 'tablet';
  
  const [activeMenu, setActiveMenu] = useState(false);

  const toggleActiveMenu = () => {
    setActiveMenu(!activeMenu);
  }
  const searchChampions = () => {}

  return (
    <header className={`header ${currentDevice}`}>
      <img 
        src={activeMenu ? times : bars} 
        alt={`${!activeMenu? 'Abrir Menu': 'Fechar Menu'}`}
        className={`header-bars ${currentDevice} ${activeMenu? 'active': ''}`}
        onClick={toggleActiveMenu}
      />

      <nav className='header-title'>
        <img src="https://raw.githubusercontent.com/mmtrt/leagueoflegends/master/snap/gui/leagueoflegends.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"/>
        <h1>League of Legends - API</h1>
      </nav>
      <nav className={`header-search ${activeMenu && (isMobile || isTablet) ? 'active-menu': ''}`}>
        <input type="search" className="searchBar"/>
        <button className="searchButton" onClick={() => { searchChampions() }}>Search</button>
      </nav>
    </header>
  )
}

export default Header;