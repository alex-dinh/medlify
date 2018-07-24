import React, { Component } from "react";
import {Navbar, Nav} from "react-bootstrap";
import SvgIcon from 'react-icons-kit';
import {iosPlay, iosRewind, iosSkipforward} from 'react-icons-kit/ionicons/';
import '../styles.css'

class BottomMenu extends Component {
    render() {
        return (
            <Navbar inverse fixedBottom style={{borderTop: "5px ridge #1db954"}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Soundify</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {/*NavItem implentation, unknown how to change colors*/}
                    {/*<NavItem eventKey={2} href="#">*/}
                        {/*<SvgIcon size={32} icon={iosPlayOutline}/>*/}
                    {/*</NavItem>*/}

                    {/*inline styling requires double brackets bc returning an object*/}
                    <div class="inlineitems" style={{ color: '#F4A261', padding: "5px 5px 5px"}} >
                        <SvgIcon size={32} icon={iosRewind}/>
                    </div>
                    <div class="inlineitems" style={{ color: '#2A9D8F' }}>
                        <SvgIcon size={32} icon={iosPlay}/>
                    </div>
                    <div class="inlineitems" style={{ color: '#E9C46A' }}>
                        <SvgIcon size={32} icon={iosSkipforward}/>
                    </div>


                </Nav>
            </Navbar>
        );
    }
}

export default BottomMenu;