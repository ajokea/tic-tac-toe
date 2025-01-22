const gameBoard = (function () {
    const board = [['', '', ''], ['', '', ''], ['', '', '']];
    
    const getBoard = () => board;

    const markBoard = (player, position) => {
        switch (position) {
            case 1:
                if (!board[0][0]) {
                    board[0][0] = player.getSymbol();
                    break;
                }
                return false;
            case 2:
                if (!board[0][1]) {
                    board[0][1] = player.getSymbol();
                    break;
                }
                return false;
            case 3:
                if (!board[0][2]) {
                    board[0][2] = player.getSymbol();
                    break;
                }
                return false;
            case 4:
                if (!board[1][0]) {
                    board[1][0] = player.getSymbol();
                    break;
                }
                return false;
            case 5:
                if (!board[1][1]) {
                    board[1][1] = player.getSymbol();
                    break;
                }
                return false;
            case 6:
                if (!board[1][2]) {
                    board[1][2] = player.getSymbol();
                    break;
                }
                return false;
            case 7:
                if (!board[2][0]) {
                    board[2][0] = player.getSymbol();
                    break;
                }
                return false;
            case 8:
                if (!board[2][1]) {
                    board[2][1] = player.getSymbol();
                    break;
                }
                return false;
            case 9:
                if (!board[2][2]) {
                    board[2][2] = player.getSymbol();
                    break;
                }
                return false;
        }
    }

    const winStates = () => 
        [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ];

    const checkWin = (player) => {
        for (let state of winStates()) {
            if (state[0] == state[1] &&
                 state[0] == state[2] &&
                 state[1] == state[2] &&
                 state[0] == player.getSymbol()) {
                return true;
            }
        }
        return false;
    }

    const checkTie = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] == '') {
                    return false;
                }
            }
        }
        return true;
    }

    const clearBoard = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = '';
            }
        }
    }
    
    return { getBoard, markBoard, checkWin, checkTie, clearBoard };
})();

const Player = function (name, symbol) {
    const getName = () => name;

    const getSymbol = () => symbol;

    let wins = 0;
    const getWins = () => wins;
    const winGame = () => wins++;
    
    return { getName, getSymbol, getWins, winGame };
}

const Game = function (name1, name2) {
    const player1 = Player(name1, 'X');
    const player2 = Player(name2, 'O');

    let activePlayer = player1;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    let roundOver = false;
    const isRoundOver = () => roundOver;
    const newRound = () => roundOver = false;

    let winner;
    const getWinner = () => winner;

    const playTurn = (position) => {
        if (gameBoard.markBoard(activePlayer, position) != false) {
            if (gameBoard.checkWin(activePlayer)) {
                activePlayer.winGame();
                roundOver = true;
                winner = activePlayer;
            } else if (gameBoard.checkTie()) {
                roundOver = true;
                winner = null;
                switchPlayerTurn();
            } else {
                switchPlayerTurn();
            }
        }
    }

    return { playTurn, isRoundOver, newRound, player1, player2, getWinner };

}

const displayController = (function () {
    let game;
    const body = document.querySelector('body');

    const title = document.createElement('h1');
    title.textContent = "Tic Tac Toe!"
    
    const nameForm = document.createElement('form');

    const player1FormDiv = document.createElement('div');
    const player1FormLabel = document.createElement('label');
    player1FormLabel.setAttribute('for', 'player1');
    player1FormLabel.textContent = "Player 1:";
    player1FormDiv.appendChild(player1FormLabel);
    const player1FormInput = document.createElement('input');
    player1FormInput.type = 'text';
    player1FormInput.name = 'player1';
    player1FormInput.id = 'player1';
    player1FormInput.value = 'Player 1';
    player1FormDiv.appendChild(player1FormInput);
    nameForm.appendChild(player1FormDiv);

    const player2FormDiv = document.createElement('div');
    const player2FormLabel = document.createElement('label');
    player2FormLabel.setAttribute('for', 'player2');
    player2FormLabel.textContent = "Player 2:";
    player2FormDiv.appendChild(player2FormLabel);
    const player2FormInput = document.createElement('input');
    player2FormInput.type = 'text';
    player2FormInput.name = 'player2';
    player2FormInput.id = 'player2';
    player2FormInput.value = 'Player 2';
    player2FormDiv.appendChild(player2FormInput);
    nameForm.appendChild(player2FormDiv);
    
    const startButtonDiv = document.createElement('div');
    const startButton = document.createElement('button');
    startButton.textContent = "Start";
    startButtonDiv.appendChild(startButton);
    nameForm.appendChild(startButtonDiv);

    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
    const player1Score = document.createElement('h1');
    scoreDiv.appendChild(player1Score);
    const player2Score = document.createElement('h1');
    scoreDiv.appendChild(player2Score);

    const boardDiv = document.createElement('div');
    boardDiv.classList.add('board');

    const playAgainText = document.createElement('h1');

    const roundOverButtonDiv = document.createElement('div');

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = "YES";
    roundOverButtonDiv.appendChild(playAgainButton);
    
    const endGameButton = document.createElement('button');
    endGameButton.textContent = "NO";
    roundOverButtonDiv.appendChild(endGameButton);

    const displayStartScreen = () => {
        body.appendChild(title);
        body.appendChild(nameForm);
    }

    const updatePlayScreen = () => {
        boardDiv.innerHTML = '';

        let position = 1;
        gameBoard.getBoard().forEach(row => {
            row.forEach(col => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-position', position++);
                cell.innerText = col;
                boardDiv.appendChild(cell);
            })
        });

        if (game.isRoundOver()) {
            player1Score.textContent = `${game.player1.getName()}: ${game.player1.getWins()}`;
            player2Score.textContent = `${game.player2.getName()}: ${game.player2.getWins()}`;
            displayRoundOverScreen();
        }
    }

    const boardClickHandler = (event) => {
        if (event.target.matches('.cell')) {
            let cell = event.target;
            let position = cell.dataset.position;
            game.playTurn(parseInt(position));
            updatePlayScreen();
        }
    }

    const displayPlayScreen = () => {
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const playerNames = Object.fromEntries(formData);
        let name1 = playerNames['player1'];
        let name2 = playerNames['player2'];
        game = Game(name1, name2);
        
        body.innerHTML = '';
        player1Score.textContent = `${game.player1.getName()}: ${game.player1.getWins()}`;
        player2Score.textContent = `${game.player2.getName()}: ${game.player2.getWins()}`;
        body.appendChild(scoreDiv);
        boardDiv.addEventListener('click', boardClickHandler);
        body.appendChild(boardDiv);
        updatePlayScreen();
    }
    startButton.addEventListener('click', displayPlayScreen);
    
    const playAgainHandler = () => {
        game.newRound();
        gameBoard.clearBoard();
        updatePlayScreen();
        boardDiv.addEventListener('click', boardClickHandler);
        body.removeChild(playAgainText);
        body.removeChild(roundOverButtonDiv);
    }

    const endGameHandler = () => {
        gameBoard.clearBoard();
        body.removeChild(playAgainText);
        body.removeChild(roundOverButtonDiv);
        body.removeChild(scoreDiv);
        body.removeChild(boardDiv);
        displayStartScreen();
    }

    const displayRoundOverScreen = () => {
        boardDiv.removeEventListener('click', boardClickHandler);
        body.prepend(roundOverButtonDiv);
        let result = game.getWinner() ? `${game.getWinner().getName()} wins!` : "It's a tie!";
        playAgainText.textContent = `${result} Play again?`
        body.prepend(playAgainText);

        playAgainButton.addEventListener('click', playAgainHandler);
        endGameButton.addEventListener('click', endGameHandler);
    }

    displayStartScreen();
})();
