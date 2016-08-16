var cb, fs, lineReader, regex, wordsList;

fs = require('fs');

lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./src/tools/messageForbidWords.xml')
});

regex = {
  wordRegex: new RegExp(/validate="([^"]+)"/)
};

wordsList = [];

cb = function(line) {
  var words;
  words = regex.wordRegex.exec(line);
  if (words) {
    return wordsList.push(words[1]);
  }
};

lineReader.on('line', cb);

lineReader.on('close', function() {
  var flag, i, illegalWord, len, results, word;
  flag = false;
  results = [];
  for (i = 0, len = wordsList.length; i < len; i++) {
    word = wordsList[i];
    if ('经纪人香港大学生'.indexOf(word) > -1) {
      illegalWord = word;
      flag = true;
    }
    if (flag) {
      break;
    } else {
      results.push(void 0);
    }
  }
  return results;
});

if ('13455553333'.match(/^1[3|8|4|5|7|9]\d{9}$/)) {
  console.log("OK");
}
