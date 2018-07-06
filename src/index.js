import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./TodoList";
import TopMenu from "./TopMenu";
import Playlists from "./pages/Playlists";

import Home from "./pages/Home";
import Library from "./pages/Library";
import SideNav from "./Navigation.js";
import {Grid, Row, Col} from "react-bootstrap";
import BottomMenu from "./BottomMenu";
// import SidebarExample from "./MainView";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


const destination = document.querySelector("#container");


ReactDOM.render(
    <Grid fluid>
        <Router>
            <div>
                {/*Router in index allows route switching in main container*/}
                <TopMenu/>
                <switch>
                    <Route exact path ="/" component={Home}/>
                    <Route path ="/playlists" component={Playlists}/>
                    <Route path ="/library" component={Library}/>
                </switch>
            </div>
        </Router>
        {/*<p>Welcome to Soundify</p>*/}
        {/*<TodoList/>*/}
        <SideNav/>
        {/*<SidebarExample/>*/}
        <BottomMenu/>
    </Grid>,
    destination
);

