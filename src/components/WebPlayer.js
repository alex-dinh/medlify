import React, {Component} from 'react';
import SpotifyWebApi from "spotify-web-api-js";
import SvgIcon from 'react-icons-kit';
import {iosPlay, iosRewind, iosFastforward, iosPause} from 'react-icons-kit/ionicons/';

const spotifyApi = new SpotifyWebApi();



class WebPlayer extends Component{
    constructor(props){
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }

        this.state = {
            token: token,
            deviceId: "",
            loggedIn: false,
            error: "",
            trackName: "Track Name",
            artistName: "Artist Name",
            albumName: "Album Name",
            albumArt: "",
            playing: false,
            position: 0,
            duration: 0,
        };

        this.playerCheckInterval = null;
    }

    getHashParams() { //"function can be static"
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q);
        while (e){
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    checkForPlayer() {
        // run repeatedly until SDK is ready
        const {token} = this.state;

        if (window.Spotify !== null) {
            // cancel the interval
            clearInterval(this.playerCheckInterval);

            this.player = new window.Spotify.Player({
                name: "Medlify Player",
                getOAuthToken: cb => {cb(token);},
            });
            this.createEventHandlers();

            // finally, connects here!
            this.player.connect();
        }
    }

    componentDidMount() {
        this.handleLogin();
    }

    handleLogin() {
        if (this.state.token !== "") {
            this.setState({loggedIn: true});
            // check every second for the player
            this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);

        }
    }

    createEventHandlers() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
            console.error(e);
            this.setState({ loggedIn: false });
        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });

        // Playback status updates
        this.player.on('player_state_changed', state => this.onStateChanged(state));

        // Ready
        this.player.on('ready', async data => {
            let { device_id } = data;
            console.log("Let the music play on!");
            await this.setState({ deviceId: device_id });
            this.transferPlaybackHere();
        });
    }

    onStateChanged(state) {
        // if no longer listening to music, state will be null
        if (state !== null) {
            const {
                current_track: currentTrack,
                position,
                duration,
            } = state.track_window;

            const trackName = currentTrack.name;
            const albumName = currentTrack.album.name;
            const artistName = currentTrack.artists
                .map(artist => artist.name)
                .join(", ");
            const playing = !state.paused;
            this.setState({
                position,
                duration,
                trackName,
                albumName,
                artistName,
                playing
            });
            this.getAlbumArt();
        }
    }

    onPrevClick() {
        this.player.previousTrack();
    }

    onPlayClick() {
        this.player.togglePlay();
    }

    onNextClick() {
        this.player.nextTrack();
    }

    getAlbumArt() {
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                if(response.item) {
                    this.setState({
                        albumArt: response.item.album.images[0].url
                    });
                }
            })
    }

    transferPlaybackHere() {
        // automatically switches the Spotify device to Medlify (this app)
        const { deviceId, token } = this.state;
        fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "device_ids": [ deviceId ],
                "play": false,
            }),
        });
    }

    render(){
        const {
            token,
            loggedIn,
            artistName,
            trackName,
            albumName,
            albumArt,
            error,
            position,
            duration,
            playing,
        } = this.state;

        return(
            <div className="App">
                <div className="App-header">
                    {/*<h2>Now Playing</h2>*/}
                </div>

                {loggedIn ?
                (<div id="player">
                    <div class="inlineitems" id="songinfo">
                        <img src={this.state.albumArt} style={{ height: 50 }}/>
                    </div>

                    <div class="inlineitems" id="songinfo" style={{left: "80px", paddingTop: "20px"}}>
                    <div>{trackName}</div>
                    <div>{artistName}</div>

                    </div>
                    {/*<p>Album: {albumName}</p>*/}
                    <p class="inlineitems">
                    {/*<button onClick={() => this.onPrevClick()}>Previous</button>*/}
                    {/*<button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>*/}
                    {/*<button onClick={() => this.onNextClick()}>Next</button>*/}
                    <div class="inlineitems" style={{ color: '#ffa652', marginLeft: "-50px"}} id="playerbutton">
                        <SvgIcon size={40} icon={iosRewind} onClick={() => this.onPrevClick()}/>
                    </div>
                    <div class="inlineitems" style={{ color: '#00b30a'}} id="playerbutton">
                        {playing ?
                            <SvgIcon size={40} icon={iosPause} onClick={() => this.onPlayClick()}/>:
                            <SvgIcon size={40} icon={iosPlay} onClick={() => this.onPlayClick()}/>
                        }
                    </div>
                    <div class="inlineitems" style={{ color: '#ffa652', marginLeft: "50px"}} id="playerbutton">
                        <SvgIcon size={40} icon={iosFastforward} onClick={() => this.onNextClick()}/>
                    </div>
                    </p>
                </div>)
                :
                (<div>
                </div>)
                }
            </div>
        );
    }
}

// export default ({match: {params: {id}}}) =>
//     <h1 style={{position: "fixed", top: "50%", bottom: "50%", marginTop: "-50px", marginLeft: "-100px"}}>{id}</h1>;
export default WebPlayer;