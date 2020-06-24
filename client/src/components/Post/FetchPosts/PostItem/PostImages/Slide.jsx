import React from 'react';
import './postImages.css';
import isEmpty from '../../../../../utils/isEmpty';

class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 1,
            isShown: false
        };
    }

    componentDidMount() {
        window.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
    }

    onKeyUp = (e) => {
        if (e.keyCode) {
            if (e.keyCode === 39) {
                this.showNextSet();
            } else if (e.keyCode === 37) {
                this.showPrevSet();
            }
        }
    }

    onMouseEnter = () => {
        this.setState({ isShown: true });
    }

    onMouseLeave = () => {
        this.setState({ isShown: false });
    }

    showPrevSet = () => {
        const currentIndex = (this.state.currentIndex - 1 + this.props.images.length) % this.props.images.length;
        this.setState({ currentIndex });
    }

    showNextSet = () => {
        const currentIndex = (this.state.currentIndex + 1) 
        this.setState({ currentIndex });
    }

    onDeleteSubmit = (imageId) => {
        if (!this.props.authLoading && !isEmpty(this.props.user)) {
            if (this.props.user._id === this.props.authorId) {
                this.props.deleteImage(this.props.postId, imageId);
            }
        }
    }

    renderDeleteBtn = (imageId) => {
        if (!this.props.authLoading && !isEmpty(this.props.user)) {
            if (this.props.user._id === this.props.authorId) {
                return (
                    <div aria-hidden={!this.state.isShown} className="popup_delete">
                        <button onClick={() => {
                            this.onDeleteSubmit(imageId);
                        }} className="deleteIcon">X</button>
                    </div>
                )
            }
        }
    }

    renderIndicators = () => {
        return (
            <div className="indicators-wrapper">
                <ul className="indicators">
                    {Object.values(this.props.images).map((item, i) => {
                        return (
                            <li className={i + 1 === this.state.currentIndex ? "active-indicator" : ""}>
                                {i + 1}
                            </li>
                        )
                    })}
                </ul>
            </div>
          );
    }

    render() {
        const { images } = this.props;
        const { currentIndex, isShown } = this.state;

        return (
            <div className="carousel__wrapper">
                <div className="carousel__container" aria-expanded={isShown}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>
                    {images.map((img, index) => {
                        let className = 'carousel__image'
                        if (index + 1 === currentIndex) className += ' active';

                        return (
                            <div key={index+1}>
                                <img src={img.url} className={className} key={`img-${index+1}`} />
                                {this.renderIndicators()}
                            </div>
                        );
                    })}
                </div>
                <div className="carousel__controls">
                    <button className="carousel__button" disabled={currentIndex === 1} onClick={this.showPrevSet}><i className="fa fa-arrow-left"></i></button>
                    <button className="carousel__button" disabled={currentIndex >= images.length} onClick={this.showNextSet}><i className="fa fa-arrow-right"></i></button>
                </div>
            </div>
        );
    }
}

export default Carousel;