import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import './register.css';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { register } from '../../../store/actions/auth';
import { setAlert } from '../../../store/actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';

const initialState = {
    username: '',
    password: '',
    name: '',
    bio: '',
    location: '',
    email: '',
    profileType: ''
}

const Register = ({ register, setAlert, isAuthenticated, history }) => {
    const [formData, setFormData] = useState(initialState);

    const { username, password, name, bio, location, email, profileType } = formData;

    const onSubmitForm = (e) => {
        e.preventDefault();

        register({ username, password, name, bio, location, email, profileType });
        history.push('/');
    }

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Wrapper>
            <div id="registerFormWrap">
                <h1>Register</h1>

                <form onSubmit={(e) => onSubmitForm(e)}>
                    <p className="h4 text-center mb-4">Sign up</p>
                    <label htmlFor="username" className="grey-text">
                        Username *
                        {/* {!isValid && usernameErr ? <span style={{ color: 'red' }}>{usernameErr}</span> : <span>Username</span>} */}
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        value={username}
                        placeholder="Username"
                        onChange={onChange}
                    />
                    <br />
                    <label htmlFor="password" className="grey-text">
                        Password *
                        {/* {!isValid && passwordErr ? <span style={{ color: 'red' }}>{passwordErr}</span> : <span>Password</span>} */}
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        name="password"
                        onChange={onChange}
                        placeholder="password"
                    />
                    <br />
                    {/* <label htmlFor="password2" className="grey-text">
                        {!isValid && password2Err ? <span style={{ color: 'red' }}>{password2Err}</span> : <span>Retype Password</span>}
                    </label>
                    <input
                        type="password"
                        id="password2"
                        className="form-control"
                        value={password2}
                        placeholder="Retype Password"
                        onChange={(e) => setPassword2(e.target.value)} />
                    <label htmlFor="name" className="grey-text">
                        Full Name
                    </label> */}
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
                    <label htmlFor="profileType">
                        Please choose what you would like to use this profile for
                    </label>
                        <select id="profileType" 
                        name="profileType" 
                        value={profileType} 
                        onChange={onChange}
                        className="browser-default custom-select">
                            <option value="user">Select Your Profile Type</option>
                            <option value="breeder">Breeder</option>
                            <option value="shelter">Shelter</option>
                            <option value="user">Neither</option>
                        </select>
                    <div className="text-center mt-4">
                        <MDBBtn color="unique" type="submit">
                            Register
                    </MDBBtn>
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    setAlert: PropTypes.func.isRequired,
    history: PropTypes.any,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const exportRegister = withRouter(Register);

export default connect(mapStateToProps, { register, setAlert })(exportRegister);