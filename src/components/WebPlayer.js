import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SvgIcon from 'react-icons-kit';
import {iosPlay, iosRewind, iosFastforward, iosPause} from 'react-icons-kit/ionicons/';
import {Progress} from 'semantic-ui-react';

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

        if (window.Spotify.Player !== null) {
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
        this.interval = setInterval(() => this.getPlaybackProgress(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                // position,
                // duration,
            } = state.track_window;

            const trackName = currentTrack.name;
            const albumName = currentTrack.album.name;
            const artistName = currentTrack.artists
                .map(artist => artist.name)
                .join(", ");
            const playing = !state.paused;
            this.setState({
                position: state.position,
                duration: state.duration,
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
        // spotifyApi.skipToPrevious({})
        //     .then((response) => {})
    }

    onPlayClick() {
        this.player.togglePlay();
    }

    onNextClick() {
        this.player.nextTrack();
        // spotifyApi.skipToNext({})
        //     .then((response) => {})
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

    getPlaybackProgress() { // for progress bar
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                // console.log(response);
                if (response.item) {
                    this.setState({
                        position: response.progress_ms,
                        duration: response.item.duration_ms
                    })
                }
            });
    }

    render(){
        const {
            // token,
            // loggedIn,
            artistName,
            trackName,
            // albumName,
            albumArt,
            // error,
            position,
            duration,
            playing,
        } = this.state;

        return(
            <div className="App" style={{width: '50vw'}}>
                <div id="player">
                    <div className="inlineitems" id="songinfo">
                        <img alt="" src={albumArt} style={{ height: 50 }}/>
                    </div>

                    <div className="inlineitems" id="songinfo" style={{left: "80px", paddingTop: "20px"}}>
                    <div>{trackName}</div>
                    <div>{artistName}</div>

                    </div>
                    <div style={{ color: '#ffa652', marginLeft: "-70px"}} id="playerbutton">
                        <SvgIcon size={40} icon={iosRewind} onClick={() => this.onPrevClick()}/>
                    </div>
                    <div style={{ color: '#00b30a'}} id="playerbutton">
                        {playing ?
                            <SvgIcon size={40} icon={iosPause} onClick={() => this.onPlayClick()}/>:
                            <SvgIcon size={40} icon={iosPlay} onClick={() => this.onPlayClick()}/>
                        }
                    </div>
                    <div style={{ color: '#ffa652', marginLeft: "70px"}} id="playerbutton">
                        <SvgIcon size={40} icon={iosFastforward} onClick={() => this.onNextClick()}/>
                    </div>
                    <Progress id="songprogress" inverted color='green' percent={position/duration*100}/>
                </div>
            </div>
        );
    }
}

export default WebPlayer;