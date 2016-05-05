$('document').ready ()->
    checkPhone=()->
        cellphone=$()
    titleAni=()->
        $("#titleText").show()
        $("#titleText").textillate {
            in:{
                effect:'fadeInRight',
                shuffle:true,
                delay:50
            },
            callback:introAni
        }
    successAni=()->
        $("#textSuccess").show()
        $("#textSuccess").textillate {
            in:{
                effect:'fadeInRight',
                shuffle:true,
                delay:50
            }
        }
    introAni=()->
        $("#middleIntro").fadeIn()
        $('#text').textillate {
            in:{
                effect:'fadeInRight',
                shuffle:true,
                delay:50
            }
        }
    titleAni()

angular.module 'register',[]
registerController=()->
    vm=this

angular.module('register').controller "registerController",registerController
