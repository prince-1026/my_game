
const pbtm = document.querySelector('#pbtm');


let timers = 60;
let hitgen;
let score = 0;



function bubblegenerator() {
    pbtm.innerHTML=''
    for (let i = 0; i < 168; i++) {
        const el = document.createElement('div')
        el.className = 'bubble'
        el.id = 'bubbley'
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