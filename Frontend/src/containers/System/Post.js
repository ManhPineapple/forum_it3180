import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readPost } from '../../services/homeService'
import './Post.scss'

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfPost: []
        }
    }

    async componentDidMount() {
        let readpost = await readPost();
        this.setState({
            listOfPost: readpost.listOfPost
        })  
    }

    render() {
        const {listOfPost} = this.state;
        return (
            <div className='post'>
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
                            <tr className='tr'>
                                <td key={index}>{item.User.userName}</td>
                                <td key={index}>{item.title}</td>
                                <td key={index}>{item.content}</td>
                                <td key={index}>{item.Category.name}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
