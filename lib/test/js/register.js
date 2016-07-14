var accesslogData, activityAPI, registerController, request;

activityAPI = 'http://communityop.iflying.com/activity/common/ActivityAPI/';

request = {
  method: "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: function(data) {
    return $.param(data);
  }
};

accesslogData = {
  activity: "邵飞国母亲节送流量活动",
  height: $(window).height(),
  width: $(window).width()
};

$.post('http://erp.iflying.com/common/Access/getUserAccessLog', accesslogData);

$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd;
    animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    return $(this).addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
      return typeof callback === "function" ? callback() : void 0;
    });
  }
});

angular.module('register', ['ngCookies']);

registerController = function(userJoinActivity, getUserList, $scope, $rootScope, $cookies) {
  var activate, checkAge, checkPhone, checkUserStatus, getUsers, joinGame, removeAnimate, saveUserToCookie, showSuccessIcon, showSuccessText, successCallback, vm;
  vm = this;
  vm.loading = false;
  vm.activityID = '572c39a48695557942311544';
  vm.user = {
    activityID: vm.activityID
  };
  vm.end = true;
  checkAge = function() {
    var $ageinput;
    $ageinput = $('#join form #ageInput').removeClass('animated').removeClass('shake');
    if ($scope.form.age.$error.required) {
      $ageinput.removeClass('animated').removeClass('shake').animateCss('shake');
      return false;
    }
    return true;
  };
  vm.checkAge = checkAge;
  showSuccessText = function() {
    $('#successText').show().textillate({
      "in": {
        effect: 'zoomIn',
        shuffle: true,
        delay: 10
      }
    });
    return false;
  };
  showSuccessIcon = function() {
    $("#successIcon").show().animateCss("bounceIn", showSuccessText);
    return false;
  };
  successCallback = function(response) {
    if (response.code === 700) {
      vm.registered = true;
      showSuccessIcon();
      $cookies.put('cellphone', vm.cellphone);
      return false;
    }
  };
  joinGame = function() {
    var $btn, ageOK, phoneOK;
    phoneOK = checkPhone();
    ageOK = checkAge();
    if (phoneOK && ageOK) {
      vm.user.cellphone = vm.cellphone;
      vm.user.age = vm.age;
      console.log('in this');
      $btn = $('.button');
      $btn.button("loading");
      userJoinActivity(vm.user, successCallback);
    }
    return false;
  };
  vm.joinGame = joinGame;
  checkUserStatus = function() {
    var cellphone;
    cellphone = $cookies.get("cellphone");
    console.log(cellphone);
    if (cellphone) {
      vm.registered = true;
      showSuccessIcon();
    }
    return false;
  };
  vm.checkUserStatus = checkUserStatus;
  getUsers = function() {
    var data, loadUserToScreen;
    data = {
      activityID: vm.activityID
    };
    loadUserToScreen = function(response) {
      vm.users = response.data;
      return console.log(response);
    };
    getUserList(data, loadUserToScreen);
    return false;
  };
  vm.getUsers = getUsers;
  saveUserToCookie = function() {
    return false;
  };
  vm.saveUserToCookie = saveUserToCookie;
  removeAnimate = function() {
    $('#join form #input').removeClass('animated').removeClass('shake');
    return false;
  };
  vm.removeAnimate = removeAnimate;
  checkPhone = function() {
    var $input;
    $input = $('#join form #input');
    if ($scope.form.cellphone.$error.required || $scope.form.cellphone.$error.cellphone) {
      $input.removeClass('animated').removeClass('shake').animateCss('shake');
      return false;
    }
    return true;
  };
  vm.checkPhone = checkPhone;
  activate = function() {
    var buttonAni, inputAni, introAni, successAni, titleAni;
    titleAni = function() {
      $("#titleText").show();
      return $("#titleText").textillate({
        "in": {
          effect: 'zoomInDown',
          shuffle: true,
          delay: 50
        }
      });
    };
    successAni = function() {
      $("#textSuccess").show();
      return $("#textSuccess").textillate({
        "in": {
          effect: 'zoomInDown',
          shuffle: true,
          delay: 50
        }
      });
    };
    introAni = function() {
      $('#introtext1').show();
      $('#introtext1').textillate({
        "in": {
          effect: 'rotateInUpLeft',
          delay: 50
        }
      });
      $('#introtext2').show();
      return $('#introtext2').textillate({
        "in": {
          effect: 'rotateInUpLeft',
          delay: 50
        }
      });
    };
    buttonAni = function() {
      return $('.button').animateCss('bounceIn');
    };
    inputAni = function() {
      return $('input').focus();
    };
    titleAni();
    return checkUserStatus();
  };
  activate();
  return false;
};

angular.module('register').controller("registerController", registerController);

angular.module('register').factory('getUserList', function($http) {
  return function(data, callback) {
    var failCallback, successCallback;
    request.method = "POST";
    request.url = activityAPI + "getActivityUsers";
    request.data = data;
    successCallback = function(data, status, headers, config) {
      return callback(data.data);
    };
    failCallback = successCallback;
    $http(request).then(successCallback, failCallback);
    return false;
  };
});

angular.module("register").factory('userJoinActivity', function($http) {
  return function(data, callback) {
    var failCallback, successCallback;
    request.method = "POST";
    request.url = activityAPI + "bindUserToActivity";
    request.data = data;
    successCallback = function(data, status, headers, config) {
      return callback(data.data);
    };
    failCallback = successCallback;
    $http(request).then(successCallback, failCallback);
    return false;
  };
});
