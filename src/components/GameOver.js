import React from 'react'
import gameImg from "../assets/images/GAME.png"
import byeImg from "../assets/images/BYE.png"
import overImg from "../assets/images/OVER.png"

import '../styles/GameOver.scss'

const onClick = push => () => {
  push('/')
}

export const GameOver = (props) =>
  <div className="game-over">
    <img height={120} src={gameImg} className="img-game" alt=""/>
    <img height={240} src={byeImg} className="Ivan-face" alt="" onClick={onClick(props.history.push)}/>
    <img height={120} src={overImg} className="Ivan-face" alt=""/>
  </div>

