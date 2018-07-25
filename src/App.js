import React, {Component} from "react";
import "./index.css";
import "./TodoList";
import TopMenu from "./components/TopMenu";
import Playlists from "./components/UserPlaylists";
import Playlist from "./components/Playlist";

import Home from "./components/Home";
import Library from "./components/Library";
import SideNav from "./components/SideNav.js";
import {Grid} from "react-bootstrap";
import BottomMenu from "./components/BottomMenu";
import {Route, MemoryRouter} from "react-router-dom";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: "",
            deviceId: "",
            loggedIn: false,
            error: "",
            trackName: "Track Name",
            artistName: "Artist Name",
            albumName: "Album Name",
            playing: false,
            position: 0,
            duration: 0,
        };

        this.playerCheckInterval = null;
    }

    // --- state-setting: fail ---
    // testref() {
    //     console.log(this.state.info);
    //     this.setState({
    //         info: this.refs.sn.state.info
    //     });
    // }
    //
    // componentDidMount(){
    //     this.setState({
    //         info: this.refs.sn.state.info
    //     });
    // }

    setupPlaylistLinks(){
        if(this.refs.sn) {
            this.refs.sn.state.info.map(function (playlist, i) {
                return (
                    <Route path={"/" + playlist.playlistId}
                           render={(props) => <Playlist {...props} playlistId={playlist.playlistId}/>}
                    />
                );
            })
        }
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
                "play": true,
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
            error,
            position,
            duration,
            playing,
        } = this.state;



        return(
            <Grid fluid>
            {/*<Grid onClick={()=>{this.testref()}} fluid>*/}
                <MemoryRouter initialEntries={['/','playlists','library']} initialIndex={0}>
                    <div>
                        {/*Router in index allows route switching in main container*/}
                        <TopMenu/>
                        <SideNav ref="sn"/>
                        {/*{this.showPlayer()}*/}
                        <div className="App">
                            <div className="App-header">
                                <h2>Now Playing</h2>
                            </div>

                            {loggedIn ?
                            (<div>
                                <p>Artist: {artistName}</p>
                                <p>Track: {trackName}</p>
                                <p>Album: {albumName}</p>
                                <p>
                                <button onClick={() => this.onPrevClick()}>Previous</button>
                                <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
                                <button onClick={() => this.onNextClick()}>Next</button>
                                </p>
                            </div>)
                            :
                            (<div>

                                <p className="App-intro">
                                    Enter your Spotify access token. Get it from{" "}
                                    <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
                                        here
                                    </a>.
                                </p>
                                <p>
                                    <input type="text" value={token} onChange={e => this.setState({token: e.target.value})}/>
                                </p>
                                <p>
                                    <button onClick={() => this.handleLogin()}>Go</button>
                                </p>
                            </div>)
                            }
                        </div>
                        <switch>
                            <Route exact path ="/" component={Home}/>
                            <Route path="/playlists" component={Playlists}/>
                            <Route path="/library" component={Library}/>
                            {/*<Route path ="/zzzzz" render={(props) => <Playlist {...props}/>}/>*/}
                            <Route path ="/zzzzz" render={() => <Playlist playlistId="4jYKMVG2SasaKq4y6385vA"/>}/>
                            <Route exact path ="/playlist/:id" render={props => <Playlist {...props}/>}/>



                        </switch>
                    </div>
                </MemoryRouter>
                <BottomMenu/>

            </Grid>
        );
    }
}

export default App;

// {this.state && this.state.info &&
//     this.state.info.map(function (playlist, i) {
//     return (
//         <Route path={"/" + playlist.playlistId}
//            render={(props) => <Playlist {...props} playlistId={playlist.playlistId}/>}
//         />
//     );
// })}