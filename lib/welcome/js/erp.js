var api;

api = impress();

api.init();

$(document).ready(function() {
  $("#next").click(function() {
    api.next();
    return console.log('next');
  });
  return $("#prev").click(function() {
    api.prev();
    return console.log('prev');
  });
});
