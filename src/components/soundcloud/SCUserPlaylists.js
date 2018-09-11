import React, {Component} from 'react';
import soundcloud from 'soundcloud';
import '../styles/soundcloud.css';
import axios from 'axios';
import {NavLink} from "react-router-dom";

const SC = require('soundcloud');

class SCPlaylistButton extends Component {
    render(){
        return(
            <div>
                <NavLink to={this.props.url}
                         activeStyle={{ color: '#ff7700', textDecoration: 'none' }}
                         className="link">
                    {this.props.title}
                </NavLink>
            </div>

        );
    }
}

export default class SCUserPlaylists extends Component {
    constructor() {
        super();
        this.state = {
            playlists: []
        }
    }

    componentDidMount() {
        this.getPlaylists(); // shows playlists immediately after loading component
    }


    getPlaylists() {
        axios.get('http://api.soundcloud.com/users/80lux/playlists?client_id=ueCJznjk0tvGY5Jok607pqOtHiFEKjIR')
            .then((response) => { // promise returns: require arrow functions to work properly
                console.log(response.data);
                this.setState({
                    playlists: SCUserPlaylists.buildPlaylistList(response)
                })
            });
    }

    showPlaylists() {
        return(
            <div style={{margin: "10px"}}>
                { this.state.playlists.map(function(playlist, i) {
                    return(
                        <SCPlaylistButton key = {"playlist" + i}
                                          url={"/scplaylist/"+playlist.playlistId}
                                          title={playlist.title}/>
                    );
                })}
            </div>
        );
    }

    static buildPlaylistList(response) {
        let playlists = [];
        for (let i = 0; i < response.data.length; i++) {
            playlists.push({
                id: i,
                title: response.data[i].title,
                playlistId: response.data[i].uri.split("/")[4] // string splitting hax
            })
        }
        return playlists;
    }

    render() {
        return(
            // <div className='sc-container'>
            <div>
                {/*<form className='sc-form'>*/}
                    {/*SoundCloud Username:*/}
                    {/*<input type='text' name='username'></input>*/}
                    {/*<br/>*/}
                {/*</form>*/}
                <h2 style={{color: 'white', margin: "10px"}}
                    onClick={() => this.getPlaylists()}>
                        SoundCloud
                </h2>
                {/*<button onClick={() => this.getPlaylists()}>Show SoundCloud Library</button>*/}
                {this.showPlaylists()}


            </div>
        );
    }
}