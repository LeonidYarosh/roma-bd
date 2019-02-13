import React from 'react'
import PropTypes from 'prop-types'

import '../styles/IvanHey.scss'
import ReactPlayer from 'react-player';
import Spank_3 from "../assets/media/Spank_3.mp3"

export class IvanHey extends React.Component {
  static propTypes = {
    addScore: PropTypes.func,
  }

  state = {
    isPunch: false,
    position: 1,
    isShow: true,
    isChangePosition: false,
  }

  toggleVisibility = () => {
    this.setState({
      isShow: !this.state.isShow,
      isChangePosition: false,
    })
  }

  changePosition = () => {
    let randomNumber = Math.floor(Math.random()*4) + 1;

    this.setState({
      isPunch: false,
      position: randomNumber,
      isChangePosition: true,
    })
  }

  onClick = () => {
    this.props.addScore()
    this.setState({
      isPunch: true,
    })
  }

  onEnded = () => {
    this.toggleVisibility()
  }

  render() {
    const { isPunch, position, isShow, isChangePosition } = this.state
    const punchClassName = `ivan-hey--img 
    ${ isShow ? 'show' : '' }
    ${ isPunch ? 'ivan-hey--punch' : '' }
    ${ position === 1 ? 'pos1' : '' }
    ${ position === 2 ? 'pos2' : '' }
    ${ position === 3 ? 'pos3' : '' }
    ${ position === 4 ? 'pos4' : '' }
    `
    if (!isShow) {
      this.changePosition()
    }

    if (isChangePosition) {
      this.toggleVisibility()
    }

    return (
      <div className='ivan-hey'>
        <div
          className={punchClassName}
          onClick={this.onClick}
        />
        <ReactPlayer
          url={Spank_3}
          playing={isPunch}
          onEnded={this.onEnded}
        />
      </div>
    )
  }

}
