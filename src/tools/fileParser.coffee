fs = require 'fs'
lineReader=require 'readline'
  .createInterface
    input:
      require 'fs'
        .createReadStream './src/tools/messageForbidWords.xml'
regex=
  wordRegex:new RegExp /validate="([^"]+)"/
wordsList=[]
cb=(line)->
  words = regex.wordRegex.exec line
  if words
    #console.log words[1]
    wordsList.push words[1]
    #console.log wordsList.join ','
lineReader.on 'line',cb

lineReader.on 'close',()->
    flag=false
    for word in wordsList
      if '经纪人香港大学生'.indexOf(word)>-1
        illegalWord=word
        flag=true
      break if flag


console.log "OK" if '13455553333'.match /^1[3|8|4|5|7|9]\d{9}$/
