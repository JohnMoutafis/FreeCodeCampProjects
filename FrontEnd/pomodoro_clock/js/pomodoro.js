const stateColors = {
	'WORK': ['#dc143c', '#00ff00'],
	'SHORT': ['#00ff00', '#dc143c'],
	'LONG': ['#6600ff', '#dc143c']
};

var curr_state = 'WORK';
var init_time = 0;
var workCircle = 0;
var PAUSED = true;
var clockTitle = document.getElementById('clock-title');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var clockSubtitle = document.getElementById('clock-subtitle');

function stateClockInit() {
  minutes.innerHTML = document.getElementById(curr_state.toLowerCase()).innerHTML.padStart(2, '0');
  seconds.innerHTML = '00';
}

function startState(){
  stateClockInit();
  switch(curr_state){
		case 'WORK':
			workCircle++;
			clockTitle.innerHTML = 'Work!';
			timer(function(){changeState();});
			break;
		case 'SHORT':
			clockTitle.innerHTML = 'Break...';
      timer(function(){changeState();});
			break;
		case 'LONG':
			workCircle = 0;
			clockTitle.innerHTML = 'Relax...';
			timer(function(){changeState();});
			break;
  }
}

function changeState(){
  if(curr_state === 'WORK'){
    if(workCircle !== 4){
      curr_state = 'SHORT';
    } else {
      curr_state = 'LONG';
    }
  } else {
    curr_state = 'WORK';
  }
  startState();
  return 0;
}

function selectorToClock(selectorId, curr_value){
	if(PAUSED){
		if(selectorId === curr_state.toLowerCase()){
			minutes.innerHTML = curr_value.toString().padStart(2, '0');
			seconds.innerHTML = '00';
		}
	}
}

function selectorAction(elem){
	var args = elem.id.split("-");
	var current = parseInt(document.getElementById(args[0]).innerHTML);

	if(args[0] === curr_state.toLowerCase()){
		if(!PAUSED){clock();}
	}

	if(args[1] === 'plus') {
		current++;
	} else {
		current--;
		if(current < 0) current = 0;
	}
	document.getElementById(args[0]).innerHTML = current.toString();
	selectorToClock(args[0], current);
}

function borderColor(min, sec){
	var curr_time = min*60000 + sec*1000;
	var percent = (curr_time/init_time)*100;
	document.getElementById('clock-border').style.background = 'linear-gradient('
    + stateColors[curr_state][0] + ' 0%, '
		+ stateColors[curr_state][0] + ' ' + percent + '%, '
		+ stateColors[curr_state][1] + ' ' + percent + '%, '
		+ stateColors[curr_state][1] + ' 100%)';
}

function timer(callback){
  var min, sec;
	init_time = parseInt(document.getElementById(curr_state.toLowerCase()).innerHTML)*60000;
	var interval = setInterval(function(){
    min = parseInt(minutes.innerHTML);
    sec = parseInt(seconds.innerHTML);
		if(!PAUSED){
			sec--;
      if(sec < 0){
        sec = 59;
        min--;
        if(min < 0){
          clearInterval(interval);
          return callback();
        }
      }
      borderColor(min, sec);
      minutes.innerHTML = min.toString().padStart(2, '0');
      seconds.innerHTML = sec.toString().padStart(2, '0');
    }
	}, 1000);
}

function clock() {
	PAUSED = !PAUSED;
	if(PAUSED){
		clockSubtitle.innerHTML = 'Start';
	} else {
		clockSubtitle.innerHTML = 'Pause';
	}
}

$(document).on('ready', startState());

