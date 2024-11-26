/*----- constants -----*/
const Audio1 = '';
const Audio2 = '';
const Audio3 = '';
const Audio4 = '';

/*----- state variables -----*/
let rounds;
let puppycatArr;
let playerArr;


/*----- cached elements  -----*/
// const buttons;
// const turnEl;
// const messageEl;
const startButton = document.getElementById('start-game');
const howButton = document.getElementById('how-to-play');
const controlButtons = document.getElementById('control-buttons');

/*----- event listeners -----*/
//button clicks
startButton.addEventListener('click', init);


/*----- functions -----*/
function init() {
    controlButtons.style.display = 'none';
    computerArr = [];
    playerArr = [];
    rounds = 0;
    render();
}

function render() {
    renderComputerMoves();
    renderComputerPlay();
    renderMessage();
}

function renderComputerMoves() {
    //if array is empty, add 5
    //else add 1
}

function renderComputerPlay() {
    //Play sequence of sounds/colors for puppy cat choices
    //Player turn
}

function renderMessage() {
    //if player moves = puppycat moves
        //puppycat turn
    //if player move != puppy cat
        //Display lose message
        //show replay section button
}





function handleMove() {
   //if clicked, make sound/color and add to array 
   //for each move, check against puppycat array
}