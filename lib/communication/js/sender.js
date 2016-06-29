var CheckMessageHistoryStatus, GetMemberListFromAPI, MemberListAPIUrl, MessageHistoryCheckAPIUrl, SendMessageAPIUrl, SendMessages, SenderController, request;

request = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: function(data) {
    return $.param(data);
  }
};

SendMessageAPIUrl = '';

MemberListAPIUrl = '';

MessageHistoryCheckAPIUrl = '';

angular.module('sender', []);

SenderController = function(GetMemberListFromAPI, SendMessages, CheckMessageHistoryStatus) {
  var activate, sendMessage, vm;
  vm = this;
  vm.sendMessage = sendMessage;
  activate();
  activate = function(userid, departmentid) {
    if (userid == null) {
      userid = '000000000000000000000114';
    }
    if (departmentid == null) {
      departmentid = '000000000000000000000817';
    }
    vm.userid = userid;
    return vm.departmentid = departmentid;
  };
  return sendMessage = function() {};
};

angular.module("sender").controller('SenderController', SenderController);

GetMemberListFromAPI = function($http) {
  return false;
};

angular.module('sender').factory('GetMemberListFromAPI', GetMemberListFromAPI);

SendMessages = function($http) {};

angular.module('sender').factory('SendMessages', SendMessages);

CheckMessageHistoryStatus = function($http) {};

angular.module('sender').factory('CheckMessageHistoryStatus', CheckMessageHistoryStatus);
