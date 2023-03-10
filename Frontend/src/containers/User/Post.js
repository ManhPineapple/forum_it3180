import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { readPost } from '../../services/homeService'

import './Post.scss'
import ModalPost from './ModalPost';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfPost: [],
            show: false,    
        }
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        })
    }

    async componentDidMount() {
        let readpost = await readPost();
        this.setState({
            listOfPost: readpost.listOfPost
        })  
    }

    render() {
        const {listOfPost, show} = this.state;
        return (
            <div className='post'>
                <Button className='btn' onClick={this.toggle}>Create A New Post</Button>

                <ModalPost show={show} toggle={this.toggle} create={true}></ModalPost>

                <table className='customers'>
                    <tr>
                        <th className='th'>Author</th>
                        <th className='th'>Title</th>
                        <th className='th'>Content</th>
                        <th className='th'>Category</th>
                    </tr>
                    {
                    listOfPost.map((item, index) => {
                        return (
                            <tr className='tr' id={index}>
                                <td>{item.User.userName}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.Category.name}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
