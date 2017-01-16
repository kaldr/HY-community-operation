(function() {
  $(document).ready(function() {
    var appendResults, clearPanel, currentValue, flag, generatePrizes, index, interval, odometer, odometerResult, prizeCount, prizes, updateValue;
    prizeCount = 125;
    currentValue = 100;
    index = 0;
    odometer = new Odometer({
      auto: true,
      el: $('#numbers')[0],
      value: 88200,
      animation: 'slide',
      format: "(ddd)",
      duration: 6000,
      theme: 'train-station'
    });
    odometerResult = new Odometer({
      auto: false,
      el: $('#result')[0],
      value: 88200,
      format: "(ddd)",
      animation: 'slide',
      duration: 200,
      theme: 'train-station'
    });
    odometer.render();
    updateValue = function() {
      var nextValue;
      nextValue = Math.floor(Math.random() * (88200 - 88001) + 88001);
      odometer.update(nextValue);
      return currentValue = nextValue;
    };
    prizes = [];
    generatePrizes = function() {
      var i, j, value;
      prizes = [];
      for (i = j = 0; j < 400; i = ++j) {
        value = Math.floor(Math.random() * (88200 - 88001) + 88001);
        if (prizes.indexOf(value === -1)) {
          prizes.push(value);
        }
        if (prizes.length === prizeCount) {
          break;
        }
      }
      return console.log(prizes);
    };
    $('#left').html(prizeCount - index);
    generatePrizes();
    flag = true;
    interval = function() {
      if (flag) {
        setInterval(updateValue, 1000);
        return flag = false;
      }
    };
    clearPanel = function() {
      return $("#luckers .panel-body span").remove();
    };
    appendResults = function(noList) {
      var appendLabel, id, showPrize;
      id = 0;
      showPrize = function() {
        return $("#luckers .panel-body #label" + id).fadeIn(function() {
          console.log(id);
          id++;
          if (id < noList.length) {
            return setTimeout(function() {
              odometerResult.update(noList[id]);
              return setTimeout(showPrize, 900);
            }, 900);
          }
        });
      };
      appendLabel = function(nmb, index) {
        var str;
        if (nmb > -1) {
          str = '<span id="label' + index + '" style="display:none" class="label label-danger">' + nmb + '</span>';
          return $("#luckers .panel-body").append(str);
        }
      };
      noList.forEach(appendLabel);
      odometerResult.update(noList[id]);
      return setTimeout(showPrize, 1500);
    };
    $("#start").click(function() {
      interval();
      $("#waiting").hide();
      $(".stop").show();
      $("#start").hide();
      $("#numbers").show();
      $("#result").hide();
      if (prizeCount - index === 0) {
        return $('#left').html(prizeCount);
      }
    });
    return $(".stop").click(function() {
      var cuno, i, j, len, list, ref, ref1;
      $("#luckers").show();
      $("#start").show();
      $(".stop").hide();
      $("#numbers").hide();
      $("#result").show();
      odometerResult.update(currentValue);
      $('#left').html(prizeCount - index - 1);
      odometerResult.update(prizes[index]);
      cuno = parseInt($(this).attr('counts'));
      len = index + cuno;
      console.log(len);
      list = [];
      for (i = j = ref = index, ref1 = len; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
        list.push(prizes[i]);
      }
      clearPanel();
      appendResults(list);
      index += cuno;
      if (index >= prizeCount) {
        index = 0;
        return generatePrizes();
      }
    });
  });

}).call(this);
