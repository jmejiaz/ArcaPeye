angular.module('ArcaUser.DetalleViajeController', [])

.controller('detalleviajeCtrl', function($scope,$q,$http,$state,$rootScope,$timeout,$ionicLoading) {

  $scope.buscarcarroservice=function(placa){
      
    var q = $q.defer();
   //18
    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=1&placa='+placa).success(function(data){
      q.resolve(data.listDep);
    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
    return q.promise;
  };

 $scope.ingresarpasajeroservice=function(){
  $scope.nuevopasajero.tps=$scope.nuevopasajero.tps.replace("+", "%2B");
  var q = $q.defer();
   $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=27&id_viaje='+$rootScope.detalleviaje+'&nombre='
      +$scope.nuevopasajero.nombre+'&identificacion='+$scope.nuevopasajero.identificacion+
      '&correo='+$scope.nuevopasajero.correo+'&tipo_sangre='+$scope.nuevopasajero.tps).success(function(data){
      q.resolve(data.listDep);

    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
      $scope.listarpasajeros();
    return q.promise;
  };
$scope.borrarpasajeroservice=function(id){
  var q = $q.defer();
   $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=49&id='+id).success(function(data){
      q.resolve(data.listDep);

    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
     
    return q.promise;
  };




   $scope.listarpasajerosservice=function(){
      
    var q = $q.defer();
   
    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=26&idViaje='+$rootScope.detalleviaje).success(function(data){
      q.resolve(data.listDep);

    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });

    return q.promise;
  };

$scope.listarpasajeros = function(){
    $scope.pasajeros = $scope.listarpasajerosservice();
    $scope.pasajeros.then(function(val){
      $scope.temporal=val;
       console.log($scope.temporal);  
        $scope.pasajeros = $scope.temporal;
        try{
       $scope.registrados=   $scope.pasajeros.length;
     }catch(err){
       $scope.registrados=0;
     }

     });
 $scope.$broadcast('scroll.refreshComplete');
};

$scope.buscarcarro = function(placa){
    $scope.carro = $scope.buscarcarroservice(placa);
    $scope.carro.then(function(val){
      $scope.temporal=val;
       console.log($scope.temporal);  
      
       $scope.carros = $scope.temporal;
       $scope.capacidad=$scope.carros[0].capacidad;

     });
 $scope.$broadcast('scroll.refreshComplete');
};
  $scope.buscarcarro($rootScope.detalleplaca);
  //alert($rootScope.detalleplaca);
  $scope.listarpasajeros();


  $scope.datosdestinoservice=function(destino){
      
    var q = $q.defer();
   //18
    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=46&id='+destino).success(function(data){
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
     $scope.origen=$dato.nombre;
 
     });
    
 $scope.$broadcast('scroll.refreshComplete');
 
};

$scope.datosdestino = function(destino){
    $dato = $scope.datosdestinoservice(destino);
    $dato.then(function(val){
      $temporal=val;
       console.log($temporal);  
      
       $dato = $temporal;
     $scope.destino=$dato.nombre;
 
     });
    
 $scope.$broadcast('scroll.refreshComplete');
 
};



$scope.fecha_inicio=$rootScope.detallefecha_inicio;
$scope.fecha_fin=$rootScope.detallefecha_fin;
$scope.origen=$rootScope.detalleorigen;
$scope.destino=$rootScope.detalledestino;






 $scope.Delete=function(id){ 

    $scope.formVisibility=false;
    $scope.ingresar = $scope.borrarpasajeroservice(id);
    $scope.ingresar.then(function(val){
     $scope.listarpasajeros();    
     $scope.$broadcast('scroll.refreshComplete');
    });
  };



  $scope.Save=function(){ 
    if($scope.registrados<$scope.capacidad){
      if($scope.nuevopasajero.identificacion!=undefined&&$scope.nuevopasajero.correo!=undefined
        &&$scope.nuevopasajero.nombre!=undefined&&$scope.nuevopasajero.tps!=undefined){
      $scope.formVisibility=false;
      $scope.ingresar = $scope.ingresarpasajeroservice();
      $scope.ingresar.then(function(val){
        $scope.listarpasajeros();    
        $scope.$broadcast('scroll.refreshComplete');
      });
      }else{
        alert("informacion de pasajero incompleta");
      }
    }else{
      alert("el vehiculo esta en su maxima capacidad");
    }
  };



  $scope.formVisibility=false;
  
  
  $scope.ShowForm=function(){
  $scope.formVisibility=true;
  console.log($scope.formVisibility)
  };


  




});