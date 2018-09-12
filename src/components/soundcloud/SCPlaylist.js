import React, {Component} from 'react';
import axios from 'axios';
import SoundCloudAudio from 'soundcloud-audio';


export default class SCPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            stream_urls: []
        };
        this.scPlayer = new SoundCloudAudio('ueCJznjk0tvGY5Jok607pqOtHiFEKjIR');
        // Is it a good idea to initialize a new player every time a playlist is loaded?
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
        axios.get('https://api.soundcloud.com/playlists/'+ this.props.match.params.id +'?client_id=ueCJznjk0tvGY5Jok607pqOtHiFEKjIR')
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
                duration: response.data.tracks[i].duration,
                trackId: response.data.tracks[i].id
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

    playSCTrack(trackId) {
        this.scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/' + trackId + '/stream'})
            .then((response) => {})
        // html5 audio play() and pause() now return promises, so .then() must be used
    }

    pauseSCTrack() {
        this.scPlayer.pause();
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
                            <td onClick={() => this.playSCTrack(song.trackId)} key={"track"+i}>{song.title}</td>
                            <td onClick={() => this.playSCTrack(song.trackId)} key={"uploader"+i}>{song.artist}</td>
                            <td onClick={() => this.playSCTrack(song.trackId)} key={"album"+i}>{song.album}</td>
                            <td onClick={() => this.playSCTrack(song.trackId)} key={"duration"+i}>{SCPlaylist.formatTrackLength(song.duration)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

}