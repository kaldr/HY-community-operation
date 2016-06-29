#====================================================================
# 一、基本定义
#====================================================================
# 1.ngRequest转变为常用request
request = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    } ,
    transformRequest: (data) ->
        $.param(data)
}
# 2.所有API的配置
SendMessageAPIUrl=''
MemberListAPIUrl=''
MessageHistoryCheckAPIUrl=''

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
    GetMemberListFromAPI,
    SendMessages,
    CheckMessageHistoryStatus)->
    #定义----------------------------------------------------
    vm=this

    #方法----------------------------------------------------
    vm.sendMessage=sendMessage

    #流程----------------------------------------------------
    activate()#初始化
    activate=(userid='000000000000000000000114',departmentid='000000000000000000000817')->
        vm.userid=userid
        vm.departmentid=departmentid
    sendMessage=()->

angular.module "sender"
    .controller 'SenderController',SenderController


#====================================================================
# 四、angular factory
#====================================================================

# 获取用户列表，返回手机数组
GetMemberListFromAPI=($http)->
    false
angular.module 'sender'
    .factory 'GetMemberListFromAPI',GetMemberListFromAPI

# 发送信息
SendMessages=($http)->
angular.module 'sender'
    .factory 'SendMessages',SendMessages

# 检查消息发送历史
CheckMessageHistoryStatus=($http)->
angular.module 'sender'
    .factory 'CheckMessageHistoryStatus',CheckMessageHistoryStatus

#====================================================================
# 五、angular filter
#====================================================================

#====================================================================
# 六、angular directive
#====================================================================
