'use strict';

angular.module('bomFilters', [])
  .filter('dateLocalize', function() {
    return function (utcDate) {
      return new Date(utcDate + 'Z').getTime();
    }
  });
