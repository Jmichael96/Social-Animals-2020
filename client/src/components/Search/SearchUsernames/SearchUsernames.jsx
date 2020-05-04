import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsernames } from '../../../store/actions/user';
import { Link } from 'react-router-dom';

const SearchUsernames = ({ fetchUsernames, user: { users, loading } }) => {
    useEffect(() => {
        fetchUsernames();
    }, [fetchUsernames]);

    const renderUsers = () => {
        const userList = users;
        return Object.values(userList).map((user) => {
            return (
                <div>
                    <Link to={`/user_profile/${user._id}`}>
                        <p>{user.username}</p>
                    </Link>
                </div>
            )
        });
    };

    return (
        <Fragment>
            {renderUsers()}
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