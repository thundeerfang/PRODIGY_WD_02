'use strict';

// Time elements
const seconds = document.getElementsByClassName('text-min')[0];
const centiseconds = document.getElementsByClassName('text-sec')[0];  
const milliseconds = document.getElementsByClassName('text-msec')[0];

// Buttons
const start_btn = document.getElementsByClassName('start-btn')[0];
const stop_btn = document.getElementsByClassName('btn-stop')[0];
const reset_btn = document.getElementsByClassName('btn-reset')[0];

// Lap 
const lapList = document.getElementsByClassName('lap-count')[0];

let isPlay = false;
let secCounter = 0;
let centiCounter = 0;
let msecCounter = 0;
let sec, centi, msec;
let lapCounter = 1;

const toggleButtons = function () {
    stop_btn.disabled = false;
    reset_btn.disabled = false;
};

const play = () => {
    if (!isPlay) {
        start_btn.textContent = 'PAUSE';
        isPlay = true;

        msec = setInterval(() => {
            msecCounter++;
            if (msecCounter === 100) {
                msecCounter = 0;
                centiCounter++;
            }
            if (centiCounter === 10) {
                centiCounter = 0;
                secCounter++;
            }

            milliseconds.textContent = `${msecCounter.toString().padStart(3, '0')}`;
            centiseconds.textContent = `${centiCounter.toString().padStart(2, '0')} :`;
            seconds.textContent = `${secCounter.toString().padStart(2, '0')} :`;
        }, 1);  

    } else {
        start_btn.textContent = 'START';
        clearInterval(msec);
        isPlay = false;
    }
    toggleButtons();
};

// Lap Fun
const recordLap = () => {
    const lapTime = `${secCounter.toString().padStart(2, '0')} : ${centiCounter.toString().padStart(2, '0')} : ${msecCounter.toString().padStart(3, '0')}`;
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.innerHTML = `
        <p class="lap-data">
            <span class="lap-id">LAP ${lapCounter++}</span>
            <span class="lap-time">${lapTime}</span>
        </p>
    `;
    lapList.appendChild(lapItem);
};

// Reset Fun
const reset = () => {
    clearInterval(msec);
    isPlay = false;
    secCounter = 0;
    centiCounter = 0;
    msecCounter = 0;
    lapCounter = 1;

    seconds.textContent = `00 :`;
    centiseconds.textContent = `00 :`;
    milliseconds.textContent = `000`;

    stop_btn.disabled = true;
    reset_btn.disabled = true;
    start_btn.textContent = 'START';

    lapList.innerHTML = '';
};

stop_btn.disabled = true;
reset_btn.disabled = true;

start_btn.addEventListener('click', play);
reset_btn.addEventListener('click', reset);
stop_btn.addEventListener('click', recordLap);
