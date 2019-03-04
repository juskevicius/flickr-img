import React, { Component, Fragment } from 'react';
import Header from './gallery/header';
import SortBtn from './gallery/sortBtn';
import Photos from './gallery/photos';
import Loader from './gallery/loader';

export default class Gallery extends Component {
  connection = new WebSocket(window.location.origin.replace(/^http/, 'ws'));

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isLoading: false,
      ascending: true,
      btnFixed: false,
    };
  }

  componentDidMount() {
    this.connection.onmessage = (payload) => {
      const data = JSON.parse(payload.data);
      this.setState((prevState) => {
        const newUniquePhotos = data.photo.filter((photo) => {
          for (let i = 0; i < prevState.photos.length; i++) {
            if (photo.id === prevState.photos[i].id) {
              return false;
            }
          }
          return true;
        });
        return ({
          photos: [...prevState.photos, ...newUniquePhotos],
          isLoading: false,
        });
      });
    };

    window.addEventListener('scroll', this.onScroll, false);

    this.interval = setInterval(() => {
      this.connection.send('ping');
    }, 25000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
    clearInterval(this.interval);
  }

  onScroll = () => {
    this.loadMorePhotos();
    this.fixSearchBtn();
  }

  loadMorePhotos = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if ((window.innerHeight + scrollTop)
      >= (document.documentElement.offsetHeight - 500) && !this.state.isLoading) {
      this.setState({
        isLoading: true,
      }, () => {
        this.connection.send({});
      });
    }
  }

  fixSearchBtn = () => {
    const headerBottom = document.querySelector('.header').offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (headerBottom <= scrollTop && !this.state.btnFixed) {
      this.setState({
        btnFixed: true,
      });
    }
    if (headerBottom > scrollTop && this.state.btnFixed) {
      this.setState({
        btnFixed: false,
      });
    }
  }

  sortPhotos = () => {
    this.setState((prevState) => {
      const sortedPhotos = prevState.photos.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return prevState.ascending ? -1 : 1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return prevState.ascending ? 1 : -1;
        }
        return 0;
      });
      return ({
        photos: [...sortedPhotos],
        ascending: !prevState.ascending,
      });
    });
  }

  render() {
    return (
      <Fragment>
        <Header />
        <SortBtn
          btnFixed={this.state.btnFixed}
          ascending={this.state.ascending}
          sortPhotos={this.sortPhotos} 
        />
        <Photos photos={this.state.photos} />
        {(this.state.photos.length === 0 || this.state.isLoading) && <Loader />}
      </Fragment>
    );
  }
}
