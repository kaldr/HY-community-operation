#====================================================================
# 一、基本定义
#====================================================================
# 1.$http用到的参数，其中将$http所需变量转变为常用request，其余两个方法是简单回调
request = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    } ,
    transformRequest: (data) ->
        $.param(data)
}

# 2.所有API的配置
CommunityOPMessageAPIUrl='http://communityop.iflying.com/communication/Message/'
SendMessageAPIUrl="http://115.29.222.6:8888/"+'BasicData/SystemOperation/AddSMSRequest'
MessageSentHistoryAPIUrl=CommunityOPMessageAPIUrl+'getMessageSentHistory'
SaveMessageSentHistoryAPIUrl=CommunityOPMessageAPIUrl+'saveMessageSentHistory'
MSGchunk=200#筑通规定只能发200条/每次
MessageModel=
    'Hanlin':
        userid:'000000000000000000000114'
        username:'俞瑶'
        departmentid:'000000000000000000000817'
        url:'http://115.29.222.6:86/Club/HLLY/SeachKey?Duties=0&interest=&province=0&city=0&Key=&area=0&limit=1000&offset=0&sort=id&order=desc'
        clubName:'翰林旅院'
        clubID:156
#====================================================================
# 二、angular module
#====================================================================

# sender module
angular.module 'sender',[]


#====================================================================
# 三、angular controller
#====================================================================

# 发送控制器
SenderController=(
    #注入----------------------------------------------------
    $filter,
    $rootScope,
    GetMemberListFromAPI,
    SendMessages,
    GetMessageSentHistory)->
    #定义----------------------------------------------------
    vm=this
    #1方法----------------------------------------------------

    ###
    1.1设置
    ###

    #1.1.1 设置俱乐部
    vm.setClub=(clubName)->
        vm.club=MessageModel[clubName]
        vm.getMessageHistory()#1.2.2 获取消息群发的历史记录
        vm.getMemberCellphoneList()#1.2.3获取发送消息列表
    #1.1.2 初始化控制器
    vm.activate=()->
        false
    ###
    1.2 消息发送处理
    ###

    #1.2.1 发送消息
    vm.sendMessage=()->
        ###
        定义与方法
        ###

        #1.2.1.1验证短信内容字数，并且对短信进行附加内容处理
        checkMessageContent=()->
            if $filter("toMessageNumber")(vm.content.length)<4 then true else false
        #1.2.1.2发送短信
        send=()->
            vm.sending=true
            #基础数据
            Basicdata=
                content:vm.content
                userID:vm.club.userid
                userName:vm.club.username
                clubID:vm.club.clubID
                clubName:vm.club.clubName
                departmentid:vm.club.departmentid
                membersCount:vm.sendList.length
                sending:true
                time:new Date().getTime()/1000
                sendTime:
                    sec:new Date().getTime()/1000
            #对ERP接口所需数据赋值
            APIdata=_.clone Basicdata
            APIdata.members=vm.simpleMemberList
            #对短信接口需要的数据进行赋值
            MSGdata=[]
            chunk=MSGchunk
            members=_.clone vm.sendList
            while members.length
                data=_.clone Basicdata
                data.members = members.splice 0,chunk
                MSGdata.push data
            #发送短信成功后的回调函数
            vm.sentHistory.push Basicdata
            vm.currentTab=2
            saveSentHistoryToScope=()->
                Basicdata.sending=false
                vm.sending=false
            SendMessages MSGdata,APIdata,saveSentHistoryToScope

        ###
        流程
        ###
        vm.getMemberCellphoneList(send) if checkMessageContent()

    #1.2.2 获取发送历史记录
    vm.getMessageHistory=()->
        saveHistoryToScope=(response)->
            vm.sentHistory=response.data;
        GetMessageSentHistory vm.club.clubID,saveHistoryToScope

    #1.2.3获取发送消息列表，并且进行手机号验证，排除所有错误手机号
    vm.getMemberCellphoneList=(callback)->
        vm.sending=true
        saveMemberCellphoneListToScope=(response)->
            vm.sendList=[]
            vm.cantSendList=[]
            vm.simpleMemberList=[]
            checkPhoneNumber=(item)->
                if item.Cellphone?.length==11
                    vm.sendList.push item.Cellphone
                    vm.simpleMemberList.push {id:item.ID,Cellphone:item.Cellphone,name:item.HName}
                else
                    vm.cantSendList.push item
            vm.memberList=response.rows
            vm.memberCount=response.total
            vm.memberList.forEach checkPhoneNumber
            callback?()
            console.log vm.cantSendList
            vm.sending=false
        GetMemberListFromAPI vm.club.url,saveMemberCellphoneListToScope
    false
    #绑定控制器方法与流程----------------------------------------------------

    vm.activate()#1.1.2初始化

angular.module "sender"
    .controller 'SenderController',SenderController


#====================================================================
# 四、angular factory
#====================================================================

# 获取用户列表，返回手机数组
GetMemberListFromAPI=($http)->
    (url,callback)->
        request.method = "GET"
        request.url = url
        request.data = {}
        simpleSuccess=(response)->
            callback response.data
        simpleFail=(response)->
            callback response.data
        $http request
            .then simpleSuccess,simpleFail
angular.module 'sender'
    .factory 'GetMemberListFromAPI',GetMemberListFromAPI

# 发送信息
SendMessages=($http)->
    (MSGdata,APIdata,callback)->
        simpleSuccess=(response)->
            callback? response.data
        simpleFail=(response)->
            callback? response.data
        #发送到ERP接口
        erpRequest=angular.copy request
        erpRequest.method='POST'
        erpRequest.url=SaveMessageSentHistoryAPIUrl
        erpRequest.data=APIdata
        $http erpRequest
            .then simpleSuccess,simpleFail
        #发送到短信接口
        requests=[]
        for data,index in MSGdata
            console.log data
            r=angular.copy request
            r.method="POST"
            r.url=SendMessageAPIUrl
            message={}
            message.OperationMobile=data.members.join ','
            message.OperationNotes=data.content
            message.OperationTypeID= 2
            message.OrderID=0
            message.SMSOrderStatus= 3
            message.ValidateSign=31
            r.data=
                SMSRecord:JSON.stringify message
            requests.push r
            $http requests[index]
                .then simpleSuccess,simpleFail
###
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
###

angular.module 'sender'
    .factory 'SendMessages',SendMessages

# 检查消息发送历史
GetMessageSentHistory=($http)->
    (clubID,callback)->
        request.method = "GET"
        request.url = MessageSentHistoryAPIUrl+"?clubID="+clubID
        request.data = {}
        simpleSuccess=(response)->
            callback response.data
        simpleFail=(response)->
            callback response.data
        $http request
            .then simpleSuccess,simpleFail
angular.module 'sender'
    .factory 'GetMessageSentHistory',GetMessageSentHistory

#====================================================================
# 五、angular filter
#====================================================================
toMessageNumber=()->
    (item)->
        Math.ceil item/64
angular.module 'sender'
    .filter 'toMessageNumber',toMessageNumber
#====================================================================
# 六、angular directive
#====================================================================
