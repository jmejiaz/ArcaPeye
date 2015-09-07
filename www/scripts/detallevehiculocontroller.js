angular.module('ArcaUser.DetalleVehiculoController', [])

.controller('detallevehiculoCtrl', function($scope,$q,$http,$state,$rootScope,$timeout,$ionicLoading) {
  $scope.buscarcarroservice=function(placa){
      
    var q = $q.defer();
   //18
    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=1&placa='+$rootScope.placaSeleccionada).success(function(data){
      q.resolve(data.listDep);
    }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
    return q.promise;
  };

  $scope.buscarcarro = function(placa){
    $scope.carro = $scope.buscarcarroservice(placa);
    $scope.carro.then(function(val){
      $scope.temporal=val;
       console.log($scope.temporal);  
      
       $scope.carro = $scope.temporal[0];
       

     });
 $scope.$broadcast('scroll.refreshComplete');
};
  $scope.buscarcarro($rootScope.detalleplaca);

  $scope.confirmar= function(){
		$state.go('app.confirmarviaje');
  };



});