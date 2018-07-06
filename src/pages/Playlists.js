// Playlists.js
import React, {Component} from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class Playlists extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
        console.log(params);

        const token = params.access_token; // resolve this
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            // loggedIn: !!token,
            playlistlist: {name: 'Not Checked', playlistArt: ''}
        }
    }

    getHashParams() { //"function can be static"
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
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
                    playlistlist: {
                        // name: response.items[0].name,
                        names: this.buildPlaylistList(response),
                        playlistArt: response.items[0].images[0].url
                        // playlistArt: this.playlistCovers(response)
                    }
                })
            });
    }

    buildPlaylistList(response) {
        let playlists = [];
        for (let i = 0; i < response.items.length; i++){
            playlists.push(response.items[i].name)
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



    render() {
        return (
            <div className={Playlists} style={{margin: "10px"}}>
                <h2><a href='http://localhost:8888'>Playlists</a></h2>
                <div>
                    Playlist: { this.state.playlistlist.names }
                </div>
                <div>
                    {/*<img src={this.state.playlistlist.playlistArt} style={{ height: 300 }}/>*/}
                </div>
                {this.state.loggedIn &&
                    <button onClick={() => this.getPlaylists()}>
                        View Playlists
                    </button>
                }
            </div>
        );
    }
}


export default Playlists;