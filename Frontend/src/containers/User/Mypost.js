import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readPost } from '../../services/homeService'
import { Button } from 'reactstrap';

import './Post.scss'
import { deletePost } from '../../services/userService';
import ModalPost from './ModalPost';

class Mypost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfPost: [],
            showUpdate: false
        }
    }

    toggle = (id) => {
        this.setState({
            updateId: id,
            showUpdate: !this.state.showUpdate
        })
    }
    
    async componentDidMount() {
        if (this.props.userId) {
            let readpost = await readPost(this.props.userId);
            this.setState({
                listOfPost: readpost.listOfPost
            })  
        }
    }

    processDelete = async (id) => {
        let res = await deletePost(id);
        alert(res.message)
    }

    render() {
        const { listOfPost, showUpdate, updateId} = this.state;
        return (
            <div className='post'>
                <ModalPost show={showUpdate} toggle={this.toggle} update={updateId}></ModalPost>

                <table className='customers'>
                    <tr>
                        <th className='th'>Title</th>
                        <th className='th'>Content</th>
                        <th className='th'>Category</th>
                        <th className='th'>Status</th>
                        <th className='th'>Action</th>
                    </tr>
                    {
                    listOfPost.map((item, index) => {
                        return (
                            <tr className='tr' key = {index}>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.Category.name}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Button onClick={() => this.toggle(item.id)}>Edit</Button>
                                    <Button onClick={() => this.processDelete(item.id)}>Delete</Button>
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
        userId: state.user.userInfo.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mypost);
