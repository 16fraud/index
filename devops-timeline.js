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

  // Таймлайн и форма — только внутри этого блока
  updateActiveStep();
}

// === Логика выбора города с поиском ===
const cities = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону", "Уфа", "Красноярск", "Воронеж", "Пермь", "Волгоград", "Краснодар", "Саратов", "Тюмень", "Тольятти", "Ижевск", "Барнаул", "Ульяновск", "Иркутск", "Владивосток", "Ярославль", "Хабаровск", "Махачкала", "Оренбург", "Новокузнецк", "Томск", "Кемерово", "Рязань", "Астрахань", "Пенза", "Липецк", "Тула", "Киров", "Чебоксары", "Калининград", "Брянск", "Курск", "Иваново", "Магнитогорск", "Тверь", "Ставрополь", "Белгород", "Сочи", "Нижний Тагил", "Архангельск", "Владимир", "Чита", "Калуга", "Симферополь", "Смоленск", "Сургут", "Курган", "Орёл", "Вологда", "Череповец", "Якутск", "Грозный", "Саранск", "Тамбов", "Стерлитамак", "Кострома", "Новороссийск", "Петрозаводск", "Йошкар-Ола", "Нальчик", "Шахты", "Дзержинск", "Благовещенск", "Великий Новгород", "Псков", "Бийск", "Прокопьевск", "Балаково", "Рыбинск", "Северодвинск", "Армавир", "Подольск", "Энгельс", "Королёв", "Мурманск", "Сызрань", "Норильск", "Златоуст", "Каменск-Уральский", "Мытищи", "Люберцы", "Волгодонск", "Находка", "Петропавловск-Камчатский", "Копейск", "Нефтеюганск", "Березники", "Рубцовск", "Каменск-Шахтинский"
];

const regionBtn = document.getElementById('regionSelectBtn');
const regionDropdown = document.getElementById('regionDropdown');
const regionInput = document.getElementById('regionSearchInput');
const regionList = document.getElementById('regionList');

function renderCityList(filter = "") {
  regionList.innerHTML = "";
  const filtered = cities.filter(city => city.toLowerCase().includes(filter.toLowerCase()));
  if (filtered.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Город не найден';
    li.style.opacity = '0.7';
    regionList.appendChild(li);
    return;
  }
  filtered.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click', () => {
      regionBtn.textContent = city;
      regionDropdown.style.display = 'none';
      localStorage.setItem('selectedCity', city);
    });
    regionList.appendChild(li);
  });
}

if (regionBtn && regionDropdown && regionInput && regionList) {
  // Открытие/закрытие
  regionBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (regionDropdown.style.display === 'block') {
      regionDropdown.style.display = 'none';
    } else {
      regionDropdown.style.display = 'block';
      regionInput.value = '';
      renderCityList();
      regionInput.focus();
    }
  });
  // Фильтрация
  regionInput.addEventListener('input', () => {
    renderCityList(regionInput.value);
  });
  // Закрытие по клику вне
  document.addEventListener('click', (e) => {
    if (!regionDropdown.contains(e.target) && e.target !== regionBtn) {
      regionDropdown.style.display = 'none';
    }
  });
  // Восстановление выбранного города
  const saved = localStorage.getItem('selectedCity');
  if (saved && cities.includes(saved)) {
    regionBtn.textContent = saved;
  }
} 