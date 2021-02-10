import React, { useEffect } from 'react';
import { FAVORITE_SERVER } from '../../../Config';
import axios from 'axios';

function Favorite(props) {
  const movieId = props.movieId;
  const user = props.user;
  const movieTitle = props.movie.title;
  const moviePost = props.movie.backdrop_path;
  const movieRunTime = props.movie.rundtime;

  useEffect(() => {
    let variables = {
      user,
      movieId,
    };

    axios
      .post(`${FAVORITE_SERVER}/favorite-number`, variables)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.favoriteNumber);
        } else {
          alert('Fail to get the favorite number');
        }
      });
  }, []);

  return (
    <div>
      <button>Favorite</button>
    </div>
  );
}

export default Favorite;
