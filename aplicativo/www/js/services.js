angular

  .module('starter.services', [])

  .service('ieAuth', function ieAuth($q, $localStorage) {

    var vm = this;
    var callbacks = [];
    var pendingRequests = [];

    vm.getAuthToken = getAuthToken;
    vm.onLogout = onLogout;
    vm.addPendingRequests = addPendingRequests;
    vm.saveAuth = saveAuth;
    vm.eraseAuth = eraseAuth;

    function getAuthToken() {
      return $localStorage.auth && $localStorage.auth.token;
    }

    function onLogout(callback) {
      callbacks.push(callback);
    }

    function addPendingRequests(config) {
      var deferred = $q.defer();
      pendingRequests.push({config: config, deferred: deferred});
      return deferred.promise;
    }

    function saveAuth(auth) {
      $localStorage.auth = auth;
    }

    function eraseAuth() {
      delete $localStorage.auth;
      callbacks.forEach(function (cb) {
        cb();
      });
    }

  })

  .service('ieHttpInterceptor', function ieHttpInterceptor($q, API_URL, ieAuth) {

    var vm = this;

    vm.request = request;
    vm.responseError = responseError;

    function request(config) {
      var token = ieAuth.getAuthToken();

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      } else if (config.url.indexOf(API_URL) === 0 && !/\/(signin|signup)$/.test(config.url)) {
        return ieAuth.addPendingRequests(config);
      }

      return config;
    }

    function responseError(rejection, config) {
      console.log(rejection, config);

      if (rejection.status === 401) {
        ieAuth.eraseAuth();
        return ieAuth.addPendingRequests(rejection.config);
      }

      return $q.reject(rejection);
    }

  })

  .service('ieUserService', function ieUserService($http, API_URL) {

    var vm = this;

    vm.signin = signin;
    vm.signup = signup;

    function signin(data) {
      return $http
        .post(API_URL + '/signin', data)
        .then(function (res) {
          return res.data;
        });
    }

    function signup(data) {
      return $http
        .post(API_URL + '/signup', data)
        .then(function (res) {
          return res.data;
        });
    }

  })

  .service('iePlaylistsService', function ieUserService($http, API_URL) {

    var vm = this;

    vm.getPlaylists = getPlaylists;
    vm.getPlaylist = getPlaylist;
    vm.insertPlaylist = insertPlaylist;
    vm.updatePlaylist = updatePlaylist;
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

    function insertPlaylist(playlist) {
      return $http
        .post(API_URL + '/playlists', playlist)
        .then(function (res) {
          return res.data;
        });
    }

    function updatePlaylist(id, playlist) {
      return $http
        .post(API_URL + '/playlists/' + id, playlist)
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
