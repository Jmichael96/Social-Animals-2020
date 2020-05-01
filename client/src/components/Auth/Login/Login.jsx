import React, { useState } from 'react';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { login } from '../../../store/actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [isValid, setIsValid] = useState(false);

    const onSubmitForm = (e) => {
        e.preventDefault();
        validateForm();
        const formData = {
            username,
            password,
        }
        if (isValid) {
            console.log('Its a valid submission');
            login(formData);
        }
    }
    const validateForm = () => {
        let validated = true;

        if (!username) {
            setUsernameErr('Must enter a username');
            validated = false;
        }
        if (!password) {
            setPasswordErr('Must enter a password');
            validated = false;
        }
        if (validated) {
            setIsValid(true);
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    return (
        <Wrapper>
            <div>
                <h1>Login</h1>
                <form onSubmit={(e) => onSubmitForm(e)}>
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
                    <div className="text-center mt-4">
                        <button color="unique" type="submit">
                            Login
        </button>
                    </div>
                </form>
            </div>
        </Wrapper>

    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login);