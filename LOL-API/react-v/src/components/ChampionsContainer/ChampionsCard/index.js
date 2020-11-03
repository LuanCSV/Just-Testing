import React from 'react';
import './style.css'

const ChampionCard = ({...champ}) => {

  const { 
    name,
    id,
    title,
    image,
    tags,
    blurb
   } = champ

  return (
    <article className="card">
      {name}
    </article>
  )
}

export default ChampionCard;
