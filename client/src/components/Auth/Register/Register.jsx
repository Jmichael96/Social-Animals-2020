import React, { useState } from 'react';
import { MDBBtn } from 'mdbreact';
import './register.css';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { register } from '../../../store/actions/auth';
import { setAlert } from '../../../store/actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Register = ({ register, setAlert, isAuthenticated }) => {

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [nameErr, setNameErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [password2Err, setPassword2Err] = useState('');

    const onSubmitForm = (e) => {
        e.preventDefault();
        validateForm();
        const formData = {
            name,
            bio,
            username,
            password,
            password2
        }
       
        if (isValid) {
            console.log('Its a valid submission');
            console.log(formData);
            register(formData);
            // setAlert('Successfully created an account!', 'success');
        }
    }
    const validateForm = () => {
        let validated = true;

        if (!name) {
            setNameErr('Must enter a name');
            validated = false;
        }
        if (!username) {
            setUsernameErr('Must enter a username');
            validated = false;
        }
        if (!password) {
            setPasswordErr('Must enter a password');
            validated = false;
        } else if (password.length < 6) {
            setPasswordErr('Must have more than 6 characters');
            validated = false;
        }
        if (!password2) {
            setPassword2Err('Must enter a password');
            validated = false;
        }
        
        if (password !== password2) {
            console.log('passwords do not match!');
        }
        if (validated) {
            setIsValid(true);
        }
    }

    return (
        <Wrapper>
            <div id="registerFormWrap">
                <h1>Register</h1>

                <form onSubmit={(e) => onSubmitForm(e)}>
                    <p className="h4 text-center mb-4">Sign up</p>
                    <label htmlFor="name" className="grey-text">
                        {!isValid && nameErr ? <span style={{ color: 'red' }}>{nameErr}</span> : <span>Your name</span>}
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <label htmlFor="bio" className="grey-text">
                        Bio
                </label>
                    <textarea
                        type="text"
                        name="bio"
                        rows="5"
                        id="bio"
                        className="form-control"
                        value={bio}
                        placeholder="About me"
                        onChange={(e) => setBio(e.target.value)}></textarea>
                    <br />
                    <label htmlFor="username" className="grey-text">
                        {!isValid && usernameErr ? <span style={{ color: 'red' }}>{usernameErr}</span> : <span>Username</span>}
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <label htmlFor="password" className="grey-text">
                        {!isValid && passwordErr ? <span style={{ color: 'red' }}>{passwordErr}</span> : <span>Passord</span>}
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    <br />
                    <label htmlFor="password2" className="grey-text">
                        {!isValid && password2Err ? <span style={{ color: 'red' }}>{password2Err}</span> : <span>Retype Password</span>}
                    </label>
                    <input
                        type="password"
                        id="password2"
                        className="form-control"
                        value={password2}
                        placeholder="Retype Password"
                        onChange={(e) => setPassword2(e.target.value)} />

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
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, setAlert })(Register);