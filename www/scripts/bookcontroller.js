angular.module('ArcaUser.BookController', [])

.controller('bookCtrl', function($scope,$q,$http,$state,$rootScope,$timeout,$ionicLoading,$stateParams) {

  var monthList = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var weekDaysList = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  var weekDaysListEsp = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];


$scope.datepickerObject = {
      titleLabel: 'Calendario',  //Optional
      todayLabel: 'Hoy',  //Optional
      closeLabel: 'Cerrar',  //Optional
      setLabel: 'Elegir',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };
  $scope.datepickerObject2 = {
      titleLabel: 'Calendario',  //Optional
      todayLabel: 'Hoy',  //Optional
      closeLabel: 'Cerrar',  //Optional
      setLabel: 'Elegir',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),   //Optional
      to: new Date(2018, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback2(val);
      }
    };


  var datePickerCallback = function (val) {
  if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    $scope.fechaSalidaProg=val;
    $scope.fechaSalida=$rootScope.naturalDateEsp(val);
  }
};

  var datePickerCallback2 = function (val) {
  if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    $scope.fechaRegresoProg=val;
    $scope.fechaRegreso=$rootScope.naturalDateEsp(val);
  }
};


  $scope.timePickerCallback = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      $i=new Date((val+18000)*1000);
     // $scope.hsalida=$i.getHours()+":"+$i.getMinutes();
    $scope.hsalida=$i;
    }
  };
 $scope.timePickerCallback2 = function (val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      $r=new Date((val+18000)*1000);
      //$scope.hregreso=$r.getHours()+":"+$r.getMinutes();
      $scope.hregreso=$r;
    
      console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
    }
  };

 
  $scope.buscarDestinoPorId = function(id){
      for (i = 0; i < $scope.destinos.length;  i++ ){
        if($scope.destinos[i].id == id){
          return $scope.destinos[i];
        }
      }
  };

 


  $scope.changedate=function(input){
    try {
      var fsalida= new Date(input.getFullYear(),
    $input.getMonth(),input.getDate(),
    0,0);
     alert(fsalida);
    localStorage.setItem("fsalida",fsalida);

    }
    catch(err) {
     alert(err);
    }
  }


 
$scope.insertarorigen=function(ubicacion){
  localStorage.setItem("origen",ubicacion);
}
$scope.insertardestino=function(ubicacion){
  localStorage.setItem("destino",ubicacion);
}

$scope.consultartiemposervice=function(){
      
    var q = $q.defer();
 
  $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=102&a='+localStorage.getItem("origen")+'&b='+localStorage.getItem("destino")).success(function(data){
      q.resolve(data);
    });
    return q.promise;
  };
  $scope.listardestinosservice=function(){
      
    var q = $q.defer();
   if($scope.destinos){
   q.resolve($scope.destinos);
  }  
  $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=25').success(function(data){
      q.resolve(data.listDep);
    });
    return q.promise;
  };





$scope.irADatos = function(pasajeros,destino){
    datesalida=$scope.fechaSalidaProg;
    localStorage.setItem("pasajeros",pasajeros);
    localStorage.setItem("destino",destino.nombre);
    var d = new Date(($scope.slots.epochTime+18000)*1000);
    datesalida.setHours($i.getHours());
    datesalida.setMinutes($i.getMinutes());
    
    


                   $state.go('app.datosUsuario');

}











































$scope.listardestinos = function(){
    $scope.destinos = $scope.listardestinosservice();
    $scope.destinos.then(function(val){
      $scope.temporal=val;
       console.log($scope.temporal);  
      
       $scope.destinos = $scope.temporal;
        if($stateParams.fromInicio){
        $scope.origen = $scope.buscarDestinoPorId(localStorage.getItem("ArcaUserAppOrigenId")); 
        $scope.destino = $scope.buscarDestinoPorId(localStorage.getItem("ArcaUserAppDestinoId"));
        //buscar Medellin

      }

     });
 $scope.$broadcast('scroll.refreshComplete');
};
$scope.consultartiempo = function(flagida){
    $scope.tiempo = $scope.consultartiemposervice();
    $scope.tiempo.then(function(val){
      $scope.temporal=val;
      
       $scope.tiempo = $scope.temporal;
        
      if(flagida==1){
       var d = new Date(localStorage.getItem("datesalida"));
       d.setMilliseconds($scope.tiempo*1000);
       localStorage.setItem("dateregreso",d);
       d.setMilliseconds($scope.tiempo*1000);
       localStorage.setItem("dateregresocochinote",d);
      }else{
       var d = new Date(localStorage.getItem("dateregreso"));
       d.setMilliseconds($scope.tiempo*1000);
       localStorage.setItem("dateregresocochinote",d);
      }
      
     


       $state.go('app.listavehiculos');
       
      

     });
 $scope.$broadcast('scroll.refreshComplete');
};

  $fechaini=new Date();
  $fechaini2=new Date();
  
  $scope.fechaSalida=weekDaysListEsp[$fechaini.getDay()]+" "+$fechaini.getDate()+" de "+monthList[$fechaini.getMonth()]+" , "+$fechaini.getFullYear();
  $scope.fechaRegreso=weekDaysListEsp[$fechaini2.getDay()]+" "+$fechaini2.getDate()+" de "+monthList[$fechaini2.getMonth()]+" , "+$fechaini2.getFullYear();
  $scope.fechaSalidaProg=$fechaini;
  $scope.fechaRegresoProg=$fechaini2;
  $scope.flagida=true;
  $scope.slots = {epochTime: 12600, format: 12, step: 15};
  $scope.slots2 = {epochTime: 12600, format: 12, step: 15};
  $scope.tempDate=new Date();
  var i=0;
  while(i<25){
      if(i*3600>=$scope.tempDate.getHours()*3600){
        $scope.slots.epochTime=(i+1)*3600;
        $scope.slots2.epochTime=(i+1)*3600;
        break;
      }
      i++;
  }
  
  $i=new Date(($scope.slots.epochTime+18000)*1000);
  $r=new Date(($scope.slots2.epochTime+18000)*1000);
  $scope.hsalida=$i;
  $scope.hregreso=$r;

  $scope.listardestinos();
 





});
