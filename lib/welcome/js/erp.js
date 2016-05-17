var action, api, submit;

api = impress();

api.init();

action = "http://erp.iflying.com/common/user/login";

$("#gotologin").click(function() {
  return $('input.username').select();
});

submit = function() {
  var password, userdata, username;
  username = $('input.username').attr('value');
  password = $("input.password").attr('value');
  userdata = {
    userName: username,
    pwd: password
  };
  $('button.loading').show();
  $('button.submit').hide();
  return $.post(action, userdata, function(response) {
    var data;
    data = $.parseJSON(response);
    if (data.code === 700) {
      return window.location.href = "http://erp.iflying.com";
    } else {
      return $('button.submit').show();
    }
  });
};

$("button.submit").click(submit);

$("form").submit(submit);
