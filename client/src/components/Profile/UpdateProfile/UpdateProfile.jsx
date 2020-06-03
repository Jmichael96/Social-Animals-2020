import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../store/actions/user';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const initialState = {
    name: '',
    bio: '',
    location: '',
    email: ''
}
const UpdateProfile = ({ auth: { isAuthenticated, user, loading }, updateProfile, history }) => {
    const [formData, setFormData] = useState(initialState);
    const [profilePicture, setProfilePicture] = useState(null);
    // check to see if form has been submitted for update
    // then redirect if true
    const [isUpdated, setIsUpdated] = useState(false);

    // set whether or not the user wants to change their profile picture
    const [changeProfilePic, setChangeProfilePic] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            const profileData = { ...initialState };
            for (const key in user) {
                if (key in profileData) {
                    profileData[key] = user[key];
                }
            }
            setFormData(profileData);
        }

    }, [loading, user]);
    const { name, bio, location, email } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitForm = (e) => {
        e.preventDefault();
        const id = user._id;
        setIsUpdated(true);
        if (!profilePicture) {
            setProfilePicture(user.profilePicture);
        }
        updateProfile({ id, profilePicture, name, bio, location, email });
        history.push('/my_profile')
    }

    // func to render new file attachment if user wants to change profile picture
    const configUpdatePic = () => {
        setChangeProfilePic(!changeProfilePic);
    }

    const onfilechange = (e) => {
        setProfilePicture(e.target.files[0]);
    }

    return loading ? null : (
        <Fragment>
            <img style={{ height: '200px' }} src={user.profilePicture} />
            <button onClick={configUpdatePic}>Change Picture</button>
            <Wrapper>

                <form onSubmit={(e) => {
                    onSubmitForm(e)
                    setIsUpdated(true)
                }}>
                    {!changeProfilePic ? null : (<input type="file" name="profilePicture" onChange={onfilechange} />)}
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
                        <Link to="/my_profile"><button type="button">Cancel</button></Link>
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
    updateProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    history: PropTypes.any,
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const exportUpdateProfile = withRouter(UpdateProfile);

export default connect(mapStateToProps, { updateProfile })(exportUpdateProfile);