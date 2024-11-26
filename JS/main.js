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
const controlButtons = document.getElementById('control-buttons');

/*----- event listeners -----*/
//button clicks
startButton.addEventListener('click', init);


/*----- functions -----*/
function init(){
    controlButtons.style.visibility = 'hidden';
    puppycatArr = [];
    playerArr = [];
    rounds = 0;
}