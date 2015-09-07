angular.module('ArcaUser.DatosController', [])



.controller('datosUsuarioCtrl', function($scope,$q,$http,$state,$rootScope,md5,$timeout,$ionicLoading,cotizacionData) {

$scope.cotizar=function(email,telefono,nombre){
    
      var resultadoValidacion = $scope.validarFormulario($scope.data);
      if(resultadoValidacion == true){

          cotizacionData.cotizar(email,telefono,nombre).then(function(val){
            if(val=="true"){
                 $rootScope.login();
                 alert("Gracias, nos contactaremos pronto con tigo.");
                 return;
            }
            
            else{
              alert("Ocurrio un error intenta nuevamente");
            }
         });
      }

    
 
};

$scope.validarFormulario=function(data){


   var regExpr = new RegExp("^[0-9]*$");
    
      if (data.correo != undefined) {
            
                  if (data.nombre.length >= 4)
                   {
                    if (regExpr.test(data.celular)) 
                    {
                       return true;
                    }
                    else {
                      alert("El telefono solo puede contener numeros.");
                      return false;
                    }
                  } 
                  else {
                      alert("El nombre debe ser de 4 caracteres minimo.");
                      return false;
                  }
       } 
              
       else {
          alert("No es una direccion de email valida.");
           return false;
      }
     
};


});
