api=impress()
api.init()
action="http://erp.iflying.com/common/user/login"
$ "#gotologin"
    .click ()->
        $('input.username').select()
$ "button.submit"
    .click ()->
        username=$('input.username').attr('value')
        password=$("input.password").attr('value')
        userdata=
            userName: username
            pwd: password
        $ 'button.loading'
            .show()
        $ 'button.submit'
            .hide()
        $.post action,userdata,(response)->
            data=$.parseJSON(response)
            if data.code==700
                window.location.href="http://erp.iflying.com"
            else
                $ 'button.submit'
                    .show()
