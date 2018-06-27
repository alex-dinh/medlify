import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./TodoList";
import TodoList from "./TodoList";
import TopMenu from "./TopMenu";
import SideBar from "./SideBar";


var destination = document.querySelector("#container");

ReactDOM.render(
    <div>
        <TopMenu/>
        {/*<p>Welcome to Soundify</p>*/}
        <TodoList/>
        <SideBar/>

    </div>,
    destination
);
