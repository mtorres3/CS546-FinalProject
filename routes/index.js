const gamesRoutes = require('./games');

const index = (app) => {
  app.use('/', gamesRoutes);

  app.use('*', (request, response) => {
    response.status(404).json({ error: 'Not found' });
  });
};

module.exports = index;
