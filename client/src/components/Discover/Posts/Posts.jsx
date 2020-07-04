import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';
import { 
    MDBDropdown, 
    MDBDropdownToggle, 
    MDBDropdownMenu, 
    MDBDropdownItem 
} from 'mdbreact';
import './posts.css';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const Posts = ({ posts, loading, fetchPostContent }) => {
    const [filterType, setFilterType] = useState();
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [adoptionPosts, setAdoptionPosts] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        // creating a copy of the posts array order posts from the most trending to least
        let trendingCopy = [];
        let adoptionCopy = [];
        if (posts) {
            trendingCopy.push(...posts);
            adoptionCopy.push(...posts);
        }

        let sortedTrending = trendingCopy.sort((a, b) => (a.likes.length > b.likes.length) ? -1 : ((b.likes.length > a.likes.length) ? 1 : 0));
        let sortedAdoption = adoptionCopy.filter((post) => post.postType.includes('adopt'));

        setTrendingPosts(sortedTrending);
        setAdoptionPosts(sortedAdoption);

    }, [posts]);

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
                    <MDBDropdownItem divider />
                    <MDBDropdownItem onClick={onAdoption}>Adoption Posts</MDBDropdownItem>
                    <MDBDropdownItem onClick={onTrending}>Trending</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        );
    }

    const renderLikeAmount = (likeArr) => {
        if (isEmpty(likeArr)) {
            return <p>0 Likes</p>
        }
        if (likeArr.length === 1) {
            return <p>1 Like</p>
        }
        else if (likeArr.length >= 2) {
            return <p>{likeArr.length}{' '}Likes</p>
        }
    }

    // render the comment length
    const renderCommentAmount = (commentArr) => {
        if (isEmpty(commentArr)) {
            return <p>0 Comments</p>
        }
        if (commentArr.length === 1) {
            return <p>1 Comment</p>
        }
        else if (commentArr.length >= 2) {
            return <p>{commentArr.length}{' '}Comments</p>
        }
    }

    const renderPosts = () => {
        switch (filterType) {
            case 'adopt':
                // const adoptPosts = posts.filter((post) => post.postType.includes(filterType));
                const animalTypePosts = adoptionPosts.filter((post) => post.animalType.includes(searchInput));
                // if there are no animal types that match the search input
                if (isEmpty(animalTypePosts)) {
                    return <h3>There are no animals of that type up for adoption</h3>
                }

                return animalTypePosts.map((post, i) => {
                    return (
                        <div key={`${i + 1}`} class="outer-card" onClick={() => {
                            fetchPostContent(post._id);
                        }}>
                            <div class="projectCard">
                                <div class="card__image-container">
                                    <img class="card__image img" src={`${post.imagePath[0].url}`} alt="" />
                                    <p className="discoverImgCount">{post.imagePath.length}</p>
                                </div>

                                <svg class="card__svg" viewBox="0 0 800 800">
                                    <path
                                        d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                                        stroke="transparent" fill="#000" />
                                    <path class="card__line"
                                        d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                                        stroke="#00B3E6" strokeWidth="3" fill="transparent" />
                                </svg>

                                <div class="card__content">
                                    <h3 class="card__title">{post.content.replace(/(.{24})..+/, "$1…")}</h3>
                                    <div className="discoverPostData">
                                        <p>{renderLikeAmount(post.likes)}</p>
                                        <p>{renderCommentAmount(post.comments)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                });
            case 'trending':
                return Object.values(trendingPosts).map((post, i) => {
                    return (
                        <div key={`${i + 1}`} class="outer-card" onClick={() => {
                            fetchPostContent(post._id);
                        }}>
                            <div class="projectCard">
                                <div class="card__image-container">
                                    <img class="card__image img" src={`${post.imagePath[0].url}`} alt="" />
                                    <p className="discoverImgCount">{post.imagePath.length}</p>
                                </div>

                                <svg class="card__svg" viewBox="0 0 800 800">
                                    <path
                                        d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                                        stroke="transparent" fill="#000" />
                                    <path class="card__line"
                                        d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                                        stroke="#00B3E6" strokeWidth="3" fill="transparent" />
                                </svg>

                                <div class="card__content">
                                    <h3 class="card__title">{post.content.replace(/(.{24})..+/, "$1…")}</h3>
                                    <div className="discoverPostData">
                                        <p>{renderLikeAmount(post.likes)}</p>
                                        <p>{renderCommentAmount(post.comments)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                });
            default:
                return Object.values(posts).map((post, i) => {
                    return (
                        <div key={`${i + 1}`} class="outer-card" onClick={() => {
                            fetchPostContent(post._id);
                        }}>
                            <div class="projectCard">
                                <div class="card__image-container">
                                    <img class="card__image img" src={`${post.imagePath[0].url}`} alt="" />
                                    <p className="discoverImgCount">{post.imagePath.length}</p>
                                </div>

                                <svg class="card__svg" viewBox="0 0 800 800">
                                    <path
                                        d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                                        stroke="transparent" fill="#000" />
                                    <path class="card__line"
                                        d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                                        stroke="#00B3E6" strokeWidth="3" fill="transparent" />
                                </svg>

                                <div class="card__content">
                                    <h3 class="card__title">{post.content.replace(/(.{24})..+/, "$1…")}</h3>
                                    <div className="discoverPostData">
                                        <p>{renderLikeAmount(post.likes)}</p>
                                        <p>{renderCommentAmount(post.comments)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
        }
    }

    const renderSearchInput = () => {
        // returning input if the user selects adoption posts
        if (filterType === 'adopt') {
            return <div>
                <select id="discoverSearch"
                    name="discoverSearch"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="browser-default custom-select">
                    <option value="">Select the animal type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="fish">Fish</option>
                    <option value="bird">Bird</option>
                    <option value="horse">Horse</option>
                </select>
            </div>
        }
        else {
            return null;
        }
    }
    
    return (
        <Fragment>
            <h1>Posts</h1>
            {renderFilter()}
            {renderSearchInput()}
            {renderPosts()}
        </Fragment>
    )
}

Posts.propTypes = {
    fetchPostContent: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default Posts;