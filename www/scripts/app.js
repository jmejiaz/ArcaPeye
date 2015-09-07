// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ArcaUser.controllers','ArcaUser.data','angular-md5','ionic-datepicker','ionic-timepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function ($rootScope) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
          if (requireLogin &&  !localStorage.getItem("cc") )  { 
      event.preventDefault();
      $rootScope.toState = toState;
     $rootScope.login();
    }
  });
})

//http interceptors for show loading
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  })
})

.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'Cargando...'})
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })
})

//end of http interceptors for show loading


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

     .state('app.inicio', {
     cache: true,
      url: "/inicio",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent': {
          templateUrl: "templates/inicio.html",
          controller: 'inicioCtrl'
        }
      }
    })

     .state('app.datosUsuario', {
     cache: true,
      url: "/datosUsuario",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent': {
          templateUrl: "templates/datosUsuario.html",
          controller: 'datosUsuarioCtrl'
        }
      }
    })

         .state('app.detallevehiculo', {
          cache: false,
      url: "/detallevehiculo",
      data: {
        requireLogin: true
      },
      views: {
        'menuContent': {
          templateUrl: "templates/detallevehiculo.html",
          controller: 'detallevehiculoCtrl'
        }
      }
    })
  

        .state('app.confirmarviaje', {
          cache: false,
      url: "/confirmarviaje",
      data: {
        requireLogin: true
      },
      views: {
        'menuContent': {
          templateUrl: "templates/confirmarviaje.html",
          controller: 'confirmarviajeCtrl'
        }
      }
    })


    .state('app.detalleviaje', {
      cache: false,
      url: "/detalleviaje",
      data: {
        requireLogin: true
      },
      views: {
        'menuContent': {
          templateUrl: "templates/detalleviaje.html",
          controller: 'detalleviajeCtrl'
        }
      }
    })



     .state('app.listavehiculos', {
      cache: false,
      url: "/listavehiculos",
       data: {
        requireLogin: false
      },
      views: {
        'menuContent': {
          templateUrl: "templates/listavehiculos.html",
          controller: 'listavehiculosCtrl'
        }
      }
    })


.state('app.listaviajes', {
  cache: false,
      cache: false,
      url: "/listaviajes",
      data: {
        requireLogin: true
      },
      views: {
        'menuContent': {
          templateUrl: "templates/listaviajes.html",
          controller: 'listaviajesCtrl'
        }
      }
    })


.state('app.registrarme', {
      url: "/registrarme",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent': {
          templateUrl: "templates/registrarme.html",
          controller: 'registrarmeCtrl'
        }
      }
    })

.state('app.book', {
      url: "/book/:fromInicio",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent': {
          templateUrl: "templates/book.html",
          controller: 'bookCtrl'
        }
      }
    })


.state('app.reservartiempo', {
      url: "/reservartiempo",
      data: {
        requireLogin: true
      },
      views: {
        'menuContent': {
          templateUrl: "templates/reservartiempo.html",
          controller: 'reservartiempoCtrl'
        }
      }
    })

.state('app.home', {
      url: "/home",
      data: {
        requireLogin: false
      },
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'homeCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');
});
