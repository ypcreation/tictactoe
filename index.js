document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const turnMessage = document.getElementById('turn-message');
    const restartBtn = document.getElementById('restart-btn');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const resultMessage = document.getElementById('result-message');
    const closePopupBtn = document.getElementById('close-popup');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Function to check if the game is won
    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        if (!boardState.includes('')) {
            return 'draw';
        }

        return null;
    };

    // Function to handle cell click
    const handleCellClick = (index) => {
        if (!gameActive || boardState[index] !== '') {
            return;
        }

        boardState[index] = currentPlayer;
        renderBoard();

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            showResultPopup(winner);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnMessage.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    // Function to render the game board
    const renderBoard = () => {
        board.innerHTML = '';
        boardState.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value;
            cell.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cell);
        });
    };

    // Function to restart the game
    const restartGame = () => {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        turnMessage.textContent = `Player ${currentPlayer}'s turn`;
        renderBoard();
        overlay.style.display = 'none';
    };

    // Function to show the result popup
    const showResultPopup = (result) => {
        if (result === 'draw') {
            resultMessage.textContent = 'It\'s a draw!';
        } else {
            resultMessage.textContent = `Player ${result} wins!`;
        }

        overlay.style.display = 'flex';
    };

    // Event listeners
    restartBtn.addEventListener('click', restartGame);
    closePopupBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        restartGame();
    });

    // Initial rendering
    renderBoard();
});
