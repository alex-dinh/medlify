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
import WebPlayer from "./components/WebPlayer";


class App extends Component {
    render(){

        return(
            <Grid fluid>
                <MemoryRouter initialEntries={['/','playlists','library']} initialIndex={0}>
                    <div>
                        {/*Router in index allows route switching in main container*/}
                        <TopMenu/>
                        <SideNav ref="sn" player={this.player}/>
                        {/*<WebPlayer/>*/}

                        <switch>
                            <Route exact path ="/" component={Home}/>
                            <Route path="/playlists" component={Playlists}/>
                            <Route path="/library" component={Library}/>
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
