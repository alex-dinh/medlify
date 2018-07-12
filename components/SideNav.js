import React, {Component} from "react";
// import SvgIcon from 'react-icons-kit';
// import {ic_business} from "react-icons-kit/md/ic_business";
// import {ic_aspect_ratio} from "react-icons-kit/md/ic_aspect_ratio";
import {Nav, NavItem} from "react-bootstrap";
import Playlists from './UserPlaylists.js'
import {Link} from 'react-router-dom';


class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: []
        }
    }

    componentDidMount(){
        this.setState({
            info: this.refs.pl.state.playlists.names
        })
    }

    testref() {
        console.log(this.refs.pl.state.playlists.names);
        this.setState({
            info: this.refs.pl.state.playlists.names
        });
    }

    getSideBar() {
        return (
        <div style={{width:'20%'}}>
            <div onClick={() => this.testref()} id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <Nav bsStyle="tabs" stacked>
                        <NavItem style={{textAlign:'center'}} eventKey={2} href="#">Playlists</NavItem>
                        <NavItem eventKey={2}><Link to="/playlists">Playlists</Link></NavItem>
                    </Nav>
                    <Playlists ref="pl"/>
                </ul>

            </div>
        </div>);
    }

    render() {
        return (
            <div style={{overflow:''}} id="wrapper">
                {this.getSideBar()}

            </div>
        );
    }
}

export default SideNav;