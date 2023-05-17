import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
export default class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };
  handleOpen = () => {
    this.setState({ isShowModal: true });
  };
  handleClose = () => {
    this.setState({ isShowModal: false });
  };
  render() {
    return (
      <>
        <li className={css.imageGalleryItem} onClick={this.handleOpen}>
          <img
            src={this.props.src}
            alt=""
            className={css.imageGalleryItemImage}
          />
        </li>
        {this.state.isShowModal && (
          <Modal src={this.props.source} handleClose={this.handleClose} />
        )}
      </>
    );
  }
}
