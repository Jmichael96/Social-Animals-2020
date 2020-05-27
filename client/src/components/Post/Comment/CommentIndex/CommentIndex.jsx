import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import UpdateComment from '../UpdateComment/UpdateComment';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';
import { deleteComment, updateComment } from '../../../../store/actions/post';
import { setModal } from '../../../../store/actions/modal';
import isEmpty from '../../../../utils/isEmpty';
import Wrapper from '../../../Layout/Wrapper/Wrapper';
import {
    MDBContainer,
    MDBCol,
    MDBRow
} from 'mdbreact';

const CommentIndex = ({ auth, deleteComment, updateComment, setModal, comment: { _id, name, text, userId }, postId, postAuthorId }) => {
    // set whether the user wants to update the comment or not
    const [updating, setUpdating] = useState(false);

    const [textContent, setTextContent] = useState(text);

    useEffect(() => {
        setTextContent(text)
    }, [text]);

    // for when you are ready to update a comment
    const isUpdating = () => {
        setUpdating(!updating);
    }

    // on enter key press it will initiate the form submission
    const enterKeySubmit = (e) => {
        if (!auth.loading && auth.isAuthenticated) {
            if (e.keyCode === 13 || e.code === 'Enter' || e.code === 'NumpadEnter') {
                if (!auth.loading && userId === auth.user._id) {
                    e.preventDefault();
                    const formData = {
                        textContent
                    };
                    const commentId = _id;
                    updateComment(commentId, formData);
                    isUpdating();
                }
                else {
                    return;
                }
            }
        }
    }

    // on button submit initiate update function
    const onSubmit = (e) => {
        e.preventDefault();
        if (!auth.loading && auth.isAuthenticated) {
            if (!auth.loading && userId === auth.user._id) {
                const formData = {
                    textContent
                };
                const commentId = _id;
                updateComment(commentId, formData);
                isUpdating();
            }
            else {
                return;
            }
        }
    }
    const renderUpdate = () => {
        return (
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol size="10" className="p-0">
                        <input
                            type="text"
                            name="text"
                            id="commentText"
                            className="form-control"
                            value={textContent || ""}
                            onKeyDown={(e) => enterKeySubmit(e)}
                            onChange={(e) => setTextContent(e.target.value)}
                        />
                    </MDBCol>
                    <MDBCol size="2" className="p-0">
                        <button type="button" onClick={onSubmit} style={{ height: '100%' }}>Submit</button>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
    // render action button for comment
    const renderActionButton = () => {
        return (
            <a href="#!">
                <i className="fas fa-ellipsis-h"></i>
            </a>
        )
    }

    // render only if the user that created the comment is logged in
    // used for editing purposes only
    const renderDropDownEdit = () => {
        if (!auth.loading && isEmpty(auth.user)) {
            return;
        }
        if (!auth.loading && userId === auth.user._id) {
            return <MDBDropdownItem onClick={isUpdating}>Edit</MDBDropdownItem>
        } else {
            return null;
        }
    }

    // dropdown menu for a single post. 
    // it gives you all the actions you can do with your post
    const dropdownMenu = () => {
        // check if user is authenticated 
        // check if user is null
        // check if the authenticated user is equal to comment userId if not then don't return dropdown
        if (!auth.loading && !auth.isAuthenticated) {
            return;
        } else if (isEmpty(auth.user)) {
            return;
        } else if (auth.user._id !== userId) {
            return;
        }
        return (
            <MDBDropdown size="sm">
                <MDBDropdownToggle>
                    {renderActionButton()}
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    {renderDropDownEdit()}
                    <MDBDropdownItem divider />
                    {!checkDeleteRender() ? (null) : (<MDBDropdownItem onClick={configureDeleteModal}>Delete</MDBDropdownItem>)}
                </MDBDropdownMenu>
            </MDBDropdown>
        )
    }

    // function passed into setModal to confirm deleting;
    const onDeleteSubmit = () => {
        deleteComment(postId, _id)
    }
    // configure the modal for delete the comment
    const configureDeleteModal = () => {
        setModal('Are you sure you want to delete this comment?', 'Yes', onDeleteSubmit);
    }
    // rendering delete comment button in dropdown if user owns post 
    // or if the user is author of the comment
    const checkDeleteRender = () => {
        if (auth.isAuthenticated && auth.user) {
            let checked = false
            if (!auth.loading && userId === auth.user._id) {
                checked = true;
            } else if (!auth.loading && postAuthorId === auth.user._id) {
                checked = true;
            }
            return checked;
        } else {
            return;
        }
    }

    return (
        <Fragment key={_id}>
            {dropdownMenu()}
            <ul>
                <li>{name}</li>
                {!updating ? (<li>{text}</li>) : (renderUpdate())}
            </ul>
        </Fragment>
    )
}

CommentIndex.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    comment: PropTypes.any,
    postId: PropTypes.any,
    postAuthorId: PropTypes.any,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment, setModal, updateComment })(CommentIndex);