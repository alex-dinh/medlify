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
import LocalFiles from "./components/LocalFiles";
import SCUserPlaylists from "./components/soundcloud/SCUserPlaylists";
import SCPlaylist from "./components/soundcloud/SCPlaylist";


class App extends Component {
    render(){
        return(
            <Grid fluid>
                <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                    <div>
                        {/*Router in index allows route switching in main container*/}
                        <TopMenu/>
                        <SideNav ref="sn" player={this.player}/>
                        <Route exact path ="/" component={NowPlaying}/>
                        {/*<Route exact path ="/" component={SCUserPlaylists}/>*/}
                        <Route path="/home" component={Home}/>
                        <Route path="/nowplaying" component={NowPlaying}/>
                        <Route path="/local" component={LocalFiles}/>
                        <Route path="/soundcloud" component={SCUserPlaylists}/>
                        <Route exact path ="/playlist/:id" render={props => <Playlist {...props}/>}/>
                        <Route exact path ="/scplaylist/:id" render={props => <SCPlaylist {...props}/>}/>

                    </div>
                </MemoryRouter>
                <BottomMenu/>

            </Grid>


        );
    }
}

export default App;
