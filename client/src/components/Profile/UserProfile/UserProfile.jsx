import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfileById } from '../../../store/actions/profile';

const UserProfile = ({ fetchProfileById, profile: { profile }, auth, match }) => {

    const nullProfile = !profile;
    useEffect(() => {
        if (nullProfile) {
            console.log(match.params.id)
            fetchProfileById(match.params.id);
        }

    }, [fetchProfileById, match.params.id, nullProfile]);

    return (
        <Fragment>
            {profile === null ? (
                <h1>Loading...</h1>
            ) : (
                    <Fragment>
                        <h1>{profile.name}</h1>
                        <h2>{profile.bio}</h2>
                        <h3>{profile.location}</h3>
                        <h4>{profile.email}</h4>
                    </Fragment>
                )}

        </Fragment>
    )
}

UserProfile.propTypes = {
    fetchProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { fetchProfileById })(UserProfile);