angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, IonicLogin) {

  $scope.$on('$ionicView.enter', function(e) {
      $scope.session = JSON.parse( window.localStorage['session']) ; // read the session information
  });

   $scope.logout = function(){
       IonicLogin.logout($scope.session.email);
  }

})

.controller('IonicLogin', function($scope, IonicLogin, $ionicLoading) {

  $scope.data = {} ;

  $scope.logout = function(){
       IonicLogin.logout();
  }

  $scope.login = function(){
       IonicLogin.login($scope.data.email, $scope.data.password);
  }

   $scope.signUp = function(){
      IonicLogin.signUp($scope.data.email, $scope.data.password);
  }

})

.controller('SplashController', function ($scope, $state, $window, $http){

    $scope.$on("$ionicView.enter", function(event) {
          $scope.checkSession();
    });

  $scope.checkSession = function () {

        if ( window.localStorage['session'] != null &&  window.localStorage['session'] != undefined )
        {
            var sesh = JSON.parse(window.localStorage['session']) ;

              $http.post("http://localhost:3000/checkSession",
                { params: { "session": JSON.stringify(sesh)}})
                  .success(function(response) {
                   if ( response == "error" || response == "LOGIN_FAIL" ){
                        $state.go('login');
                   }
                   else{
                       $state.go('tab.dash');
                  }
                })
                .error(function(response) {
                  $state.go('login');
            });
        }
        else{
           $state.go('login');
        }
     }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, IonicLogin) {

})

.controller('AccountCtrl', function($scope) {

});