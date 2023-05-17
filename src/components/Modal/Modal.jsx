import React, { Component } from 'react';
import css from './Modal.module.css';
export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPressed.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPressed.bind(this));
  }
  handleClose = e => {
    if (e.target.className === css.overlay) {
      this.props.handleClose();
    }
  };
  onKeyPressed(event) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.props.handleClose();
    }
  }
  render() {
    return (
      <div
        className={css.overlay}
        onClick={this.handleClose}
        onKeyDown={this.onKeyPress}
      >
        <div className={css.modal}>
          <img src={this.props.src} alt="" width="800" height="600" />
        </div>
      </div>
    );
  }
}
