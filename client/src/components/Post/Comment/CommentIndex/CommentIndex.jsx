import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DeleteComment from '../DeleteComment/DeleteComment';
import UpdateComment from '../UpdateComment/UpdateComment';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';
import { deleteComment } from '../../../../store/actions/post';
import { setModal } from '../../../../store/actions/modal';

const CommentIndex = ({ auth, deleteComment, setModal, comment: { _id, name, text, userId }, postId, postAuthorId }) => {
    const [updating, setUpdating] = useState(false);

    // for when you are ready to update a comment
    const isUpdating = () => {
        setUpdating(!updating);
    }

    // render the update component
    const renderUpdate = () => {
        return (<UpdateComment textContent={text} postId={postId} commentId={_id} commentAuthorId={userId} auth={auth} />)
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
        if (!auth.loading && auth.user === null) {
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
        if (!auth.isAuthenticated) {
            return null;
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
    comment: PropTypes.any,
    postId: PropTypes.any,
    postAuthorId: PropTypes.any,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { deleteComment, setModal })(CommentIndex);