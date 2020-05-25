import React, { useState, useEffect } from 'react';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { login } from '../../../store/actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Login = ({ login, isAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [usernameErr, setUsernameErr] = useState('');
    const [passErr, setPassErr] = useState('');
    // setting disable for the form if it is not valid
    const [disable, setDisable] = useState(true);


    useEffect(() => {
        setDisable(validateUsername())
        setDisable(validatePassword())
    }, [username, password]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        let formData = {
            username,
            password
        }
        login(formData);
        resetForm();
    }

    const validateUsername = () => {
        if (username === '') {
            return true;
        } else {
            setUsernameErr(null);
            return false;
        }

    }
    const validatePassword = () => {
        if (password === '') {
            return true
        } else {
            setPassErr(null);
            return false;
        }
    }

    const resetForm = () => {
        setUsername('');
        setPassword('');
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
                        {!isValid && passErr ? <span style={{ color: 'red' }}>{passErr}</span> : <span>Password</span>}
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
                        <button type="submit" disabled={disable} >
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