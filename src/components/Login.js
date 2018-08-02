import React, {Component} from 'react';
import WebPlayer from "./WebPlayer";
let querystring = require('querystring');

class Login extends Component {
    static generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    login() {
        const state = Login.generateRandomString(16);
        const client_id = '80b1c9461b834255a24c4877f354c965'; // Your client id
        const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri


        // your application requests authorization
        let scope = 'user-read-private ' +
            'user-read-email ' +
            'user-read-playback-state ' +
            'playlist-read-private ' +
            'playlist-read-collaborative ' +
            'streaming ' +
            'user-read-birthdate ' +
            'user-modify-playback-state';
        return ('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    }

    render(){
        return(
            <h1 style={{position: "absolute", left: "50%", top: "20%"}}>
                <a href={this.login()}>LOG IN</a>
            </h1>
        );
    }

}

export default Login;