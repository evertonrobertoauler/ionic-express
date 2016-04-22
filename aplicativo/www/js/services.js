angular

  .module('starter.services', [])

  .service('PlaylistsServices', function (API_URL, $http) {

    var vm = this;

    vm.getPlaylists = getPlaylists;
    vm.getPlaylist = getPlaylist;
    vm.savePlaylist = savePlaylist;
    vm.deletePlaylist = deletePlaylist;

    function getPlaylists() {
      return $http
        .get(API_URL + '/playlists')
        .then(function (res) {
          return res.data;
        });
    }

    function getPlaylist(id) {
      return $http
        .get(API_URL + '/playlists/' + id)
        .then(function (res) {
          return res.data;
        });
    }

    function savePlaylist(playlist) {
      return $http
        .post(API_URL + '/playlists', playlist)
        .then(function (res) {
          return res.data;
        });
    }

    function deletePlaylist(id) {
      return $http
        .delete(API_URL + '/playlists/' + id)
        .then(function (res) {
          return res.data;
        });
    }
  });
