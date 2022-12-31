import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, userMenu } from './menuApp';
import './Header.scss';

class Header extends Component {

    render() {
        const { processLogout, isAdmin, isUser, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    {isUser && <span> <Navigator menus={userMenu} /> </span> }
                </div>

                <div> 
                    {isAdmin && <span> <Navigator menus={adminMenu} /> </span> }
                </div>

                {/* nút logout */}
                <div style={{padding: 10}}> 
                    Welcome {userInfo? userInfo.userName : ' '}
                </div>
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isUser: state.user.isLoggedIn,
        isAdmin: state.admin.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
