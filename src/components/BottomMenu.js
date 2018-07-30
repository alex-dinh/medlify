import React, { Component } from "react";
import {Navbar, Nav} from "react-bootstrap";
import SvgIcon from 'react-icons-kit';
import {iosPlay, iosRewind, iosSkipforward} from 'react-icons-kit/ionicons/';
import '../styles.css'
import WebPlayer from './WebPlayer';


class BottomMenu extends Component {
    onPrevClick() {
        this.player.previousTrack();
    }

    onPlayClick() {
      this.player.togglePlay();
    }

    onNextClick() {
      this.player.nextTrack();
    }

    render() {
        return (
            <Navbar inverse fixedBottom style={{borderTop: "5px ridge #1db954", height: "80px"}}>

                <Nav>
                    <div><WebPlayer/></div>
                    {/*<div class="inlineitems" style={{ color: '#F4A261', padding: "5px 5px 5px", float: "center"}} >*/}
                        {/*<SvgIcon size={32} icon={iosRewind} onClick={() => this.onPrevClick()}/>*/}
                    {/*</div>*/}
                    {/*<div class="inlineitems" style={{ color: '#2A9D8F', float: "center" }}>*/}
                        {/*<SvgIcon size={32} icon={iosPlay} onClick={() => this.onPlayClick()}/>*/}
                    {/*</div>*/}
                    {/*<div class="inlineitems" style={{ color: '#E9C46A', float: "center" }}>*/}
                        {/*<SvgIcon size={32} icon={iosSkipforward} onClick={() => this.onNextClick()}/>*/}
                    {/*</div>*/}
                </Nav>

            </Navbar>
        );
    }
}

export default BottomMenu;