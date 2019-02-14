import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GameStart from './components/GameStart';
import GamePlay from './components/GamePlay';
import { GameOver } from './components/GameOver';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player';
import './App.scss';

import backSound from './assets/media/America_Bit.mp3'

class App extends Component {
  render() {
      const {
          user,
      } = this.props;
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Route
                    path={`${process.env.PUBLIC_URL}/`}
                    exact
                    render={props => (
                        <GameStart {...props} user={user}/>
                    )}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/gamePlay`}
                    exact
                    component = {GamePlay}
                />
                <Route
                    path={`${process.env.PUBLIC_URL}/gameOver`}
                    exact
                    component = {GameOver}
                />
                <ReactPlayer
                    className='audio-main'
                    url={backSound}
                    playing
                    loop={true}
                    volume = {0.2}
                />
            </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

