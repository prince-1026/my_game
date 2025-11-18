
const pbtm = document.querySelector('#pbtm');


let timers = 60;
let hitgen;
let score = 0;



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

function hitgenerator() {
    hitgen = Math.floor(Math.random() * 10)
    document.querySelector('#hitval').textContent = hitgen
}

function runtimer() {
    let intervaltime = setInterval(() => {
        if (timers > 0) {
            timers--;
            document.querySelector('#timerval').innerText = timers
        } else {
            clearInterval(intervaltime)
           pbtm.innerHTML='<h1>Game Over</h1>'

        }
    }, 1000)
}

function incresescore() {
    score += 10
    document.querySelector('#scoreval').textContent = score
}


pbtm.addEventListener('click', (e) => {
    let clickval = parseInt(e.target.innerText)
    if (clickval === hitgen) {
        incresescore()
        hitgenerator()
        bubblegenerator();
    }
})


bubblegenerator();
runtimer()
hitgenerator()

















































































// const pbtm = document.querySelector('#pbtm')
// let bubbles = '';

// for (let i = 0; i <= 100; i++) {
//     bubbles += `<div id="bubbley" class="bubble">4</div>`
// }

// pbtm.innerHTML = bubbles
