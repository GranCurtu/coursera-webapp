/*
* The code is write in ecm6 like syntax becasue i'm used to it
* */


(function(){

'use strict'

angular.module('LunchCheck',[])

.controller('LunchSizeController',LunchSizeController)

  LunchSizeController.$inject = ['$scope']
  function LunchSizeController($scope){
    $scope.lunch = ''
    $scope.message = ''
    $scope.messageStyle = 'none'

    $scope.displayMessage = function(){

      let lunchSize = calculateLunchSize($scope.lunch)

      if(lunchSize===0){
        $scope.message = 'Please enter data first'
        $scope.messageStyle ='danger'
        return
      }

      $scope.messageStyle ='success'
      if(lunchSize<= 3){
        $scope.message = 'Enjoy!'
        return
      }

      $scope.message = 'Too much!'

    }

    function calculateLunchSize(lunch){
      /*
      * CONSIDERATION: I don't consider empty/whitespace as lunch objects.
      * i.e. ", ,   , " is consider as empty and i.e. "some, ,thing, good" will display 'Enjoi!'
      * */

      let reg = /\s*,\s*/ //this regular expression is used to simplify whitespace
      let lunchList = $scope.lunch.split(reg)


      let empties = 0
      //this for counts the whitespaces (empties) on the array
      for(const elem of lunchList){
        if(elem.length ===0)
          empties = empties+1
      }

      //the size of the lunch list is equal to valid items or all items less whitespaces
      return lunchList.length-empties
    }

  }
})()