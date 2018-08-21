import React, { Component } from "react";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {Button} from 'semantic-ui-react';


class TopMenu extends Component {
    render() {
        return (
            <Navbar inverse fixedTop style={{borderBottom: "5px ridge #ff7700"}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink to="/home" className="link" activeStyle={{ color: '#ff7700', textDecoration: 'none' }}>
                            Medlify
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>

                {/*<Navbar.Collapse>*/}
                <Nav bsStyle="pills" activeKey={1}>
                    {/*<NavItem eventKey={1}>*/}
                        {/*<Link to="/playlists" className="link">Playlists</Link>*/}
                    {/*</NavItem>*/}

                    <NavItem eventKey={2} href="#">
                        <NavLink to="/nowplaying" className="link" activeStyle={{ color: '#ff7700', textDecoration: 'none' }}>
                            Now Playing
                        </NavLink>
                    </NavItem>


                </Nav>
                {/*</Navbar.Collapse>*/}
                <Button href="https://medlify.herokuapp.com/login" style={{marginTop: "7px"}} className="ui right floated button">Log in</Button>

            </Navbar>
        );
    }
}

export default TopMenu;