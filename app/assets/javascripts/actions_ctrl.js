/* global angular */

(function() {
  angular.module("app").controller("actionsCtrl", function($scope, $http) {
    $scope.setup = function() {
      $http.get('/api/v1/checkpoint_actions').then(function(response) {
        $scope.checkpointActions = response.data;
        $scope.orderAttribute = 'date';
        $scope.isOrderDescending = true;
        $scope.progressPercent = 30;
      });
    };
    
    $scope.toggleComplete = function(inputCheckpointAction) {

      var params = {
        action_id: inputCheckpointAction.action_id,
        status: "Complete",
        description: inputCheckpointAction.description,
        date: inputCheckpointAction.date,
        user_bill_id: inputCheckpointAction.user_bill_id,
      };
      $http.patch('/api/v1/checkpoint_actions/' + inputCheckpointAction.id, params).then(function(response) {
        var index = $scope.checkpointActions.indexOf(inputCheckpointAction);
        $scope.checkpointActions.splice(index, 1);
      }, function(error) {
        $scope.errors = error.data.errors;
      });
    };


    $scope.changeOrderAttribute = function(inputAttribute) {
      console.log(inputAttribute);
      if (inputAttribute === $scope.orderAttribute) {
        $scope.isOrderDescending = !$scope.isOrderDescending;
      } else {
        $scope.isOrderDescending = false;
      }
      $scope.orderAttribute = inputAttribute;
    };

    $scope.getSortIcon = function(inputAttribute) {
      if (inputAttribute === $scope.orderAttribute) {
        if ($scope.isOrderDescending) {
          return '\u2193';
        } else {
          return '\u2191';
        }
      } else {
        return '';
      }
    };

    $scope.orderRecords = function() {
      var order = $scope.isOrderDescending ? '-' : '';
      return order + $scope.orderAttribute;
    };
    
    window.$scope = $scope;
  });
})();