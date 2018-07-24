import React, {Component} from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Playlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            tracks: []
        };

    }

    componentDidMount(){
        this.getPlaylistInfo(); // for when button works properly
    }

    componentDidUpdate(prevProps){
        if (this.props.match.params.id !== prevProps.match.params.id){
            this.getPlaylistInfo();
        }
    }

    getPlaylistInfo(){

        spotifyApi.getPlaylistTracks("alexladinh", this.props.match.params.id)
        // spotifyApi.getPlaylistTracks("alexladinh", this.props.playlistId)
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
            tracks.push({
                id: i,
                name: response.items[i].track.name,
                artist: response.items[i].track.artists[0].name,
                album: response.items[i].track.album.name,
            });
        }
        return tracks;
    }

    render(){
        return(
            <table id="playlisttable">
                {this.props.name}
                <tbody>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Album</th>
                    </tr>

                { this.state.tracks.map(function(song, i) {
                    return(
                        <tr>
                            <td key={i}>{song.name}</td>
                            <td key={i}>{song.artist}</td>
                            <td key={i}>{song.album}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

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
// export default ({match: {params: {id}}}) =>
//     <div>
//         <h1 style={{position: "fixed", top: "50%", bottom: "50%", marginTop: "-50px", marginLeft: "-100px"}}>{id}</h1>
//         <Playlist playlistId={id}/>
//     </div>;