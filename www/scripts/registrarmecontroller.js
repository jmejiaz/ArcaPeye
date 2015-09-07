angular.module('ArcaUser.RegistrarmeController', [])



.controller('registrarmeCtrl', function($scope,$q,$http,$state,$rootScope,md5,$timeout,$ionicLoading) {
 $scope.nuevousuario={};
  $scope.registrarme = function(){
    $scope.reg = $scope.registrarmeservice();
    $scope.reg.then(function(val){
        if(val=="exito"){
             $rootScope.login();
             alert("Registro Exitoso.");
             return;
        }
        if(val=="error"){
             alert("Lo sentimos ya hay alguien registrado con ese correo.");
        }
        else{
          alert(val);
        }
     });
  };
  
$scope.registrarmeservice=function(){
    $scope.data={};

    try {
      $nombre=$scope.nuevousuario.first_name;
      $scope.data.nombre=$nombre;
      $primerapellido=$scope.nuevousuario.primer_apellido;
      $scope.data.primerapellido=$primerapellido;
      $segundopellido=$scope.nuevousuario.segundo_apellido;
      $scope.data.segundopellido=$segundopellido;
      $cc=$scope.nuevousuario.cedula;
      $scope.data.cedula=$cc;
      $pass=$scope.nuevousuario.contrasena;
      $scope.data.contrasena=$pass;
      $passC=$scope.nuevousuario.contrasenaConfirmada;
      $scope.data.contrasenaConfirmada=$passC;
      $email=$scope.nuevousuario.correo;
      $scope.data.correo=$email;
      $tel=$scope.nuevousuario.celular;
      $scope.data.celular=$tel;
      $points='0';
      $placa='xxx';
      $imagen='xxx';
      $jwt='xxx';
      $newpass=md5.createHash($pass || '');
      

      var q = $q.defer();
      var resultadoValidacion = $scope.validarFormulario($scope.data);
      if(resultadoValidacion!= true){

        q.resolve(resultadoValidacion);
        return q.promise;
      }

      $http.get('http://www.mvvtech.com/arca/controller/tarea.php?op=8&cc='+$cc+'&nombre='+$nombre+'&apellido_uno='
      +$primerapellido+'&apellido_dos='+$segundopellido+'&celular='+$tel+'&correo='+$email+'&puntos='+$points+'&password='+$newpass).success(function(data){
        q.resolve(data);
      }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("error en la conexion");
                $ionicLoading.hide();
            });
      return q.promise;
 
    }

    catch(err) {
     alert("campos incompletos!");
    }
 
};

$scope.validarFormulario=function(data){


   var regExpr = new RegExp("^[0-9]*$");
    
 if (data.correo != undefined) {
          if (data.contrasenaConfirmada == data.contrasena) {
              if (data.contrasena.length >= 4) {
                  if (data.nombre.length >= 4) {
                    if (regExpr.test(data.celular)) {
                       return true;
                    }
                    else {
                      return("El telefono solo puede contener numeros.");
                    }
                  } 
                  else {
                      return("El nombre debe ser de 4 caracteres minimo.");
                  }
              } 
              else {
                  return("La contraseña necesita minimo 4 caracteres.");
              }
          } else {
              return("Las contraseñas no coinciden.");
          }
      } else {
          return("No es una direccion de email valida.");
      }
      return false;
};


});
