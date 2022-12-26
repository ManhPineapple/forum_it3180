import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import {  Redirect } from 'react-router-dom';

import * as actions from "../../store/actions";

import userIcon from '../../assets/images/user.svg';
import passIcon from '../../assets/images/pass.svg';
import './Login.scss';

import { handleSignUpApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'Your Email',
            password: '******',
            username: 'Your Username'
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    onUsernameChange = (e) => {
        this.setState({ username: e.target.value })
    }

    login = () => {
        this.setState({
            login: true
        })
    }

    processSignUp = async () => {
        this.setState({
            errMsg: ""
        })

        try {
            let res = await handleSignUpApi(this.state.email, this.state.password, this.state.username);
            if (res.message === 'Success') {
                alert('Success')
                this.setState({
                    login: true
                })
            }
            else {
                this.setState({
                    errMsg: res.message
                })
            }
        } catch (e) {
            console.log('error login : ', e);
        }

    }

    render() {
        const { email, password, username, errMsg } = this.state;
        if (this.state.login === true) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className='title'> Candle in the wind</div>
                    <div className="form_login">
                        <h2 className="title"> SignUp </h2>
                        <div className="form-group icon-true">
                            <img className="icon" src={userIcon} alt="this" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={this.onEmailChange}
                            />
                        </div>

                        <div className="form-group icon-true">
                            <img className="icon" src={passIcon} alt="this" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={this.onPasswordChange}
                            />
                        </div>

                        <div className="form-group icon-true">
                            <img className="icon" src={userIcon} alt="this" />
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={this.onUsernameChange}
                            />
                        </div>

                        <div className='col-12' style={{color: 'red'}}>
                            {errMsg}
                        </div>

                        <div className="form-group login">
                            <input
                                id="btnLogin"
                                type="submit"
                                className="btn"

                                onClick={this.processSignUp}
                            />
                        </div>
                        <button className='signup' onClick={this.login}> LogIn </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
