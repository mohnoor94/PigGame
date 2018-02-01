/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice = -1,
    winScore;

init();

// Using Anonymous Function
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var dice = 1 + Math.floor(Math.random() * 6);


        if (dice === 6 && previousDice === 6) {
            previousDice = -1;
            updatePlayerScore(activePlayer, 0);
            togglePlayers();
        } else
            previousDice = dice;

        document.getElementById('dice').style.display = 'block';
        document.getElementById('dice').src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            togglePlayers();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= setWinScore()) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else togglePlayers();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    setWinScore();

    updatePlayerScore(0, 0);
    updatePlayerScore(1, 0);
    resetCurrentScores();
    document.getElementById('dice').style.display = 'none';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function togglePlayers() {
    activePlayer = (activePlayer === 0 ? 1 : 0);
    roundScore = 0;
    resetCurrentScores();
    document.querySelector('div.player-0-panel').classList.toggle('active');
    document.querySelector('div.player-1-panel').classList.toggle('active');
    document.getElementById('dice').style.display = 'none';
}

function updatePlayerScore(playerId, score) {
    scores[playerId] = score;
    document.getElementById('score-' + playerId).textContent = score;
}

function resetCurrentScores() {
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
}

function setWinScore() {
    winScore = document.querySelector('.final-score').value;
    // Undefined, 0, null, "" are coerced to false
    if (!winScore) {
        winScore = 100;
    }
    return winScore;
}



// Notes:
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>' +dice + '</em>';

//document.querySelector('#current-'+activePlayer).textContent = dice;

//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.add('active');
