import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../store/actions/post';
import PropTypes from 'prop-types';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const CreatePost = ({ createPost }) => {
    const [content, setContent] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [isValid, setIsValid] = useState();

    const onSubmitForm = (e) => {
        e.preventDefault();
        const formData = {
            content,
            imagePath
        }
        validateForm(formData.imagePath);
        if (isValid) {
            createPost(formData);
        }
    }
    const validateForm = (imagePath) => {
        if (!imagePath) {
            setIsValid(false)
            return;
        }
        setIsValid(true);
        return 'Everything is good';
    }

    return (
        <Fragment>
            <Wrapper>
                <form onSubmit={(e) => onSubmitForm(e)}>
                    <label htmlFor="content" className="grey-text">
                        Post Description
                    </label>
                    <input
                        type="text"
                        name="content"
                        id="content"
                        className="form-control"
                        value={content}
                        placeholder="Description"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <label htmlFor="imagePath" className="grey-text">
                        Image 
                    </label>
                    <input
                        type="text"
                        name="imagePath"
                        id="imagePath"
                        className="form-control"
                        value={imagePath}
                        placeholder="Description"
                        onChange={(e) => setImagePath(e.target.value)}
                    />
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
};

export default connect(null, { createPost })(CreatePost);