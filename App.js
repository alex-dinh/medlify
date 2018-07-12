import React, {Component} from "react";
import "./index.css";
import "./TodoList";
import TopMenu from "./components/TopMenu";
import Playlists from "./components/UserPlaylists";
import Playlist from "./components/Playlist";

import Home from "./components/Home";
import Library from "./components/Library";
import SideNav from "./components/SideNav.js";
import {Grid} from "react-bootstrap";
import BottomMenu from "./components/BottomMenu";
import {Route, MemoryRouter} from "react-router-dom";




class App extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //     }
    // }

    testref() {
        console.log(this.state.info);
        this.setState({
            info: this.refs.sn.state.info
        })
    }

    componentDidMount(){
        this.setState({
            info: this.refs.sn.state.info
        })
    }

    setupPlaylistLinks(){
        if(this.refs.sn) {
            this.refs.sn.state.info.map(function (playlist, i) {
                return (
                    <Route path={"/" + playlist.playlistId}
                           render={(props) => <Playlist {...props} playlistId={playlist.playlistId}/>}
                    />
                );
            })
        }
    }

    render(){
        return(
            <Grid onClick={()=>{this.testref()}} fluid>
                <MemoryRouter initialEntries={['/','playlists','library']} initialIndex={2}>
                    <div>
                        {/*Router in index allows route switching in main container*/}
                        <TopMenu/>
                        <SideNav ref="sn"/>
                        <switch>
                            <Route exact path ="/" component={Home}/>
                            <Route path="/playlists" component={Playlists}/>
                            <Route path="/library" component={Library}/>
                            <Route exact path="/playlist" component={Playlist}/>
                            {/*<Route path ="/zzzzz" render={(props) => <Playlist {...props}/>}/>*/}
                            <Route path ="/zzzzz" render={() => <Playlist playlistId="4jYKMVG2SasaKq4y6385vA"/>}/>
                            <Route path ="/0BwWIFmeMnotIOgwVMEoMy" render={() => <Playlist playlistId="0BwWIFmeMnotIOgwVMEoMy"/>}/>

                            {this.state && this.state.info &&
                                this.state.info.map(function (playlist, i) {
                                return (
                                    <Route path={"/" + playlist.playlistId}
                                       render={(props) => <Playlist {...props} playlistId={playlist.playlistId}/>}
                                    />
                                );
                            })}

                        </switch>
                    </div>
                </MemoryRouter>
                <BottomMenu/>
            </Grid>
        );
    }
}

export default App;