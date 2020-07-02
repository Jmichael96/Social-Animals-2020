import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../utils/isEmpty';

const Usernames = ({ users, loading }) => {
    const [searchInput, setSearchInput] = useState('');
    const [trendingUsers, setTrendingUsers] = useState([]);
    const filteredUsers = users.filter((user) => user.username.includes(searchInput));
    
    useEffect(() => {
        let trendingCopy = [];
        if (users) {
            trendingCopy.push(...users);
        }
        // sorting the users by how many followers to get the top users of social animals
        let sortedTrending = trendingCopy.sort((a, b) => (a.followers.length > b.followers.length) ? -1 : (b.followers.length > a.followers.length) ? 1 : 0);
        setTrendingUsers(sortedTrending);
    }, [users])

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