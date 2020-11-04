import React, { useEffect, useState } from 'react';
import bars from '../../bars-solid.svg';
import times from '../../times-solid.svg';
import './style.css';

const Header = ({ currentDevice }) => {

  let isMobile = currentDevice === 'mobile';
  let isTablet = currentDevice === 'tablet';

  const [activeMenu, setActiveMenu] = useState(false);

  const [checkBox, setCheckBox] = useState(false);

  const toggleActiveMenu = () => {
    setActiveMenu(!activeMenu);
  }

  const toggleCheck = () => {
    let checkbox = document.getElementById('switch-shadow').checked;
    setCheckBox(checkbox);
  }

  const searchChampions = () => {

    toggleCheck()

    const filter = document.querySelector(`.searchBar`).value.toLowerCase();
    let cards = document.querySelectorAll('article');
    for (let i = 0; i < cards.length; i++) {

      if (checkBox) {
        const searchedTag = cards[i].getElementsByTagName("small")[0];
        const tagValue = (searchedTag.innerText || searchedTag.textContent).toLowerCase()
        console.log(tagValue)
        if (!tagValue.indexOf(filter)) {
          cards[i].style.display = ""
        } else {
          cards[i].style.display = "none"
        }

      }else{
        const searchedName = cards[i].getElementsByTagName("h3")[0];
        const nameValue = (searchedName.innerText || searchedName.textContent).toLowerCase()
        
        if (!nameValue.indexOf(filter)) {
          cards[i].style.display = ""
        } else {
          cards[i].style.display = "none"
        }

      }
    }
    
  }
  console.log(checkBox);



  return (
    <header className={`header ${currentDevice}`}>
      <img
        src={activeMenu ? times : bars}
        alt={`${!activeMenu ? 'Abrir Menu' : 'Fechar Menu'}`}
        className={`header-bars ${currentDevice} ${activeMenu ? 'active' : ''}`}
        onClick={toggleActiveMenu}
      />

      <nav className='header-title'>
        <img src="https://raw.githubusercontent.com/mmtrt/leagueoflegends/master/snap/gui/leagueoflegends.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy" />
        <h1>LOL - API</h1>
      </nav>
      <nav className={`header-search ${activeMenu && (isMobile || isTablet) ? 'active-menu' : ''}`}>
        |
        <div className="switch__container">
          Nome
          <input id="switch-shadow" className="switch switch--shadow" type="checkbox" />
          <label for="switch-shadow"></label>
          Classe
        </div>
        |
        <input type="search" className="searchBar"></input>
        <button className="searchButton"
          onClick={() => {
            searchChampions()
          }}>Search</button>
      </nav>
    </header>
  )
}


export default Header;