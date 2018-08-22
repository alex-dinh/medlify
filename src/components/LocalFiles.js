import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './styles/local.css'

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
                <h1>Local Files</h1>
                <Dropzone className='local' onDrop={this.onDrop.bind(this)} accept='audio/*'>
                    <h2 style={{textAlign: "center", verticalAlign: "middle", display: "table-cell"}}>
                        Drop music files here, or click to select files to upload.
                    </h2>
                </Dropzone>
                <aside>
                    <h2>Uploaded Music Files</h2>
                    <ul>
                        {
                            // this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                            this.state.files.map(file =>
                                <li onClick={() => this.playFile(file)} key={file.name}>
                                    {file.name} - {file.size} bytes
                                </li>)
                        }
                    </ul>
                </aside>
                <audio src={this.state.audioFile} controls autoPlay className='localplayer'/>
            </div>
        );
    }
}