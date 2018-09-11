import React, {Component} from 'react';
import axios from 'axios';

export default class SCPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            track_uris: []
        };
    }

    componentDidMount(){
        this.getPlaylistInfo(); // gets playlist info before render starts
    }

    componentDidUpdate(prevProps){
        if (this.props.match.params.id !== prevProps.match.params.id){
            this.getPlaylistInfo();
        }
    }

    getPlaylistInfo() {
        let pl_name = this.props.match.params.id;
        axios.get('http://api.soundcloud.com/playlists/'+ this.props.match.params.id +'?client_id=ueCJznjk0tvGY5Jok607pqOtHiFEKjIR')
            .then((response) => {
                this.setState({
                    tracks: SCPlaylist.buildTrackList(response),
                });
                // console.log(response);
            })
    }

    static buildTrackList(response) {
        let tracks = [];
        for (let i = 0; i < response.data.tracks.length; i++){
            tracks.push({
                id: i,
                title: response.data.tracks[i].title,
                artist: response.data.tracks[i].user.username,
                duration: response.data.tracks[i].duration
            })
        }
        return tracks;
    }

    static formatTrackLength(len) {
        const minutes = Math.floor(len/60000);
        const seconds = Math.round((len/1000)%60);
        if (seconds < 10) {
            return minutes.toString() + ':0' + seconds.toString();
        } else {
            return minutes.toString() + ':' + seconds.toString();
        }
    }

    render() {
        return(
            <div id="plcontainer">
                {/*<h1>Playlist title</h1>*/}
                <table id="playlisttable">
                    {this.props.name}
                    <tbody>
                    <tr>
                        <th onClick={() => this.playSong()}>Title</th>
                        <th>Uploader</th>
                        <th>Album</th>
                        <th>Track Length</th>
                    </tr>
                    { this.state.tracks.map((song, i) => (
                        <tr>
                            <td key={"name"+i}>{song.title}</td>
                            <td key={"artist"+i}>{song.artist}</td>
                            <td key={"song"+i}>{song.album}</td>
                            <td key={"length"+i}>{SCPlaylist.formatTrackLength(song.duration)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

}