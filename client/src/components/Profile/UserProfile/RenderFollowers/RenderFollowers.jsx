import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../../utils/isEmpty';
import { setIteratingModal } from '../../../../store/actions/iteratingModal';

const RenderFollowers = ({ userLoading, user, setIteratingModal }) => {

    
    const renderFollowers = () => {
        let followerArr = user.followers;
        if (!userLoading && isEmpty(followerArr)) {
            return null;
        }
        if (!userLoading && !isEmpty(followerArr)) {
            if (followerArr.length === 0) {
                return (<button>0 followers</button>);
            }
            else if (followerArr.length === 1) {
                return (<button onClick={callModal}>{followerArr.length} follower</button>)
            } 
            else if (followerArr.length > 1) {
                return (<button onClick={callModal}>{followerArr.length} followers</button>);
            }
        }
    }

    const callModal = () => {
        setIteratingModal(user.followers)
    }

    return (
        <Fragment>
            {renderFollowers()}
        </Fragment>
    )
}

RenderFollowers.propTypes = {
    setIteratingModal: PropTypes.func.isRequired,
    userLoading: PropTypes.bool,
    user: PropTypes.any,
}

export default connect(null, { setIteratingModal })(RenderFollowers);