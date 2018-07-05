import React, { Component } from "react";
import {Navbar, MenuItem, NavDropdown, Nav, NavItem} from "react-bootstrap";
// import {hello} from "./MainView.js";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Grid, Row, Col} from "react-bootstrap";


class TopMenu extends Component {
    render() {
        return (
            <Navbar inverse fixedTop style={{borderBottom: "5px ridge #ff7700"}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Listify</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav bsStyle="pills" activeKey={1}>
                    <NavItem eventKey={1}>
                        <Link to="/playlists">Playlists</Link>
                    </NavItem>

                    <NavItem eventKey={2} href="#">
                        <Link to="/library"> Library</Link>
                    </NavItem>
                    <NavItem eventKey={3} href="#">
                        Spotify
                    </NavItem>
                    <NavItem eventKey={4} href="#">
                        SoundCloud
                    </NavItem>

                    <NavDropdown eventKey={3} title="View" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>List</MenuItem>
                        <MenuItem eventKey={3.2}>Grid</MenuItem>
                        <MenuItem eventKey={3.3}>Details</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}
const Home = () => (
    <div>Soundify</div>
    // <div style={{marginLeft: "260px"}}><h2 style={{paddingTop:"30px"}}>SOUNDIFY</h2></div>
);

const Playlists = () => (
    <div>
        <h2 style={{paddingTop:"30px"}}>PLAYLISTS</h2>
    </div>
);

const Library = () => (
    <div><h2>Library</h2></div>
);


export default TopMenu;