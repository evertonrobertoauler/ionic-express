function corsMiddleware(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Origin, X-Requested-With, Content-Type, Accept,cache-control',
    'Access-Control-Allow-Methods': req.headers['access-control-request-method'] || 'GET,PUT,PATCH,POST,DELETE,OPTIONS'
  });

  req.method === 'OPTIONS' ? res.end() : next();
}

function getPlaylistsView(req, res) {
  res.send([
    {title: 'Reggae', id: 1},
    {title: 'Chill', id: 2},
    {title: 'Dubstep', id: 3},
    {title: 'Indie', id: 4},
    {title: 'Rap', id: 5},
    {title: 'Cowbell', id: 6}
  ]);
}

function getPlaylistView(req, res) {

}

function savePlaylistView(req, res) {

}

function deletePlaylistView(req, res) {

}

module.exports = {
  corsMiddleware: corsMiddleware,
  getPlaylistsView: getPlaylistsView,
  getPlaylistView: getPlaylistView,
  savePlaylistView: savePlaylistView,
  deletePlaylistView: deletePlaylistView,
};
