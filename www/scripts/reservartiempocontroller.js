angular.module('ArcaUser.ReservarTiempoController', [])

.controller('reservartiempoCtrl', function($scope,$q,$http,$state,$rootScope,$timeout,$ionicLoading) {
  $scope.slots = {epochTime: 12600, format: 12, step: 15};
  
  $i=new Date(($scope.slots.epochTime+18000)*1000);
  $r=new Date(($scope.slots.epochTime+18000)*1000);
   $scope.hsalida=$i;
    $scope.hregreso=$r;

  $scope.timePickerCallback = function (val) {
  if (typeof (val) === 'undefined') {
    console.log('Time not selected');
  } else {
    $i=new Date((val+18000)*1000);
   // $scope.hsalida=$i.getHours()+":"+$i.getMinutes();
  $scope.hsalida=$i;
    console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
  }
};
 

  $fechaini=new Date();
  $fechaini2=new Date();

  $scope.currentDate=$fechaini;
  $scope.currentDate1=$fechaini2;



  $scope.reservas=function(currentDate,currentDate1,flagfestivos,flagLunes,flagMartes,
    flagMiercoles,flagJueves,flagViernes,flagSabado,flagDomingo,horas){
    var d = new Date(($scope.slots.epochTime+18000)*1000); // The 0 there is the key, which sets the date to the epoch
    currentDate.setHours($i.getHours());
    currentDate.setMinutes($i.getMinutes());

    var e = new Date(($scope.slots.epochTime+18000)*1000); // The 0 there is the key, which sets the date to the epoch
    currentDate1.setHours($r.getHours());
    currentDate1.setMinutes($r.getMinutes());
    
    $dias="";
    if(flagfestivos==true){
      localStorage.setItem("flagfestivos",1);
    }else{

      localStorage.setItem("flagfestivos",0);
    }
    if(flagLunes==true){
      $dias=$dias+"l";
    }
    if(flagMartes==true){
      $dias=$dias+"m";
    }
    if(flagMiercoles==true){
      $dias=$dias+"w";
    }
    if(flagJueves==true){
      $dias=$dias+"j";
    }
    if(flagViernes==true){
      $dias=$dias+"d";
    }
    if(flagSabado==true){
      $dias=$dias+"s";
    }
    if(flagDomingo==true){
      $dias=$dias+"d";
    }
    
   localStorage.setItem("currentDate",currentDate);
   localStorage.setItem("currentDate1",currentDate1);
   localStorage.setItem("horas",horas);
 
   if(currentDate<currentDate1){
      var d = new Date();
      if(currentDate>d.getTime()){
            
            if(horas!=undefined){
              alert($dias);
              //$state.go('app.listavehiculos');
            }else{
              alert("debe elegir las horas");
            }
          
        
      }else{
        alert("la fecha inicial es anterior a la actual");
      }
   }else{
      alert("la fecha final es anterior a la de inicial");
   }
}


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





 
});