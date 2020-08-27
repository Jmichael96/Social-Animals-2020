import React from 'react';
import './postImages.css';
import isEmpty from '../../../../../utils/isEmpty';

class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 1,
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

    showPrevSet = () => {
        const currentIndex = (this.state.currentIndex - 1 + this.props.images.length) % this.props.images.length;
        this.setState({ currentIndex });
    }

    showNextSet = () => {
        const currentIndex = (this.state.currentIndex + 1) 
        this.setState({ currentIndex });
    }

    // for when clicking an indicator view the image thats equal to the index clicked
    onIndicatorClick = (e) => {
        this.setState({
            currentIndex: parseInt(e.target.textContent)
        })
    }

    renderIndicators = () => {
        return (
            <div className="indicatorWrapper">
                <ul className="indicators">
                    {Object.values(this.props.images).map((item, i) => {
                        return (
                            <li key={i+1} onClick={this.onIndicatorClick} className={i + 1 === this.state.currentIndex ? "active-indicator" : ""}>
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
        const { currentIndex } = this.state;

        return (
            <div className="carousel__wrapper">
                <div className="carousel__container">
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