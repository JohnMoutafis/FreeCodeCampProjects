var tileSounds = {
	green: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
	red: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
	yellow: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
	blue: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};
var colors = ['green', 'red', 'yellow', 'blue'];
var sequence = ['blue', 'red', 'green', 'yellow'];
var turn = 0;

function shapeLight(id){
	document.getElementById(id).style.opacity = '1';
	tileSounds[id].play();
	setTimeout(function(){
			document.getElementById(id).style.opacity = '0.6';
  }, 500);
}

function shapeClick(elem){
  shapeLight(elem.id);
}

function nextTurn(){
		sequence.push(colors[Math.floor(Math.random() * 4)]);
		console.log(sequence);
		for(var item in sequence){
			shapeLight(sequence[item]);
      setTimeout(function () {
				console.log(sequence[item]);
      }, 500);
		}
}

$(document).on('ready', nextTurn());

// var simonGame = {
// 	colors: ["#green", "#red", "yellow", "blue"],
// 	soundFX: {
// 		green: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
// 		red: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
// 		yellow: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
// 		blue: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
// 	},
// 	level: 0,
// 	sequence: [],
// 	playerSequence: [],
//
// 	//Methods
// 	newGame: function(){
// 		this.turn = 0;
// 		this.sequence = [];
// 		this.playerSequence = [];
// 		this.nextLevel();
// 	},
//
// 	nextLevel: function(){
// 		this.sequence.push(this.colors[(Math.floor(Math.random() * 4))]);
// 		this.level++;
// 		for(var i = 0; i < this.sequence.length; i++){
// 			this.litShape(this.sequence[i]);
// 		}
// 	},
//
// 	litShape: function(currShape){
// 		$(currShape).addClass("lightShape");
// 		this.soundFX[currShape.slice(1)];
// 		setTimeout(function(){
// 			$(currShape).removeClass("lightShape");
// 		}, 300);
// 	}
// };
//
// $(document).ready(function(){
// 	simonGame.newGame();
// });
