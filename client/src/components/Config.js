//SERVER ROUTES
export const USER_SERVER =
  process.env.NODE_ENV === 'production'
    ? 'https://movie-app-mern.onrender.com' + '/api/user'
    : 'http://localhost:5000' + '/api/user';
export const FAVORITE_SERVER =
  process.env.NODE_ENV === 'production'
    ? 'https://movie-app-mern.onrender.com' + '/api/favorite'
    : 'http://localhost:5000' + '/api/favorite';
