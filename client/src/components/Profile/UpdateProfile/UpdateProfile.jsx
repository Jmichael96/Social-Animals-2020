import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, fetchCurrentProfile } from '../../../store/actions/profile';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const initialState = {
    name: '',
    bio: '',
    location: '',
    email: ''
}
const UpdateProfile = ({ profile: { profile, loading }, createProfile, fetchCurrentProfile }) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!profile) {
            fetchCurrentProfile();
        }
        if (!loading && profile) {
            const profileData = { ...initialState };
            for (const key in profile) {
                if (key in profileData) {
                    profileData[key] = profile[key];
                }
            }
            setFormData(profileData);
        }

    }, [loading, fetchCurrentProfile, profile]);
    const { name, bio, location, email } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(formData);
        createProfile(formData);
    }

    return (
        <Fragment>
            <Wrapper>
                <form onSubmit={(e) => onSubmitForm(e)}>
                    <label htmlFor="name" className="grey-text">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={name}
                        placeholder="Full name"
                        onChange={onChange}
                    />
                    <label htmlFor="bio" className="grey-text">
                        About You
                </label>
                    <input
                        type="text"
                        name="bio"
                        id="bio"
                        className="form-control"
                        value={bio}
                        placeholder="About you"
                        onChange={onChange}
                    />
                    <label htmlFor="location" className="grey-text">
                        Where You Are Located
                </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        className="form-control"
                        value={location}
                        placeholder="Location"
                        onChange={onChange}
                    />
                    <label htmlFor="email" className="grey-text">
                        E-Mail
                </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={email}
                        placeholder="Email@yahoo.com"
                        onChange={onChange}
                    />
                    <div className="text-center mt-4">
                        <button color="unique" type="submit">
                            Update Profile
                    </button>
                    </div>
                </form>
            </Wrapper>
        </Fragment>
    )

}

UpdateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    fetchCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, fetchCurrentProfile })(UpdateProfile);