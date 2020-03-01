(function application(){
var numberOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById('colorDisplay');
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.getElementById("reset");
var modeBtns = document.querySelectorAll(".mode");

init();

function init(){
	setupModeBtns();
	setupSquares();
	reset();
};

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener('click', function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				message.textContent = "CORECT";
				resetBtn.textContent = 'PLAY AGAIN';
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetBtn.textContent = 'PLAY AGAIN';
			}else{
			this.style.backgroundColor = '#232323';
			message.textContent = "TRY AGAIN";
			}	
		});
	}
};

function setupModeBtns(){
	resetBtn.addEventListener("click", reset);
	for(var i = 0; i < modeBtns.length; i++){
		modeBtns[i].addEventListener("click", function(){
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "EASY" ? numberOfSquares = 3 : numberOfSquares = 6;
			reset();
		});
	}
};

function reset(){
	colors = generateRandom(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetBtn.textContent = "NEW COLORS";
	message.textContent = "";
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor =  colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = 'steelblue';
};


function changeColors(clr){
for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = clr;
}
};

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
};

function generateRandom(num){
	arr = [];
	for (var i = 0; i < num; i++){
		arr.push(randomColor());
	};
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
};
}());