import React, {Component} from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
// import {Link} from "react-router-dom";

class Playlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            tracks: []
        };

    }
    componentDidMount(){
        console.log(this.props.playlistId);
        this.getPlaylistInfo(); // for when button works properly
    }

    getPlaylistInfo(){

        // spotifyApi.getPlaylistTracks("alexladinh", this.props.id)
        // spotifyApi.getPlaylistTracks("alexladinh", "4jYKMVG2SasaKq4y6385vA")
        spotifyApi.getPlaylistTracks("alexladinh", this.props.playlistId)
            .then((response) => {
                console.log(response);

                this.setState({
                    tracks: Playlist.buildTracklist(response)
                })
            })
    }

    static buildTracklist(response){
        let tracks = [];
        for (let i = 0; i < response.items.length; i++){
            tracks.push({id: i, name: response.items[i].track.name});
        }
        return tracks;
    }

    render(){
        return(
            <div style={{overflowY: "auto", maxHeight: "75vh"}}>{this.props.name}
                { this.state.tracks.map(function(song, i) {
                    return(
                        <div key={i}>{song.name}</div>
                    );
                })}
            </div>

        );
    }

    // **attempt at table styling**
    // render(){
    //     return(
    //         <div onClick={() => this.getPlaylistInfo()}>{this.props.name}
    //             <table class="Table">
    //             <tbody>
    //             { this.state.tracks.map(function(song, i) {
    //                 return(
    //                     <tr><td>{song.name}</td></tr>
    //                 );
    //             })}
    //             </tbody>
    //             </table>
    //         </div>
    //
    //     );
    // }
}

export default Playlist;