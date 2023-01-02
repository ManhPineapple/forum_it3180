import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Post.scss'

class Post extends Component {

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
                Change Profile
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
