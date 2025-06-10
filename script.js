let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset_btn");
let newButton = document.querySelector(".new_game");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector(".msg");

let turn_o = true; // true = O's turn, false = X's turn

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Reset the game
const resetGame = () => {
    turn_o = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Add event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn_o) {
            box.innerText = "O";
            box.style.color = "black"; // O will be red
        } else {
            box.innerText = "X";
            box.style.color = "white"; // X will be blue
        }

        box.style.pointerEvents = "none"; // Prevent further clicks
        turn_o = !turn_o; // Switch turn
        checkWinner(); // Check for a winner
    });
});

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
};

// Enable all boxes and clear content
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
        box.style.color = "black"; // Reset color
    });
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `${winner} ===> is the winner!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check for winner
const checkWinner = () => {
    for (let pattern of winningCombinations) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            console.log("We have a winner ==> ", pos1);
            showWinner(pos1);
            return;
        }
    }

    // Optional: check for draw
    const allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};

// Button event listeners
newButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
