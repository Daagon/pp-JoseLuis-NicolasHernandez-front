var app = angular.module("myapp", []);

app.controller("mainview",['$scope', '$http', function($scope, $http) {

  //Por la autenticación por parte del servidor, y por ciertos motivos del tiempo el día de hoy, no pude hacer la conexión con el server
  //enviando el token de autenticación de parte de frontend. Sin embargo, si retiro la parte de la autenticación de cada request de backend,
  //el programa funciona correctamente con cada una de las acciones que me pidieron programar y está practicamente todo hecho. Solo me hizo falta
  //investigar un poco más, y estoy completamente seguro que se lograría sin problemas.
  // Autor: José Luis Nicolás Hernández

  $scope.userData = {name:"", email:"", phoneNum: null, password: "", age: null, gender: "", hobby: "", registrationDate: null};
  $scope.bdData = {};
  $scope.byName = "";
  $scope.byHobby = "";
  $scope.dataToDelete = "";

  $http.get("/api/users").then(function (response){
    $scope.bdData = response.data.usrs;
    //console.log($scope.bdData);
  });

  $scope.addData = function()
  {
    $http.post("/api/newuser", $scope.userData).then(function (response) {
      //console.log(response.data);
    });
    $http.get("/api/users").then(function (response){
      $scope.bdData = response.data.usrs;
      //console.log($scope.bdData);
    });
  }

  $scope.FindBy = function()
  {
    var tmp;
    if($scope.byName == "" && $scope.byHobby == "")
    {
      tmp = "/api/users";
    }
    else if($scope.byName != "" && $scope.byHobby == "")
    {
      tmp = "/api/users?type=name&parameter="+$scope.byName;
    }
    else if($scope.byHobby != "" && $scope.byName == "")
    {
      tmp = "/api/users?type=hobby&parameter="+$scope.byHobby;
    }
    else if($scope.byHobby != "" && $scope.byName != "")
    {
      tmp = "/api/users?type=hobby&parameter="+$scope.byHobby+"&type2=name&parameter="+$scope.byName;
    }
    $http.get(tmp).then(function (response){
      $scope.bdData = response.data.usrs;
    });
  }

  $scope.DeleteData = function()
  {
    $http.delete('/api/deleteuser/'+$scope.dataToDelete).then(function (response){
    });
    $http.get("/api/users").then(function (response){
      $scope.bdData = response.data.usrs;
    });
  }

}]);


