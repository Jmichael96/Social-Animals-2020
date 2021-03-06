import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MDBNavbar,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from "mdbreact";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../store/actions/auth';
import WelcomeMessage from '../../Profile/WelcomeMessage/WelcomeMessage';
import CurrentUserNotifications from '../../Notifications/CurrentUserNotifications/CurrentUserNotifications';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    // for the hoverable dropdown
    const [isShown, setIsShown] = useState(false);

    const onMouseEnter = () => {
        setIsShown(true);
    }

    const onMouseLeave = () => {
        setIsShown(false);
    }

    const guestLinks = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/adopt_page">Adopt</Link>
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
                    <Link className="nav-link" to="/adopt_page">Adopt</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/create_post">Create Post</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/my_profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/my_messages">Messages</Link>
                </li>
                <li className="nav-item"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}>
                    <MDBDropdown>
                        <Link to="/discover">
                            <MDBDropdownToggle disabled color="">
                                Discover
                        </MDBDropdownToggle>
                        </Link>
                        <MDBDropdownMenu basic>
                            <MDBDropdownItem>Action</MDBDropdownItem>
                            <MDBDropdownItem>Another Action</MDBDropdownItem>
                            <MDBDropdownItem>Something else here</MDBDropdownItem>
                            <MDBDropdownItem divider />
                            <MDBDropdownItem>Separated link</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </li>
                <li className="nav-item"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}>
                    <MDBDropdown>
                        <MDBDropdownToggle color="">
                            Map
                        </MDBDropdownToggle>
                        <MDBDropdownMenu basic>
                            <Link to="/map/shelter">
                                <MDBDropdownItem>Shelters Near Me</MDBDropdownItem>
                            </Link>
                            <MDBDropdownItem>Another Action</MDBDropdownItem>
                            <MDBDropdownItem>Something else here</MDBDropdownItem>
                            <MDBDropdownItem divider />
                            <MDBDropdownItem>Separated link</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </li>
                <li className="nav-item">
                    <a href="#!" className="nav-link" onClick={logout}>Logout</a>
                </li>
                <li className="nav-item">
                    <div className="nav-link"><CurrentUserNotifications /></div>
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