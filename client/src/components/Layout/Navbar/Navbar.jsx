import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    MDBNavbar,
    MDBCollapse
} from "mdbreact";

const Navbar = () => {

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
    return (
        <MDBNavbar id="nav" light expand="lg">
            <MDBCollapse id="navbarCollapse3" navbar>
                <Fragment>
                    {guestLinks}
                </Fragment>
            </MDBCollapse>
        </MDBNavbar>
    )
}
export default Navbar;