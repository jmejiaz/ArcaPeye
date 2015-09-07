angular.module('ArcaUser.InicioController', [])

.controller('inicioCtrl', function($scope,$q,$http,$state,$rootScope,$timeout,$ionicLoading,destinosData) {


$scope.listarDestinos = function(){
    $scope.destinos = destinosData.getAll();
    
 $scope.$broadcast('scroll.refreshComplete');
};

$scope.goToBook = function(origenId,destinoId){

localStorage.setItem("ArcaUserAppOrigenId", origenId);	
localStorage.setItem("ArcaUserAppDestinoId", destinoId);	


$state.go('app.book', { 'fromInicio': true });
}


  $scope.listarDestinos();


});