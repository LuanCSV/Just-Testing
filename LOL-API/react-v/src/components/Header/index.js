import React from 'react';
import './style.css';

const Header = () => {
  return (
    <header className='header'>
      <nav>
        <img src="https://raw.githubusercontent.com/mmtrt/leagueoflegends/master/snap/gui/leagueoflegends.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"/>
        <h1>League of Legends - API</h1>
      </nav>
    </header>
  )
}

export default Header;