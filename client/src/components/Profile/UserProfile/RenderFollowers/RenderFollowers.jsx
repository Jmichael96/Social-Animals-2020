import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../../utils/isEmpty';
import { setIteratingModal } from '../../../../store/actions/iteratingModal';

const RenderFollowers = ({ profileLoading, profile, setIteratingModal }) => {

    
    const renderFollowers = () => {
        let followerArr = profile.followers;
        if (!profileLoading && isEmpty(followerArr)) {
            return null;
        }
        if (!profileLoading && !isEmpty(followerArr)) {
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
        setIteratingModal(profile.followers)
    }

    return (
        <Fragment>
            {renderFollowers()}
        </Fragment>
    )
}

RenderFollowers.propTypes = {
    setIteratingModal: PropTypes.func.isRequired,
    profileLoading: PropTypes.bool,
    profile: PropTypes.object,
}

export default connect(null, { setIteratingModal })(RenderFollowers);