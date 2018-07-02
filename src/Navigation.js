import React, {Component} from "react";
import SvgIcon from 'react-icons-kit';
import {ic_business} from "react-icons-kit/md/ic_business";
import {ic_aspect_ratio} from "react-icons-kit/md/ic_aspect_ratio";
import {Grid, Row, Col} from "react-bootstrap";
import {NavItem} from "react-bootstrap";

class SideNav extends React.Component {
  constructor(props) {
    super(props)
  }

    getSideBar() {
        return (<div style={{width:'20%'}}>
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li onClick={this.props.getAQuoteNavTriggered}
                    style={{background:!this.props.searchTriggered && !this.props.showProfileView ? '#2c3e50' : 'white'}}
                    className="sidebar-brand">
                        <a onClick={this.props.getAQuoteNavTriggered}
                        style={{height:'100%',textAlign:'center', color:!this.props.searchTriggered && !this.props.showProfileView ? 'white'  : '#999999' }}
                        href="#">
                            Get A Quote
                        </a>
                    </li>
                    <li onClick={this.props.myOrderedNavTriggered}
                    style={{background:this.props.searchTriggered && !this.props.showProfileView ? '#2c3e50' : 'white'}}
                    className="sidebar-brand">
                        <a onClick={this.props.myOrderedNavTriggered}
                        style={{height:'100%',textAlign:'center', color:this.props.searchTriggered  && !this.props.showProfileView? 'white'  : '#999999' }}
                        href="#">
                            My Orders
                        </a>
                    </li>
                    <li><NavItem eventKey={1} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={2} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={3} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                    <li><NavItem eventKey={4} href="#">Playlists</NavItem></li>
                </ul>

        </div>
    </div>)
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