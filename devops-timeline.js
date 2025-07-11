// Drag-scroll для таймлайна DevOps
const timelineWrapper = document.querySelector('.devops-timeline-wrapper');
const timeline = document.getElementById('devopsTimeline');
const steps = timeline ? Array.from(timeline.getElementsByClassName('devops-step')) : [];
const hint = document.querySelector('.devops-timeline-hint');
let activeIndex = 0;
let lastScrollLeft = 0;

function updateActiveStep() {
  steps.forEach((step, idx) => {
    if (idx === activeIndex) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
  // Подсказка только на первом этапе
  if (hint) {
    if (activeIndex === 0) {
      hint.classList.remove('hint-hidden');
    } else {
      hint.classList.add('hint-hidden');
    }
  }
}

if (timelineWrapper && timeline) {
  let isDown = false;
  let startX;
  let scrollLeft;
  timelineWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    timelineWrapper.classList.add('dragging');
    startX = e.pageX - timelineWrapper.offsetLeft;
    scrollLeft = timelineWrapper.scrollLeft;
  });
  timelineWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    timelineWrapper.classList.remove('dragging');
  });
  timelineWrapper.addEventListener('mouseup', () => {
    isDown = false;
    timelineWrapper.classList.remove('dragging');
  });
  timelineWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timelineWrapper.offsetLeft;
    const walk = (x - startX) * 1.2; // скорость
    timelineWrapper.scrollLeft = scrollLeft - walk;
  });

  timelineWrapper.addEventListener('scroll', () => {
    const idx = Math.round(timelineWrapper.scrollLeft / 300);
    if (idx !== activeIndex && idx >= 0 && idx < steps.length) {
      activeIndex = idx;
      updateActiveStep();
    }
    // Подсказка
    if (hint) {
      if (timelineWrapper.scrollLeft <= 10) {
        hint.classList.remove('hint-hidden');
      } else {
        hint.classList.add('hint-hidden');
      }
    }
  });

  // Валидация формы: подсветка обязательных полей
  const form = document.getElementById('contactForm');
  if (form) {
    const emailInput = form.email;
    const phoneInput = form.phone;
    form.addEventListener('submit', function(e) {
      var phone = phoneInput.value.trim();
      var error = document.getElementById('contactError');
      if (!/^\d{11}$/.test(phone)) {
        e.preventDefault();
        error.textContent = 'Введите корректный номер телефона (11 цифр)';
        error.style.display = 'block';
        phoneInput.classList.add('input-error');
      } else {
        error.style.display = 'none';
        phoneInput.classList.remove('input-error');
      }
    });
    // Только цифры и максимум 11 символов
    phoneInput.addEventListener('input', function(e) {
      let val = phoneInput.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      phoneInput.value = val;
      if (/^\d{11}$/.test(val)) {
        phoneInput.classList.remove('input-error');
        document.getElementById('contactError').style.display = 'none';
      }
    });
  }

  // Инициализация
  updateActiveStep();
} 