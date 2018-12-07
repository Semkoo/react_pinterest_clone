import React, { Component } from 'react';

class GitHubLogin extends Component {
    render() {
        return (
            <div>
                <button type="button" className="btn btn-secondary btn-social btn-github btn-block mt-4"> <i class="fab fa-github"> </i> Sign in with GitHub</button>
            </div>
        );
    }
}

export default GitHubLogin;
