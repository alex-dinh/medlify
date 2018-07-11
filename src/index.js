import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./TodoList";
import TopMenu from "./TopMenu";
import Playlists from "./pages/UserPlaylists";
import Playlist from "./pages/Playlist";

import Home from "./pages/Home";
import Library from "./pages/Library";
import SideNav from "./SideNav.js";
import {Grid, Row, Col} from "react-bootstrap";
import BottomMenu from "./BottomMenu";
import {Route, MemoryRouter} from "react-router-dom";



const destination = document.querySelector("#container");

const _playlist = (props) => {
    return (
        <Playlist
            playlistId={this.playlistId.bind(this)}
            {...props}
        />
    );
}

ReactDOM.render(
    <Grid fluid>
        {/*<Router>*/}
            {/*<div>*/}
                {/*/!*Router in index allows route switching in main container*!/*/}
                {/*<TopMenu/>*/}
                {/*<SideNav/>*/}
                {/*<switch>*/}
                    {/*<Route exact path ="/" component={Home}/>*/}
                    {/*<Route path ="/playlists" component={Playlists}/>*/}
                    {/*<Route path ="/library" component={Library}/>*/}
                    {/*<Route exact path ="/playlist" component={Playlist}/>*/}

                {/*</switch>*/}
            {/*</div>*/}
        {/*</Router>*/}

        <MemoryRouter initialEntries={['/','playlists','library']} initialIndex={2}>
            <div>
                {/*Router in index allows route switching in main container*/}
                <TopMenu/>
                <SideNav/>
                <switch>
                    <Route exact path ="/" component={Home}/>
                    <Route path="/playlists" component={Playlists}/>
                    <Route path="/library" component={Library}/>
                    <Route exact path="/playlist" component={Playlist}/>
                    {/*<Route path ="/zzzzz" render={(props) => <Playlist {...props}/>}/>*/}
                    <Route path ="/zzzzz" render={() => <Playlist playlistId="4jYKMVG2SasaKq4y6385vA"/>}/>
                    

                </switch>
            </div>
        </MemoryRouter>

        {/*<p>Welcome to Soundify</p>*/}
        {/*<MemoryRouter>*/}
            {/*<SideNav/>*/}
        {/*</MemoryRouter>*/}
        <BottomMenu/>
    </Grid>,
    destination
);

