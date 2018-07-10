// Playlists.js
import React, {Component} from "react";
import Collapsible from "react-collapsible";
import SpotifyWebApi from "spotify-web-api-js";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Playlist from "./Playlist";
import {Link} from 'react-router-dom';

const spotifyApi = new SpotifyWebApi();

class Playlists extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
        console.log(params);
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            // loggedIn: !!token,
            // playlists: {names: [],
            //     playlistArt: ''}
            playlists: {names: [],
                playlistArt: ''}
        };

        this.getPlaylists();
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

    getPlaylists(){
        spotifyApi.getUserPlaylists()
            .then((response) => {
                this.setState({
                    playlists: {
                        // name: response.items[0].name,
                        names: this.buildPlaylistInfo(response),
                        playlistArt: response.items[0].images[0].url,
                        // playlistArt: this.playlistCovers(response)
                    }
                })
            });
    }

    buildPlaylistInfo(response) {  // builds array of playlist information (names and ids) from JSON response
        let playlists = [];
        for (let i = 0; i < response.items.length; i++){
            playlists.push({id: i, name: response.items[i].name, playlistId: response.items[i].id})
        }
        return playlists;
    }


    playlistCovers(response) {
        let covers = [];
        for (let i = 0; i < response.items.length; i++){
            covers.push(response.items[i].images[0].url)
        }
        return covers;
    }

    showPlaylists() {
        return(
            <div>
                <Router>
                <div>

                {/*Playlist: { this.state.playlists.names }*/}
                <Collapsible trigger="Playlists ◈">
                { this.state.playlists.names.map(function(playlist, i) {
                    return(
                        // <Playlist key={i} name={playlist.name} id={playlist.playlistId}/>
                        <div><Link to="/playlist">{playlist.name}</Link></div> // figure out how to link props based on playlist selected
                    );
                })}

                </Collapsible>
                </div>
                </Router>
            </div>
        );
    }

    render() {
        let ids = this.state.playlists.ids;
        console.log(ids);
        return (
            <div className={Playlists} style={{margin: "10px", overflowY: "scroll", maxHeight: "60vh"}}>
                <h2><a href='http://localhost:8888'>Playlists</a></h2>
                {this.showPlaylists()}

                <div>
                    {/*<img src={this.state.playlistlist.playlistArt} style={{ height: 300 }}/>*/}
                </div>

                {/*{this.state.loggedIn &&*/}
                    {/*<button onClick={() => this.getPlaylists()}>*/}
                        {/*View Playlists*/}
                    {/*</button>*/}
                {/*}*/}
            </div>
        );
    }
}

export default Playlists;