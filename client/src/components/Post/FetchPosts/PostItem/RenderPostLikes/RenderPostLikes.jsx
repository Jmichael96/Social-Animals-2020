import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setIteratingModal } from '../../../../../store/actions/iteratingModal';
import isEmpty from '../../../../../utils/isEmpty';

const RenderPostLikes = ({ postLoading, likes, setIteratingModal, isAuth, userLoading }) => {

    const callModal = () => {
        if (!userLoading && !isAuth) {
            return null;
        }
        setIteratingModal(likes);
    }

    const renderLikes = () => {
        if (!postLoading && isEmpty(likes)) {
            return null;
        } 
        else if (!postLoading && !isEmpty(likes)) {
            if (likes.length === 0) {
                return null;
            } 
            else if (likes.length === 1) {
                return (<button onClick={callModal}>{likes.length} Like</button>)
            }
            else if (likes.length > 1) {
                return (<button onClick={callModal}>{likes.length} Likes</button>)
            }
        }
    }

    return (
        <Fragment>
            {renderLikes()}
        </Fragment>
    )
}

RenderPostLikes.propTypes = {
    setIteratingModal: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
    userLoading: PropTypes.bool,
    postLoading: PropTypes.bool,
    likes: PropTypes.any,
}

export default connect(null, { setIteratingModal })(RenderPostLikes);