import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../store/actions/post';
import PropTypes from 'prop-types';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { setModal } from '../../../store/actions/modal';
import { withRouter } from 'react-router-dom';

const CreatePost = ({ createPost, setModal, history }) => {
    const [content, setContent] = useState('');
    const [imagePath, setImagePath] = useState(null);
    const [formError, setFormError] = useState('');
    const [fileError, setFileError] = useState('');

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!imagePath) {
            setModal('You must select an image to submit a post');
            return;
        }

        createPost({ content, imagePath });
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

    return (
        <Fragment>
            <Wrapper>
                <form onSubmit={(e) => onSubmitForm(e)}>
                    <label htmlFor="file" className="grey-text">
                        Select an image {fileError ? <p style={{ color: 'red' }}>{fileError}</p> : null}
                    </label>
                    <input type="file" multiple className="form-control" name="file" id="profilePic" onChange={onFileChange} />
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