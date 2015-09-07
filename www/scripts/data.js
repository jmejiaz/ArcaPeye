angular.module('ArcaUser.data', [])

// Home Data: Home page configuration

// Menu Data: Menu configuration

// Plugins Data: Mobile Plugins configuration

// Map Data: Map configuration
.factory('destinosData', function(){
    var service = {};
     var data = {};
   
    data.destinos = [
        { 
          image: 'img/guatape.jpg', 
            descripcion: 'Maravilloso destino con inigualable vista.',
            origenId: 1,         
            destinoId: 6,
            precio: 50000,
            personas: 5
        },  
        { 
            image: 'img/santaFe.jpg', 
            descripcion: 'Ambiente colonial y moderno en  un solo lugar',
            origenId: 1,          
            destinoId: 11,
            precio: 90000,
            personas: 12
                    
        },        
              
        { 
          image: 'img/aeropuerto.jpg', 
            descripcion: 'Una buseta es excelente para ir a recibir a ese ser querido', 
            origenId: 1,        
            destinoId: 76,
            precio: 100000,
            personas: 20
        },
        { 
          image: 'img/jardin.jpg', 
            descripcion: 'Jardín...',             
            origenId: 1,           
            destinoId: 51,            
            precio: 190000,
            personas: 9
        },
        { 
          image: 'img/pintada.jpg', 
            descripcion: 'Para los que les gusta el calor infernal del rio ',
            origenId: 1,         
            destinoId: 54,
            precio: 130000,
            personas: 12
        }
    ]; 



     service.getAll = function(){
        return data.destinos;
     };
    
    return service;
})


.factory('costoData', function($q, $http,$ionicLoading){
    var service = {};
    
   
     service.consultarCosto = function() {
        var q = $q.defer();
        var query = 'http://www.mvvtech.com/arca/controller/tarea.php?op=52&destinoId='+localStorage.getItem("destino")+'&pasajeros='+localStorage.getItem("pasajeros");
        console.log(query);

        $http.get(query).success(function(data){
          q.resolve(data.precio);
          
          
        }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("Error al consular el costo aproximado");
                $ionicLoading.hide();
            });
        
        return q.promise;
    };



     
    
    return service;
})


.factory('cotizacionData', function($q, $http,$ionicLoading){
    var service = {};
    
   
     service.cotizar = function(email,telefono,nombre) {
        var q = $q.defer();
        var query = 'http://www.mvvtech.com/arca/controller/tarea.php?op=53&usuarioEmail='+email+'&pasajeros='+localStorage.getItem("pasajeros")+'&fechaInicio='+localStorage.getItem("datesalida")+'&destino='+localStorage.getItem("destino")+'&usuarioTelefono='+telefono+'&usuarioNombre='+nombre;
        console.log(query);

        $http.get(query).success(function(data){
          q.resolve(data);
          
          
        }).error(function(err) {
            console.log(err);
                console.log("error en la conexion");
                alert("Error");
                $ionicLoading.hide();
            });
        
        return q.promise;
    };



     
    
    return service;
})