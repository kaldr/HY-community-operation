var registerController;

$('document').ready(function() {
  var checkPhone, introAni, successAni, titleAni;
  checkPhone = function() {
    var cellphone;
    return cellphone = $();
  };
  titleAni = function() {
    $("#titleText").show();
    return $("#titleText").textillate({
      "in": {
        effect: 'fadeInRight',
        shuffle: true,
        delay: 50
      },
      callback: introAni
    });
  };
  successAni = function() {
    $("#textSuccess").show();
    return $("#textSuccess").textillate({
      "in": {
        effect: 'fadeInRight',
        shuffle: true,
        delay: 50
      }
    });
  };
  introAni = function() {
    $("#middleIntro").fadeIn();
    return $('#text').textillate({
      "in": {
        effect: 'fadeInRight',
        shuffle: true,
        delay: 50
      }
    });
  };
  return titleAni();
});

angular.module('register', []);

registerController = function() {
  var vm;
  return vm = this;
};

angular.module('register').controller("registerController", registerController);
