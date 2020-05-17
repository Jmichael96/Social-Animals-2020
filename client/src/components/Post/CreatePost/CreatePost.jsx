import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../store/actions/post';
import PropTypes from 'prop-types';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const CreatePost = ({ createPost }) => {
    const [content, setContent] = useState('');
    const [imagePath, setImagePath] = useState(null);
    const [isValid, setIsValid] = useState();
    const [fileError, setFileError] = useState('');

    const onSubmitForm = (e) => {
        e.preventDefault();
        const formData = {
            content: content,
            imagePath: imagePath
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

    const onFileChange = (e) => {
        setImagePath(e.target.files);
    }

    const maxSelectFile=(event)=> {
        let files = event.target.files // create file object
            if (files.length > 3) { 
               const msg = 'Only 3 images can be uploaded at a time'
               event.target.value = null // discard selected file
               console.log(msg)
              return false;
     
          }
        return true;
     }
    return (
        <Fragment>
            <Wrapper>
                <form onSubmit={(e) => onSubmitForm(e)}>
                    <label htmlFor="file" className="grey-text">
                        Select an image
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