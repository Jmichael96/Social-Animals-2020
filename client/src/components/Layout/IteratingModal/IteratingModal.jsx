import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeIteratingModal } from '../../../store/actions/iteratingModal';

const IteratingModal = ({ removeIteratingModal, iteratingModal: { iteratingModalData, isOpen } }) => {

    // iterate over data being received
    // const renderIteratedData = () => {
    //     return Object.values(modalData).map((item) => {

    //     });
    // };
    console.log(iteratingModalData);

    return (
        <MDBContainer>
            <MDBModal isOpen={isOpen}>
                <MDBModalBody>
                    Here we are!
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