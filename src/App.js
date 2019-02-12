import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GameStart from './components/GameStart';
import GamePlay from './components/GamePlay';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.scss';

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
                    path={`${process.env.PUBLIC_URL}/gameplay`}
                    exact
                    component = {GamePlay}
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

