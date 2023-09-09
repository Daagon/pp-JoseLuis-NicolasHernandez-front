var app = angular.module("myapp", []);

app.controller("mainview",['$scope', '$http', function($scope, $http) {

  //Por la autenticación por parte del servidor, y por ciertos motivos del tiempo el día de hoy, no pude hacer la conexión con el server
  //enviando el token de autenticación de parte de frontend. Sin embargo, si retiro la parte de la autenticación de cada request de backend,
  //el programa funciona correctamente con cada una de las acciones que me pidieron programar y está practicamente todo hecho. Solo me hizo falta
  //investigar un poco más, y estoy completamente seguro que se lograría sin problemas.
	//09-09-09 NO MMS NO SABÍA EN ESE ENTONCES QUE EXISTÍA ANGULAR Y ANGULARJS, QUE ERAN DIFERENTES Y ESO ME HIZO PERDER MUCHO TIEMPO, PERDERME Y NO LOGRAR EL OBJETIVO...
  // Autor: José Luis Nicolás Hernández

  $scope.userData = {name:"", email:"", phoneNum: null, password: "", age: null, gender: "", hobby: "", registrationDate: null};
  $scope.bdData = {};
  $scope.byName = "";
  $scope.byHobby = "";
  $scope.dataToDelete = "";

  /*var myHeaders = new Headers();
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTk4MzM0MjQwLCJleHAiOjE1OTgzMzU2ODB9.Yw6eFib2RSFJIBGokcYu1aKddNZVTNJyFyTa4dFQTeg';
  myHeaders.append('access-token', token);
  fetch('/api/users', {
    method:'GET',
    headers: myHeaders
  })
  .then(res => res.json())
  .then(data => $scope.bdData = data.usrs);
  
  fetch('/api/newuser', {
    method:'POST',
    headers: myHeaders
  })
  .then(res => res)
  .then(data => console.log(data));*/

  var config = {headers:  {
    'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNTk4NDIzNjI1LCJleHAiOjE1OTg0MjUwNjV9.XsdCjnsA-1m-uxN62gYRsMD4QInFEmUVviu0T6hhIBo',
    'Accept': 'application/json;odata=verbose',
    "X-Testing" : "testing"
}
};

  $http.get("/api/users", config).then(function (response){
    console.log(response.data);
    $scope.bdData = response.data.usrs;
  });
  //document.getElementById('findbtn').click();

  $scope.addData = function()
  {
    $http.post("/api/newuser", $scope.userData, config).then(function (response) {
      //console.log(response.data);
    });
    $http.get("/api/users", config).then(function (response){
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
    $http.get(tmp, config).then(function (response){
      $scope.bdData = response.data.usrs;
    });
  }

  $scope.DeleteData = function()
  {
    $http.delete('/api/deleteuser/'+$scope.dataToDelete, config).then(function (response){
    });
    $http.get("/api/users", config).then(function (response){
      $scope.bdData = response.data.usrs;
    });
  }

}]);


