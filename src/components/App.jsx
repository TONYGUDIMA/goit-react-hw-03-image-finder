import React, { Component } from 'react';
import css from './App.module.css';
import Search from './Search/Search';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { BallTriangle } from 'react-loader-spinner';
import { PixabayService } from 'fetch';
export default class App extends Component {
  state = {
    currentPage: 1,
    data: [],
    q: '',
    isShowModal: false,
    isShowSpinner: false,
    loadMore: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.q === '') {
      return;
    }
    console.log('this.state', this.state);
    if (
      this.state.currentPage !== prevState.currentPage ||
      this.state.q !== prevState.q
    ) {
      this.setState({ isShowSpinner: true });
      const [hits, totalPages] = await PixabayService.get(
        this.state.currentPage,
        this.state.q
      );
      console.log('totalPages', totalPages);
      if (this.state.currentPage === totalPages) {
        this.setState({ loadMore: false });
      }
      this.setState(prevState => ({
        data: [...prevState.data, ...hits],
        isShowSpinner: false,
      }));
    }
  }
  handleSubmit = value => {
    const trimmedQ = value.trim();
    this.setState({ data: [], q: trimmedQ, currentPage: 1, loadMore: true });
  };

  onClick = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  };
  render() {
    return (
      <div className={css.app}>
        <Search onSubmit={this.handleSubmit} />
        <ImageGallery data={this.state.data} />
        {this.state.data.length > 0 && this.state.loadMore && (
          <Button onClick={this.onClick} />
        )}
        {this.state.isShowSpinner && (
          <BallTriangle
            wrapperStyle={{ position: 'fixed', top: '50vh', left: '50vw' }}
          />
        )}
      </div>
    );
  }
}
