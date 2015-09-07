angular.module('ArcaUser.AppController', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$q,
  $http,md5,$rootScope,$state,$ionicHistory,$timeout,$ionicLoading) {
  // Form data for the login modal
  $rootScope.monthListEsp = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $rootScope.weekDaysListEsp = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  $rootScope.monthListEng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $rootScope.weekDaysListEng = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  $rootScope.naturalDateEsp = function(date) {
    nDate=$rootScope.weekDaysListEsp[date.getDay()]+" "+date.getDate()+" de "+$rootScope.monthListEsp[date.getMonth()]+" , "+date.getFullYear();
    return nDate;
  };
  $rootScope.naturalDateEng = function(date) {
    nDate=$rootScope.weekDaysListEng[date.getDay()]+" "+date.getDate()+" "+$rootScope.monthListEng[date.getMonth()]+" , "+date.getFullYear();
    return nDate;
  };
         
   if(localStorage.getItem("cc")){
    $scope.visible=false;
  }else{
    $scope.visible=true; 
  }
       

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.logout = function() { 
     localStorage.removeItem("cc");
     localStorage.removeItem("nombre");
     localStorage.removeItem("apellido_uno");
     localStorage.removeItem("apellido_dos");
     localStorage.removeItem("celular");
     localStorage.removeItem("correo");
     localStorage.removeItem("puntos");
     localStorage.removeItem("carro");
     localStorage.removeItem("imagen");
     localStorage.removeItem("password");
     localStorage.removeItem("agencia");
     $scope.visible=true;  
     $ionicHistory.nextViewOptions({
        disableBack: true
     });
     $scope.loginData = {};
     $state.go('app.book'); 
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $rootScope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
   $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $scope.resultado = $scope.loginService();
    $scope.resultado.then(function(val){

      if(val){ 
        $scope.visible=false;       
        localStorage.setItem("cc",val[0].cc);
        localStorage.setItem("nombre",val[0].nombre);
        localStorage.setItem("apellido_uno",val[0].apellido_uno);
        localStorage.setItem("apellido_dos",val[0].apellido_dos);
        localStorage.setItem("celular",val[0].celular);
        localStorage.setItem("correo",val[0].correo);  
        localStorage.setItem("puntos",val[0].puntos);
        localStorage.setItem("carro",val[0].carro);
        localStorage.setItem("imagen",val[0].imagen);
        localStorage.setItem("password",val[0].password);
        localStorage.setItem("agencia",val[0].agencia);
        $scope.closeLogin();
        $state.go($rootScope.toState);
      }else{
        alert("Error en usuario o contraseña");
      }

    });
  };

$scope.loginService=function(){
      
    var q = $q.defer();
    $scope.loginData.password = md5.createHash($scope.loginData.password || '');
    $http.get('http://mvvtech.com/arca/controller/tarea.php?op=35&correo='
      +$scope.loginData.correo+'&password='
      +$scope.loginData.password).success(function(data){
      q.resolve(data.listDep);
    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
    return q.promise;
  };

});