import React, { useEffect, useState } from 'react';
import { FAVORITE_SERVER } from '../../../Config';
import axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
  const movieId = props.movieId;
  const user = props.user;
  const movieTitle = props.movie.title;
  const moviePost = props.movie.backdrop_path;
  const movieRunTime = props.movie.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    user,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };
  useEffect(() => {
    axios
      .post(`${FAVORITE_SERVER}/favorite-number`, variables)
      .then((response) => {
        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert('Fail to get the favorite number');
        }
      });

    axios.post(`${FAVORITE_SERVER}/favorited`, variables).then((response) => {
      setFavorited(response.data.favorited);
      if (!response.data.success) {
        alert('Fail to load favoried information');
      }
    });
  }, []);

  const toggleFavorite = () => {
    setFavorited(!Favorited);
    if (Favorited) {
      axios
        .post(`${FAVORITE_SERVER}/removeFavorite`, variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
          } else {
            alert('Favorite removal failed');
          }
        });
    } else {
      axios
        .post(`${FAVORITE_SERVER}/addFavorite`, variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
          } else {
            alert('Favorite adding failed');
          }
        });
    }
  };

  return (
    <div>
      <Button onClick={toggleFavorite}>
        {Favorited ? 'Delete Favorite ' : 'Add Favorite '}
        {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
