const display = document.getElementById('display');
const mode = document.getElementById('mode');
const hoursInput = document.getElementById('hours');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

let timer = null;
let totalSeconds = 0;
let currentSeconds = 0;
let running = false;

function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function updateDisplay() {
  display.textContent = formatTime(currentSeconds);
}

function startTimer() {
  if (running) return;
  running = true;
  timer = setInterval(() => {
    if (mode.value === 'up') {
      currentSeconds++;
    } else {
      if (currentSeconds > 0) {
        currentSeconds--;
      } else {
        stopTimer();
      }
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  running = false;
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  if (mode.value === 'down') {
    currentSeconds = totalSeconds;
  } else {
    currentSeconds = 0;
  }
  updateDisplay();
}

startBtn.onclick = () => {
  if (mode.value === 'down') {
    const h = parseInt(hoursInput.value) || 0;
    totalSeconds = h * 3600;
    if (totalSeconds === 0) return;
    if (!running) {
      currentSeconds = currentSeconds === 0 ? totalSeconds : currentSeconds;
      updateDisplay();
    }
  }
  startTimer();
};

stopBtn.onclick = stopTimer;
resetBtn.onclick = resetTimer;

mode.onchange = () => {
  resetTimer();
  if (mode.value === 'down') {
    hoursInput.disabled = false;
  } else {
    hoursInput.disabled = true;
  }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  mode.value = 'up';
  hoursInput.disabled = true;
  updateDisplay();
  if (window.lucide) lucide.createIcons();
}); 