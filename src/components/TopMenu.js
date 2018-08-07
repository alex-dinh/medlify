import React, { Component } from "react";
import {Navbar, MenuItem, NavDropdown, Nav, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react';


class TopMenu extends Component {
    render() {
        return (
            <Navbar inverse fixedTop style={{borderBottom: "5px ridge #ff7700"}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/" className="link">Medlify</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>

                {/*<Navbar.Collapse>*/}
                <Nav bsStyle="pills" activeKey={1}>
                    {/*<NavItem eventKey={1}>*/}
                        {/*<Link to="/playlists" className="link">Playlists</Link>*/}
                    {/*</NavItem>*/}

                    <NavItem eventKey={2} href="#">
                        <Link to="/nowplaying" className="link">Now Playing</Link>
                    </NavItem>


                </Nav>
                {/*</Navbar.Collapse>*/}
                <Button href="https://medlify.herokuapp.com/login" style={{marginTop: "7px"}} className="ui right floated button">Log in</Button>

            </Navbar>
        );
    }
}

export default TopMenu;