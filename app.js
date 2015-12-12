var colors = require('colors');
var fs = require('fs');
var player = require('play-sound')(opts = {})

var taskCount = {};

var updateDateTaskCount = function(dateString) {
  if (dateString in taskCount) {
    taskCount[dateString] ++;
  } else {
    taskCount[dateString] = 1;
  }
}

fs.readFile('report.txt', function(err, data) {
  if (err) data = '';
  data = data.toString();
  var lines = data.split('\n');
  for (var i = 0; i<lines.length; i+=2) {
    if (i+1 >= lines.length) break;
    var dateString = lines[i]; 
    var date = new Date(dateString);
    dateString = date.toDateString();
    var task = lines[i+1];
    updateDateTaskCount(dateString);
  }
  startApplication();
});


var startApplication = function() {
  console.log('Note:'.cyan+' Max task name length = 200 | Minimum timer = 1 minute');

  var readline = require('readline');

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var formatNumber = function(a) {
    if (a > 9) return '' + a;
    return '0' + a;
  }

  var div = function(a, b) {
    return Math.floor(a/b);
  }

  var updateConsoleLine = function(str) {
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);  // move cursor to beginning of lin
    process.stdout.write(str);
  }

  var setTimer = function(totalSec, timerTitle, callback) {
    var sec = 0;
    process.stdout.write(timerTitle + '00:00'.bold.cyan);
    var timer = setInterval(function() {
      sec++;
      if (sec == totalSec) {
        clearInterval(timer);
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);  // move cursor to beginning of lin
        callback();
        return;
      }
      var s = sec;
      var h = div(s, 3600);
      s = s % 3600;
      var m = div(s, 60);
      s = s % 60;
      var timeString = '';
      if (h > 0) timeString = formatNumber(h) + ':' + formatNumber(m) + ':' + formatNumber(s);
      else timeString = formatNumber(m) + ':' + formatNumber(s);
      updateConsoleLine(timerTitle + timeString.bold.cyan);
    }, 1000);
  }

  var getMinute = function(defaultMinute, minMinute, minute) {
    var numberOfMin = parseInt(minute);
    if (isNaN(numberOfMin)) numberOfMin = defaultMinute;
    if (numberOfMin < minMinute) numberOfMin = minMinute;
    return numberOfMin;
  }

  var startPomodori = function(date, task, min) {
    setTimer(min*60, 'Working time: ', function() {
      fs.appendFile('report.txt', date.toString() + '\n' + task + ' in ' + min + ' minute(s)', function(err) {
        if (err) {
          console.log('Error: '.red + err);
        }
        updateDateTaskCount(date.toDateString());
        player.play('ending.mp3', function(err){}) // $ mplayer foo.mp3  
        var now = new Date();
        var dateString = now.toDateString();
        if (dateString in taskCount) {
          var count = taskCount[dateString];
          if (count > 0) {
            console.log('Great! You have done ' + ('' + count + ' task(s)').cyan + ' today!\n');
          }  
        }

        rl.question('How long to rest? (default 5 min): ', function(restTime) {
          var numberOfMin = getMinute(5, 1, restTime);
          console.log('Start resting in ' + ('' + numberOfMin +' minute(s)').yellow);
          setTimer(numberOfMin*60, 'Resting: ', function() {
            player.play('ending.mp3', function(err){}) // $ mplayer foo.mp3  
            console.log('');
            nextPomodori();
          });
        })
        
      });
    })

  }

  var nextPomodori = function() {
    rl.question('What is your next task? (continue working): ', function(task) {
      if (task.length < 2) {
        task = 'Continue working';
      }
      if (task.length > 200) {
        task = task.substring(0,200);
      }
      rl.question('How long will you do it? (in minute - default 25 min): ', function(min) {
        var numberOfMin = getMinute(25, 1, min);
        console.log('Starting pomodori ' + task.bold.green + ' in ' + ('' + numberOfMin + ' minute(s)').yellow);
        startPomodori(new Date(), task, numberOfMin);
      })
    })
  }

  nextPomodori();
}