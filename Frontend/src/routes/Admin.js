import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import InspectPost from '../containers/Admin/InspectPost';
import UserManage from '../containers/Admin/UserManage';

class Admin extends Component {
    render() {
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path='/admin/inspectpost' component={InspectPost} />
                        <Route path='/admin/usermanage' component={UserManage} />
                        <Route component={() => { return (<Redirect to={'/admin/inspectpost'}/>) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
