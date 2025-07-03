
    const setupScreen = document.getElementById('setup');
    const timerScreen = document.getElementById('timer-screen');
    const display = document.getElementById('display');
    const startBtn = document.getElementById('start');
    const resetBtn = document.getElementById('reset');
    const durationInput = document.getElementById('duration');
    const endtimeInput = document.getElementById('endtime');
    const modeOptions = document.querySelectorAll('.mode-option');

    let timer = null;
    let currentSeconds = 0;
    let running = false;
    let currentMode = 'duration';

    function formatTime(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function parseDuration(value) {
      if (!value || value.trim() === '') return 0;
      
      value = value.trim().toLowerCase();
      
      // Remove 'min' se existir
      value = value.replace(/min$/, '');
      
      // Se contém dois pontos, formato HH:MM
      if (value.includes(':')) {
        const parts = value.split(':');
        if (parts.length === 2) {
          const hours = parseInt(parts[0]) || 0;
          const minutes = parseInt(parts[1]) || 0;
          return (hours * 60 + minutes) * 60; // retorna em segundos
        }
      }
      
      // Se é apenas um número, assume minutos
      const minutes = parseInt(value) || 0;
      return minutes * 60; // retorna em segundos
    }

    function calculateSecondsUntilEndTime(endTimeStr) {
      if (!endTimeStr || endTimeStr.trim() === '') return 0;
      
      const now = new Date();
      const parts = endTimeStr.trim().split(':');
      
      if (parts.length !== 2) return 0;
      
      const targetHour = parseInt(parts[0]);
      const targetMinute = parseInt(parts[1]);
      
      if (isNaN(targetHour) || isNaN(targetMinute)) return 0;
      if (targetHour < 0 || targetHour > 23 || targetMinute < 0 || targetMinute > 59) return 0;
      
      const targetTime = new Date();
      targetTime.setHours(targetHour, targetMinute, 0, 0);
      
      let diffInSeconds = Math.floor((targetTime - now) / 1000);
      
      // Se o horário já passou hoje, assume que é para amanhã
      if (diffInSeconds <= 0) {
        targetTime.setDate(targetTime.getDate() + 1);
        diffInSeconds = Math.floor((targetTime - now) / 1000);
      }
      
      return diffInSeconds;
    }

    function updateDisplay() {
      display.textContent = formatTime(currentSeconds);
      
      // Adiciona efeito de pulso quando restam poucos minutos
      if (currentSeconds <= 300 && currentSeconds > 0) {
        display.classList.add('pulse');
      } else {
        display.classList.remove('pulse');
      }
    }

    function startTimer() {
      if (running) return;
      
      running = true;
      timer = setInterval(() => {
        if (currentSeconds > 0) {
          currentSeconds--;
          updateDisplay();
          
          // Avisos
          if (currentSeconds === 300) {
            showNotification('⏰ Restam 5 minutos!');
          } else if (currentSeconds === 60) {
            showNotification('⚠️ Último minuto!');
          }
        } else {
          stopTimer();
          showNotification('🎬 Tempo esgotado!');
        }
      }, 1000);
    }

    function stopTimer() {
      running = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function showNotification(message) {
      // Cria uma notificação personalizada
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        font-family: 'Poppins', Arial, sans-serif;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease-out;
      `;
      
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }

    function resetAll() {
      stopTimer();
      setupScreen.style.display = 'flex';
      timerScreen.style.display = 'none';
      durationInput.value = '';
      endtimeInput.value = '';
      currentSeconds = 0;
      
      // Reset para o primeiro modo
      currentMode = 'duration';
      updateModeDisplay();
      
      // Adiciona animação
      setupScreen.classList.add('fade-in');
    }

    function updateModeDisplay() {
      // Atualiza botões
      modeOptions.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === currentMode) {
          btn.classList.add('active');
        }
      });
      
      // Atualiza campos
      if (currentMode === 'duration') {
        durationInput.classList.remove('hidden');
        endtimeInput.classList.add('hidden');
      } else {
        durationInput.classList.add('hidden');
        endtimeInput.classList.remove('hidden');
      }
    }

    // Event listeners
    modeOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        currentMode = btn.dataset.mode;
        updateModeDisplay();
      });
    });

    startBtn.addEventListener('click', () => {
      let seconds = 0;
      
      if (currentMode === 'duration') {
        seconds = parseDuration(durationInput.value);
        if (seconds <= 0) {
          showNotification('❌ Insira um tempo válido!');
          return;
        }
      } else {
        seconds = calculateSecondsUntilEndTime(endtimeInput.value);
        if (seconds <= 0) {
          showNotification('❌ Insira um horário válido!');
          return;
        }
      }
      
      currentSeconds = seconds;
      updateDisplay();
      
      setupScreen.style.display = 'none';
      timerScreen.style.display = 'flex';
      timerScreen.classList.add('fade-in');
      
      startTimer();
    });

    resetBtn.addEventListener('click', resetAll);

    // Inicialização
    document.addEventListener('DOMContentLoaded', () => {
      updateModeDisplay();
    });

    // Adiciona estilo para animação de slide
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);