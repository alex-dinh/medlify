import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./TodoList";
import TodoList from "./TodoList";
import TopMenu from "./TopMenu";
import MySideNav from "./Navigation.js";
import {Grid, Row, Col} from "react-bootstrap";
import BottomMenu from "./BottomMenu";


const destination = document.querySelector("#container");


ReactDOM.render(
    <Grid fluid>
        <TopMenu/>
        {/*<p>Welcome to Soundify</p>*/}
        {/*<TodoList/>*/}
        <MySideNav/>
        <BottomMenu/>
    </Grid>,
    destination
);
