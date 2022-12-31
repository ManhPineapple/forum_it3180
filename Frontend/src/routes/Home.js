import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    linkToRedirect = (isAdmin, isUser) => {
        if (isAdmin) return '/admin';
        if (isUser) return '/user';
        return '/login'
    }

    render() {
        const {isAdmin, isUser} = this.props

        let linkToRedirect = this.linkToRedirect(isAdmin, isUser)

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isUser: state.user.isLoggedIn,
        isAdmin: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
