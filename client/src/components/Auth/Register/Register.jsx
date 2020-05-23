import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdbreact';
import './register.css';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { register } from '../../../store/actions/auth';
import { setAlert } from '../../../store/actions/alert';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import { Redirect } from 'react-router-dom';

const initialState = {
    username: '',
    password: '',
    name: '',
    bio: '',
    location: '',
    email: '',
}
const Register = ({ register, setAlert, isAuthenticated }) => {
    const [formData, setFormData] = useState(initialState);
    // const [name, setName] = useState('');
    // const [bio, setBio] = useState('');
    // const [profilePicture, setProfilePicture] = useState()
    // const [preview, setPreview] = useState()
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [password2, setPassword2] = useState('');
    // const [isValid, setIsValid] = useState(false);
    // const [nameErr, setNameErr] = useState('');
    // const [usernameErr, setUsernameErr] = useState('');
    // const [passwordErr, setPasswordErr] = useState('');
    // const [password2Err, setPassword2Err] = useState('');


    // create a preview as a side effect, whenever selected file is changed
    // useEffect(() => {
    //     if (!profilePicture) {
    //         setPreview(undefined)
    //         return
    //     }

    //     const objectUrl = URL.createObjectURL(profilePicture)
    //     setPreview(objectUrl)

    //     // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [profilePicture])

    // const onSelectFile = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setProfilePicture(undefined)
    //         return
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     setProfilePicture(e.target.files[0])
    // }
    const { username, password, name, bio, location, email } = formData;
    const onSubmitForm = (e) => {
        e.preventDefault();
        
        register({ username, password, name, bio, location, email });
       
    }
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    // const validateForm = () => {
    //     let validated = true;

    //     if (!name) {
    //         setNameErr('Must enter a name');
    //         validated = false;
    //     }
    //     if (!username) {
    //         setUsernameErr('Must enter a username');
    //         validated = false;
    //     }
    //     if (!password) {
    //         setPasswordErr('Must enter a password');
    //         validated = false;
    //     } else if (password.length < 6) {
    //         setPasswordErr('Must have more than 6 characters');
    //         validated = false;
    //     }
    //     if (!password2) {
    //         setPassword2Err('Must enter a password');
    //         validated = false;
    //     }

    //     if (password !== password2) {
    //         validated = false;
    //         console.log('passwords do not match!');
    //     }
    //     if (validated) {
    //         setIsValid(true);
    //     }
    // }

    return (
        <Wrapper>
            <div id="registerFormWrap">
                <h1>Register</h1>

                <form onSubmit={(e) => onSubmitForm(e)}>
                    <p className="h4 text-center mb-4">Sign up</p>
                    <label htmlFor="username" className="grey-text">
                        Username
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
                        Password
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