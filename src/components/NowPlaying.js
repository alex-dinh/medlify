// Library.js
import React, {Component} from "react";
import SpotifyWebApi from 'spotify-web-api-js';
// import {iosPlay, iosRewind, iosFastforward, iosPause} from 'react-icons-kit/ionicons/';
import './styles/background.css';

const spotifyApi = new SpotifyWebApi();

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }

        this.state = {
            token: token,
            loggedIn: false,
            trackName: "Track Name",
            artistName: "Artist Name",
            albumName: "Album Name",
            albumArt: "",
            playing: false,
            position: 0,
            duration: 0,
        };

    }

    getHashParams() { //"function can be static"
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q);
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getPlaybackInfo(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getPlaybackInfo() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                    if (response.item) {
                        this.setState({
                            trackName: response.item.name,
                            artistName: response.item.album.artists[0].name,
                            albumArt: response.item.album.images[0].url,
                            position: response.progress_ms,
                            duration: response.item.duration_ms
                        });
                    }
                }
            )
    }


    render() {
        const {
            // token,
            // loggedIn,
            artistName,
            trackName,
            // albumName,
            albumArt,
            // error,
            // position,
            // duration,
            // playing,
        } = this.state;

        return (
            <div className='animatedbg'>
                <div id="element" className="main-wrapper">
                    <div className="now-playing__img">
                        <img alt="" src={albumArt}/>
                    </div>
                    <div className="now-playing__side">
                        <h1 style={{color: "white"}} className="now-playing__name">{trackName}</h1>
                        <h1 style={{color: "white"}} className="now-playing__artist">{artistName}</h1>
                        {/*<div className="progress">*/}
                        {/*<Progress id="songprogress" inverted color='green' percent={position/duration*100}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default NowPlaying;

