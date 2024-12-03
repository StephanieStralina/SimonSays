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
const messageEl = document.getElementById('turn-display');
const startButton = document.getElementById('start-game');
const howButton = document.getElementById('how-to-play');
const controlButtons = document.getElementById('control-buttons');
const replayButton = document.getElementById('replay-button');
const roundsDisplay = document.getElementById('rounds');

/*----- event listeners -----*/
startButton.addEventListener('click', init);
replayButton.addEventListener('click', init);
document.addEventListener('keydown', typeSelect);

/*----- functions -----*/
function init() {
    document.querySelector('#board').addEventListener('click', handlePlayerMove);
    controlButtons.style.visibility = 'hidden';
    replayButton.style.visibility = 'hidden';
    document.getElementById('board').classList.add('disabled');
    document.getElementById('body').classList.add('wrapper');
    computerArr = [];
    playerArr = [];
    rounds = 0;
    turn = 'computer';
    render();
}

function render() {
    rounds++;
    roundsDisplay.innerText = `Round ${rounds}`;
    while (computerArr.length < 2) {    
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

//Async promise
async function renderCompSound() {
    let i = 0;
    while (i < computerArr.length) {
        const computerClick = document.getElementById(computerArr[i]);
        const compSound = playAudioChoice(computerClick.id);
        computerClick.style.fill = '#fff6fb';
        await playAudio(compSound); // wait for the audio to finish
        computerClick.style.fill = '';
        i++;
    }
    turn = 'player';
    document.getElementById('board').classList.remove('disabled');
    document.getElementById('body').classList.remove('wrapper');
    renderMessage();
}

function playAudio(audio) {
    return new Promise((resolve) => {
        audio.play();
        audio.onended = resolve;
    });
}

function playAudioChoice(compClickId) {
    switch (compClickId) {
        case 'b1': return Audio1;
        case 'b2': return Audio2;
        case 'b3': return Audio3;
        case 'b4': return Audio4;
    }
}

function typeSelect(evt) {
    let keyID;
    switch (evt.key) {
        case '1':
            keyID = 'b1';
            break;
        case '2':
            keyID = 'b2';
            break;
        case '3':
            keyID = 'b3';
            break;
        case '4':
            keyID = 'b4';
            break;
        default:
            return;
    }
    
    const buttonEl = document.getElementById(keyID);
    if (buttonEl) {
        const keyClick = new Event('click', { bubbles: true, cancelable: true });
        buttonEl.dispatchEvent(keyClick);
    }
}

function handlePlayerMove(evt) {
    console.log(evt);
   let clickedBtn = evt.target.id;
   let buttonEl = document.getElementById(clickedBtn);
   //guard for clicking outside button
   if (clickedBtn === 'board' || clickedBtn === '') return;
   //guard for if game hasn't starter and/or don't show elements until game starts
   if (playerArr === undefined) return;

   const playerAudio = playAudioChoice(clickedBtn);
   buttonEl.style.fill = '#fff6fb';
   playerAudio.play();
   playerAudio.onended = () => {
       buttonEl.style.fill = '';
       playerArr.push(clickedBtn);
       compareArrays();
       if (compareArrays() === true && playerArr.length === computerArr.length) {
           playerArr = [];
           document.getElementById('board').classList.add('disabled');
           document.getElementById('body').classList.add('wrapper');
           console.log('computers turn now');
           setTimeout(()=>{
                turn = 'computer';
                render();
            }, 800);
       } else if (compareArrays() !== true) {
           turn = 'null';
           renderMessage();
       }
    }
}

function compareArrays() {
    for (let i = 0; i < playerArr.length; i++){
        if (playerArr[i] !== computerArr[i]) {
            return false;
        }
    }
    return true;
}

function renderMessage() {
    if (turn === 'computer') {
        messageEl.innerText = `It's PuppyCat's Turn!`;
    } else if (turn === 'player') {
        messageEl.innerText = `It's Your Turn!`;
    } else {
        messageEl.innerHTML = `Try again next time!`;
        document.querySelector('#board').removeEventListener('click', handlePlayerMove);
        replayButton.style.visibility = 'visible';
    }
}
