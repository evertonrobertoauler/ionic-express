angular

  .module('starter.components', [])

  .component('ieApp', {
    templateUrl: 'templates/menu.html',
    controller: function ($scope, $ionicModal, ieAuth) {

      var $ctrl = this;

      $ctrl.logout = logout;

      $scope.$on('$ionicView.enter', checkAuth);
      ieAuth.onLogout(checkAuth);

      function checkAuth() {
        if (!ieAuth.getAuthToken()) {

          $ctrl.modal = $ionicModal.fromTemplate('<ie-login modal="$ctrl.modal"></ie-login>', {
            scope: $scope,
            backdropClickToClose: false,
            hardwareBackButtonClose: false
          });

          $ctrl.modal.show();
        }
      }

      function logout() {
        ieAuth.eraseAuth();
      }
    }
  })

  .component('ieLogin', {
    templateUrl: 'templates/login.html',
    bindings: {
      modal: '<'
    },
    controller: function (ieUserService) {

      var $ctrl = this;

      $ctrl.signin = true;
      $ctrl.user = {
        name: 'Éverton R. Auler',
        email: 'evertonrobertoauler@gmail.com',
        password: '12345678'
      };

      $ctrl.submit = submit;

      function submit() {

        var promise;

        if ($ctrl.signin) {
          promise = ieUserService.signin({
            username: $ctrl.user.email,
            password: $ctrl.user.password
          });
        } else {
          promise = ieUserService.signup($ctrl.user)
        }

        promise
          .then(function (user) {
            console.log(user);
            $ctrl.modal.hide();
          })
          .catch(function (rejection) {
            $ctrl.error = rejection.error;
          });
      }
    }
  })

  .component('iePlaylists', {
    templateUrl: 'templates/playlists.html',
    controller: function (iePlaylistsService) {

      var $ctrl = this;

      $ctrl.playlists = [];

      iePlaylistsService
        .getPlaylists()
        .then(function (playlists) {
          $ctrl.playlists = playlists;
        });
    }
  })

  .component('iePlaylist', {
    templateUrl: 'templates/playlist.html',
    controller: function ($stateParams) {

      var $ctrl = this;
      console.log($ctrl, $stateParams);
    }
  });
