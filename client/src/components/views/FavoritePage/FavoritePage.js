import React, { useEffect, useState } from 'react';
import './favorite.css';
import axios from 'axios';
import { FAVORITE_SERVER } from '../../Config';

function FavoritePage() {
  const [Favorite, setFavorite] = useState([]);

  useEffect(() => {
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
  }, []);

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
        <tbody>
          {Favorite.map((favorite, index) => (
            <tr key={index}>
              <td>{favorite.movieTitle}</td>
              <td>{favorite.movieRunTime} mins</td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
