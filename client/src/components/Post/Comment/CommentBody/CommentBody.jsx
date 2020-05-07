import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteComment from '../DeleteComment/DeleteComment';
import UpdateComment from '../UpdateComment/UpdateComment';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';

const CommentBody = ({ auth, comment: { _id, name, text, userId }, postId, postAuthorId }) => {

    const [updating, setUpdating] = useState(false);

    // for when you are ready to update a comment
    const isUpdating = () => {
        setUpdating(!updating);
    }

    // render the delete component
    const renderDelete = () => {
        if (!auth.loading && !auth.user) {
            return null;
        }
        return (
            <DeleteComment postId={postId} commentId={_id} commentAuthorId={userId} postAuthorId={postAuthorId} />
        )
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
        // if (!auth.loading && userId === auth.user._id) {
        //     return (
        //         <a href="#!" onClick={isUpdating}>
        //             <i className="fas fa-ellipsis-h"></i>
        //         </a>
        //     )
        // } else if (!auth.loading && postAuthorId === auth.user._id) {
        //     return (
        //         <a href="#!" onClick={isUpdating}>
        //             <i className="fas fa-ellipsis-h"></i>
        //         </a>
        //     )
        // } else {
        //     return null;
        // }
    }

    // render only if the user that created the comment is logged in
    // used for editing purposes only
    const renderDropDownEdit = () => {
        if (!auth.loading && userId === auth.user._id) {
            return <MDBDropdownItem onClick={isUpdating}>Edit</MDBDropdownItem>
        } else {
            return null;
        }
    }

    // dropdown menu for a single post. 
    // it gives you all the actions you can do with your post
    const dropdownMenu = () => {
        return (
            <MDBDropdown size="sm">
                <MDBDropdownToggle>
                    {renderActionButton()}
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    {renderDropDownEdit()}
                    <MDBDropdownItem>Something to beat</MDBDropdownItem>
                    <MDBDropdownItem>Something else here</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem>Delete</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        )
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

CommentBody.propTypes = {
    comment: PropTypes.any,
    postId: PropTypes.any,
    postAuthorId: PropTypes.any,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(CommentBody);