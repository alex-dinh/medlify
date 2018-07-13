// Home.js
import React, {Component} from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class Home extends Component {
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
            nowPlaying: {name: 'Not Checked', albumArt: ''}
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

    getNowPlaying(){
        spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                nowPlaying: {
                    name: response.item.name,
                    albumArt: response.item.album.images[0].url
                }
            });
        })
    }

    render() {
        return (
            <div className={Home} style={{margin: "10px"}}>
                <h2><a href='http://localhost:8888'>Soundify</a></h2>
                <div>
                    Now Playing: { this.state.nowPlaying.name }
                </div>
                <div>
                    <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
                </div>
                {this.state.loggedIn &&
                    <button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </button>
                }
            </div>
        );
    }
}


export default Home;