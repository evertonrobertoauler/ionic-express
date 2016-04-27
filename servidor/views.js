var models = require('./models');
var auth = require('./auth');

function NotFound(message) {
  this.message = message;
}

function errorView(req, res) {
  return function (error) {
    if (error instanceof NotFound) {
      res.status(404).send({error: error.message});
    } else {
      console.error(error);
      res.status(400).send({error: error.errors || error.message || 'Bad request!'});
    }
  }
}

function getUserView(req, res) {
  res.send({token: auth.createJwt(req.user)});
}

function insertUserView(req, res) {
  models.Users
    .create(req.body, {fields: ['name', 'email', 'password']})
    .then(function (user) {
      res.send({token: auth.createJwt(user)});
    })
    .catch(errorView(req, res));
}

function updateUserView(req, res) {
  models.Users
    .update(req.body, {fields: ['name', 'password'], where: {id: req.user.id}})
    .then(function (user) {
      res.send({token: auth.createJwt(user)});
    })
    .catch(errorView(req, res));
}

function getPlaylistsView(req, res) {
  models.Playlists
    .findAll({where: {user: req.user.id}, attributes: ['id', 'title']})
    .then(function (playlists) {
      res.send(playlists || []);
    })
    .catch(errorView(req, res));
}

function getPlaylistView(req, res) {
  models.Playlists
    .findOne({where: {id: req.params.id, user: req.user.id}, attributes: ['id', 'title']})
    .then(function (playlist) {
      if (!playlist)
        throw new NotFound('Playlist not found!');
      else
        res.send(playlist);
    })
    .catch(errorView(req, res));
}

function insertPlaylistView(req, res) {
  models.Playlists
    .build({
      title: req.body.title,
      user: req.user.id
    })
    .save()
    .then(function (playlist) {
      res.send(playlist);
    })
    .catch(errorView(req, res));
}

function updatePlaylistView(req, res) {
  models.Playlists
    .findOne({where: {id: req.params.id, user: req.user.id}})
    .then(function (playlist) {
      if (!playlist)
        throw new NotFound('Playlist not found!');
      else
        return playlist.update(req.body, {fields: ['title']});
    })
    .then(function (playlist) {
      res.send(playlist);
    })
    .catch(errorView(req, res));
}

function deletePlaylistView(req, res) {
  models.Playlists
    .findOne({where: {id: req.params.id, user: req.user.id}})
    .then(function (playlist) {
      if (!playlist)
        throw new NotFound('Playlist not found!');
      else
        return playlist.destroy();
    })
    .then(function () {
      res.end();
    })
    .catch(errorView(req, res));
}

module.exports = {
  getUserView: getUserView,
  insertUserView: insertUserView,
  updateUserView: updateUserView,
  getPlaylistsView: getPlaylistsView,
  getPlaylistView: getPlaylistView,
  insertPlaylistView: insertPlaylistView,
  updatePlaylistView: updatePlaylistView,
  deletePlaylistView: deletePlaylistView,
};
