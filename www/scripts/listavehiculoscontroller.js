angular.module('ArcaUser.ListaVehiculosController', [])

.controller('listavehiculosCtrl', function($scope,$q,$http,$state,$rootScope,$timeout,$ionicLoading) {

  $scope.nocar=true;
$scope.datosdestinoservice=function(destino){
      
    var q = $q.defer();
   //18
    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=46&id='+destino)
    .success(function(data){
      q.resolve(data);
    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
    return q.promise;
  };



$scope.datosorigen = function(destino){
    $dato = $scope.datosdestinoservice(destino);
    $dato.then(function(val){
      $temporal=val;
       console.log($temporal);  
      
       $dato = $temporal;

       localStorage.setItem("origengoogle",$dato.nombre_google_destino);
     
     });
    
 $scope.$broadcast('scroll.refreshComplete');
 
};

$scope.datosdestino = function(destino){
    $dato = $scope.datosdestinoservice(destino);
    $dato.then(function(val){
      $temporal=val;
       console.log($temporal);  
      
       $dato = $temporal;
      localStorage.setItem("destinogoogle",$dato.nombre_google_destino);
     
 
     });
    
 $scope.$broadcast('scroll.refreshComplete');
 
};



  $scope.datosorigen(localStorage.getItem("origen"));
$scope.datosdestino(localStorage.getItem("destino")); 

 
$scope.iraconfirmarviaje=function(placa){
  $rootScope.placaSeleccionada=placa;
  $state.go('app.detallevehiculo');
}

  $scope.listarvehiculosservice=function(){
      
    var q = $q.defer();
   //er/tarea.php?op=18&fechaIncioNueva=&fechaFinNueva=&fechaFinNueva=&numeroPersonas=
    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=11&fechaIncioNueva='
      +localStorage.getItem("datesalida")+'&fechaFinNueva='+localStorage.getItem("dateregresocochinote")
      +'&numeroPersonas='+localStorage.getItem("pasajeros")).success(function(data){
      q.resolve(data.listDep);
    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
    return q.promise;
  };

$scope.listarvehiculos = function(){
    $scope.vehiculos = $scope.listarvehiculosservice();
    $scope.vehiculos.then(function(val){
      $scope.temporal=val;
       console.log($scope.temporal); 

      if(val==undefined){
        alert("no se encontraron vehiculos");
        $state.go('app.book'); 
      }
       $scope.vehiculos = $scope.temporal;

     });
 $scope.$broadcast('scroll.refreshComplete');
};

  $scope.listarvehiculos();


});