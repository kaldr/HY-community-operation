var getResultFactory, resultToAPIFactory, testController;

testController = function($scope, $rootScope, getResultFactory, resultToAPIFactory) {
  var pickAnswerForAQuestion, showAnswers, showNextQuestion, vm;
  showNextQuestion = function() {};
  showAnswers = function() {};
  pickAnswerForAQuestion = function() {};
  vm = this;
  vm.result = {};
  vm.options = {
    1: '健康人',
    2: '胃癌',
    3: ''
  };
  vm.showNextQuestion = showNextQuestion;
  vm.showAnswers = showAnswers;
  return vm.pickAnswerForAQuestion = pickAnswerForAQuestion;
};

getResultFactory = function() {};

resultToAPIFactory = function() {};

angular.module('test', []);

angular.module.controller('testController', testController);

angular.module.factory("getResultFactory", getResultFactory);

angular.module.factory('resultToAPIFactory', resultToAPIFactory);
