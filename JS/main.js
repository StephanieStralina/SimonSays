/*----- constants -----*/
const Audio1 = new Audio('https://dl.dropbox.com/scl/fi/zy36v0h1dp6ijns9hukhw/puppycat1.MP3?rlkey=uhf5i2u442fvkvz9mkbb97reu&st=4apa0sd1&dl=0');
const Audio2 = new Audio('https://dl.dropbox.com/scl/fi/ftmj9zqar341tuks94bwt/puppycat2.MP3?rlkey=c5nkvf39ymd360ovodqrg1od9&st=xdq7j2rg&dl=0');
const Audio3 = new Audio('https://dl.dropbox.com/scl/fi/hg7h0k9bbyhghtemhnn4u/puppycat3.MP3?rlkey=gvz13ta228rqmi3i2mzktck9a&st=wt3wb3x1&dl=0');
const Audio4 = new Audio('https://dl.dropbox.com/scl/fi/ua8v1pq3r6btv11do5xbl/puppycat4.MP3?rlkey=xb169dsjmye0a736j40y8ldmd&st=4cmddnak&dl=0');

const successSound = new Audio('https://dl.dropbox.com/scl/fi/jb2vbsxxkltpgpdtb3imq/successsound.wav?rlkey=4d7ike6a6zb9sjh9cke6vepej&st=r6bgth6h&dl=0')
const loseSound = new Audio('https://dl.dropbox.com/scl/fi/tughwhfvmc0787fehk6bj/losesound.mp3?rlkey=4czstxju535u6tyzrapx7jix5&st=ombe3yf0&dl=0')
loseSound.volume = 0.2;
const victorySound = new Audio('https://dl.dropbox.com/scl/fi/i9hok3gh3t8hg90dyhwyu/victory.wav?rlkey=91es5w9oefuer5hwwm7wbk2lv&st=ay0kzq43&dl=0')

const gameButtons = [1, 2, 3, 4,];

const playerChar = document.getElementById('bee-img');
const computerChar = document.getElementById('pup-img');

/*----- state variables -----*/
let rounds;
let computerArr;
let playerArr;
let turn;
let hints;
let hintUsed;

/*----- cached elements  -----*/
const body = document.querySelector('body');
const board = document.getElementById('board');
const messageEl = document.getElementById('turn-display');
const startButton = document.getElementById('start-game');
const controlButtons = document.getElementById('control-buttons');
const replayButton = document.getElementById('replay-button');
const roundsDisplay = document.getElementById('rounds');
const modal = document.getElementById("how-to-play-modal");
const howToBtn = document.getElementById("how-to-play");
const exitBtn = document.querySelector(".close");
const highScore = document.getElementById('player-high-score');
const hintsDisp = document.getElementById('hints');
const highScoreDisp = document.getElementById('high-score');
const hintBtn = document.getElementById('hint-button');

/*----- event listeners -----*/
startButton.addEventListener('click', init);
replayButton.addEventListener('click', init);
document.getElementById('hintBtn').addEventListener('click', handleHint);
board.addEventListener('click', () => {
    hintUsed = false;
});

function removeKeyListener() {
    document.removeEventListener('keydown', typeSelect);
}
function addKeyListener() {
    document.addEventListener('keydown', typeSelect);
}

howToBtn.onclick = function () {
    modal.style.display = "block";
}

exitBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

/*----- functions -----*/
function init() {
    resetState();
    gameControls();
    setTimeout(() => {
        render();
    }, 600);
}

function resetState() {
    computerArr = [];
    playerArr = [];
    rounds = 0;
    hints = 3;
    hintUsed = false;
    turn = 'computer';
}

function gameControls() {
    board.addEventListener('click', handlePlayerMove);
    document.getElementById('hint1').style.opacity = '1';
    document.getElementById('hint2').style.opacity = '1';
    document.getElementById('hint3').style.opacity = '1';
    controlButtons.style.display = 'none';
    replayButton.style.display = 'none';
    hintsDisp.style.display = 'flex';
    highScoreDisp.style.display = 'flex';
    hintBtn.style.display = 'flex';
    board.classList.add('disabled');
    body.classList.add('wrapper');
    updateHighScore();
}

function render() {
    rounds++;
    roundsDisplay.innerText = `Round ${rounds}`;
    renderMessage();
    while (computerArr.length < 2) {
        renderComputerMoves();
    }
    renderComputerMoves();
    renderCompSound();
}

function renderComputerMoves() {
    const compBtnIdx = (Math.floor(Math.random() * gameButtons.length + 1));
    computerArr.push(`b${compBtnIdx}`);
}

async function renderCompSound() {
    let i = 0;
    while (i < computerArr.length) {
        const computerClick = document.getElementById(computerArr[i]);
        const compSound = playAudioChoice(computerClick.id);
        computerClick.style.fill = '#fff6fb';
        await playAudio(compSound);
        computerClick.style.fill = '';
        i++;
    }
    turn = 'player';
    board.classList.remove('disabled');
    body.classList.remove('wrapper');
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
    let clickedBtn = evt.target.id;
    let buttonEl = document.getElementById(clickedBtn);
    //guard for clicking outside button
    if (clickedBtn === 'board' || clickedBtn === '') return;
    //guard for if game hasn't started
    if (playerArr === undefined) return;

    const playerAudio = playAudioChoice(clickedBtn);
    buttonEl.style.fill = '#fff6fb';
    playerAudio.play();
    playerAudio.onended = () => {
        buttonEl.style.fill = '';
        playerArr.push(clickedBtn);
        compareArrays();
        if (compareArrays() === true && playerArr.length === computerArr.length) {
            removeKeyListener();
            board.classList.add('disabled');
            body.classList.add('wrapper');
            playerArr = [];
            successSound.play();
            messageEl.innerHTML = `<span style = "color: #50014c">GREAT JOB!</span>`;
            setTimeout(() => {
                turn = 'computer';
                render();
            }, 1500);
        } else if (compareArrays() !== true) {
            turn = 'null';
            renderMessage();
        }
    }
}

function compareArrays() {
    for (let i = 0; i < playerArr.length; i++) {
        if (playerArr[i] !== computerArr[i]) {
            return false;
        }
    }
    return true;
}

function renderMessage() {
    if (turn === 'computer') {
        messageEl.innerText = `It's PuppyCat's Turn!`;
        animateChar();
    } else if (turn === 'player') {
        addKeyListener();
        animateChar();
        messageEl.innerHTML = `<span style="color: #008b9b">It's Your Turn!</span>`;
    } else {
        animateChar();
        if (rounds > highScore.innerHTML) {
            victorySound.play();
            updateHighScore();
            messageEl.innerHTML = `<span style="color: #1f2c39">Great job!</span>`;
            roundsDisplay.innerHTML = `<span style="color: #ffbfa9">New High Score!</span>`;
        } else {
            loseSound.play();
            updateHighScore();
            messageEl.innerHTML = `<span style="color: #1f2c39">Try again next time!</span>`;
            roundsDisplay.innerHTML = `<span style="color: #1f2c39">You lasted <span style="color: #fff4fc">${rounds}</span> rounds</span>`;
        }
        hintBtn.style.display = 'none';
        board.removeEventListener('click', handlePlayerMove);
        removeKeyListener();
        replayButton.style.display = 'flex';
    }
}

function updateHighScore() {
    const currentHighScore = localStorage.getItem('highScore') || 0;
    if (rounds > currentHighScore) {
        localStorage.setItem('highScore', rounds);
        highScore.innerHTML = `${rounds}`;
    } else {
        highScore.innerHTML = `${currentHighScore}`;
    }
}

function handleHint() {
    //Guard for repeatedly clicking on hints or while computers turn
    if (hintUsed) return;
    if (turn === 'computer') return;
    let nextValue = computerArr[playerArr.length];
    let hintEl = document.getElementById(nextValue);
    hintEl.style.fill = '#c2fcf3';
    document.getElementById(`hint${hints}`).style.opacity = '0';
    hints--;
    hintUsed = true;
    if (hints === 0) {
        hintBtn.style.display = 'none';
    }
}

function animateChar() {
    //guard for previously applied classes in other rounds
    computerChar.classList.remove('swirl-in', 'swirl-out');
    playerChar.classList.remove('swirl-in', 'swirl-out');
    //remove animation sequence for small screens
    if (window.matchMedia("(max-width: 600px)").matches) {
        computerChar.style.opacity = '1';
        playerChar.style.opacity = '1';
    } else {
        if (rounds === 1 && turn === 'computer') {
            computerChar.classList.add('swirl-in');
        } else if (turn === 'computer') {
            playerChar.classList.add('swirl-out');
            playerChar.classList.remove('swirl-in');
            computerChar.classList.add('swirl-in');
        } else if (turn === 'player') {
            playerChar.classList.remove('swirl-out')
            computerChar.classList.add('swirl-out');
            computerChar.classList.remove('swirl-in');
            playerChar.classList.add('swirl-in');
        } else {
            computerChar.style.opacity = '1';
            playerChar.style.opacity = '1';
        }
    }
}