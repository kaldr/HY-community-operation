// Generated by CoffeeScript 1.12.7
$(document).ready(function() {
  var appendResults, clearPanel, currentValue, flag, generatePrizeSeats, generatePrizes, index, interval, odometer, odometerResult, prizeCount, prizes, updateValue;
  prizeCount = 281;
  currentValue = 100;
  index = 0;
  odometer = new Odometer({
    auto: true,
    el: $('#numbers')[0],
    value: 822023,
    animation: 'slide',
    format: "(ddd)",
    duration: 6000,
    theme: 'train-station'
  });
  odometerResult = new Odometer({
    auto: false,
    el: $('#result')[0],
    value: 822023,
    format: "(ddd)",
    animation: 'slide',
    duration: 200,
    theme: 'train-station'
  });
  odometer.render();
  updateValue = function() {
    var nextValue;
    nextValue = Math.floor(Math.random() * 18023 + 804001);
    odometer.update(nextValue);
    return currentValue = nextValue;
  };
  prizes = [];
  generatePrizeSeats = function(prizeSeatsCountPerLine) {
    var seats;
    seats = [];
    _.map(prizeSeatsCountPerLine, function(lineCount, lineNo) {
      var end, range, start;
      if (lineCount > 0) {
        start = 800000 + lineNo * 1000 + 1;
        end = start + lineCount;
        range = _.range(start, end, 1);
        return _.map(range, (function(_this) {
          return function(item) {
            return seats.push(item);
          };
        })(this));
      }
    });
    return seats;
  };
  generatePrizes = function() {
    var i, j, prizeSeatsCountPerLine, seats, value;
    prizeSeatsCountPerLine = [0, 0, 0, 0, 0, 36, 36, 36, 40, 41, 41, 41, 40, 38, 38, 37, 37, 35, 36, 34, 0, 0, 0];
    seats = generatePrizeSeats(prizeSeatsCountPerLine);
    prizes = [];
    for (i = j = 0; j < 10000; i = ++j) {
      value = seats[Math.floor(Math.random() * prizeCount)];
      if (prizes.indexOf(value === -1)) {
        prizes.push(value);
      }
      prizes = _.uniq(prizes);
      if (prizes.length === prizeCount) {
        break;
      }
    }
    return this.prizes = prizes;
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
    var appendLabel, id, labelName, showPrize;
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
    labelName = function(number) {
      var line, seat;
      seat = number % 100;
      line = Math.floor(number / 1000 - 800);
      return line + "排" + seat + "座";
    };
    appendLabel = function(nmb, index) {
      var str;
      if (nmb > -1) {
        str = '<span id="label' + index + '" style="display:none" class="label label-danger">' + labelName(nmb) + '</span>';
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