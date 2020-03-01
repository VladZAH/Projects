/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelector(".btn-rules");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    // 1. get the rando number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. Display the results
    document.querySelector('#dice-1').style.display = 'block';
    document.querySelector('#dice-2').style.display = 'block';
    document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
    document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';
    //3. Update the round core If rolled number was not ONE
    if(dice1 === 6 && dice2 === 6){
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    }else if (dice1 !== 1 && dice2 !=1) {
        //add score 
        //roundScore = roundScore + dice;
    roundScore += dice1 + dice2;       document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player
        nextPlayer();
    }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
    // add current score to the global score
    scores[activePlayer] += roundScore;
    
    //update the (UI)
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
    // check if player won the game
    var input = document.querySelector('.final-score').value;
    var winningScore;
    //undefined, 0, null, '' ARE COERCED O FALSE
    //anithing else is coerced to true
    if(input){
        winningScore = input;
    }else{
        winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore){
    document.getElementById('name-' + activePlayer).textContent = 'Winner';    
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    gamePlaying = false;
    }else{
    
    //change the active player 
    nextPlayer();
    }
    }
});

function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('#dice-1').style.display = 'none'; 
        document.querySelector('#dice-2').style.display = 'none'; 
} 


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.querySelector('#dice-1').style.display = 'none';
document.querySelector('#dice-2').style.display = 'none';
    
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
gamePlaying = true;
}






















//dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<>'; 

//var x = document.querySelector('#score-0').textContent;
//console.log(x);