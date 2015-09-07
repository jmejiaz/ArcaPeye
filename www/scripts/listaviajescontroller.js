angular.module('ArcaUser.ListaViajesController', [])

.controller('listaviajesCtrl', function($scope,$q,$http,$state,$rootScope,$timeout,$ionicLoading) {
 
$scope.iraviaje=function(viaje,origen,destino,placa,fecha_incio,fecha_fin,fullTime
  ,estado,comentarios,id_usuario){
  $rootScope.detalleviaje=viaje;
  $rootScope.detalleorigen=origen;
  $rootScope.detalledestino=destino;
  $rootScope.detalleplaca=placa;
  $rootScope.detallefecha_inicio=fecha_incio;
  $rootScope.detallefecha_fin=fecha_fin;
  $rootScope.detallefullTime=fullTime;
  $rootScope.detalleestado=estado;
  $rootScope.detallecomentarios=comentarios;
  $rootScope.detalleid_usuario=id_usuario;
  $state.go('app.detalleviaje');
}

  $scope.listaviajesservice=function(){
      
    var q = $q.defer();
   //18
   
    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=31&id_usuario='
      +localStorage.getItem("correo")).success(function(data){
      q.resolve(data.listDep);
    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
    return q.promise;
  };


$scope.listaviajes = function(){
    $scope.viajes = $scope.listaviajesservice();
    $scope.viajes.then(function(val){
      $scope.temporal=val;
       console.log($scope.temporal); 
       if($scope.temporal) {
       i=0;
         while(i<$scope.temporal.length){

              $scope.temporal[i].fecha_incio=$rootScope.naturalDateEsp($scope.convertir($scope.temporal[i].fecha_incio));
              $scope.temporal[i].fecha_fin=$rootScope.naturalDateEsp($scope.convertir($scope.temporal[i].fecha_fin));
              
              if($scope.temporal[i].flag_estado=="0"){
                $scope.temporal[i].estado="ACEPTADA";
              }
              if($scope.temporal[i].flag_estado=="1"){
                $scope.temporal[i].estado="CANCELADA";
              }
             
              if($scope.temporal[i].flag_estado=="2"){
                $scope.temporal[i].estado="PENDIENTE";
              }
              i++;
          }
       $scope.viajes = $scope.temporal;
       }
       else
       {
          alert("Aun no tienes viajes con Arca.");
       }
     });
 $scope.$broadcast('scroll.refreshComplete');

};
$scope.convertir = function(unix_timestamp){
 $fechadyn=new Date(unix_timestamp*1000);
 $fechadyn.setTime($fechadyn.getTime() + (5*60*60*1000));
 return $fechadyn;

};







  



  $scope.listaviajes();




});