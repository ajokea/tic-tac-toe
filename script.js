const gameBoard = (function () {
    const board = [['', '', ''], ['', '', ''], ['', '', '']];
    
    const getBoard = () => board;

    const printBoard = () => {
        for (let row of board) {
            console.log(`${row[0]} ${row[1]} ${row[2]}`)
        }
    }

    const markBoard = (player, position) => {
        switch (position) {
            case 1:
                if (!board[0][0]) {
                    board[0][0] = player.symbol;
                    break;
                }
                return false;
            case 2:
                if (!board[0][1]) {
                    board[0][1] = player.symbol;
                    break;
                }
                return false;
            case 3:
                if (!board[0][2]) {
                    board[0][2] = player.symbol;
                    break;
                }
                return false;
            case 4:
                if (!board[1][0]) {
                    board[1][0] = player.symbol;
                    break;
                }
                return false;
            case 5:
                if (!board[1][1]) {
                    board[1][1] = player.symbol;
                    break;
                }
                return false;
            case 6:
                if (!board[1][2]) {
                    board[1][2] = player.symbol;
                    break;
                }
                return false;
            case 7:
                if (!board[2][0]) {
                    board[2][0] = player.symbol;
                    break;
                }
                return false;
            case 8:
                if (!board[2][1]) {
                    board[2][1] = player.symbol;
                    break;
                }
                return false;
            case 9:
                if (!board[2][2]) {
                    board[2][2] = player.symbol;
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
                 state[0] == player.symbol) {
                return true;
            }
        }
        return false;
    }

    const clearBoard = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = '';
            }
        }
    }
    
    return { getBoard, printBoard, markBoard, checkWin, clearBoard };
})();

const Player = function (name, symbol) {
    let wins = 0;
    const getWins = () => wins;
    const winGame = () => wins++;
    
    return { name, symbol, getWins, winGame };
}

const game = (function () {
    const player1 = Player("Player 1", 'X');
    const player2 = Player("Player 2", 'O');

    let activePlayer = player1;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const playRound = (position) => {
        if (gameBoard.markBoard(activePlayer, position) == false) {
            console.log("Choose an unoccupied position!");
        } else {
            gameBoard.printBoard();
            if (gameBoard.checkWin(activePlayer)) {
                console.log(`${activePlayer.name} wins!`)
                activePlayer.winGame();
                console.log(`Score: ${activePlayer.name}-${activePlayer.getWins()}, ${activePlayer == player1 ? player2.name : player1.name}-${activePlayer == player1 ? player2.getWins() : player1.getWins()}`)
                gameBoard.clearBoard();
            } else {
                switchPlayerTurn();
            }
        }
    }

    return { playRound, activePlayer }

})();

const displayController = (function () {
    const boardDiv = document.querySelector('.board');
    const updateScreen = () => {
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
    }

    updateScreen();

    boardDiv.addEventListener('click', (event) => {
        if (event.target.matches('.cell')) {
            let cell = event.target;
            let position = cell.dataset.position;
            game.playRound(parseInt(position));
            updateScreen();
        }
    })

})();
