angular.module('ArcaUser.ConfirmarViajeController', [])

.controller('confirmarviajeCtrl', function($scope,costoData,$q,$http,$state,$rootScope,$ionicHistory,$timeout,$ionicLoading) {

 var monthList = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var weekDaysList = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  var weekDaysListEsp = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];


 $scope.datosdestinoservice=function(destino){
      
    var q = $q.defer();
   //18
    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=46&id='+destino)
    .success(function(data){
      q.resolve(data);
    });
    return q.promise;
  };




  $scope.googleservice=function(){
      

     function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          $scope.distancia=(response.rows[0].elements[0].distance.text);
          $scope.estimado=(response.rows[0].elements[0].duration.text);
      
          
        }
      }
    function calculateDistances() {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
          origins: [localStorage.getItem("origengoogle")],
          destinations: [localStorage.getItem("destinogoogle")],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, callback);
      }

 calculateDistances();

  };



$scope.datosorigen = function(destino){
    $dato = $scope.datosdestinoservice(destino);
    $dato.then(function(val){
      $temporal=val;
       console.log($temporal);  
      
       $dato = $temporal;

       $scope.origengoogle=$dato.nombre_google_destino;
     $scope.origen=$dato.nombre;
 
     });
    
 $scope.$broadcast('scroll.refreshComplete');
 
};

$scope.consultarCosto = function(){

  costoData.consultarCosto().then(function(val){
      $scope.costo = val;     
   });
}

$scope.datosdestino = function(destino){
    $dato = $scope.datosdestinoservice(destino);
    $dato.then(function(val){
      $temporal=val;
       console.log($temporal);  
      
       $dato = $temporal;
       $scope.destinogoogle=$dato.nombre_google_destino;
       $scope.destino=$dato.nombre;
 
    });
    
 $scope.$broadcast('scroll.refreshComplete');
 
};





  $scope.datosorigen(localStorage.getItem("origen"));
$scope.datosdestino(localStorage.getItem("destino"));
$scope.fsalida=new Date(localStorage.getItem("datesalida"));
$scope.fsalida=$rootScope.naturalDateEsp($scope.fsalida);
$scope.ida=localStorage.getItem("flagida");
if(localStorage.getItem("flagida")==1){
  $scope.fregreso="";

  $scope.sregreso="";
  
}else{
  $scope.sregreso="fecha regreso:";
  
$scope.fregreso=new Date(localStorage.getItem("dateregreso"));
$scope.fregreso=$rootScope.naturalDateEsp($scope.fregreso);

}

 $scope.googleservice();


$scope.insertarviajesoloida = function(){
    $scope.pasajeros = $scope.insertarviajesoloidaservice();
    $scope.pasajeros.then(function(val){
      if(val=="exito"){
        $ionicHistory.nextViewOptions({
        disableBack: true
     });
        $state.go('app.listaviajes');
      }else{
       // alert(val);
        alert("ocurrio un error");
      }

     });
 $scope.$broadcast('scroll.refreshComplete');
};


$scope.insertarviajeidayregresoconacompanante = function(){
    $scope.pasajeros = $scope.insertarviajeidayregresoconacompananteservice();
    $scope.pasajeros.then(function(val){
      if(val=="exito"){
        $ionicHistory.nextViewOptions({
        disableBack: true
     });
        $state.go('app.listaviajes');
      }else{
        //alert(val);
        alert("ocurrio un error");
      }
     });
 $scope.$broadcast('scroll.refreshComplete');
};



$scope.insertarviaje=function(comentarios){
      localStorage.setItem("comentarios",comentarios);
if(localStorage.getItem("flagida")==1){
  $scope.insertarviajesoloida();
  
}else{
  
  $scope.insertarviajeidayregresoconacompanante();
}



  };









$scope.quitarOffset=function(fecha){
var  fechastr=fecha.toString();
    var  str='';
      for(i=0;i <fechastr.length;i++){
          if(fechastr.charAt(i)!='('){
            str=str+fechastr.charAt(i);
          }else{
            break;
          }
      }
      return str;
};

$scope.insertarviajesoloidaservice=function(){
      

    var q = $q.defer();
    var query = 'http://www.mvvtech.com/arca/controller/tarea.php?op=44&id_usuario='+localStorage.getItem("correo")+
    '&placa_vehiculo='+$rootScope.placaSeleccionada+'&comentarios_viaje='+localStorage.getItem("comentarios")+'&fecha_inicio='+
    $scope.quitarOffset($scope.fsalida)+'&punto_inicio='+localStorage.getItem("origen")+'&punto_fin='+localStorage.getItem("destino")
    console.log(query);
   $http.get(query)
   .success(function(data){
      q.resolve(data);
    });
    return q.promise;
  };
/**$scope.insertarviajesoloidaservice=function(){
      
    var q = $q.defer();
   $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=44&id_usuario='+localStorage.getItem("correo")+'&placa_vehiculo='+$rootScope.placaSeleccionada+'&comentarios_viaje=todoBN&fecha_inicio='+$scope.fsalida+'&punto_inicio='+$scope.origen+'&punto_fin='+$scope.destino).success(function(data){
      q.resolve(data);
    });
    return q.promise;
  };**/
$scope.insertarviajeidayregresoconacompananteservice=function(){
   
    var q = $q.defer();


    $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=45&id_usuario='+localStorage.getItem("correo")+
      '&placa_vehiculo='+$rootScope.placaSeleccionada+'&comentarios_viaje='+localStorage.getItem("comentarios")+'&fecha_inicio='+
      $scope.quitarOffset($scope.fsalida)+'&fecha_retorno='+$scope.quitarOffset($scope.fregreso)+'&punto_inicio='+
      localStorage.getItem("origen")+'&punto_fin='+localStorage.getItem("destino")).success(function(data){
      q.resolve(data);
    });
    return q.promise;
  };

 $scope.consultarCosto(); 
})