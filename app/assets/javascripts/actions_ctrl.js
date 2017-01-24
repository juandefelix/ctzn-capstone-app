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
    $scope.toggleComplete = function(inputCheckpointActionId, inputActionId, inputDescription, inputDate, inputUserBillId) {
      var params = {
        checkpointActionId: inputCheckpointActionId,
        actionId: inputActionId,
        status: "complete",
        description: inputDescription,
        date: inputDate,
        userBillId: inputUserBillId,
      };
      $http.patch('/api/v1/checkpoint_actions/#{userBillId}', params).then(function(response) {
        $scope.checkpointActions.push(response.data);
      }, function(error) {
        $scope.errors = error.data.errors;
      });
    };

    $scope.addCheckpointAction = function(inputActionId, inputDescription, inputDate, inputUserBillId, inputUserId) {
      var params = {
        actionId: inputActionId,
        description: inputDescription,
        date: inputDate,
        userBillId: inputUserBillId,
        userId: inputUserId,
      };
      $http.post('/api/v1/checkpoint_actions', params).then(function(response) {
        $scope.checkpointActions.push(response.data);
      }, function(error) {
        $scope.errors = error.data.errors;
      });
    };

    $scope.changeOrderAttribute = function(inputAttribute) {
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
    
    window.$scope = $scope;
  });
})();