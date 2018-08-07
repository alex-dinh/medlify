import React, {Component} from "react";
import "./index.css";
import TopMenu from "./components/TopMenu";
import Playlists from "./components/UserPlaylists";
import Playlist from "./components/Playlist";
import Home from "./components/Home";
import NowPlaying from "./components/NowPlaying";
import SideNav from "./components/SideNav.js";
import {Grid} from "react-bootstrap";
import BottomMenu from "./components/BottomMenu";
import {Route, MemoryRouter} from "react-router-dom";


class App extends Component {
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
                        <Route path="/nowplaying" component={NowPlaying}/>
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
