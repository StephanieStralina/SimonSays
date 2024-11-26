/*----- constants -----*/
const Audio1 = new Audio('https://dl.dropbox.com/scl/fi/ua8v1pq3r6btv11do5xbl/puppycat4.MP3?rlkey=xb169dsjmye0a736j40y8ldmd&st=fqii7oyd&dl=0');
const Audio2 = new Audio('https://dl.dropbox.com/scl/fi/ftmj9zqar341tuks94bwt/puppycat2.MP3?rlkey=c5nkvf39ymd360ovodqrg1od9&st=xdq7j2rg&dl=0');
const Audio3 = new Audio('https://dl.dropbox.com/scl/fi/hg7h0k9bbyhghtemhnn4u/puppycat3.MP3?rlkey=gvz13ta228rqmi3i2mzktck9a&st=wt3wb3x1&dl=0');
const Audio4 = new Audio('https://dl.dropbox.com/scl/fi/ua8v1pq3r6btv11do5xbl/puppycat4.MP3?rlkey=xb169dsjmye0a736j40y8ldmd&st=4cmddnak&dl=0');

const gameButtons = {
    1: {},
    2: {},
    3: {},
    4: {},
}

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
document.querySelector('#board').addEventListener('click', handleMove);

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
    if (computerArr.length === 0) {
        console.log('computer array empty');
    }
}

function renderComputerPlay() {
    //Play sequence of sounds/colors for puppy cat choices
        //for each item in array, handleMove sounds/colors
    //Player turn
}

function renderMessage() {
    //if player moves = puppycat moves
        //puppycat turn
    //if player move != puppy cat
        //Display lose message
        //show replay section button
}


function handleMove(evt) {
   //if clicked, make sound/color and add to array 
   //for each move, check against puppycat array
   if (evt.target.id === 'board') return;
   //handler for if game hasn't starter and/or don't show elements until game starts
   if (rounds === undefined) return;
   //Switch Statement
   switch (evt.target.id) {
    case 'b1': 
        Audio1.play();
        break;
    case 'b2':
        Audio2.play();
        break;
    case 'b3':
        Audio3.play();
        break;
    case 'b4':
        Audio4.play();
        break;
   }
}