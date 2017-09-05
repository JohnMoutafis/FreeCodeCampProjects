const states = {
	'WORK': 'WORK',
	'SHORT': 'SHORT_BREAK',
	'LONG': 'LONG_BREAK'
};

var state = 'WORK';
var PAUSED = true;
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');

function selectorToClock(selectorId, curr_value){
	if(PAUSED){
		if(selectorId === state.toLowerCase()){
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

function timer(){
	var min = parseInt(minutes.innerHTML);
	var sec = parseInt(seconds.innerHTML);
	var interval = setInterval(function(){
		if(!PAUSED){
			sec--;
		if(sec < 0){
			sec = 59;
			min--;
			if(min < 0){
				clearInterval(interval);
				return true;
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

$(document).ready(function(){
	var workCircle = 0;
	switch(state){
		case 'WORK':
			minutes.innerHTML = document.getElementById('work').innerHTML;
			timer();
			workCircle++;
			state = 'SHORT';
			break;
		case 'SHORT':
			if(workCircle !== 4){
				minutes.innerHTML = document.getElementById('short').innerHTML;
				timer();
				state = 'WORK';
			} else {
				state = 'LONG';
			}
			break;
		case 'LONG':
			minutes.innerHTML = document.getElementById('long').innerHTML;
			timer();
			workCircle = 0;
			state = 'WORK';
			break;
	}
});
