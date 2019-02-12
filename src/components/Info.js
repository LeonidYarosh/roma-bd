import React from 'react';
import Dialog from 'material-ui/Dialog';
import '../styles/Info.scss';

import heart from '../assets/images/HEART.png';
import infoIconImage from '../assets/images/infoIcon.svg';

const message = (
  <div className='test-2'>
    <p> Press 'Spacebar' to release bullets</p>
    <p> Use Mouse to move the Spaceship </p>
    <p> Press 'B' to release blaster</p>
    <p> Press 'Enter' to Play/Pause</p>
    <p> Press 'Esc' to close this dialog </p>
  </div>
);

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      score: this.props.score,
      lives: this.props.lives,
      pause: this.props.pause,
      blasters: this.props.blasters,
      livesImage: this.showLives(this.props.lives),
    };
  }

  componentWillReceiveProps(newProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(newProps)) {
      // console.log("Got new Props in Info.js as ", newProps);
      this.setState({
        score: newProps.score,
        lives: newProps.lives,
        pause: newProps.pause,
        blasters: newProps.blasters,
        livesImage: this.showLives(newProps.lives),
      });
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  showInfo() {
    this.setState({
      open: true,
    });
  }

  showLives(lives) {
    let jsx = [];
    for (let i = 0; i < lives; i++) {
      jsx.push(
        <div key={'lives_' + i}>
          <img src={heart} className="playerLives" alt="P" />
        </div>,
      );
    }
    return jsx;
  }

  render() {
    return (
      <div className="info-wrapper">
        <div className="live-content">
          <div className="score-wrapper">
            <div className="score-wrapper__label">
              <div>Score:</div> <span>{this.state.score}</span>
            </div>
            <div className="score-wrapper__label">
              <div>Blasters :</div> <span>{this.state.blasters}</span>
            </div>
          </div>
          <div className="infoLives"> {this.state.livesImage} </div>
          {this.state.pause ? <div>Press 'Enter' to Play</div> : undefined}

          <span onClick={this.showInfo.bind(this)}>
            <img
              src={infoIconImage}
              alt="i"
              className="showInfo"
              data-toggle="tooltip"
              title="Click for controls"
            />
          </span>
        </div>
        <Dialog
            className="test"
          title="Controls"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {message}
        </Dialog>
      </div>
    );
  }
}
