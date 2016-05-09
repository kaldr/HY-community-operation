activityAPI = 'http://communityop.iflying.com/activity/common/ActivityAPI/';
request = {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    } ,
    transformRequest: (data) ->
        $.param(data)
}
accesslogData =
    activity: "邵飞国母亲节送流量活动",
    height: $(window).height()
    width: $(window).width()

$.post 'http://erp.iflying.com/common/Access/getUserAccessLog', accesslogData

#animace css
$.fn.extend {
    animateCss: (animationName, callback) ->
        animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, () ->
            $(this).removeClass('animated ' + animationName)
            callback?()
        )
}

angular.module 'register',['ngCookies']

registerController = (userJoinActivity,getUserList, $scope, $rootScope, $cookies) ->
    vm = this
    vm.loading = false
    vm.activityID = '572c39a48695557942311544'
    vm.user =
        activityID: vm.activityID

    checkAge=()->
        $ageinput = $ '#join form #ageInput'
            .removeClass 'animated'
            .removeClass 'shake'
        if $scope.form.age.$error.required
            $ageinput.removeClass 'animated'
                .removeClass 'shake'
                .animateCss 'shake'
            return false
        true
    vm.checkAge=checkAge

    showSuccessText = () ->
        $ '#successText'
            .show()
            .textillate {
                in: {
                    effect: 'zoomIn',
                    shuffle: true,
                    delay: 10
                }
            }
        false
    showSuccessIcon = () ->
        $ "#successIcon"
            .show()
            .animateCss "bounceIn", showSuccessText
        false
    #成功加入
    successCallback = (response) ->
        if response.code == 700
            vm.registered = true

            showSuccessIcon()
            $cookies.put 'cellphone', vm.cellphone
            false
    #领取流量
    joinGame = () ->
        phoneOK=checkPhone()
        ageOK=checkAge()
        if phoneOK && ageOK
            vm.user.cellphone = vm.cellphone
            vm.user.age=vm.age
            console.log 'in this'
            $btn = $ '.button'
            $btn.button "loading"
            userJoinActivity vm.user, successCallback
        false
    vm.joinGame = joinGame

    #检查用户状态
    checkUserStatus = () ->
        cellphone = $cookies.get("cellphone")
        console.log cellphone
        if cellphone
            vm.registered = true
            showSuccessIcon()
        false
    vm.checkUserStatus = checkUserStatus

    #获取用户列表
    getUsers=()->
        data=
            activityID:vm.activityID
        loadUserToScreen=(response)->
            vm.users=response.data
            console.log response
        getUserList data,loadUserToScreen
        false
    vm.getUsers=getUsers
    #保存用户到cookie中
    saveUserToCookie = () ->
        false
    vm.saveUserToCookie = saveUserToCookie

    #删除动画类
    removeAnimate = () ->
        $ '#join form #input'
            .removeClass 'animated'
            .removeClass 'shake'
        false
    vm.removeAnimate = removeAnimate

    #检查手机状态
    checkPhone = () ->
        $input = $ '#join form #input'
        #    .removeClass 'animated'
        #    .removeClass 'shake'
        if ($scope.form.cellphone.$error.required || $scope.form.cellphone.$error.cellphone)
            $input.removeClass 'animated'
                .removeClass 'shake'
                .animateCss 'shake'
            return false
        true
    vm.checkPhone = checkPhone


    activate = () ->
        titleAni = () ->
            $("#titleText").show()
            $("#titleText").textillate {
                in: {
                    effect: 'zoomInDown',
                    shuffle: true,
                    delay: 50
                }
            }
        successAni = () ->
            $("#textSuccess").show()
            $("#textSuccess").textillate {
                in: {
                    effect: 'zoomInDown',
                    shuffle: true,
                    delay: 50
                }
            }
        introAni = () ->
            $('#introtext1').show()
            $('#introtext1').textillate {
                in: {
                    effect: 'rotateInUpLeft',
                    delay: 50
                }
            }
            $('#introtext2').show()
            $('#introtext2').textillate {
                in: {
                    effect: 'rotateInUpLeft',
                    delay: 50
                }
            }
        buttonAni = () ->
            $ '.button'
                .animateCss 'bounceIn'
        inputAni = () ->
            $ 'input'
                .focus()
            #$ "input"
            #    .animateCss 'bounceIn',buttonAni

        titleAni()
        checkUserStatus()
    activate()
    false

#控制器
angular.module 'register'
    .controller "registerController", registerController

#获取用户列表
angular.module 'register'
    .factory 'getUserList',($http)->
        (data,callback)->
            request.method = "POST";
            request.url = activityAPI + "getActivityUsers";
            request.data = data
            successCallback=(data, status, headers, config)->
                callback(data.data)
            failCallback=successCallback
            $http request
                .then successCallback,failCallback
            false
#加入活动
angular.module "register"
    .factory 'userJoinActivity', ($http) ->
        (data, callback) ->
            request.method = "POST";
            request.url = activityAPI + "bindUserToActivity";
            request.data = data
            successCallback = (data, status, headers, config) ->
                callback(data.data)
            failCallback = successCallback
            $http request
                .then successCallback, failCallback
            false
