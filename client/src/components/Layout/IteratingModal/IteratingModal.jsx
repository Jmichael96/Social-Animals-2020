import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeIteratingModal } from '../../../store/actions/iteratingModal';
import { Link } from 'react-router-dom';

const IteratingModal = ({ removeIteratingModal, iteratingModal: { iteratingModalData, isOpen } }) => {

    // iterate over data being received
    const renderIteratedData = () => {
        let data = iteratingModalData.data;
        if (!data) {
            return null;
        }
        return Object.values(data).map((item) => {
            return (
                <li key={item._id}>
                    <Link to={`/user_profile/${item.userId}`} onClick={removeIteratingModal}>{item.username}</Link>
                </li>
            )
        });
    };

    return (
        <MDBContainer>
            <MDBModal isOpen={isOpen}>
                <MDBModalBody>
                    <ul>
                        {renderIteratedData()}
                    </ul>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={removeIteratingModal}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    )
}
IteratingModal.propTypes = {
    removeIteratingModal: PropTypes.func.isRequired,
    iteratingModal: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    iteratingModal: state.iteratingModal
})
export default connect(mapStateToProps, { removeIteratingModal })(IteratingModal);