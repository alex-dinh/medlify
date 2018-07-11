import React, {Component} from "react";
import SvgIcon from 'react-icons-kit';
import {ic_business} from "react-icons-kit/md/ic_business";
import {ic_aspect_ratio} from "react-icons-kit/md/ic_aspect_ratio";
import {Nav, NavItem} from "react-bootstrap";
import Playlists from './pages/UserPlaylists.js'
import {Link} from 'react-router-dom';


class SideNav extends React.Component {
    constructor(props) {
        super(props)
    }

    getSideBar() {
        return (
        <div style={{width:'20%'}}>
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <Nav bsStyle="tabs" stacked>
                        <NavItem style={{textAlign:'center'}} eventKey={2} href="#">Playlists</NavItem>
                        <NavItem eventKey={2}><Link to="/playlists">Playlists</Link></NavItem>
                    </Nav>
                    <Playlists/>
                </ul>

            </div>
        </div>);
    }

    render() {
        return (
            <div style={{overflow:''}} id="wrapper">
                <Link to="/playlist">{this.getSideBar()}</Link>
            </div>
        );
    }
}

export default SideNav;