import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';

const Hashtags = ({ posts, loading, fetchPostContent }) => {
    const [hashtagPosts, setHashtagPosts] = useState([]);
    const [hashtagArr, setHashtagArr] = useState([]);
    const [hashtagCount, setHashtagCount] = useState({});
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        let copyHashArr = [];
        let postsCopy = [];

        if (!isEmpty(posts)) {
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].hashtags.length >= 1) {
                    copyHashArr.push(...posts[i].hashtags)
                }
            }
            // assign the posts to the postsCopy variable
            postsCopy.push(...posts);
            // set the hashtagPosts with the copied posts array
            setHashtagPosts(postsCopy);
        }

        // removing duplicate hashtag values in array and setting the value with the useState method
        let trimmedArr = new Set(copyHashArr);
        let cleanedArr = [...trimmedArr];
        setHashtagArr(cleanedArr);

        // variable to assign the count value for each hashtag found in array
        let countObj = {};

        // function that counts how many times an element is in an array
        let countFunc = (keys) => {
            countObj[keys] = ++countObj[keys] || 1;
        }
        copyHashArr.forEach(countFunc);
        setHashtagCount(countObj);

    }, [posts]);

    const renderMostPopularHashtags = () => {
        if (hashtagCount) {
            let sortedArr = Object.keys(hashtagCount).sort((a, b) => { return hashtagCount[b] - hashtagCount[a] });
            //  only going to render the top 10 hashtags to follow and then the user can search for other available ones
            return sortedArr.slice(0, 10).map((tag) => {
                return (<li>{tag}</li>)
            })
        }
    }

    const renderSearchedHashtags = () => {
        if (hashtagArr) {
            const filteredHashtags = hashtagArr.filter((tag) => tag.includes(searchInput))
            if (isEmpty(searchInput)) {
                return null;
            }
            return filteredHashtags.map((item, i) => {
                return (
                    <div key={i + 1}>
                        {item}
                    </div>
                )
            })
        }
    }

    const renderSearchedPosts = () => {
        if (!isEmpty(hashtagPosts)) {
            const filteredPosts = hashtagPosts.filter((tag) => tag.hashtags.includes(searchInput));
            if (isEmpty(searchInput)) {
                return null;
            }
            console.log(hashtagPosts, filteredPosts)
            return filteredPosts.map((post, i) => {
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
    return (
        <Fragment>
            
            <ul>
                <li>Top 10 hashtags to follow right now</li>
                {renderMostPopularHashtags()}
            </ul>
            <input type="text" value={searchInput} placeholder="Start searching for a hashtag" onChange={(e) => setSearchInput(e.target.value)} />
            {renderSearchedHashtags()}
            {renderSearchedPosts()}
        </Fragment>
    )
}

Hashtags.propTypes = {
    fetchPostContent: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default Hashtags;