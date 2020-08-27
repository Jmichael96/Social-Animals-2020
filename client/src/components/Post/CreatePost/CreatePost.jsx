import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../store/actions/post';
import PropTypes from 'prop-types';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { setModal } from '../../../store/actions/modal';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../../utils/isEmpty';


const CreatePost = ({ createPost, setModal, history }) => {
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [imagePath, setImagePath] = useState(null);

    const [formError, setFormError] = useState('');
    const [fileError, setFileError] = useState('');
    // if there is an error for post type then change to true
    const [postTypeErr, setPostTypeErr] = useState(false);
    // if there is any error with the image file input
    const [borderFileErr, setBorderFileErr] = useState(false);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!imagePath && !postType) {
            setPostTypeErr(true);
            setBorderFileErr(true);
            setModal('You must select an image and a post type to submit a post');
            return;
        } else if (!imagePath) {
            setPostTypeErr(false);
            setBorderFileErr(true);
            setModal('You must select and image to submit a post');
            return;
        } else if (!postType) {
            setPostTypeErr(true);
            setBorderFileErr(false);
            setModal('You must select a post type to submit a post');
            return;
        } else if (postType === 'adopt' && isEmpty(animalType)) {

        }

        createPost({ content, imagePath, postType, animalType });
        history.push('/');
    }

    const onFileChange = (e) => {
        let files = e.target.files;

        if (maxSelectFile(e)) {
            setImagePath(files);
        }

    }

    const maxSelectFile = (e) => {
        let files = e.target.files
        if (files.length > 3) {
            setFileError('You may only have up to 3 images');
            e.target.value = null
            return false;
        }
        else {
            setFileError(null);
            return true;
        }

    }

    const renderAdoptionForms = () => {
        if (!isEmpty(postType) && postType === 'adopt') {
            return (
                <div>
                    <label htmlFor="animalType" className="grey-text">
                        Select the type of animal *
                    </label>
                    <select id="animalType"
                        name="animalType"
                        value={animalType}
                        onChange={(e) => setAnimalType(e.target.value)}
                        className="browser-default custom-select">
                        <option value="">Animal Type</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="fish">Fish</option>
                        <option value="bird">Bird</option>
                        <option value="horse">Horse</option>
                        <option value="hamster">Hamster</option>
                        <option value="turtle">Turtle</option>
                        <option value="guinea pig">Guinea pig</option>
                        <option value="ferret">Ferret</option>
                        <option value="pig">Pig</option>
                        <option value="mouse">Mouse</option>
                        <option value="gerbil">Gerbil</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                        <option value="horse">Horse</option>
                    </select>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <Wrapper>
                <form onSubmit={(e) => onSubmitForm(e)}>
                    <label htmlFor="file" className="grey-text">
                        Select an image {fileError ? <p style={{ color: 'red' }}>{fileError}</p> : null}
                    </label>
                    <input type="file" multiple className="form-control" name="file" id="profilePic" onChange={onFileChange}
                        style={{ border: !borderFileErr ? '1px solid black' : '1px solid red' }} />
                    <label htmlFor="content" className="grey-text">
                        Description
                    </label>
                    <textarea
                        type="text"
                        name="content"
                        id="content"
                        className="form-control"
                        value={content}
                        placeholder="Description"
                        rows="3"
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div>
                        <label htmlFor="postType" className="grey-text">
                            Where do you want this post displayed?
                        </label>
                        <select id="postType"
                            name="postType"
                            value={postType}
                            onChange={(e) => setPostType(e.target.value)}
                            className="browser-default custom-select"
                            style={{ border: !postTypeErr ? '1px solid black' : '1px solid red' }}
                        >
                            <option value="">Post Type</option>
                            <option value="adopt">Adopt a pet</option>
                            <option value="post">Post to feed</option>
                        </select>
                    </div>
                    {renderAdoptionForms()}
                    {formError ? <p style={{ color: 'red' }}>{formError}</p> : null}
                    <div className="text-center mt-4">
                        <button color="unique" type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </Wrapper>
        </Fragment>
    )

}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    history: PropTypes.any,
};

const exportCreatePost = withRouter(CreatePost);

export default connect(null, { createPost, setModal })(exportCreatePost);