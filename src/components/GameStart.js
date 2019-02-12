import React, { Component } from 'react';
import localforage from 'localforage';
// import SignUpForm from './SignUpForm';
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
        if (this.state.name !== null && this.state.name !== "") {
            localforage.setItem('playerName', this.state.name).then((value) => {
                console.log("Value set in localforage: ", value);
                this.props.history.push('/gameplay')
            }).catch((err) => {
                console.log("Error while storing name");
                this.setState({ errorText: err });
            })

        }
    }
    render() {
        return (
            <div className="main">
                <div className="content">
                    <form onSubmit={this.handleChange}>
                        <input
                            onChange={(event) => { this.setState({ name: event.target.value.trim() }) }}
                        />
                        <br />
                        <button type="submit" label="Enter">123</button>
                    </form>
                </div>
            </div>
        )
    }
}