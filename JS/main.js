/*----- constants -----*/
const Audio1 = new Audio('https://dl.dropbox.com/scl/fi/zy36v0h1dp6ijns9hukhw/puppycat1.MP3?rlkey=uhf5i2u442fvkvz9mkbb97reu&st=4apa0sd1&dl=0');
const Audio2 = new Audio('https://dl.dropbox.com/scl/fi/ftmj9zqar341tuks94bwt/puppycat2.MP3?rlkey=c5nkvf39ymd360ovodqrg1od9&st=xdq7j2rg&dl=0');
const Audio3 = new Audio('https://dl.dropbox.com/scl/fi/hg7h0k9bbyhghtemhnn4u/puppycat3.MP3?rlkey=gvz13ta228rqmi3i2mzktck9a&st=wt3wb3x1&dl=0');
const Audio4 = new Audio('https://dl.dropbox.com/scl/fi/ua8v1pq3r6btv11do5xbl/puppycat4.MP3?rlkey=xb169dsjmye0a736j40y8ldmd&st=4cmddnak&dl=0');

const gameButtons = [1, 2, 3, 4,];

/*----- state variables -----*/
let rounds;
let computerArr;
let playerArr;
let turn;

/*----- cached elements  -----*/
// const buttons;
// const turnEl;
const messageEl = document.getElementById('turn-display');
const startButton = document.getElementById('start-game');
const howButton = document.getElementById('how-to-play');
const controlButtons = document.getElementById('control-buttons');
const replayButton = document.getElementById('replay-button');
// const btnSpans = document.getElementsByClassName('choice-button');

/*----- event listeners -----*/
//button clicks
startButton.addEventListener('click', init);
document.querySelector('#board').addEventListener('click', handlePlayerMove);
replayButton.addEventListener('click', init);
//audio played, 'ended' then run the push to array?

/*----- functions -----*/
function init() {
    controlButtons.style.display = 'none';
    replayButton.style.visibility = 'hidden';
    document.getElementById("board").classList.add("disabled");
    document.getElementById("body").classList.add("wrapper");
    computerArr = [];
    playerArr = [];
    rounds = 0;
    turn = 'computer';
    render();
}

function render() {
    while (computerArr.length < 4) {    
        renderComputerMoves();
    }
    renderComputerMoves();
    renderCompSound();
    renderMessage();
}

function renderComputerMoves() {
    const btnIdx = (Math.floor(Math.random() * gameButtons.length+1));
    computerArr.push(`b${btnIdx}`);
}

function renderCompSound() {
    let i = 0;
    function playNext() {
        if (i >= computerArr.length) {
            turn = 'player';
            document.getElementById("board").classList.remove("disabled");
            document.getElementById("body").classList.remove("wrapper");
            renderMessage();
            return;
        }

        const computerClick = document.getElementById(computerArr[i]);
        const compSound = playAudioChoice(computerClick.id);
        computerClick.style.backgroundColor = 'red';
        compSound.play();
        setTimeout(() => computerClick.style.backgroundColor = '', 500);

        compSound.onended = () => {
            i++;
            playNext();
        };
    }

    playNext(); 
}

function playAudioChoice(compClickId) {
    switch (compClickId) {
        case 'b1': return Audio1;
        case 'b2': return Audio2;
        case 'b3': return Audio3;
        case 'b4': return Audio4;
    }
}

function handlePlayerMove(evt) {
    let clickedBtn = evt.target.id;
   //guard for clicking outside button
   if (clickedBtn === 'board') return;
   //guard for if game hasn't starter and/or don't show elements until game starts
   if (playerArr === undefined) return;
   //Switch Statement for sound
    if (turn === 'player') {
        const noise = playAudioChoice(clickedBtn);
        noise.play();
        noise.onended = () => {
            playerArr.push(clickedBtn);
            compareArrays();
        if (compareArrays() === true && playerArr.length === computerArr.length) {
            playerArr = [];
            document.getElementById("board").classList.add("disabled");
            document.getElementById("body").classList.add("wrapper");
            console.log('computers turn now');
            setTimeout(()=>{
            turn = 'computer';
            render();
        }, 1500);
        } else if (compareArrays() !== true) {
            turn = 'null';
            renderMessage();
        }
    };
}}

function compareArrays() {
    for (let i = 0; i < playerArr.length; i++){
        if (playerArr[i] !== computerArr[i]) {
            return false; // Mismatch found
        }
    }
    return true; // All moves match so far
}

function renderMessage() {
    if (turn === 'computer') {
        messageEl.innerText = `It's PuppyCat's Turn!`;
    } else if (turn === 'player') {
        messageEl.innerText = `It's Your Turn!`;
    } else {
        messageEl.innerHTML = `Try again next time!`;
        replayButton.style.visibility = 'visible';
    }
}