var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./routes');

var app = express();
var router = express.Router();

router.get('/playlists', routes.getPlaylistsView);
router.get('/playlists/:id', routes.getPlaylistView);
router.post('/playlists', routes.savePlaylistView);
router.delete('/playlists/:id', routes.deletePlaylistView);

app.use(routes.corsMiddleware);
app.use(bodyParser.json());

app.use(router);

app.use(function (req, res) {
  res.status(404).send({msg: 'Endereço não encontrado!'})
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({msg: 'Ocorreu um erro!'});
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});
