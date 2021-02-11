import React, { useEffect, useState } from 'react';
import { FAVORITE_SERVER } from '../../../Config';
import axios from 'axios';

function Favorite(props) {
  const movieId = props.movieId;
  const user = props.user;
  const movieTitle = props.movie.title;
  const moviePost = props.movie.backdrop_path;
  const movieRunTime = props.movie.rundtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    let variables = {
      user,
      movieId,
    };

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
  };

  return (
    <div>
      <button onClick={toggleFavorite}>
        {Favorited ? 'Delete Favorite ' : 'Add Favorite '}
        {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
