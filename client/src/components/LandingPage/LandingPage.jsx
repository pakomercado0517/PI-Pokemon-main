import React from 'react'
import { NavLink } from 'react-router-dom';
import Pokeball from '../Pokeball/Pokeball';

const IndexPage= ()=> {
  return(
    <div>
      <h1>Individaul Project</h1>
      <NavLink to='/home'>
        {/* <img src='https://i.ibb.co/HKTkTcL/Pokemon-banner.jpg'
        width='950'
        height='400'
        alt='img_logo'
        /> */}
        <Pokeball/>
      </NavLink>
    </div>
  )
}

export default IndexPage;