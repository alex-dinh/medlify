import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './styles/local.css';
import {Grid} from 'semantic-ui-react'

export default class LocalFiles extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            trackName: "Track Name",
            audioFile: ""
        }
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

    render() {
        return (
            <div>
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
                            {/*<table>*/}
                                <tr>
                                    <th>File Name</th>
                                    <th>Size</th>
                                </tr>
                                {
                                    // this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
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
                <audio src={this.state.audioFile} controls autoPlay className='localplayer'/>
            </div>
        );
    }
}