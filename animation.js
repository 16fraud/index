// Бургер-меню для мобильной шапки
(function() {
  const burger = document.querySelector('.burger-menu');
  const nav = document.getElementById('mainNav');
  if (!burger || !nav) return;

  function closeMenu() {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    nav.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
  }
  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  // Клик вне меню закрывает его
  document.addEventListener('click', function(e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== burger) {
      closeMenu();
    }
  });
  // При ресайзе больше 750px — закрыть меню
  window.addEventListener('resize', function() {
    if (window.innerWidth > 750) {
      closeMenu();
    }
  });
})();

// Полноэкранное мобильное меню
(function() {
  const burger = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');
  if (!burger || !mobileMenu || !overlay || !closeBtn) return;

  function openMobileMenu() {
    mobileMenu.style.display = 'flex';
    overlay.style.display = 'block';
    setTimeout(() => {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('mobile-menu-open');
    }, 10);
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
    setTimeout(() => {
      mobileMenu.style.display = 'none';
      overlay.style.display = 'none';
    }, 300);
  }
  burger.addEventListener('click', function(e) {
    e.preventDefault();
    openMobileMenu();
  });
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    closeMobileMenu();
  });
  overlay.addEventListener('click', function(e) {
    closeMobileMenu();
  });
  // Закрытие по Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
})();

// Открытие/закрытие модального окна чеклиста
(function() {
  const openBtn = document.getElementById('openChecklistModal');
  const modal = document.getElementById('checklistModal');
  const closeBtn = document.getElementById('closeChecklistModal');
  if (!openBtn || !modal || !closeBtn) return;

  openBtn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
  };
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
})(); 

document.addEventListener('DOMContentLoaded', function() {
  // Плавный скролл для кнопки 'Консультация'
  const heroBtn = document.querySelector('.hero-btn');
  const contactSection = document.getElementById('contact');
  if (heroBtn && contactSection) {
    heroBtn.addEventListener('click', function(event) {
      event.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  // Плавный скролл для ссылки 'Услуги' в шапке
  const servicesLink = document.querySelector('.main-nav a[href="#services"]');
  const servicesSection = document.getElementById('services');
  if (servicesLink && servicesSection) {
    servicesLink.addEventListener('click', function(event) {
      event.preventDefault();
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  // Плавный скролл для ссылки 'Услуги' в мобильном меню
  const mobileServicesLink = document.querySelector('.mobile-menu-list a[href="#services"]');
  if (mobileServicesLink && servicesSection) {
    mobileServicesLink.addEventListener('click', function(event) {
      event.preventDefault();
      servicesSection.scrollIntoView({ behavior: 'smooth' });
      document.body.classList.remove('mobile-menu-open');
      document.querySelector('.mobile-menu').classList.remove('active');
      document.querySelector('.mobile-menu-overlay').classList.remove('active');
    });
  }
  // Плавный скролл для ссылки 'О нас' в шапке
  const aboutLink = document.querySelector('.main-nav a[href="#about"]');
  const aboutSection = document.querySelector('.about-section');
  if (aboutLink && aboutSection) {
    aboutLink.addEventListener('click', function(event) {
      event.preventDefault();
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  // Плавный скролл для ссылки 'О нас' в мобильном меню
  const mobileAboutLink = document.querySelector('.mobile-menu-list a[href="#about"]');
  if (mobileAboutLink && aboutSection) {
    mobileAboutLink.addEventListener('click', function(event) {
      event.preventDefault();
      aboutSection.scrollIntoView({ behavior: 'smooth' });
      document.body.classList.remove('mobile-menu-open');
      document.querySelector('.mobile-menu').classList.remove('active');
      document.querySelector('.mobile-menu-overlay').classList.remove('active');
    });
  }
  // Плавный скролл для ссылки 'Главная' в шапке
  const homeLink = document.querySelector('.main-nav a[href="#home"]');
  const heroSection = document.querySelector('.hero-section');
  if (homeLink && heroSection) {
    homeLink.addEventListener('click', function(event) {
      event.preventDefault();
      heroSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  // Плавный скролл для ссылки 'Главная' в мобильном меню
  const mobileHomeLink = document.querySelector('.mobile-menu-list a[href="#home"]');
  if (mobileHomeLink && heroSection) {
    mobileHomeLink.addEventListener('click', function(event) {
      event.preventDefault();
      heroSection.scrollIntoView({ behavior: 'smooth' });
      document.body.classList.remove('mobile-menu-open');
      document.querySelector('.mobile-menu').classList.remove('active');
      document.querySelector('.mobile-menu-overlay').classList.remove('active');
    });
  }
  });
