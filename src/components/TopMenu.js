import React, { Component } from "react";
import {Navbar, MenuItem, NavDropdown, Nav, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";


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
                        <Link to="/library">Library</Link>
                    </NavItem>
                    <NavItem eventKey={3} href="#">
                        <Link to="/zzzzz">Spotify</Link>
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

export default TopMenu;