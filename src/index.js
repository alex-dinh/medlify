import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./TodoList";
import TopMenu from "./TopMenu";
import Playlists from "./pages/UserPlaylists";
import Playlist from "./pages/Playlist";

import Home from "./pages/Home";
import Library from "./pages/Library";
import SideNav from "./Navigation.js";
import {Grid, Row, Col} from "react-bootstrap";
import BottomMenu from "./BottomMenu";
import {BrowserRouter as Router, Route, MemoryRouter} from "react-router-dom";


const destination = document.querySelector("#container");


ReactDOM.render(
    <Grid fluid>
        <Router>
            <div>
                {/*Router in index allows route switching in main container*/}
                <TopMenu/>
                <SideNav/>
                <switch>
                    <Route exact path ="/" component={Home}/>
                    <Route path ="/playlists" component={Playlists}/>
                    <Route path ="/library" component={Library}/>
                    <Route exact path ="/playlist" component={Playlist}/>

                </switch>
            </div>
        </Router>
        {/*<p>Welcome to Soundify</p>*/}
        {/*<MemoryRouter>*/}
            {/*<SideNav/>*/}
        {/*</MemoryRouter>*/}
        <BottomMenu/>
    </Grid>,
    destination
);

