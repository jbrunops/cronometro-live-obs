const setupScreen = document.getElementById('setup');
const timerScreen = document.getElementById('timer-screen');
const hoursInput = document.getElementById('hours');
const display = document.getElementById('display');
const resetBtn = document.getElementById('reset');
const durationInput = document.getElementById('duration');
const endtimeInput = document.getElementById('endtime');
const modeRadios = document.getElementsByName('mode');

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

function parseDuration(value) {
  if (!value) return 0;
  if (value.includes(':')) {
    const [h, m] = value.split(':').map(Number);
    return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
  }
  return parseInt(value) || 0;
}

function secondsUntilEndTime(endTimeStr) {
  const now = new Date();
  const [h, m] = endTimeStr.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return 0;
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
  let diff = Math.floor((end - now) / 1000);
  if (diff < 0) diff += 24 * 3600;
  return diff;
}

function formatTimeHM(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${h}h ${m.toString().padStart(2, '0')}min`;
}

function updateDisplay() {
  display.textContent = formatTimeHM(currentSeconds);
}

function startTimer() {
  if (running) return;
  running = true;
  timer = setInterval(() => {
    if (currentSeconds > 0) {
      currentSeconds--;
      updateDisplay();
      if (currentSeconds === 300) {
        alert('A live vai acabar em alguns minutos');
      }
    } else {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  running = false;
  clearInterval(timer);
}

function resetAll() {
  stopTimer();
  setupScreen.style.display = 'flex';
  timerScreen.style.display = 'none';
  hoursInput.value = '';
  durationInput.value = '';
  endtimeInput.value = '';
  durationInput.style.display = 'none';
  endtimeInput.style.display = 'none';
  durationInput.required = false;
  endtimeInput.required = false;
}

modeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'duration' && radio.checked) {
      durationInput.style.display = '';
      endtimeInput.style.display = 'none';
      durationInput.required = true;
      endtimeInput.required = false;
    } else if (radio.value === 'endtime' && radio.checked) {
      durationInput.style.display = 'none';
      endtimeInput.style.display = '';
      durationInput.required = false;
      endtimeInput.required = true;
    }
  });
});

setupScreen.onsubmit = (e) => {
  e.preventDefault();
  let mode = 'duration';
  modeRadios.forEach(r => { if (r.checked) mode = r.value; });
  if (mode === 'duration') {
    const min = parseDuration(durationInput.value);
    if (min <= 0) return;
    totalSeconds = min * 60;
  } else {
    totalSeconds = secondsUntilEndTime(endtimeInput.value);
    if (totalSeconds <= 0) return;
  }
  currentSeconds = totalSeconds;
  updateDisplay();
  setupScreen.style.display = 'none';
  timerScreen.style.display = 'flex';
  startTimer();
};

resetBtn.onclick = resetAll;

document.addEventListener('DOMContentLoaded', () => {
  resetAll();
  if (window.lucide) lucide.createIcons();
}); 