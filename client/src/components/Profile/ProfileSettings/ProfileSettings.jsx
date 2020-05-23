import React, { Fragment } from 'react';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';
import { Link } from 'react-router-dom';

const ProfileSettings = ({ }) => {

    return (
        <Fragment>
            <MDBDropdown>
                <MDBDropdownToggle caret color="primary">
                    Profile Settings
      </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    <MDBDropdownItem><Link to="/update_profile">Update Profile</Link></MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </Fragment>
    )
}
export default ProfileSettings;