$ document
  .ready () ->
    prizeCount = 250
    currentValue = 100
    index = 0
    odometer = new Odometer({
        auto: true
        el: $('#numbers')[0]
        value: 88200
        animation: 'slide'
        format: "(ddd)"
        duration: 6000
        theme: 'train-station'
      } )
    odometerResult = new Odometer({
        auto: false
        el: $('#result')[0]
        value: 88200
        format: "(ddd)"
        animation: 'slide'
        duration: 200
        theme: 'train-station'
      } )
    odometer.render()

    updateValue = () ->
      nextValue = Math.floor(Math.random() * (88250 - 88001) + 88001)
      odometer.update nextValue
      currentValue = nextValue

    prizes = []
    generatePrizes = () ->
      prizes = []
      for i in [0...400]
        value = Math.floor(Math.random() * (88250 - 88001) + 88001)
        if prizes.indexOf value == - 1
          prizes.push value
        prizes = _.uniq prizes
        if prizes.length == prizeCount
          break
      this.prizes = prizes
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
      id = 0
      showPrize = () ->
        $("#luckers .panel-body #label"+id).fadeIn ()->
          console.log id
          id++
          if id < noList.length
            setTimeout () ->
              odometerResult.update noList[id]
              setTimeout showPrize, 900
            , 900


      appendLabel = (nmb, index) ->
        if nmb>-1
          str = '<span id="label'+index+'" style="display:none" class="label label-danger">'+nmb+'</span>'
          $("#luckers .panel-body").append str

      noList.forEach appendLabel
      odometerResult.update noList[id]
      setTimeout showPrize, 1500


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
