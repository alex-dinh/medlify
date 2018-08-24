import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './styles/local.css';
import './styles/audio.css';
import '../styles.css';
import {Grid} from 'semantic-ui-react';
import SvgIcon from 'react-icons-kit';
import {iosPlay, iosRewind, iosFastforward, iosPause} from 'react-icons-kit/ionicons/';
import {Progress} from 'semantic-ui-react';


class Player extends Component {
    constructor() {
        super();

        this.state = {
            playing: false,
            progress: 0,
            in_set_progress_mode: false
        };

        this.is_progress_dirty = false;
        this.interval_id = setInterval(this.onUpdate.bind(this), 250);
    }

    onUpdate() {
        if (this._player) {
            if (!this.is_progress_dirty) {
                this.setState({
                    progress: this._player.currentTime / this._player.duration
                });
            }

            if (this._player.ended && this.props.onDone) {
                this.props.onDone(this.props.src);
            }
        }
    }

    togglePlay() {
        this.setState({playing: !this.state.playing});
    }

    startSetProgress(evt) {
        this.setState({
            in_set_progress_mode: true
        });
        this.setProgress(evt);
    }

    stopSetProgress(evt) {
        this.setState({
            in_set_progress_mode: false
        });
        this.setProgress(evt);
    }

    setProgress(evt) {
        if (this.state.in_set_progress_mode) {
            let progress = (evt.clientX - offsetLeft(this._progress_bar)) / this._progress_bar.clientWidth;
            this.setState({
                progress: progress
            });
            this.is_progress_dirty = true;
        }
    }

    render() {
        let currentTime = 0;
        let totalTime = 0;

        if (this._player) {
            if (this._player.currentSrc !== this.props.src) {
                this._player.src = this.props.src;
            }

            if (this._player.paused && !this._player.ended) {
                if (this.state.playing) {
                    this._player.play();
                }
            }
            else if (!this.state.playing) {
                this._player.pause();
            }

            if (this.is_progress_dirty) {
                this.is_progress_dirty = false;

                this._player.currentTime = this._player.duration * this.state.progress;
            }

            currentTime = this._player.currentTime;
            totalTime = this._player.duration;
        }

        const {playing} = this.state;

        return (
            <div id='playerdiv'>
                <div id="localplayer">
                    {/*<div className="inlineitems" id="songinfo">*/}
                        {/*<img alt="" src={albumArt} style={{height: 50}}/>*/}
                    {/*</div>*/}

                    {/*<div className="inlineitems" id="songinfo" style={{left: "80px", paddingTop: "20px"}}>*/}
                    {/*<div>{trackName}</div>*/}
                    {/*<div>{artistName}</div>*/}
                    {/*</div>*/}

                    <div style={{color: '#ffa652'}} id="localplayerbutton">
                        <SvgIcon size={40} icon={iosRewind} onClick={() => this.props.onPrev}/>
                    </div>
                    <div style={{color: '#00b30a'}} id="localplayerbutton">
                        {playing ?
                            <SvgIcon size={40} icon={iosPause} onClick={this.togglePlay.bind(this)}/> :
                            <SvgIcon size={40} icon={iosPlay} onClick={this.togglePlay.bind(this)}/>
                        }
                    </div>
                    <div style={{color: '#ffa652'}} id="localplayerbutton">
                        <SvgIcon size={40} icon={iosFastforward} onClick={this.props.onNext}/>
                    </div>
                    <Progress id="localsongprogress"
                              inverted
                              color='green'
                              percent={this.state.progress * 100}
                              // onMouseDown={this.startSetProgress.bind(this)}
                              // onMouseMove={this.setProgress.bind(this)}
                              // onMouseLeave={this.stopSetProgress.bind(this)}
                              // onMouseUp={this.stopSetProgress.bind(this)}
                              ref={(ref) => this._progress_bar = ref}/>

                    <div className="time">
                        {formatTime(currentTime)} / {formatTime(totalTime)}
                    </div>

                    <audio ref={(ref) => this._player = ref} autoPlay={this.state.playing}>
                    <source src={this.props.src}/><source/>
                </audio>
                </div>


                {/*<div className="controls">*/}
                    {/*<SvgIcon size={20} icon={iosRewind}/>*/}
                    {/*<a onClick={this.togglePlay.bind(this)}>*/}
                        {/*{playing ?*/}
                            {/*<SvgIcon size={20} icon={iosPause}/> :*/}
                            {/*<SvgIcon size={20} icon={iosPlay}/>*/}
                        {/*}*/}
                    {/*</a>*/}
                    {/*<a onClick={this.props.onNext}><SvgIcon size={20} icon={iosFastforward}/></a>*/}
                {/*</div>*/}
                {/*<div*/}
                    {/*onMouseDown={this.startSetProgress.bind(this)}*/}
                    {/*onMouseMove={this.setProgress.bind(this)}*/}
                    {/*onMouseLeave={this.stopSetProgress.bind(this)}*/}
                    {/*onMouseUp={this.stopSetProgress.bind(this)}*/}
                    {/*className="progress"*/}
                {/*>*/}
                    {/*<div ref={(ref) => this._progress_bar = ref} className="bar">*/}
                        {/*<div style={{width: (this.state.progress * 100) + '%'}}></div>*/}
                    {/*</div>*/}
                {/*</div>*/}

            </div>
        );
    }
}

function format2Number(num) {
    let str = num + '';
    if (str.length === 1) {
        return '0' + str;
    }
    if (str.length === 0) {
        return '00';
    }
    return str;
}

function formatTime(s) {
    if (!s && s !== 0) {
        return '??:??';
    }

    let total_seconds = Math.floor(s);
    let hours = Math.floor(total_seconds / 3600);
    let minutes = Math.floor(total_seconds / 60) - hours * 60;
    let seconds = total_seconds - minutes * 60 - hours * 3600;

    if (hours) {
        return hours + ':' + format2Number(minutes) + ':' + format2Number(seconds);
    }

    return format2Number(minutes) + ':' + format2Number(seconds);
}

function offsetLeft(el) {
    let left = 0;
    while (el && el !== document) {
        left += el.offsetLeft;
        el = el.offsetParent;
    }
    return left;
}


export default class LocalFiles extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            trackName: "Track Name",
            audioFile: ""
        };
    }

    onDrop(files) {
        this.setState({
            files
        });
    }

    playFile(file) {
        console.log('file playing!');
        let reader = new FileReader();
        reader.onload = () => {
            const audio = reader.result;
            this.setState({
                trackName: file.name,
                audioFile: audio
            })
        };
        reader.readAsDataURL(file);
    }

    play() {
        this.refs.localplayer.play();
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1 style={{marginTop: "20px"}}>Local Files</h1>
                <Grid columns={2} id='localgrid'>
                    <Grid.Column>
                        <Dropzone className='local' onDrop={this.onDrop.bind(this)} accept='audio/*'>
                            <h2 style={{textAlign: "center", verticalAlign: "middle", display: "table-cell"}}>
                                Drop music files here, or click to select files to upload.
                            </h2>
                        </Dropzone>
                    </Grid.Column>
                    <Grid.Column>
                        <aside>
                            <h2>Uploaded Music Files</h2>
                            <table id="filetable">
                                <tr>
                                    <th>File Name</th>
                                    <th>Size</th>
                                </tr>
                                {
                                    this.state.files.map(file =>
                                        <tr onClick={() => this.playFile(file)} key={file.name}>
                                            <td>{file.name}</td>
                                            <td>{file.size} bytes</td>
                                            {console.log(file)}
                                        </tr>
                                    )
                                }
                            </table>
                        </aside>
                    </Grid.Column>
                </Grid>
                {/*<audio src={this.state.audioFile} controls autoPlay id='localplayer' ref={ref => this.player = ref}/>*/}
                <Player src={this.state.audioFile}/>

            </div>
        );
    }
}