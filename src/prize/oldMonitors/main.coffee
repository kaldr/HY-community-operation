$ document
  .ready () ->
    prizeCount = 118
    currentValue = 100
    index = 0
    odometer = new Odometer({
        auto: true
        el: $('#numbers')[0]
        value: 10200
        animation: 'slide'
        format: "(ddd)"
        duration: 6000
        theme: 'train-station'
      } )
    odometerResult = new Odometer({
        auto: false
        el: $('#result')[0]
        value: 10200
        format: "(ddd)"
        animation: 'slide'
        duration: 500
        theme: 'train-station'
      } )
    odometer.render()

    updateValue = () ->
      nextValue = Math.floor(Math.random() * (10200 - 10001) + 10001)
      odometer.update nextValue
      currentValue = nextValue

    prizes = []
    generatePrizes = () ->
      prizes = []
      for i in [0...400]
        value = Math.floor(Math.random() * (10200 - 10001) + 10001)
        if prizes.indexOf value == - 1
          prizes.push value
        if prizes.length == prizeCount
          break
      console.log prizes
    $('#left').html prizeCount - index

    generatePrizes()
    flag = true

    interval = () ->
      if flag
        setInterval updateValue, 1000
        flag = false

    clearPanel = () ->
      $("#luckers .panel-body span").remove()

    appendResults = (noList) ->
      appendLabel = (nmb) ->
        if nmb>-1
          str = '<span class="label label-danger">'+nmb+'</span>'
          $("#luckers .panel-body").append str
      noList.forEach appendLabel

    $ "#start"
      .click () ->
        interval()
        $("#waiting").hide()
        $(".stop").show()
        $("#start").hide()
        $("#numbers").show()
        $("#result").hide()
        if prizeCount - index == 0
          $('#left').html prizeCount

    $ ".stop"
      .click () ->
        $("#luckers").show()
        $("#start").show()
        $(".stop").hide()
        $("#numbers").hide()
        $("#result").show()
        odometerResult.update currentValue
        $('#left').html (prizeCount - index - 1)
        odometerResult.update prizes[index]
        cuno = parseInt $(this).attr('counts')
        len = index + cuno
        console.log len
        list = []
        for i in [index...len]
          list.push prizes[i]
        clearPanel()
        appendResults list
        index += cuno
        if index >= prizeCount
          index = 0
          generatePrizes()
