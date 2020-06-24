import React, { Fragment, useState } from 'react';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import { connect } from 'react-redux';
import { fetchUsernames } from '../../store/actions/user';
import PropTypes from 'prop-types';
import Usernames from '../../components/Discover/Usernames/Usernames';
import { fetchAllDiscoverPosts } from '../../store/actions/post';
import Posts from '../../components/Discover/Posts/Posts';

const Discover = ({ user, fetchUsernames, fetchAllDiscoverPosts, post }) => {
    const [search, setSearch] = useState();

    const onUsernames = () => {
        setSearch('users');
        fetchUsernames();
    }

    const onPosts = () => {
        setSearch('posts');
        fetchAllDiscoverPosts();
    }

    const onHashtags = () => {
        setSearch('hashtags');
    }

    // setting the component to render based off what is selected
    const renderComponents = () => {   
        switch(search) {
            case 'users':
                return <Usernames users={user.users} loading={user.loading} />
            case 'posts':
                return <Posts posts={post.allPosts} loading={post.loading} />
            case 'hashtags':
                return <h1>hashtags</h1>
            default: 
                return;
        }
    }


    return (
        <Fragment>
            <h1>Discover page</h1>
            <Wrapper>
                <button onClick={onUsernames}>Usernames</button>
                <button onClick={onPosts}>Posts</button>
                <button onClick={onHashtags}>hashtags</button>
            </Wrapper>
            {renderComponents()}
        </Fragment>
    )
}

Discover.propTypes = {
    fetchUsernames: PropTypes.func.isRequired,
    fetchAllDiscoverPosts: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    post: state.post
});

export default connect(mapStateToProps, { fetchUsernames, fetchAllDiscoverPosts })(Discover);