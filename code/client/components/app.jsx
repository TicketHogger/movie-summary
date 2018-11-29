import React from 'react';
import axios from 'axios';
import ip from 'public-ip';
import '../styles/App.css';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import Photo from './Photo';
import Synopsis from './Synopsis';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      summary: {
        movie_id: 0,
        title: 'wedding crashers',
        genre: 'comedy',
        duration: '',
        mainphoto: '',
        releasedate: 'June 20th, 2000',
        photos: [],
        synopsis: '',
      },
      index: 0,
      translateValue: 0,
      photoWidth: 100,
      mainPhotoClass: 'main-photo',
    };
    this.nextPhoto = this.nextPhoto.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  componentDidMount() {
    ip.v4().then((ipV4) => {
      console.log(ipV4);
      const id = Math.floor(Math.random() * 10000000);
      axios.get(`http://${ipV4}:3007/api/movies/${id}/summary`)
        .then((response) => {
          const { data } = response;
          this.setState({
            summary: data[0],
          });
        })
        .catch(() => { this.setState({ summary: { title: 'ERROR: COULD NOT RETRIEVE DATA' } }); });
    });
  }

  nextPhoto() {
    const { index } = this.state;
    const { summary } = this.state;
    const { photoWidth } = this.state;
    if (summary.photos.length < 4) {
      return;
    }
    if (index !== summary.photos.length - 3) {
      this.setState(prevState => ({
        index: prevState.index + 1,
        translateValue: prevState.translateValue - photoWidth,
      }));
    }
  }

  prevPhoto() {
    const { index } = this.state;
    const { photoWidth } = this.state;
    if (index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
        translateValue: prevState.translateValue + photoWidth,
      }));
    }
  }

  handleMouseEnter() {
    this.setState({ mainPhotoClass: 'mouseEnter' });
  }

  handleMouseLeave() {
    this.setState({ mainPhotoClass: 'main-photo' });
  }

  render() {
    const { summary } = this.state;
    console.log(summary);
    const titleAndYear = `${summary.title.toUpperCase()} (${summary.releasedate.slice(-5, -1)})`;
    const { translateValue } = this.state;
    const { mainPhotoClass } = this.state;

    return (
      <div>
        <div className="title-box">
          <h2 className="title">{titleAndYear}</h2>
        </div>

        <div className="movie-box">
          <div className="main-photo-box"><img className={mainPhotoClass} alt="movie poster" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} src={summary.mainphoto} /></div>
          <div className="movie-details">
            <h2 className="release-date">{summary.releaseDate}</h2>
            <div className="rating-duration">
              {summary.rating}
              {', '}
              {summary.duration}
            </div>
            <div className="genre">{summary.genre}</div>
            <h2 className="score">
              <span role="img" aria-label="milk">🥛</span>
              {summary.score}
              %
            </h2>
          </div>
        </div>

        <Synopsis synopsis={summary.synopsis} title={titleAndYear} />

        <div className="carousel">
          <div className="left-arrow">
            <LeftArrow prevPhoto={this.prevPhoto} />
          </div>
          <div className="photos-container">
            <div
              className="photos"
              style={{
                transform: `translateX(${translateValue}px)`,
                transition: 'transform ease-out 0.45s',
              }}
            >
              {summary.photos.map((ele, index) => <Photo photo={ele} key={index} />)}
            </div>
          </div>
          <div className="right-arrow">
            <RightArrow nextPhoto={this.nextPhoto} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
