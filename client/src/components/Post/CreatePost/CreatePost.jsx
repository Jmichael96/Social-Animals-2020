import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../store/actions/post';
import PropTypes from 'prop-types';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const CreatePost = ({ createPost }) => {
    const [content, setContent] = useState('');
    const [imagePath, setImagePath] = useState(null);
    const [isValid, setIsValid] = useState();

    const onSubmitForm = (e) => {
        e.preventDefault();
        const formData = {
            content: content,
            imagePath: imagePath
        }
        validateForm(formData.imagePath);
        if (isValid) {
            createPost(formData);
            console.log(formData);
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

    const onFileChange = (e) => {
        console.log(e.target.files)
        setImagePath(e.target.files[0]);
    }

    return (
        <Fragment>
            <Wrapper>
                <form onSubmit={(e) => onSubmitForm(e)}>
                    <label htmlFor="file" className="grey-text">
                        Select an image
                    </label>
                    <input type="file" className="form-control" name="file" id="profilePic" multiple onChange={onFileChange} />
                    <label htmlFor="content" className="grey-text">
                        Description
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
                    {/* <label htmlFor="imagePath" className="grey-text">
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
                    /> */}
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