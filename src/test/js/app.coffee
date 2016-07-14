#Definitions
testController=($scope,$rootScope,getResultFactory,resultToAPIFactory)->
    showNextQuestion=()->
    showAnswers=()->
    pickAnswerForAQuestion=()->

    vm=this
    vm.result={}
    vm.options=
        1:'健康人'
        2:'胃癌'
        3:''
    vm.showNextQuestion=showNextQuestion
    vm.showAnswers=showAnswers
    vm.pickAnswerForAQuestion=pickAnswerForAQuestion

getResultFactory=()->
resultToAPIFactory=()->
#Angular Code
angular.module 'test',[]
angular.module.controller 'testController',testController
angular.module.factory "getResultFactory",getResultFactory
angular.module.factory 'resultToAPIFactory',resultToAPIFactory
