$ document
  .ready () ->
    prizeCount = 281
    currentValue = 100
    index = 0
    odometer = new Odometer({
        auto: true
        el: $('#numbers')[0]
        value: 822023
        animation: 'slide'
        format: "(ddd)"
        duration: 6000
        theme: 'train-station'
      } )
    odometerResult = new Odometer({
        auto: false
        el: $('#result')[0]
        value: 822023
        format: "(ddd)"
        animation: 'slide'
        duration: 200
        theme: 'train-station'
      } )
    odometer.render()

    updateValue = () ->
      nextValue = Math.floor(Math.random() * 18023 + 804001)
      odometer.update nextValue
      currentValue = nextValue

    prizes = []
    generatePrizeSeats=(prizeSeatsCountPerLine)->
      seats=[]
      _.map prizeSeatsCountPerLine,(lineCount,lineNo)->
        if lineCount>0
          start=800000+lineNo*1000+1
          end=start+lineCount
          range=_.range start,end,1
          _.map range,(item)=>seats.push item
      seats

    generatePrizes = () ->
      prizeSeatsCountPerLine=[
        0#0
        0#1排
        0#2排
        0#3排
        0#4排 33个位置
        36#5排
        36#6排
        36#7排
        40#8排
        41#9排
        41#10排
        41#11排
        40#12排
        38#13排
        38#14排
        37#15排
        37#16排
        35#17排
        36#18排
        34#19排
        0#20 34个位置
        0#21 33个位置
        0#22 23个位置
      ]

      seats=generatePrizeSeats prizeSeatsCountPerLine

      prizes = []
      for i in [0...10000]
        value = seats[Math.floor(Math.random() *prizeCount)]
        if prizes.indexOf value == - 1
          prizes.push value
        prizes = _.uniq prizes
        if prizes.length == prizeCount
          break
      this.prizes = prizes
      # console.log prizes
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

      labelName=(number)->
        seat=number%100
        line=Math.floor(number/1000-800)
        "#{line}排#{seat}座"
      appendLabel = (nmb, index) ->
        if nmb>-1

          str = '<span id="label'+index+'" style="display:none" class="label label-danger">'+labelName(nmb)+'</span>'
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
