import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux';
import { readPost } from '../../services/homeService'

import './Post.scss'
import { createPost } from '../../services/userService';

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

    processPost = async () => {
        const {title, content, categoryId} = this.state;
        let res = await createPost(title, content, categoryId)
        alert(res.message)
        this.toggle()
    }

    async componentDidMount() {
        let readpost = await readPost();
        this.setState({
            listOfPost: readpost.listOfPost
        })  
    }

    render() {
        const {listOfPost, show} = this.state;
        const {userInfo} = this.props;
        return (
            <div className='post'>
                <Button className='btn' onClick={this.toggle}>Create A New Post</Button>
                <Modal isOpen={show} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Create A New Post</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input type="text" name="title" onChange={(e) => {this.setState({title: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Content</Label>
                            <Input type="text" name="content" onChange={(e) => {this.setState({content: e.target.value})}}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Category </Label>
                            <Input type="select" name="categoryId" onChange={(e) => {this.setState({categoryId: e.target.value})}}>
                                    <option value={1}>Sell</option>
                                    <option value={2}>Buy</option>
                                    <option value={3}>Sale</option>
                            </Input>
                        </FormGroup>
                        <FormGroup style={{marginTop: 10, textAlign: 'right'}}>
                            <Button color="primary" onClick={this.processPost}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    
                </ModalFooter>
                </Modal>

                <table className='customers'>
                    <tr>
                        <th className='th'>Author</th>
                        <th className='th'>Title</th>
                        <th className='th'>Content</th>
                        <th className='th'>Category</th>
                    </tr>
                    {
                    listOfPost.map((item) => {
                        return (
                            <tr className='tr'>
                                <td>{item.User.userName}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.Category.name}</td>
                            </tr>
                        )
                    }) 
                    }
                </table>

                <div> {userInfo.userName} </div>
            </div>     
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
