import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';

const Hashtags = ({ posts, loading, fetchPostContent, followHashtag, auth, unfollowHashtag }) => {
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
        // set the most popular hashtags in the array
        let popularHashtags = [];
        for (let x = 0; x < copyHashArr.length; x++) {
            popularHashtags.push(copyHashArr[x].hashtag);
        }

        // variable to assign the count value for each hashtag found in array
        let countObj = {};
        // function that counts how many times an element is in an array
        let countFunc = (keys) => {
            countObj[keys] = ++countObj[keys] || 1;
        }
        popularHashtags.forEach(countFunc);
        setHashtagCount(countObj);

        // setting the hashtag strings to the component state
        for (let i = 0; i < copyHashArr.length; i++) {
            setHashtagArr((x) => [...x, copyHashArr[i].hashtag]);
        }

    }, [posts]);

    // function to check what hashtags the user is following and be able to 
    // render the follow and unfollow button accordingly
    const checkIfFollowing = (tag) => {
        if (!auth.loading && !isEmpty(auth.user) && !isEmpty(hashtagArr)) {
            let user = auth.user;
            if (user.followedHashtags.some((x) => x.hashtag === tag)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // render the top ten hashtags to follow upon opening the hashtag page
    const renderMostPopularHashtags = () => {
        if (hashtagCount) {
            let sortedArr = Object.keys(hashtagCount).sort((a, b) => { return hashtagCount[b] - hashtagCount[a] });
            //  only going to render the top 10 hashtags to follow and then the user can search for other available ones
            return sortedArr.slice(0, 10).map((tag) => {
                return (
                    <li>{tag} {!checkIfFollowing(tag) ? (<button onClick={() => {
                        followHashtag(tag)
                    }}>Follow</button>) : (<button onClick={() => {
                        unfollowHashtag(tag);
                    }}>Unfollow</button>)}</li>
                )
            });
        }
    }

    const renderSearchedHashtags = () => {
        if (hashtagArr) {
            // filtering out all duplicates in the array with new Set()
            let tags = new Set(hashtagArr);
            // using the spread operator to get only the data out of the "Set" array
            let arr = [...tags]

            const filteredHashtags = arr.filter((tag) => tag.includes(searchInput))
            if (isEmpty(searchInput)) {
                return null;
            }
            return filteredHashtags.map((tag, i) => {
                return (
                    <li>{tag} {!checkIfFollowing(tag) ? (<button onClick={() => {
                        followHashtag(tag)
                    }}>Follow</button>) : (<button onClick={() => {
                        unfollowHashtag(tag);
                    }}>Unfollow</button>)}</li>
                )
            });
        }
    }

    const renderSearchedPosts = () => {
        if (!isEmpty(hashtagPosts)) {
            let tempArr = [];

            // filtering through the posts according to the search input and pushing the correct projects to the array
            for (let obj in hashtagPosts) {
                let str = JSON.stringify(hashtagPosts[obj]);

                if (str.indexOf(searchInput) > 0) {
                    tempArr.push(hashtagPosts[obj]);
                }
            }

            if (isEmpty(searchInput)) {
                return null;
            }

            return tempArr.map((post, i) => {
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
    followHashtag: PropTypes.func.isRequired,
    unfollowHashtag: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
}

export default Hashtags;