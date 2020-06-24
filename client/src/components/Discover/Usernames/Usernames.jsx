import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../utils/isEmpty';

const Usernames = ({ users, loading }) => {
    const [searchInput, setSearchInput] = useState('');

    const filteredUsers = users.filter((user) => user.username.includes(searchInput));
    
    const renderUsers = filteredUsers.map((item) => {
        return (
            <div key={item._id}>
                <Link to={`/user_profile/${item._id}`}>
                    <p>{item.username}</p>
                </Link>
            </div>
        )
    });

    return (
        <Fragment>
            <h3>Usernames</h3>
            <Fragment>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                {renderUsers}
            </Fragment>
        </Fragment>
    )
}

Usernames.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default Usernames;