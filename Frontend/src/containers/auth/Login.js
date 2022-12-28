import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import {  Redirect } from 'react-router-dom';

import * as actions from "../../store/actions";
import { KeyCodeUtils } from "../../utils";

import userIcon from '../../assets/images/user.svg';
import passIcon from '../../assets/images/pass.svg';
import './Login.scss';

import {handleLoginApi} from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    signup = () => {
        this.setState({
            signup: true
        })
    }

    processLogin = async () => {
        const { userLoginSuccess, userLoginFail } = this.props;

        this.setState({
            errMsg: ""
        })

        try {
            let res = await handleLoginApi(this.state.email, this.state.password);
            if (res.userdata) {
                userLoginSuccess(); 
                
            }
            else this.setState({
                errMsg: res.message
            })
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
        const { email, password, errMsg } = this.state;

        if (this.state.signup === true) return (<Redirect to={'/signup'} />)

        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className='title'> Candle in the wind</div>
                    <div className="form_login">
                        <h2 className="title"> Login </h2>
                        <div className="form-group icon-true">
                            <img className="icon" src={userIcon} alt="this" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder='Your Email'
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
                                placeholder='Password'
                                value={password}
                                onChange={this.onPasswordChange}
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
                                onClick={this.processLogin}
                            />
                        </div>
                        <button className='signup' onClick={this.signup}> SignUp </button>
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
