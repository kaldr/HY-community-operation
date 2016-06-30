var CommunityOPMessageAPIUrl, GetMemberListFromAPI, GetMessageSentHistory, MSGchunk, MessageModel, MessageSentHistoryAPIUrl, SaveMessageSentHistoryAPIUrl, SendMessageAPIUrl, SendMessages, SenderController, request, toMessageNumber;

request = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: function(data) {
    return $.param(data);
  }
};

CommunityOPMessageAPIUrl = 'http://communityop.iflying.com/communication/Message/';

SendMessageAPIUrl = "http://115.29.222.6:8888/" + 'BasicData/SystemOperation/AddSMSRequest';

MessageSentHistoryAPIUrl = CommunityOPMessageAPIUrl + 'getMessageSentHistory';

SaveMessageSentHistoryAPIUrl = CommunityOPMessageAPIUrl + 'saveMessageSentHistory';

MSGchunk = 200;

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

SenderController = function($filter, $rootScope, GetMemberListFromAPI, SendMessages, GetMessageSentHistory) {
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
    var checkMessageContent, send;
    checkMessageContent = function() {
      if ($filter("toMessageNumber")(vm.content.length) < 4) {
        return true;
      } else {
        return false;
      }
    };
    send = function() {
      var APIdata, Basicdata, MSGdata, chunk, data, members, saveSentHistoryToScope;
      vm.sending = true;
      Basicdata = {
        content: vm.content,
        userID: vm.club.userid,
        userName: vm.club.username,
        clubID: vm.club.clubID,
        clubName: vm.club.clubName,
        departmentid: vm.club.departmentid,
        membersCount: vm.sendList.length,
        sending: true,
        time: new Date().getTime() / 1000,
        sendTime: {
          sec: new Date().getTime() / 1000
        }
      };
      APIdata = _.clone(Basicdata);
      APIdata.members = vm.simpleMemberList;
      MSGdata = [];
      chunk = MSGchunk;
      members = _.clone(vm.sendList);
      while (members.length) {
        data = _.clone(Basicdata);
        data.members = members.splice(0, chunk);
        MSGdata.push(data);
      }
      vm.sentHistory.push(Basicdata);
      vm.currentTab = 2;
      saveSentHistoryToScope = function() {
        Basicdata.sending = false;
        return vm.sending = false;
      };
      return SendMessages(MSGdata, APIdata, saveSentHistoryToScope);
    };

    /*
    流程
     */
    if (checkMessageContent()) {
      return vm.getMemberCellphoneList(send);
    }
  };
  vm.getMessageHistory = function() {
    var saveHistoryToScope;
    saveHistoryToScope = function(response) {
      return vm.sentHistory = response.data;
    };
    return GetMessageSentHistory(vm.club.clubID, saveHistoryToScope);
  };
  vm.getMemberCellphoneList = function(callback) {
    var saveMemberCellphoneListToScope;
    vm.sending = true;
    saveMemberCellphoneListToScope = function(response) {
      var checkPhoneNumber;
      vm.sendList = [];
      vm.cantSendList = [];
      vm.simpleMemberList = [];
      checkPhoneNumber = function(item) {
        var ref;
        if (((ref = item.Cellphone) != null ? ref.length : void 0) === 11) {
          vm.sendList.push(item.Cellphone);
          return vm.simpleMemberList.push({
            id: item.ID,
            Cellphone: item.Cellphone,
            name: item.HName
          });
        } else {
          return vm.cantSendList.push(item);
        }
      };
      vm.memberList = response.rows;
      vm.memberCount = response.total;
      vm.memberList.forEach(checkPhoneNumber);
      if (typeof callback === "function") {
        callback();
      }
      console.log(vm.cantSendList);
      return vm.sending = false;
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
  return function(MSGdata, APIdata, callback) {
    var data, erpRequest, i, index, len, message, r, requests, results, simpleFail, simpleSuccess;
    simpleSuccess = function(response) {
      return typeof callback === "function" ? callback(response.data) : void 0;
    };
    simpleFail = function(response) {
      return typeof callback === "function" ? callback(response.data) : void 0;
    };
    erpRequest = angular.copy(request);
    erpRequest.method = 'POST';
    erpRequest.url = SaveMessageSentHistoryAPIUrl;
    erpRequest.data = APIdata;
    $http(erpRequest).then(simpleSuccess, simpleFail);
    requests = [];
    results = [];
    for (index = i = 0, len = MSGdata.length; i < len; index = ++i) {
      data = MSGdata[index];
      console.log(data);
      r = angular.copy(request);
      r.method = "POST";
      r.url = SendMessageAPIUrl;
      message = {};
      message.OperationMobile = data.members.join(',');
      message.OperationNotes = data.content;
      message.OperationTypeID = 2;
      message.OrderID = 0;
      message.SMSOrderStatus = 3;
      message.ValidateSign = 31;
      r.data = {
        SMSRecord: JSON.stringify(message)
      };
      requests.push(r);
      results.push($http(requests[index]).then(simpleSuccess, simpleFail));
    }
    return results;
  };
};


/*
angular.module("disney").factory("sendDisneyMessage", sendDisneyMessage);

function sendDisneyMessage($http) {
  return func;

  function func(params, callback) {
    var api = dreamFlyUrl + "BasicData/SystemOperation/AddSMSRequest";
    request.url = api;
    request.method = "POST";
    request.data = {
      SMSRecord: JSON.stringify(params)
    };
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {

    }
  }
}
 */

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
