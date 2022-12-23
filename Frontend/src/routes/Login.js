import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import * as actions from "../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../utils";

import userIcon from '../../src/assets/images/user.svg';
import passIcon from '../../src/assets/images/pass.svg';
import './Login.scss';

import userService from '../services/userService';
import Signup from './Signup';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
    }

    initialState = {
        email: '',
        password: '',
        loginError: ''
    }

    state = {
        ...this.initialState
    };

    refresh = () => {
        this.setState({
            ...this.initialState
        })
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    processLogin = async () => {
        const { userLoginSuccess, userLoginFail } = this.props;

        this.refresh();

        try {
            // let res = await userService.handleLoginApi(this.state.email, this.state.password);
            // if (res.userdata) 
            userLoginSuccess()
        } catch (e) {
            console.log('error login : ', e);
            userLoginFail()
        }

    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            event.preventDefault();
            if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
            this.btnLogin.current.click();
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { email, password, loginError } = this.state;
        const { lang } = this.props;

        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className='title'> Candle in the wind</div>
                    <div className="form_login">
                        <h2 className="title"> Login </h2>
                        <div className="form-group icon-true">
                            <img className="icon" src={userIcon} alt="this" />
                            <input
                                placeholder={LanguageUtils.getMessageByKey("login.username", lang)}
                                id="email"
                                name="email"
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={this.onEmailChange}
                            />
                        </div>

                        <div className="form-group icon-true">
                            <img className="icon" src={passIcon} alt="this" />
                            <input
                                placeholder={LanguageUtils.getMessageByKey("login.password", lang)}
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={this.onPasswordChange}
                            />
                        </div>

                        {loginError !== '' && (
                            <div className='login-error'>
                                <span className='login-error-message'>{loginError}</span>
                            </div>
                        )}

                        <div className="form-group login">
                            <input
                                // ref={this.btnLogin}
                                id="btnLogin"
                                type="submit"
                                className="btn"
                                value={LanguageUtils.getMessageByKey("login.login", lang)}
                                onClick={this.processLogin}
                            />
                        </div>
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
