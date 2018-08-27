import React, { Component } from "react";
import {Navbar} from "react-bootstrap";
import '../styles.css'
import WebPlayer from './WebPlayer';


class BottomMenu extends Component {
    render() {
        return (
            <Navbar inverse fixedBottom style={{borderTop: "5px ridge #1db954", height: "80px", zIndex: '999', position: 'absolute'}}>
                <div><WebPlayer/></div>
            </Navbar>
        );
    }
}

export default BottomMenu;