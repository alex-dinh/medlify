import React, {Component} from "react";
import "./index.css";
import TopMenu from "./components/TopMenu";
import Playlists from "./components/UserPlaylists";
import Playlist from "./components/Playlist";

import Home from "./components/Home";
import Library from "./components/Library";
import SideNav from "./components/SideNav.js";
import {Grid} from "react-bootstrap";
import BottomMenu from "./components/BottomMenu";
import {Route, MemoryRouter} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();


class App extends Component {
    constructor(props){
        super(props);
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }

        this.state = {
            token: token,
        };

        // store token in session storage
        window.sessionStorage.setItem('token', token);


    }

    getHashParams() {
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


    componentDidMount() {
        const h = new Headers();
        h.append('Authorization', window.sessionStorage.getItem('token'));


    }


    render(){

        return(
            <Grid fluid>
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <div>
                        {/*Router in index allows route switching in main container*/}
                        <TopMenu/>
                        <SideNav ref="sn" player={this.player}/>
                        {/*<WebPlayer/>*/}
                        <Route exact path ="/" component={Home}/>
                        <Route path="/playlists" component={Playlists}/>
                        <Route path="/library" component={Library}/>
                        <Route path ="/zzzzz" render={() => <Playlist playlistId="4jYKMVG2SasaKq4y6385vA"/>}/>
                        <Route exact path ="/playlist/:id" render={props => <Playlist {...props}/>}/>

                    </div>
                </MemoryRouter>
                <BottomMenu/>

            </Grid>


        );
    }
}

export default App;
