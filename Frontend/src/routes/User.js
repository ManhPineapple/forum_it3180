import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ChangeProfile from '../containers/User/ChangeProfile';
import Mypost from '../containers/User/Mypost';

import Post from '../containers/User/Post'

class User extends Component {
    render() {
        const { userMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/user/post" component={Post} />
                        <Route path="/user/mypost" component={Mypost} />
                        <Route path="/user/profile" component={ChangeProfile} />
                        <Route component={() => { return (<Redirect to={userMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userMenuPath: state.app.userMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
