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
import CommentIndex from '../../Comment/CommentIndex/CommentIndex';
import AddComment from '../../Comment/AddComment/AddComment';

const PostItem = ({
    updatePost,
    deletePost,
    setModal,
    likePost,
    unlikePost,
    auth: { isAuthenticated, user, loading },
    post: { _id, content, imagePath, date, authorId, authorUsername, likes, comments }
}) => {
    const [commentLimit, setCommentLimit] = useState(2);
    const [commentLimitReached, setCommentLimitReached] = useState(false);
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
    // checkUserValidation()

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

    const renderLikeNumber = () => {
        if (likes.length <= 0 || likes.length === null) {
            return null;
        }
        else if (likes.length === 1) {
            return (
                <p>{likes.length}{' '}Like</p>
            )
        }
        else if (likes.length > 1) {
            return (
                <p>{likes.length}{' '}Likes</p>
            )
        }
    }

    const renderCommentNumber = () => {
        if (comments.length <= 0 || comments.length === null) {
            return null;
        }
        else if (comments.length === 1) {
            return (
                <p>{comments.length}{' '}Comment</p>
            )
        } else if (comments.length > 1) {
            return (
                <p>{comments.length}{' '}Comments</p>
            )
        }
    }

    // once called, it will load the rest of the comments
    const loadMoreComments = () => {
        let commentLength = comments.length;
        let currentLimit = commentLimit;

        if (currentLimit < commentLength) {
            setCommentLimit(commentLength);
            setCommentLimitReached(true);
        } else if (currentLimit >= commentLength) {
            setCommentLimitReached(true);
        }
    }

    //  rendering comments if there are comments available
    // and then adding the slice method for cleaner rendering
    const renderComments = () => {
        if (comments === null || undefined) {
            return null;
        }
        return Object.values(comments).slice(0, commentLimit).map((comment) => {
            return (
                <CommentIndex key={comment._id} comment={comment} postAuthorId={authorId} postId={_id} />
            )
        })
    }

    // rendering add comment component if there is an authenticated user
    // else returning null
    const renderAddComment = () => {
        if (!loading && !isAuthenticated) {
            return null;
        }
        return (
            <AddComment postId={_id} />
        )
    }

    // checking if all comments are loaded first before adding the 'show more' comments button
    const renderLoadMoreComments = () => {
        if (comments.length <= commentLimit && !commentLimitReached) {
            return null;
        }
        return (<button type="button" onClick={loadMoreComments}>Show more</button>)
    }

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
                            {!checkUserValidation() ? (
                                null
                            ) : (
                                    dropdownMenu()
                                )}
                            {isAuthenticated && user ? (
                                <button type="button" onClick={() => {
                                    for (let i = 0; i < likes.length; i++) {
                                        if (likes[i].userId === user._id) {
                                            // if a post has already been liked by the logged in user...
                                            // unlike it and return nothing;
                                            unlikePost(_id);
                                            return;
                                        }
                                    }
                                    // if user has not liked post. like post with authenticated user's id
                                    likePost(_id);
                                }}>
                                    <i className="fas fa-thumbs-up" />{' '}
                                </button>
                            ) : (
                                    null
                                )}
                            {renderLikeNumber()}
                            {renderCommentNumber()}
                            {renderLoadMoreComments()}
                            {renderComments()}
                            {renderAddComment()}
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