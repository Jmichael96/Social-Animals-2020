import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../../Layout/Wrapper/Wrapper';
import isEmpty from '../../../../utils/isEmpty';

import './likePost.css';

const LikePost = ({ likePost, unlikePost, postId, likeArr, user, authorId, notifyUser, postContent }) => {
    // for the hoverable dropdown
    const [isShown, setIsShown] = useState(false);
    // checking to see if authenticated user has liked this post. if they have change the color of the like button
    const [hasLiked, setHasLiked] = useState(false);
    // setting what the type of like is by the current user
    const [likeType, setLikeType] = useState();

    useEffect(() => {
        if (!isEmpty(likeArr) && !isEmpty(user)) {
            let userId = user._id;
            for (let i = 0; i < likeArr.length; i++) {
                if (likeArr[i].userId === userId) {
                    setHasLiked(true);
                    setLikeType(likeArr[i].type);
                    return;
                }
            }
        }
    }, [isEmpty, likeArr, user]);
    const onClickBtn = () => {
        setIsShown(!isShown);
    }

    const onMouseEnter = () => {
        if (!hasLiked) {
            setIsShown(true);
        }
    }

    const onMouseLeave = () => {
        setIsShown(false);
    }

    const onActionSubmit = (type) => {
        if (!isEmpty(user)) {
            if (!isEmpty(likeArr)) {
                for (let i = 0; i < likeArr.length; i++) {
                    if (likeArr[i].userId === user._id) {
                        unlikePost(postId);
                        setHasLiked(false);
                        setLikeType();
                        return;
                    }
                }
            }
            likePost(postId, type);
            setHasLiked(true);
            let notifyObj = {
                notifiedUser: authorId,
                userId: user._id,
                username: user.username,
                notificationType: `reacted to your post "${postContent}".`,
                profilePic: user.profilePicture,
                link: `/my_profile`,
                type: 'nots'
            };
            notifyUser(notifyObj);
        }
    }

    const renderTypeBtn = () => {
        switch (likeType) {
            case 'like':
                return <a>Liked</a>;
            case 'love':
                return <a>Loved</a>;
            case 'sad':
                return <a>Sad</a>;
            case 'puke':
                return <a>Puked</a>;
            default:
                return <a>Like</a>;
        }
    }

    return (
        <Fragment>
            <div
                className="PopupMenu"
                aria-expanded={isShown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <button
                    type="button"
                    aria-haspopup="true"
                    className="PopupMenu__Button"
                    style={{ backgroundColor: !hasLiked ? 'white' : 'red' }}
                    onClick={() => {
                        onClickBtn()
                        onActionSubmit('like');
                    }}
                >
                    {renderTypeBtn()}
                </button>
                <div
                    className="PopupMenu__Menu -over"
                    aria-hidden={!isShown}
                >
                    <Wrapper>
                        <button onClick={() => {
                            onActionSubmit('like');
                            onClickBtn();
                        }} className="reactionBtn">Like</button>
                        <button onClick={() => {
                            onActionSubmit('love');
                            onClickBtn();
                        }} className="reactionBtn">Love</button>
                        <button onClick={() => {
                            onActionSubmit('sad');
                            onClickBtn();
                        }} className="reactionBtn">Sad</button>
                        <button onClick={() => {
                            onActionSubmit('puke');
                            onClickBtn();
                        }} className="reactionBtn">Puke</button>
                    </Wrapper>
                </div>
            </div>
        </Fragment>
    )
}

LikePost.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    notifyUser: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    likeArr: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    authorId: PropTypes.string.isRequired,
    postContent: PropTypes.string.isRequired,
}

export default LikePost;