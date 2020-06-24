import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

const Posts = ({ posts, loading }) => {
    const [filterType, setFilterType] = useState();
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);

    useEffect(() => {
        setFilteredPosts(posts);
        setSortedPosts(posts);
    }, [posts])
    const onAdoption = () => {
        setFilterType('adopt');
    }

    const onTrending = () => {
        setFilterType('trending');
    }

    const onClear = () => {
        setFilterType('clear');
    }
    
    const renderFilter = () => {
        return (
            <MDBDropdown>
                <MDBDropdownToggle caret color="primary">
                    Filter
              </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    <MDBDropdownItem onClick={onClear}>Clear Filter</MDBDropdownItem>
                    <MDBDropdownItem onClick={onAdoption}>Adoption Posts</MDBDropdownItem>
                    <MDBDropdownItem onClick={onTrending}>Trending</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        );
    }

    const filterstuff = () => {
        let newPosts = sortedPosts.sort((a, b) => (a.likes.length > b.likes.length) ? -1 : ((b.likes.length > a.likes.length) ? 1 : 0));
        console.log(newPosts);
    }
    const renderPosts = () => {
        switch(filterType) {
            case 'adopt': 
                const adoptPosts = posts.filter((post) => post.postType.includes(filterType));
                return adoptPosts.map((post, i) => {
                    return (
                        <Fragment key={i+1}>
                            <h4>{post.content}</h4>
                        </Fragment>
                    )
                });
            case 'trending':
                filterstuff()
                // for (let i = 0; i < posts.length; i++) {
                //     for (let j = 0; j < posts.length; j++) {
                //         if (posts[j].likes.length > posts[i].likes.length) {
                //             setFilteredPosts(posts[j]);
                //         }
                //     }
                // }
                // return Object.values(filteredPosts).map((post, i) => {
                //     console.log(filteredPosts)
                //     return (
                //         <div key={i+1}>
                //             {post.content}
                //         </div>
                //     )
                // });
            case 'clear':
                return Object.values(posts).map((post, i) => {
                    return (
                        <div key={i+1}>
                            {post.content}
                        </div>
                    )
                })
            default:
                return Object.values(posts).map((post, i) => {
                    return (
                        <div key={i+1}>
                            {post.content}
                        </div>
                    )
                })
        }
    }

    return (
        <Fragment>
            <h1>Posts</h1>
            {renderFilter()}
            {renderPosts()}
        </Fragment>
    )
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default Posts;