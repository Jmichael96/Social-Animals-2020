import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import { Link } from 'react-router-dom';

const FetchLikes = ({ openOrder, like: { likes, loading } }) => {

    const [modalOpen, setModalOpen] = useState(openOrder);

    useEffect(() => {
        setModalOpen(openOrder)
    }, [openOrder])

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const renderLikers = () => {
        if (!loading && likes) {
            return Object.values(likes).map((user) => {
                return (
                    <div key={user._id}>
                        <Link to={`/user_profile/${user.userId}`}>
                            <h4>{user.username}</h4>
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <Fragment>
            <MDBContainer>
                <MDBModal isOpen={modalOpen} toggle={toggleModal}>
                    <MDBModalHeader toggle={toggleModal}>Likes</MDBModalHeader>
                    <MDBModalBody>
                        {renderLikers()}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggleModal}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </Fragment>
    )
}

FetchLikes.propTypes = {
    like: PropTypes.object,
    openOrder: PropTypes.bool,
}

export default FetchLikes;