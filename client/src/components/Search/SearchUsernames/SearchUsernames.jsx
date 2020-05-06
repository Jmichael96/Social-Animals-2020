import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsernames } from '../../../store/actions/user';
import { Link } from 'react-router-dom';

const SearchUsernames = ({ fetchUsernames, user: { users, loading } }) => {
    useEffect(() => {
        fetchUsernames();
    }, [fetchUsernames]);

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
            <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            {renderUsers}
        </Fragment>
    )
}

SearchUsernames.propTypes = {
    fetchUsernames: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { fetchUsernames })(SearchUsernames);