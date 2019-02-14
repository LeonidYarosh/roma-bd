import React, {Component} from 'react';
import ReactPlayer from 'react-player';

import Snackbar from 'material-ui/Snackbar';
import localforage from 'localforage';
import Info from './Info';
import { IvanHey } from './IvanHey';
import '../styles/Main.scss';

import shipImage from '../assets/images/RMS90.png';
import blastImage from '../assets/images/blast.gif';
import explodeImage from '../assets/images/EXPLODE-A.gif';
import enemyImage1 from '../assets/images/IL2.png'
import enemyImage2 from '../assets/images/IL2-1.png'
import bulletImage from '../assets/images/DILDO2.png';

import girl from '../assets/images/telka.gif';

import gachi1 from '../assets/media/fuck you....mp3'
import gachi2 from '../assets/media/Fucking slaves get your ass back here.mp3'
import gachi3 from '../assets/media/Iam cumming.mp3'
import gachi4 from '../assets/media/Orgasm 1.mp3'
import gachi5 from '../assets/media/Orgasm 2.mp3'
import gachi6 from '../assets/media/Thats amazing.mp3'

import gachi7 from '../assets/media/obosralsya.mp3'
import gachi8 from '../assets/media/Take it boy.mp3'

let gachiArr = [gachi1,gachi2,gachi3,gachi4,gachi5,gachi6]

const bulletThrowInterval = 100;
const bulletSpeedInterval = 50;
const bulletSpeedSize = 10;
const enemiesThrowInterval = 500;
const enemiesSpeedInterval = 100;
const enemiesSpeedSize = 10;
const numberOfBlasters = 3;

const enemyArr = [
    enemyImage1, enemyImage2
];

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pause: true,
            playerStyle: {
                left: 0
            },
            bulletX: [],
            bulletY: [],
            enemiesX: [],
            enemiesY: [],
            aliveEnemies: [],
            enemyCount: 0,
            score: 0,
            lives: 3,
            gameOver: false,
            snackBarOpen: false,
            numberOfBlasters,
            playerName: null,
            blast: false,
            shipImage: 'spaceship.png',
            playingLaughter: false,
            isGameOverAudio: false,
            isPlayMinusLiveAudio: false,
            numberOfTrack: 0,
        }
    }

    checkPlayerName() {
        localforage.getItem('playerName')
            .then((playerName) => {
                if (!playerName || playerName === null || playerName === "") {
                    console.log("Invalid PlayerName");
                    this.props.history.push('/')
                } else {
                    this.setState({ playerName });
                }
            })
            .catch((err) => {
                console.log("Error while getting playerName : ", err);
                this.props.history.push('/')
            });
    }

    componentDidMount() {
        this.fire();
        this.setState({
            bottom: this.getBoundaries().bottom - 120
        });
        this.refs.mainContainer.focus();
    }

    getBoundaries() {
        let rectCoordinates = this.refs.gameRegion.getBoundingClientRect();
        return rectCoordinates;
    }

    fire() {

        setInterval(() => {
            if (!this.state.pause)
                this.updatebulletY();
        }, bulletSpeedInterval);

        setInterval(() => {
            if (!this.state.pause)
                this.generateEnemies();
        }, enemiesThrowInterval)

        setInterval(() => {
            if (!this.state.pause)
                this.updateEnemiesY();
        }, enemiesSpeedInterval);
    }

    generateBullet(x = -1) {
        x = x === -1 ? this.state.playerStyle.left : x;
        let { bulletX, bulletY } = this.state;
        let { bottom } = this.getBoundaries();
        bulletX.push(x + 30);
        bulletY.push(bottom - 120);
        this.setState({ bulletX, bulletY });
    }

    generateEnemies() {
        let { enemiesX, enemiesY, enemyCount, aliveEnemies } = this.state;
        let width = Math.floor(this.getBoundaries().width);
        width = width - 50;
        enemiesX.push(Math.floor(Math.random() * width) + 1);
        enemiesY.push(0);
        aliveEnemies.push(1);
        enemyCount++;
        this.setState({ enemiesX, enemiesY, enemyCount });
    }

    mouseMove = (event) => {
        if (!this.state.pause) {
            let { left, width } = this.getBoundaries();
            width = width - 30;
            let x = event.clientX - left;
            if (x < width) {
                this.setState({
                    playerStyle: { left: x }
                })
            }
        }
    }

    updatebulletY() {
        let {
            bulletY,
            bulletX,
            enemiesX,
            enemiesY,
            enemyCount,
            aliveEnemies,
            score,
            playingLaughter
        } = this.state;
        for (let i = 0; i < bulletY.length; i++) {
            if (bulletY[i] > -bulletSpeedSize) {
                bulletY[i] = bulletY[i] - bulletSpeedSize;
                let bx = bulletX[i];
                let by = bulletY[i];
                for (let j = 0; j < enemiesX.length; j++) {
                    let ex = enemiesX[j];
                    let ey = enemiesY[j];

                    if (aliveEnemies[j] === 1 && (bx >= ex) && (bx - ex) <= 50 && Math.abs(by - ey) <= 10) {
                        // Попадание
                        bulletY[i] = -bulletSpeedSize;
                        // enemiesY[j] = this.state.bottom + enemiesSpeedSize;
                        aliveEnemies[j] = 0;
                        enemyCount--;
                        console.log(enemyCount)
                        score++;
                        playingLaughter = true;
                    }
                }
            }
        }
        this.setState({ bulletY, enemiesY, enemyCount, score, aliveEnemies, playingLaughter });
    }

    updateEnemiesY() {
        let { enemiesY, enemiesX, playerStyle, bottom, lives } = this.state;
        for (let i = 0; i < enemiesY.length; i++) {
            if (enemiesY[i] > -enemiesSpeedSize) {
                enemiesY[i] = enemiesY[i] + enemiesSpeedSize;
                // Check if it collides with spaceship
                let ex = enemiesX[i];
                let ey = enemiesY[i];
                let px = playerStyle.left;
                if (ey <= bottom - 10 && ey > bottom - 20 && Math.abs(ex - px) <= 60) {
                    console.log("--------------------Spaceship Hit-----------------");
                    this.showShipBlast();
                    this.gamePause();
                    lives--;
                    this.setState({
                        lives: lives,
                        snackBarOpen: true,
                    });
                    if (lives <= 0) {
                        this.gameOver();
                    } else {
                        this.playMinusLiveAudio()
                    }
                }
            }
        }
        this.setState({ enemiesY });
    }

    createBullet(index, left, top) {
        return (
            <div key={`bullet_${index}`} style={{ position: 'absolute', left, top, alignContent: 'center' }} >
                <img src={bulletImage} alt="b" className="bullet"/>
            </div>
        )
    }

    renderBullets() {
        return this.state.bulletX.map((value, index, array) => {
            let top = ((this.state.bulletY[index]) + "px").toString();
            let left = ((this.state.bulletX[index]) + "px").toString();
            let bulletYIndex = this.state.bulletY[index];
            if (bulletYIndex > 0) {
                return this.createBullet(index, left, top);
            } else {
                return undefined;
            }
        }, this);
    }
    // Исчезновение взрыва на месте Илюхи
    clearEnemyImage = (index) => () => {
        const copyAliveItems = [...this.state.aliveEnemies];
        const copyEnemyY = [...this.state.enemiesY];
        copyEnemyY[index] = this.state.bottom + 1000;
        copyAliveItems[index] = null;
        this.setState({
            aliveEnemies : [...copyAliveItems],
            enemiesY: [...copyEnemyY],
        });
    }

    renderEnemies() {
        let { bottom, aliveEnemies } = this.state;
        return this.state.enemiesX.map((value, index, array) => {
            let top = (this.state.enemiesY[index] + "px").toString();
            let left = (value + "px").toString();
            let enemiesYIndex = this.state.enemiesY[index];
            if (enemiesYIndex < bottom) {
                if (aliveEnemies[index] === 1) {
                    return (
                        <div key={`enemy_${index}`} style={{ position: 'absolute', left: left, top: top, alignContent: 'center' }}>
                            <img src={index%2 > 0 ? enemyArr[0] : enemyArr[1]} width="50px" alt='e'/>
                        </div>
                    )
                } else if (aliveEnemies[index] === 0) {
                    setTimeout(this.clearEnemyImage(index), 150);
                    return (
                        <div key={`enemy_${index}`} style={{ position: 'absolute', left: left, top: top, alignContent: 'center' }}>
                            <img src={explodeImage} width="50px" alt='e'/>
                        </div>
                    )
                }
            }
            else if (aliveEnemies[index] === 1 && enemiesYIndex >= bottom) {
                aliveEnemies[index] = 0;
                this.setState({
                    aliveEnemies,
                })
            }
        }, this);
    }

    onEndenGameOverAudio = () => {
        console.log("Game over");
        this.setState({
            gameOver: true,
        })
        this.gamePause();
        this.props.history.push('/gameOver')
    }

    gameOver() {
        this.setState({
            isGameOverAudio:true
        })
    }

    playMinusLiveAudio = () => {
        this.setState({
            isPlayMinusLiveAudio:true
        })
    }

    stopPlayMinusLiveAudio = () => {
        this.setState({
            isPlayMinusLiveAudio:false
        })
    }


    showShipBlast(blast = true) {
        this.setState({
            blast: blast
        });
        if (blast) {
            setTimeout(() => {
                this.showShipBlast(blast = false);
            }, 1500)
        }

    }

    gamePause() {
        console.log("GamePause called");
        if (!this.state.gameOver) {
            this.setState({
                pause: !this.state.pause,
            })
        } else {
            this.setState({
                pause: true
            });
        }
    }

    renderPlayButton() {
        if (!this.state.gameOver) {
            if (this.state.pause) {
                return <span>Play</span>;
            } else {
                return <span>Pause</span>;
            }
        } else {
            return <span>Restart</span>;
        }
    }

    releaseBlaster() {
        let { numberOfBlasters } = this.state;
        if (numberOfBlasters > 0) {
            let { width } = this.getBoundaries();
            width = width - 30;
            for (let i = 0; i < width; i += 10) {
                this.generateBullet(i);
            }
            numberOfBlasters--;
            this.setState({
                numberOfBlasters
            })
        } else {
            console.log("Blaster Stock Empty");
        }
    }

    keyPress = (event) => {
        this.setState({ snackBarOpen: false });
        if (event.which === 13) {
            // SpaceBar was pressed
            this.gamePause();
        }
        else if (!this.state.pause) {
            if (event.which === 98 || event.which === 1080) {
                // "B" key was pressed to release Blaster
                this.releaseBlaster();
            }
            if (event.which === 37) {
                console.log('left')
                // "left" key was pressed to release Blaster
                this.releaseBlaster();
            }
            if (event.which === 39) {
                console.log('right')
                // "right" key was pressed to release Blaster
                this.releaseBlaster();
            }

        }
    }

    keyUp = (event) => {
        if (event.which === 32) {
            this.generateBullet();
        }
    }

    onEnded = () => {
        let randomNumber = Math.floor(Math.random()*gachiArr.length);
        this.setState({
            playingLaughter: false,
            numberOfTrack: randomNumber,
        })
    }

    addScore = () => {
        this.setState({
            score: this.state.score + 10
        })
    }

    render() {

        const {
            playingLaughter,
            pause,
            numberOfTrack,
            isGameOverAudio,
            isPlayMinusLiveAudio,
        } = this.state

        return (
          <React.Fragment>
            <div className="mainContainer" ref="mainContainer" tabIndex="0" onKeyPress={this.keyPress}
                 onKeyUp={this.keyUp}>
                <img src={girl} className="girl girl-left" alt="G"/>
                <div className="main">
                    <div className="gameRegion" ref="gameRegion" onMouseMove={this.mouseMove}>
                        <div key="gameRegionDiv" style={{ position: "relative" }} className="generate-bullets">
                            <Info key="infoComponent" score={this.state.score} lives={this.state.lives} pause={this.state.pause} blasters={this.state.numberOfBlasters} />

                            {this.renderEnemies()}
                            {this.renderBullets()}
                        </div>
                        <div ref="playerRegion" className="playerRegion" >
                            <div ref="player" className="player" style={{ alignContent: 'center', left: (this.state.playerStyle.left + "px").toString() }}>
                                <img src={this.state.blast ? blastImage : shipImage } className="playerImage" alt="P" />
                            </div>
                        </div>
                        <ReactPlayer
                          url={gachiArr[numberOfTrack]}
                          playing={playingLaughter}
                          onEnded={this.onEnded}
                        />
                        <ReactPlayer
                          url={gachi7}
                          playing={isGameOverAudio}
                          onEnded={this.onEndenGameOverAudio}
                        />
                        <ReactPlayer
                          url={gachi8}
                          playing={isPlayMinusLiveAudio}
                          onEnded={this.stopPlayMinusLiveAudio}
                        />
                        <Snackbar
                            open={this.state.snackBarOpen}
                            message="OH SORRY"
                            autoHideDuration={10000}
                            onRequestClose={
                                () => {
                                    this.setState({
                                        snackBarOpen: false,
                                    });
                                }}
                        />
                    </div>
                </div>

                <img src={girl} className="girl girl-right" alt="G"/>
                { !pause && <IvanHey addScore={this.addScore} /> }
            </div>
          </React.Fragment>
        )
    }
}
