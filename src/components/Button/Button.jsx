import React, { Component } from 'react';
import css from './Button.module.css';
export default class Button extends Component {
  handleClick = () => {
    this.props.onClick();
  };
  render() {
    return (
      <button type="button" className={css.button} onClick={this.handleClick}>
        Load More
      </button>
    );
  }
}
