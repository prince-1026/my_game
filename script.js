const pbtm = document.querySelector('#pbtm');
const hitDisplay = document.querySelector('#hitval');
const timerDisplay = document.querySelector('#timerval');
const scoreDisplay = document.querySelector('#scoreval');

const overlay = document.querySelector('#overlay');
const modalContent = document.querySelector('#modalContent');

let totalTimeDefault = 60; // seconds
let timers = totalTimeDefault;
let hitgenVal = 0;
let score = 0;
let timerInterval = null;
let isRunning = false;

// --- UI / modal helpers ---
function showModal(htmlContent) {
  modalContent.innerHTML = htmlContent;
  overlay.classList.remove('hidden');
}

function hideModal() {
  overlay.classList.add('hidden');
}

// initial modal (start screen)
showModal(`
  <h2>Bubble Game</h2>
  <p>Click below to start playing!</p>
  <button id="playBtn" class="btn">Play Game</button>
`);

// ensure overlay button works for start & later (delegate)
overlay.addEventListener('click', (e) => {
  // only handle clicks on buttons (play / play again)
  if (e.target && e.target.tagName === 'BUTTON') {
    const id = e.target.id;
    if (id === 'playBtn' || id === 'playAgainBtn') {
      startGame();
    }
  }
});

// --- bubble generation ---
function bubblegenerator() {
    // Clear existing bubbles
    pbtm.innerHTML = ''

    // Create a temporary bubble to measure size (respects CSS, including responsive rules)
    const temp = document.createElement('div')
    temp.className = 'bubble'
    temp.style.visibility = 'hidden'
    temp.style.position = 'absolute'
    pbtm.appendChild(temp)

    const bubbleW = temp.offsetWidth || 40
    const bubbleH = temp.offsetHeight || 40

    // get computed gap from CSS if available
    const style = getComputedStyle(pbtm)
    const gap = parseFloat(style.gap) || 10

    // remove temp measurer
    pbtm.removeChild(temp)

    // compute max number of columns and rows that truly fit
    let cols = Math.max(1, Math.floor((pbtm.clientWidth + gap) / (bubbleW + gap)))
    let rows = Math.max(1, Math.floor((pbtm.clientHeight + gap) / (bubbleH + gap)))

    // ensure total used width/height does not exceed the container (guard against off-by-one)
    while (cols > 1 && (cols * bubbleW + (cols - 1) * gap) > pbtm.clientWidth) cols--
    while (rows > 1 && (rows * bubbleH + (rows - 1) * gap) > pbtm.clientHeight) rows--

    // final count is exactly the grid that fits
    let count = Math.max(1, cols * rows)

    // clamp to sane bounds
    count = Math.min(Math.max(count, 12), 800)

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div')
        el.className = 'bubble'
        el.textContent = `${Math.floor(Math.random() * 10)}`
        pbtm.appendChild(el)
    }
}

// --- hit generator ---
function hitgenerator() {
    hitgenVal = Math.floor(Math.random() * 10)
    hitDisplay.textContent = hitgenVal
}

// --- timer logic ---
function runtimer() {
    // clear any existing timer
    if (timerInterval) clearInterval(timerInterval)

    timerInterval = setInterval(() => {
        if (timers > 0) {
            timers--;
            timerDisplay.innerText = timers
        } else {
            clearInterval(timerInterval)
            endGame()
        }
    }, 1000)
}

// --- score ---
function incresescore() {
    score += 10
    scoreDisplay.textContent = score
}

// --- game start / end / reset ---
function startGame() {
    // initialize values
    timers = totalTimeDefault
    score = 0
    scoreDisplay.textContent = score
    timerDisplay.textContent = timers

    isRunning = true
    // hide modal
    hideModal()

    // generate starting board and targets
    bubblegenerator()
    hitgenerator()

    // start timer
    runtimer()

    // ensure pbtm accepts pointer events (if previously blocked)
    pbtm.style.pointerEvents = 'auto'
}

function endGame() {
    isRunning = false
    // block board interaction
    pbtm.style.pointerEvents = 'none'

    // show final modal with score and "Play Again" button
    showModal(`
      <h2>Time's up!</h2>
      <p>Your score: <strong>${score}</strong></p>
      <button id="playAgainBtn" class="btn">Play Again</button>
    `)
}

function resetGame() {
    // stop timer
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }

    // reset displays
    timers = totalTimeDefault
    timerDisplay.textContent = timers
    score = 0
    scoreDisplay.textContent = score

    // clear bubbles
    pbtm.innerHTML = ''
    hitDisplay.textContent = '-'
    isRunning = false

    // show initial start modal
    showModal(`
      <h2>Bubble Game</h2>
      <p>Click below to start playing!</p>
      <button id="playBtn" class="btn">Play Game</button>
    `)
    pbtm.style.pointerEvents = 'none'
}

// --- click handling on bubbles ---
pbtm.addEventListener('click', (e) => {
    if (!isRunning) return // ignore clicks when not running
    if (e.target && e.target.classList.contains('bubble')) {
        let clickval = parseInt(e.target.innerText)
        if (!isNaN(clickval) && clickval === hitgenVal) {
            incresescore()
            hitgenerator()
            bubblegenerator()
        }
    }
})

// --- initial setup: show start modal and block board until start ---
pbtm.style.pointerEvents = 'none'
timerDisplay.textContent = totalTimeDefault
scoreDisplay.textContent = 0
