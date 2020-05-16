import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    MDBNavbar,
    MDBCollapse
} from "mdbreact";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../store/actions/auth';
import WelcomeMessage from '../../Profile/WelcomeMessage/WelcomeMessage';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const guestLinks = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </ul>
    )
    const authenticatedLinks = () => {
        if (!user) {
            return null;
        }
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/create_post">Create Post</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/user_profile/${user._id}`}>Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/usernames">Usernames</Link>
                </li>
                <li className="nav-item">
                    <a href="#!" className="nav-link" onClick={logout}>Logout</a>
                </li>
            </ul>
        )
    }
    return (
        <MDBNavbar id="nav" light expand="lg">
            <MDBCollapse id="navbarCollapse3" navbar>
                <Fragment>
                    {!loading && !isAuthenticated ? guestLinks : authenticatedLinks()}
                </Fragment>
                <WelcomeMessage />
            </MDBCollapse>
        </MDBNavbar>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);