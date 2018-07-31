import React, {Component} from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class Playlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            tracks: [],
            track_uris: []
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


    getPlaylistInfo() {
        /* leaving as empty string returns user who granted access
        *  does putting in the user id even matter?? */

        spotifyApi.getPlaylistTracks("", this.props.match.params.id)
        // spotifyApi.getPlaylistTracks("alexladinh", this.props.match.params.id)
            .then((response) => {
                console.log(response);

                this.setState({
                    tracks: Playlist.buildTracklist(response),
                    track_uris: Playlist.buildTrackUris(response)
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
                uri: response.items[i].track.uri,
                context: response.href,
                duration: response.items[i].track.duration_ms
            });
        }
        return tracks;
    }

    static buildTrackUris(response){
        let uris = [];
        for (let i = 0; i < response.items.length; i++){
            if(!response.items[i].track.uri.includes("local")) // exclude local songs from getting added
                uris.push(response.items[i].track.uri);
        }
        return uris;
    }


    playSong(uri){ // NOTE: cannot have both uri and uri_context at the same time
        // spotifyApi.play({"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]})
        spotifyApi.play({
            // "uris": [uri],
            "uris": this.state.track_uris,
            "offset": {"uri": uri}
        })
            .then((response) => {
                console.log(response);
            })
            .catch(error => console.log('API call failed', error))
    }
    // playSong(uri){ // NOTE: cannot have both uri and uri_context at the same time
    //     // spotifyApi.play({"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]})
    //     spotifyApi.play({
    //         // "uris": [uri],
    //         "uris": this.state.uris,
    //         "offset": {"position": }
    //         // "uri_context"
    //     })
    //         .then((response) => {
    //             console.log(response);
    //         })
    //         .catch(error => console.log('API call failed', error))
    // }


    render(){
        return(
            <div>
                <h1>Playlist title</h1>
                <table id="playlisttable">
                    {this.props.name}
                    <tbody>
                        <tr>
                            <th onClick={() => this.playSong()}>Song</th>
                            <th>Artist</th>
                            <th>Album</th>
                        </tr>

                    { this.state.tracks.map((song, i) => (
                            <tr>
                                <td onClick={() => this.playSong(song.uri)} key={"name"+i}>{song.name}</td>
                                <td key={"artist"+i}>{song.artist}</td>
                                <td key={"song"+i}>{song.album}</td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default Playlist;