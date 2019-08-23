import React, { Component } from "react";
// import Lightbox from "react-images";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ImageLightbox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.pos,
    images: this.props.images
  };

  //   static getDerivedStateFromProps(props, state) {
  //     if (props.images) {
  //       const images = [];
  //       props.images.forEach(element => {
  //         images.push({ src: `${element}` });
  //       });
  //       return (state = {
  //         images
  //       });
  //     }
  //     return false;
  //   }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  closeLightBox = () => {
    this.props.onclose();
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.lightboxIsOpen && (
          <Lightbox
            mainSrc={this.state.images[this.state.currentImage]}
            nextSrc={
              this.state.images[
                (this.state.currentImage + 1) % this.state.images.length
              ]
            }
            prevSrc={
              this.state.images[
                (this.state.currentImage + this.state.images.length + 1) %
                  this.state.images.length
              ]
            }
            onCloseRequest={() => this.closeLightBox()}
            onMovePrevRequest={() =>
              this.setState({
                currentImage:
                  (this.state.currentImage + this.state.images.length - 1) %
                  this.state.images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                currentImage:
                  (this.state.currentImage + 1) % this.state.images.length
              })
            }
          />
        )}
      </div>
    );
  }
}

export default ImageLightbox;
