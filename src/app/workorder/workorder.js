/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

angular.module('wfm-mobile.workorders', [
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider
    .state('app.workorders', {
        url: '/workorders',
        templateUrl: 'app/workorder/workorder-list.tpl.html',
        controller: 'WorkordersCtrl as ctrl',
        resolve: {
          workorders: function(workorderManager) {
            return workorderManager.list();
          },
          resultMap: function(resultManager) {
            return resultManager.list()
            .then(function(results) {
              var map = {};
              results.forEach(function(result) {
                map[result.workorderId] = result;
              });
              return map;
            })
          }
        }
      })
})

.controller('WorkordersCtrl', function($scope, $filter, workorders, resultMap) {
  var self = this;
  self.workorders = workorders;
  self.resultMap = resultMap;
})

;

module.exports = 'wfm-mobile.workorders';
