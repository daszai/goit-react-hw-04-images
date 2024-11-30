import axios from 'axios';
import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import uniqid from 'uniqid';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    maxPage: 0,
    btnclick: false,
    isLoad: false,
    isClick: false,
    renderImage: null,
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.serach !== this.props.serach) {
      this.setState({ isLoad: true });

      const response = await axios
        .get(
          `https://pixabay.com/api/?q=${this.props.serach}&page=1&key=45960838-6aa652e2d176ee6c6d86f24d6&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

      this.setState({ isLoad: false });

      this.setState({
        gallery: response.hits,
        maxPage: response.total,
        page: 1,
      });
      return;
    }
    if (this.state.btnclick === true) {
      this.setState({ isLoad: true });
      this.setState({ btnclick: false });
      const response = await axios
        .get(
          `https://pixabay.com/api/?q=${this.props.serach}&page=${this.state.page}&key=45960838-6aa652e2d176ee6c6d86f24d6&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      this.setState({ isLoad: false });
      const temp = this.state.gallery.concat(response.hits);
      this.setState({
        gallery: temp,
      });
    }
  }
  clickButton() {
    this.setState({ btnclick: true });
    const temp = this.state.page + 1;
    this.setState({ page: temp });
  }
  klick(e) {
    this.setState({ renderImage: e.target.attributes[3] });
    this.setState({ isClick: true });
  }
  closeModal(e) {
    if (e.target.localName !== 'img') {
      this.setState({ isClick: false });
    }
  }

  closeK = e => {
    if ('Escape' === e.key) {
      this.setState({ isClick: false });
    }
  };

  render() {
    return (
      <>
        <ul className="imageGallery">
          {this.props.serach &&
            this.state.gallery.map(e => (
              <ImageGalleryItem
                data={e}
                key={uniqid()}
                klick={this.klick.bind(this)}
              />
            ))}
        </ul>
        <Loader isLoad={this.state.isLoad} />

        {this.state.isClick && (
          <Modal
            renderImage={this.state.renderImage}
            close={this.closeModal.bind(this)}
            closeKey={this.closeK}
          />
        )}

        {this.state.page * 12 < this.state.maxPage && (
          <Button click={this.clickButton.bind(this)} />
        )}
      </>
    );
  }
}

export default ImageGallery;
