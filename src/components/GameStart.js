import React, { Component } from 'react';
import gameImg from '../assets/images/GAME.png';
import byeImg from '../assets/images/BYE.png';
import '../styles/GameStart.scss';

export default class GameStart extends Component {
    state = {
        name: "",
        errorText: ""
    }

    componentDidMount() {
        console.log('user?', this.props.user)
    }

    handleChange = (e) => {
        e.preventDefault()
        this.props.history.push('/gameplay')
    }

    render() {
        return (
            <div className="main start-screen">
                <div className="content">
                    <img height={120} src={gameImg} className="img-game" alt=""/>
                    <img height={240} src={byeImg} className="Ivan-face" alt=""/>
                    <div
                      onClick={this.handleChange}
                      className="btn-start"
                    >
                        START
                    </div>
                </div>
            </div>
        )
    }
}
