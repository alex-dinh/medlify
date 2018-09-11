import React, {Component} from "react";
// import SvgIcon from 'react-icons-kit';
// import {ic_business} from "react-icons-kit/md/ic_business";
// import {ic_aspect_ratio} from "react-icons-kit/md/ic_aspect_ratio";
import {Nav, NavItem} from "react-bootstrap";
import Playlists from './UserPlaylists.js'
import SCPlaylists from './soundcloud/SCUserPlaylists.js'
import {NavLink} from 'react-router-dom';


class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: []
        }
    }

    componentDidMount() {
        this.setState({
            info: this.refs.pl.state.playlists.names
        })
    }

    testref() {
        // console.log(this.refs.pl.state.playlists.names);
        this.setState({
            info: this.refs.pl.state.playlists.names
        });
    }

    getSideBar() {
        return (
            <div className="sidebar">
                <ul className="nav nav-sidebar">
                    <Playlists ref="pl"/>
                    <SCPlaylists ref="pl"/>
                    <h2 style={{color: 'white', margin: "10px"}}>
                        <NavLink to='/local' className="link" activeStyle={{ color: '#ff7700', textDecoration: 'none' }}>
                            Local Files
                        </NavLink>
                    </h2>



                </ul>
            </div>
        );
    }

    render() {
        return (
            <div style={{overflow: '', zIndex: '998 ', position: 'absolute'}} id="wrapper" >
                {this.getSideBar()}
            </div>
        );
    }
}

export default SideNav;