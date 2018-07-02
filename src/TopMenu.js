import React, { Component } from "react";
import {Navbar, MenuItem, NavDropdown, Nav, NavItem} from "react-bootstrap";

class TopMenu extends Component {
    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Soundify</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Playlists
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Library
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Spotify
                    </NavItem>
                    <NavItem eventKey={2} href="#">
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

export default TopMenu;