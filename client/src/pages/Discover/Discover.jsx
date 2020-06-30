import React, { Fragment, useState } from 'react';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import { connect } from 'react-redux';
import { fetchUsernames } from '../../store/actions/user';
import PropTypes from 'prop-types';
import Usernames from '../../components/Discover/Usernames/Usernames';
import { fetchAllDiscoverPosts, fetchPostContent } from '../../store/actions/post';
import { followHashtag, unfollowHashtag } from '../../store/actions/user';
import { setPostModal } from '../../store/actions/postModal';
import Posts from '../../components/Discover/Posts/Posts';
import Hashtags from '../../components/Discover/Hashtags/Hashtags';

const Discover = ({ user, fetchUsernames, fetchAllDiscoverPosts, post, setPostModal, fetchPostContent, followHashtag, auth, unfollowHashtag }) => {
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
        fetchAllDiscoverPosts();
    }

    // setting the component to render based off what is selected
    const renderComponents = () => {   
        switch(search) {
            case 'users':
                return <Usernames 
                users={user.users} 
                loading={user.loading} />
            case 'posts':
                return <Posts 
                posts={post.allPosts} 
                loading={post.loading} 
                fetchPostContent={fetchPostContent} 
                setPostModal={setPostModal} />
            case 'hashtags':
                return <Hashtags 
                posts={post.allPosts} 
                loading={post.loading} 
                fetchPostContent={fetchPostContent} 
                setPostModal={setPostModal} 
                followHashtag={followHashtag}
                unfollowHashtag={unfollowHashtag} 
                auth={auth} />
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
    fetchPostContent: PropTypes.func.isRequired,
    setPostModal: PropTypes.func.isRequired,
    followHashtag: PropTypes.func.isRequired,
    unfollowHashtag: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { fetchUsernames, fetchAllDiscoverPosts, setPostModal, fetchPostContent, followHashtag, unfollowHashtag })(Discover);