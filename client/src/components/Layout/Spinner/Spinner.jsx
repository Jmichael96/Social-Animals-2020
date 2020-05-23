import React, { Fragment } from 'react';
import SpinningGif from '../../../assets/images/loader.gif';
import Wrapper from '../Wrapper/Wrapper';

const Spinner = ({ }) => {
    return (
        <Wrapper>
            <img src={SpinningGif} alt="spinner" />
        </Wrapper>
    )
}

export default Spinner;