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
import { updatePost, deletePost, likePost, unlikePost, deleteImage } from '../../../../store/actions/post';
import { notifyUser } from '../../../../store/actions/notification';
import { fetchLikes } from '../../../../store/actions/like';
import { setModal } from '../../../../store/actions/modal';
import CommentIndex from '../../Comment/CommentIndex/CommentIndex';
import AddComment from '../../Comment/AddComment/AddComment';
import isEmpty from '../../../../utils/isEmpty';
import PostImages from './PostImages/PostImages';
import RenderPostLikes from './RenderPostLikes/RenderPostLikes';
import RenderPostComments from './RenderPostComments/RenderPostCommentLength';
import Wrapper from '../../../Layout/Wrapper/Wrapper';
import LikePost from '../../Like/LikePost/LikePost';

import './postItem.css';

const PostItem = ({
    updatePost,
    deletePost,
    setModal,
    likePost,
    unlikePost,
    auth: { isAuthenticated, user, loading },
    post: { _id, content, imagePath, date, authorId, authorUsername, likes, comments },
    postLoading,
    notifyUser,
    deleteImage
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
                    <MDBDropdownToggle>
                        <a href="#!">
                            <i className="fas fa-ellipsis-h"></i>
                        </a>
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
        if (!postLoading && !comments) {
            return null;
        }
        return Object.values(comments).slice(0, commentLimit).map((comment) => {
            return (
                <CommentIndex key={comment._id} comment={comment} userLoading={loading} postAuthorId={authorId} postId={_id} />
            )
        })
    }

    // rendering add comment component if there is an authenticated user
    // else returning null
    const renderAddComment = () => {
        if (!loading && isAuthenticated && !isEmpty(user)) {
            return (
                <AddComment
                    postId={_id}
                    notifiedUser={authorId}
                    userId={user._id}
                    username={user.username}
                    profilePic={user.profilePicture}
                    notificationType={`has commented on your post "${content}"`}
                />
            )
        }
    }

    // checking if all comments are loaded first before adding the 'show more' comments button
    const renderLoadMoreComments = () => {
        if (!postLoading && !comments) {
            return null
        }
        if (comments.length <= commentLimit) {
            return null;
        }
        return (<button type="button" onClick={loadMoreComments}>Show more</button>)
    }

    // check to see if current user is author of post and change url accordingly
    const isAuthor = () => {
        if (!loading && !postLoading) {
            if (!user) {
                return;
            }
            if (user._id === authorId) {
                return true
            }
            else if (user._id !== authorId) {
                return false
            }
        }
    }

    // render the post images
    const renderImages = () => {
        if (!isEmpty(imagePath)) {
            return <PostImages
                postImages={imagePath}
                postId={_id}
                authLoading={loading}
                user={user}
                authorId={authorId}
                deleteImage={deleteImage}
                isEditing={editing} />
        }
    }

    const renderContent = () => {
        if (!postLoading && !isEmpty(content)) {
            let parsedContent = content.replace(/#(\w+)/g, '<a href="#">#$1</a>');
            return <p className="postContent" dangerouslySetInnerHTML={{ __html: parsedContent }}></p>
        }
    }

    return (
        <Fragment>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <div id="postCard" key={_id}>
                            <MDBRow>
                                <MDBCol>
                                    <Link to={!isAuthor() ? `/user_profile/${authorId}` : '/my_profile'}>
                                        <h4 id="postAuthor">{authorUsername}</h4>
                                    </Link>
                                </MDBCol>
                                <MDBCol>
                                    {!checkUserValidation() ? (
                                        null
                                    ) : (
                                            dropdownMenu()
                                        )}
                                </MDBCol>
                            </MDBRow>
                            <div className="postImgWrap">
                                {renderImages()}
                            </div>
                            {!editing ? (
                                <div>{renderContent()}</div>
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

                            <RenderPostLikes postLoading={postLoading} isAuth={isAuthenticated} likes={likes} />
                            {isAuthenticated && user ? (
                                <LikePost likePost={likePost} postId={_id} likeArr={likes} user={user} unlikePost={unlikePost} authorId={authorId} notifyUser={notifyUser} postContent={content} />
                            ) : (
                                    null
                                )}
                            <RenderPostComments postLoading={postLoading} comments={comments} />
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
    notifyUser: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    postLoading: PropTypes.any,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { updatePost, setModal, deletePost, likePost, unlikePost, fetchLikes, notifyUser, deleteImage })(PostItem);