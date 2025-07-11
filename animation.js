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