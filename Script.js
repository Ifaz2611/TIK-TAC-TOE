document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");

    let currentPlayer = "X";
    let moves = 0;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        if (moves === 9) {
            return "draw";
        }

        return null;
    };

  
    const handleMove = (index) => {
        if (boardState[index] === "") {
            boardState[index] = currentPlayer;
            moves++;
            render();
            const winner = checkWinner();
            if (winner) {
                if (winner === "draw") {
                    message.innerText = "It's a draw!";
                    board.classList.add("draw");
                } else {
                    message.innerText = `${winner} wins!`;
                    board.classList.add("win");
                }
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    };


    const resetGame = () => {
        currentPlayer = "X";
        moves = 0;
        boardState = ["", "", "", "", "", "", "", "", ""];
        render();
        message.innerText = `Player ${currentPlayer}'s turn`;
        board.classList.remove("win", "draw");
    };

    const render = () => {
        board.innerHTML = "";
        boardState.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.innerText = cell;
            cellDiv.addEventListener("click", () => handleMove(index));
            board.appendChild(cellDiv);
        });
    };

   
    resetButton.addEventListener("click", resetGame);

    
    render();
    message.innerText = `Player ${currentPlayer}'s turn`;
});
