var CommunityOPMessageAPIUrl, GetMemberListFromAPI, GetMessageSentHistory, MessageModel, MessageSentHistoryAPIUrl, SaveMessageSentHistoryAPIUrl, SendMessageAPIUrl, SendMessages, SenderController, request, toMessageNumber;

request = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: function(data) {
    return $.param(data);
  }
};

CommunityOPMessageAPIUrl = 'http://communityop.iflying.com/communication/Message/';

SendMessageAPIUrl = '';

MessageSentHistoryAPIUrl = CommunityOPMessageAPIUrl + 'getMessageSentHistory';

SaveMessageSentHistoryAPIUrl = CommunityOPMessageAPIUrl + 'saveMessageSentHistory';

MessageModel = {
  'Hanlin': {
    userid: '000000000000000000000114',
    username: '俞瑶',
    departmentid: '000000000000000000000817',
    url: 'http://115.29.222.6:86/Club/HLLY/SeachKey?Duties=0&interest=&province=0&city=0&Key=&area=0&limit=1000&offset=0&sort=id&order=desc',
    clubName: '翰林旅院',
    clubID: 156
  }
};

angular.module('sender', []);

SenderController = function(GetMemberListFromAPI, SendMessages, GetMessageSentHistory) {
  var vm;
  vm = this;

  /*
  1.1设置
   */
  vm.setClub = function(clubName) {
    vm.club = MessageModel[clubName];
    vm.getMessageHistory();
    return vm.getMemberCellphoneList();
  };
  vm.activate = function() {
    return false;
  };

  /*
  1.2 消息发送处理
   */
  vm.sendMessage = function() {

    /*
    定义与方法
     */
    var checkMessageContent, checkMessageHistory;
    console.log("hello");
    checkMessageContent = function() {};
    return checkMessageHistory = function() {};

    /*
    流程
     */
  };
  vm.getMessageHistory = function() {
    var saveHistoryToScope;
    saveHistoryToScope = function(response) {
      return vm.sentHistory = response.data;
    };
    return GetMessageSentHistory(vm.club.clubID, saveHistoryToScope);
  };
  vm.getMemberCellphoneList = function() {
    var saveMemberCellphoneListToScope;
    saveMemberCellphoneListToScope = function(response) {
      var checkPhoneNumber;
      checkPhoneNumber = function(item) {};
      return console.log(response);
    };
    return GetMemberListFromAPI(vm.club.url, saveMemberCellphoneListToScope);
  };
  false;
  return vm.activate();
};

angular.module("sender").controller('SenderController', SenderController);

GetMemberListFromAPI = function($http) {
  return function(url, callback) {
    var simpleFail, simpleSuccess;
    request.method = "GET";
    request.url = url;
    request.data = {};
    simpleSuccess = function(response) {
      return callback(response.data);
    };
    simpleFail = function(response) {
      return callback(response.data);
    };
    return $http(request).then(simpleSuccess, simpleFail);
  };
};

angular.module('sender').factory('GetMemberListFromAPI', GetMemberListFromAPI);

SendMessages = function($http) {
  return function() {
    return console.log('SendMessages');
  };
};

angular.module('sender').factory('SendMessages', SendMessages);

GetMessageSentHistory = function($http) {
  return function(clubID, callback) {
    var simpleFail, simpleSuccess;
    request.method = "GET";
    request.url = MessageSentHistoryAPIUrl + "?clubID=" + clubID;
    request.data = {};
    simpleSuccess = function(response) {
      return callback(response.data);
    };
    simpleFail = function(response) {
      return callback(response.data);
    };
    return $http(request).then(simpleSuccess, simpleFail);
  };
};

angular.module('sender').factory('GetMessageSentHistory', GetMessageSentHistory);

toMessageNumber = function() {
  return function(item) {
    return Math.ceil(item / 64);
  };
};

angular.module('sender').filter('toMessageNumber', toMessageNumber);
