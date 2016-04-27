var express = require('express');
var bodyParser = require('body-parser');

var auth = require('./auth');
var models = require('./models');
var views = require('./views');

var app = express();
var router = express.Router();

router.post('/signin', auth.login, views.getUserView);
router.post('/signup', views.insertUserView);
router.post('/user', auth.loginRequired, views.updateUserView);

router.get('/playlists', auth.loginRequired, views.getPlaylistsView);
router.get('/playlists/:id', auth.loginRequired, views.getPlaylistView);
router.post('/playlists', auth.loginRequired, views.insertPlaylistView);
router.post('/playlists/:id', auth.loginRequired, views.updatePlaylistView);
router.delete('/playlists/:id', auth.loginRequired, views.deletePlaylistView);

app.use(auth.corsMiddleware);
app.use(auth.passport.initialize());
app.use(bodyParser.json());

app.use(router);

app.use(function (req, res) {
  res.status(404).send({msg: 'Endereço não encontrado!'})
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({msg: 'Ocorreu um erro!'});
});

models.sequelize
  .sync()
  .then(function () {
    app.listen(3000, function () {
      console.log('Server listening on port 3000!');
    });
  })
  .catch(console.error.bind(console));
