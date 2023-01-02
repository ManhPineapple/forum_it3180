import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'

import { adminIsAuthenticated, userIsAuthenticated, userIsNotAuthenticated, adminIsNotAuthenticated } from '../hoc/authentication';

import Header from '../containers/Header/Header';
import Home from './Home'
import Login from '../containers/Auth/Login';
import SignUp from '../containers/Auth/SignUp';
import User from './User';
import Admin from './Admin';

import { path } from '../utils'
import { ToastContainer } from 'react-toastify';
import { CustomToastCloseButton } from '../components/CustomToast';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        const {isAdmin, isUser} = this.props;
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {(isUser || isAdmin) && <Header />}
                        <span className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={Home} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SIGNUP} component={userIsNotAuthenticated(SignUp)} />     
                                <Route path={path.USER} component={userIsAuthenticated(User)} />
                                <Route path={path.ADMIN} component={adminIsAuthenticated(Admin)} />
                            </Switch>
                        </span>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isUser: state.user.isLoggedIn,
        isAdmin: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);