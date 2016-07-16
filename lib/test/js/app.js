var testController;

testController = function($scope, $rootScope, getResultFactory, resultToAPIFactory) {
  var end, returnToQuestion, setQuestionWithChosen, setStartState, showAnswers, showErrorInfo, showNextQuestion, showPreviousQuestion, vm;
  returnToQuestion = function() {
    vm.questionMode = true;
    return vm.answerMode = false;
  };
  end = function() {
    vm.questionMode = false;
    return vm.answerMode = true;
  };
  showErrorInfo = function(state) {
    if (state) {
      return vm.wrong = false;
    } else {
      return vm.wrong = true;
    }
  };
  setStartState = function(questionID) {
    return vm.questions[questionID].start = true;
  };
  showNextQuestion = function(questionID) {
    return vm.currentQuestionID = vm.questions[questionID].next;
  };
  showPreviousQuestion = function(questionID) {
    return vm.currentQuestionID = vm.questions[questionID].previous;
  };
  showAnswers = function() {};
  setQuestionWithChosen = function(questionID, option) {
    switch (questionID) {
      case '1':
      case '2':
      case '3':
      case '4':
        vm.questions[questionID].chosen = option;
        vm.questions[questionID].answerState = true;
    }
    vm.questions[questionID].start = true;
    if (option === vm.questions[questionID].answer) {
      vm.questions[questionID].right = true;
    } else {
      vm.questions[questionID].right = false;
    }
    showErrorInfo(vm.questions[questionID].right);
    return console.log(vm.questions);
  };
  vm = this;
  vm.result = [1, 2, 3];
  vm.options = {
    "A": '此人健康',
    "B": '此人患有胃癌',
    "C": '此人患有肺癌'
  };
  vm.questions = {
    1: {
      title: '实验样本GZ1004的检验结果图如下，请问这例结果代表被检测人身体状况如何？',
      img: './images/a.png',
      options: vm.options,
      answer: "B",
      next: 2,
      previous: false,
      answerState: false,
      chosen: false,
      right: false,
      start: false
    },
    2: {
      title: "实验样本GZ903的检验结果图如下，请问这例结果代表被检测人身体状况如何？",
      img: './images/b.png',
      options: vm.options,
      answer: "B",
      next: 3,
      previous: 1,
      answerState: false,
      chosen: false,
      right: false,
      start: false
    },
    3: {
      title: "实验样本GCP0072的检验结果图如下，请问这例结果代表被检测人身体状况如何？",
      img: './images/c.png',
      options: vm.options,
      answer: "C",
      next: 4,
      previous: 2,
      answerState: false,
      chosen: false,
      right: false,
      start: false
    },
    4: {
      title: "实验样本GCP0221的检验结果图如下，请问这例结果代表被检测人身体状况如何？",
      img: './images/d.png',
      options: vm.options,
      answer: "A",
      next: false,
      previous: 3,
      answerState: false,
      chosen: false,
      right: false,
      start: false
    }
  };
  vm.questionMode = false;
  vm.answerMode = true;
  vm.currentQuestionID = 1;
  vm.showNextQuestion = showNextQuestion;
  vm.showAnswers = showAnswers;
  vm.setQuestionWithChosen = setQuestionWithChosen;
  vm.setStartState = setStartState;
  vm.showPreviousQuestion = showPreviousQuestion;
  vm.returnToQuestion = returnToQuestion;
  vm.end = end;
  return true;
};

angular.module('test', []);

angular.module('test').controller('testController', testController);
