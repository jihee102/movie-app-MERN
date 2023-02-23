import React, { useEffect, useState } from 'react';
import './favorite.css';
import axios from 'axios';
import { FAVORITE_SERVER } from '../../Config';
import { Popover } from 'antd';

function FavoritePage() {
  const [Favorite, setFavorite] = useState([]);

  useEffect(() => {
    fetchFavorite();
  }, []);
  const IMG_URL = process.env.REACT_APP_IMG_URL;

  const fetchFavorite = () => {
    axios
      .post(`${FAVORITE_SERVER}/getFavoritedMovie`, {
        user: localStorage.getItem('userId'),
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.data);
          setFavorite(response.data.data);
        } else {
          alert('Fail to load favorite movies');
        }
      });
  };

  const removeFavorite = (movieId, user) => {
    axios
      .post(`${FAVORITE_SERVER}/removeFavorite`, { user, movieId })
      .then((response) => {
        if (response.data.success) {
          fetchFavorite();
        } else {
          alert('Fail to delete favorite movies');
        }
      });
  };

  const renderCards = Favorite.map((favorite, index) => {
    return (
      <tr key={index}>
        <Popover
          content={
            favorite.moviePost ? (
              <img src={`${IMG_URL}w500${favorite.moviePost}`} />
            ) : (
              'No image'
            )
          }
          title={`${favorite.movieTitle}`}
        >
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button
            onClick={() => removeFavorite(favorite.movieId, favorite.user)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className='favorite_list'>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Removie from favorites</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}
export default FavoritePage;
