const gamesRoutes = require('./games');
const trendingRoutes = require('./trending');
const reviewsRoutes = require('./reviews');
const profileRoutes = require('./profile');

const index = (app) => {

  app.use('/', gamesRoutes);
  app.use('/games', gamesRoutes);
  app.use('/trending', trendingRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/profile', profileRoutes);

  app.use('*', (request, response) => {
    response.status(404).json({ error: 'Not found' });
  });
};

module.exports = index;
