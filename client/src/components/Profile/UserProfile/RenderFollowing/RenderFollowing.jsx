import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../../utils/isEmpty';
import { setIteratingModal } from '../../../../store/actions/iteratingModal';

const RenderFollowing = ({ userLoading, user, setIteratingModal }) => {

    
    const renderFollowing = () => {
        let followingArr = user.following;
        if (!userLoading && isEmpty(followingArr)) {
            return (<button>0 followers</button>);
        }
        if (!userLoading && !isEmpty(followingArr)) {
            if (followingArr.length === 1) {
                return (<button onClick={callModal}>{followingArr.length} Following</button>)
            } 
            else if (followingArr.length > 1) {
                return (<button onClick={callModal}>{followingArr.length} Following</button>);
            }
        }
    }

    const callModal = () => {
        setIteratingModal(user.following)
    }

    return (
        <Fragment>
            {renderFollowing()}
        </Fragment>
    )
}

RenderFollowing.propTypes = {
    setIteratingModal: PropTypes.func.isRequired,
    userLoading: PropTypes.bool,
    user: PropTypes.any,
}

export default connect(null, { setIteratingModal })(RenderFollowing);