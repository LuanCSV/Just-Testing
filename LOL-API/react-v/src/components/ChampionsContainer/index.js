import React, { useState, useEffect } from 'react';
import ChampionCard from './ChampionsCard';
import './style.css';

const ChampionsContainer = () => {

  const URL = `http://ddragon.leagueoflegends.com/cdn/10.19.1/data/en_US/champion.json`;

  const [activeChampions, setActiveChampions] = useState([]);

  let champions = []

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        const dataChamps = json.data;

        for (const k in dataChamps) {
          champions.push(dataChamps[k])
        }
        setActiveChampions(champions);
      }) 
  }, [URL])

  console.log(activeChampions)

  return (
    <main className="containerr">
      <h1>Personagens</h1>
      <hr/>
      <section className="cards">

        {activeChampions.map((champ, index) => {
          return (
            <ChampionCard key={index} {...champ}/>
          )
        })}

      </section>
    </main>
  )
}

export default ChampionsContainer;