import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className='text-center'>
                User Manage
            </div>     
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
