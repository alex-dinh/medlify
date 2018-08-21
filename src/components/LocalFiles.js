import React, {Component} from "react";
import Dropzone from 'react-dropzone';
import './styles/local.css'

export default class LocalFiles extends Component {
    constructor() {
        super();
        this.state = {files: []}
    }

    onDrop(files) {
        this.setState({
            files
        });
    }

    render() {
        return (
            <div>
                <h1>Local Files</h1>
                <Dropzone className='local' onDrop={this.onDrop.bind(this)} accept="audio/*">
                    <h2 style={{textAlign: "center", verticalAlign: "middle", display: "table-cell"}}>Drop music files here, or click to select files to upload.</h2>
                </Dropzone>
                <aside>
                    <h2>Uploaded Music Files</h2>
                    <ul>
                        {
                            this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>
                </aside>
            </div>
        );
    }
}