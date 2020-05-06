import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';
import { connect } from 'react-redux';
import { updatePost, deletePost, likePost, unlikePost } from '../../../../store/actions/post';
import { setModal } from '../../../../store/actions/modal';

const PostItem = ({
    updatePost,
    deletePost,
    setModal,
    likePost,
    unlikePost,
    auth: { isAuthenticated, user, loading },
    post: { _id, content, imagePath, date, authorId, authorUsername, likes, comments }
}) => {

    const [editing, setEditing] = useState(false);
    const [contentEdit, setContentEdit] = useState(content);

    useEffect(() => {
        setContentEdit(content);
    }, [content]);

    // checking if user is authenticated and owns the post 
    // they want to update or delete
    const checkUserValidation = () => {
        let confirmedUser = false;
        if (loading) {
            confirmedUser = false;
        }
        if (!isAuthenticated || user === null) {
            confirmedUser = false;
        } else if (user && user._id === authorId) {
            confirmedUser = true;
        }
        return confirmedUser;
    }
    checkUserValidation()

    // setting the edit availability to true or false
    const onEditChange = () => {
        setEditing(!editing);
    }

    // submitting post for update
    const onEditSubmit = (e) => {
        e.preventDefault();
        const id = _id;

        if (content === contentEdit) {
            setEditing(false);
        } else if (content !== contentEdit) {
            const formData = {
                content: contentEdit,
                imagePath: imagePath
            }
            updatePost(id, formData)
        }
    }

    // delete post func
    const onDeleteSubmit = () => {
        const id = _id;
        deletePost(id);
    }
    // modal delete element
    // const modalElement = () => {
    //     return ( <button onClick={(e) => onDeleteSubmit(e)}>Confirm</button>)
    // }

    // configure modal with setModal()
    const configureModal = () => {
        setModal('Are you sure you want to delete this post?', 'Yes', onDeleteSubmit)
    }
    // dropdown menu for a single post. 
    // it gives you all the actions you can do with your post
    const dropdownMenu = () => {
        if (!editing) {
            return (
                <MDBDropdown>
                    <MDBDropdownToggle caret color="primary">
                        Special
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem onClick={onEditChange}>Edit</MDBDropdownItem>
                        <MDBDropdownItem>Something to beat</MDBDropdownItem>
                        <MDBDropdownItem>Something else here</MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem onClick={configureModal}>Delete</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            )
        } else if (editing) {
            return (
                <button onClick={(e) => {
                    onEditSubmit(e)
                    setEditing(false);
                }
                }>Done</button>
            )
        }
    }

    const checkIfLiked = () => {
        if (isAuthenticated && user) {
            likes.map((like) => {
                if (like.userId === user._id) {
                    console.log('matching id now')
                }
              
                    console.log('like userId does not match!!!')
                
            })
        }
    }
    // checkIfLiked();
    return (
        <Fragment>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <div key={_id}>
                            <Link to={`/user_profile/${authorId}`}>
                                <h4>Created by: {authorUsername}</h4>
                            </Link>
                            {!editing ? (
                                <p>{content}</p>
                            ) : (
                                    <input
                                        type="text"
                                        name="content"
                                        id="contentEdit"
                                        className="form-control"
                                        value={contentEdit}
                                        onChange={(e) => setContentEdit(e.target.value)}
                                    />
                                )}

                            <p>{imagePath}</p>
                            <p>{date}</p>
                            {!checkUserValidation() ? (
                                null
                            ) : (
                                    dropdownMenu()
                                )}
                            {isAuthenticated && user ? (
                                <button type="button" onClick={() => {
                                    // if (likes.length === 0) {

                                    // }
                                        for (let i = 0; i < likes.length; i++) {
                                            if (likes[i].userId === user._id) {
                                                console.log('You have already liked this post')
                                                unlikePost(_id);
                                                return;
                                            }
                                        }
                                        likePost(_id);
                                }}>
                                    <i className="fas fa-thumbs-up" />{' '}
                                    <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                                </button>
                            ) : (
                                null
                            )}
                        </div>
                    </MDBCol>
                </MDBRow>
                <hr />
            </MDBContainer>
        </Fragment>
    )
}

PostItem.propTypes = {
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { updatePost, setModal, deletePost, likePost, unlikePost })(PostItem);