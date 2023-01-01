import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux';

import { createPost, updatePost } from '../../services/userService';

import './Post.scss'

class ModalPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            toggle: this.props.toggle
        }
    }

    processPost = async () => {
        const {title, content, categoryId} = this.state;
        const {userId, toggle} = this.props;
        if (categoryId) {
            let res = await createPost(userId, title, content, categoryId)
            alert(res.message);
            toggle()
        } else alert('Missing input')
        
    }

    processEdit = async () => {
        const { title, content, categoryId} = this.state;
        const { update, toggle } = this.props;
        if (categoryId) {
            let res = await updatePost(update, title, content, categoryId);
            alert(res.message);
            toggle()
        } else alert('Missing input!')
    }

    componentDidMount() {

    }

    render() {
        const {show, toggle, create, update} = this.props;
        return (
            <div className='post'>
                <Modal isOpen={show} toggle={toggle} className={this.props.className}>
                {create && <ModalHeader toggle={toggle}>Create A New Post</ModalHeader>}
                {update && <ModalHeader toggle={toggle}>Edit Your Post</ModalHeader>}
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
                                    <option value={0}></option>
                                    <option value={1}>Sell</option>
                                    <option value={2}>Buy</option>
                                    <option value={3}>Sale</option>
                            </Input>
                        </FormGroup>
                        <FormGroup style={{marginTop: 10, textAlign: 'right'}}>
                            {create && <Button color="primary" onClick={this.processPost}>Post</Button>}
                            {update && <Button color="primary" onClick={this.processEdit}>Update</Button>}
                            {' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter></ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalPost);
