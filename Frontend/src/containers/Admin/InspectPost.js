import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inspectPost } from '../../services/adminService';
import { Button } from 'reactstrap';

import './InspectPost.scss'

class InspectPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingPost: []
        }
        this.readPost()
    }

    readPost = async () => {
        let res = await inspectPost('','');
        this.setState({
            pendingPost: res.listOfPending
        })  
    }

    acceptPost = async (postId) => {
        let res = await inspectPost(postId, 'accept');
        alert(res.message)
        this.readPost()
    }
    
    deletePost = async (postId) => {
        let res = await inspectPost(postId, 'delete');
        alert(res.message)
        this.readPost()
    }

    componentDidMount() {

    }

    render() {
        const { pendingPost } = this.state
        return (
            <div className='inspect'>
                <table className='customers'>
                    <tr>
                        <th className='th'>Author</th>
                        <th className='th'>Title</th>
                        <th className='th'>Content</th>
                        <th className='th'>Category</th>
                        <th className='th'>Action</th>
                    </tr>
                    {
                    pendingPost.map((item, index) => {
                        return (
                            <tr className='tr' id={index}>
                                <td>{item.User.userName}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.Category.name}</td>
                                <td>
                                    <Button onClick={() => this.acceptPost(item.id)}>Accept</Button>
                                    <Button onClick={() => this.deletePost(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    }) 
                    }
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(InspectPost);
