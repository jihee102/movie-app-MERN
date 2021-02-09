import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { API_URL, API_KEY, IMG_URL } from '../../Config';
import { Typography, Row } from 'antd';
import MainImage from '../common/MainImage';
import GridCard from '../common/GridCard';

const { Title } = Typography;

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    fetchMovies(1);
  }, []);

  const fetchMovies = (path) => {
    fetch(
      `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${path}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
      });
  };

  const handleClick = () => {
    fetchMovies(CurrentPage + 1);
  };
  return (
    <div className='landingMain'>
      {Movies[0] && (
        <MainImage
          image={`${IMG_URL}w1280/${
            Movies[0].backdrop_path && Movies[0].backdrop_path
          }`}
          title={Movies[0].original_title}
          text={Movies[0].overview}
        />
      )}

      <div className='landing__body'>
        <Title level={2}>Movies by latest</Title>
        <hr />

        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  landingPage
                  image={
                    movie.poster_path && `${IMG_URL}w500/${movie.poster_path}`
                  }
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>

        <br />
        <div className='Landing__btnBox'>
          <button onClick={handleClick}> Load More</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
