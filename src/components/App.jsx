import React, { Component } from 'react';
import css from './App.module.css';
import Search from './Search/Search';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { BallTriangle } from 'react-loader-spinner';
export default class App extends Component {
  state = {
    currentPage: 1,
    data: [],
    q: '',
    isShowModal: false,
    isShowSpinner: false,
  };

  handleSubmit = async value => {
    this.setState({ isShowSpinner: true });
    this.setState({
      currentPage: 1,
      data: [],
      q: value,
    });
    console.log('value', value);
    const trimmedQ = value.trim();
    if (trimmedQ === '') {
      return;
    }
    let response;
    try {
      response = await axios.get(
        `https://pixabay.com/api/?key=34995094-3137eae5ca5d9e0be5780a27e&image_type=photo&orientation=horizontal&per_page=12&q=${trimmedQ}&page=${this.state.currentPage}`
      );
    } catch (error) {
      return console.log(error);
    }
    const hits = response.data.hits;
    this.setState({ data: [...hits] });
    this.setState({ isShowSpinner: false });
  };

  onClick = async () => {
    this.setState({ isShowSpinner: true });
    const nextPage = this.state.currentPage + 1;
    const { q } = this.state;
    console.log('this.state.isShowSpinner', this.state.isShowSpinner);
    const trimmedQ = q.trim();
    let response;
    try {
      response = await axios.get(
        `https://pixabay.com/api/?key=34995094-3137eae5ca5d9e0be5780a27e&image_type=photo&orientation=horizontal&per_page=12&q=${trimmedQ}&page=${nextPage}`
      );
      this.setState({ isShowSpinner: false });
    } catch (error) {
      return console.log('error', error);
    }
    const hits = response.data.hits;

    this.setState(prevState => ({
      data: [...prevState.data, ...hits],
      currentPage: nextPage,
      isShowSpinner: false,
    }));
  };
  render() {
    return (
      <div className={css.app}>
        <Search onSubmit={this.handleSubmit} />
        <ImageGallery data={this.state.data} />
        {this.state.data.length > 0 && <Button onClick={this.onClick} />}
        {this.state.isShowSpinner && (
          <BallTriangle
            wrapperStyle={{ position: 'fixed', top: '50vh', left: '50vw' }}
          />
        )}
      </div>
    );
  }
}
