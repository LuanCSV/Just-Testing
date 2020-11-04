import React from 'react';
import './style.css'

const ChampionCard = ({...champ}) => {

  const { 
    name,
    id,
    title,
    tags
   } = champ
  return (
    <article className="card">
      <div className="card-image">
        <img 
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
          alt={`Imagem do campeao ${name} de league of legends`}
        />
      </div>
      
      <div className="card-body">
        <h3> { name }</h3>
        <p>{title}</p> 
        <small> {tags.length > 1 ? `${tags[0]} / ${tags[1]}` : `${tags}`} </small>
        <a href={`https://universe.leagueoflegends.com/pt_BR/champion/${id}/`} target="_blank" rel='noreferrer' class="info">More info</a>
      </div>
    </article>
  )
}

export default ChampionCard;
