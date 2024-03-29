import React, { useEffect, useState } from 'react';
import MainImage from '../common/MainImage';
import MovieInfo from './section/MovieInfo';
import { Row } from 'antd';
import GridCard from '../common/GridCard';
import Favorite from './section/Favorite';

function MovieDetailPage(props) {
  // get movie id from the url
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Crews, setCrews] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const IMG_URL = process.env.REACT_APP_IMG_URL;
  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      });

    fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setCrews(data.cast);
      });
  }, []);

  const getCrewPic = () => {
    setActorToggle(!ActorToggle);
  };
  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMG_URL}w1280/${Movie.backdrop_path && Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body */}
      <div className='movie_detail_box'>
        <div className='favorite_box'>
          <Favorite
            movie={Movie}
            movieId={movieId}
            user={localStorage.getItem('userId')}
          />
        </div>

        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        <br />
        {/* Actors Grid */}

        <div className='actor_info_box'>
          <button onClick={getCrewPic}>Toggle Actor View</button>
        </div>
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Crews &&
              Crews.map((crew, index) => (
                <React.Fragment key={index}>
                  <GridCard
                    image={
                      crew.profile_path && `${IMG_URL}w500/${crew.profile_path}`
                    }
                    characterName={crew.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;
