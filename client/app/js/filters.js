goog.provide('bom.filters.module');


/**
 * @return {function}
 */
bom.filters.dateLocalize = function() {
  return function(utcDate) {
    return new Date(utcDate + 'Z').getTime();
  }
};


/**
 * Angular module
 * @type {!angular.Module}
 */
bom.filters.module = angular.module('bom.filters', [])
  .filter('dateLocalize', bom.filters.dateLocalize);
