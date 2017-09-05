const states = {
	'WORK': 'WORK',
	'SHORT': 'SHORT_BREAK',
	'LONG': 'LONG_BREAK'
};

var curr_state = 'WORK';
var workCircle = 0;
var PAUSED = true;
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');

function stateClockInit(state) {
  minutes.innerHTML = document.getElementById(state.toLowerCase()).innerHTML;
  seconds.innerHTML = '00';
}

function startState(){
  stateClockInit(curr_state);
  switch(curr_state){
		case 'WORK':
			workCircle++;
			timer(function(){changeState();});
			break;
		case 'SHORT':
      timer(function(){changeState();});
			break;
		case 'LONG':
			workCircle = 0;
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

	if(args[1] === 'plus') {
		current++;
	} else {
		current--;
		if(current < 0) current = 0;
	}
	document.getElementById(args[0]).innerHTML = current.toString();
	selectorToClock(args[0], current);
}

function timer(callback){
	var min = parseInt(minutes.innerHTML);
	var sec = parseInt(seconds.innerHTML);
	var interval = setInterval(function(){
		if(!PAUSED){
      console.log(curr_state);
      console.log(workCircle);
			sec--;
      if(sec < 0){
        sec = 59;
        min--;
        if(min < 0){
          clearInterval(interval);
          return callback();
        }
      }
      minutes.innerHTML = min.toString().padStart(2, '0');
      seconds.innerHTML = sec.toString().padStart(2, '0');
    }
	}, 1000);
}

function clock() {
	PAUSED = !PAUSED;
}

$(document).on('ready', startState());

