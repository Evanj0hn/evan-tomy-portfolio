/**
 * navigation.js — sticky header, mobile menu, scrollspy, back-to-top.
 * Smooth scrolling itself is handled natively via CSS `scroll-behavior: smooth`
 * and `scroll-margin-top` on each section, so anchor links need no JS.
 */
(function () {
  var header = document.getElementById('site-header');
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var backToTop = document.getElementById('back-to-top');
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var heroTop = document.getElementById('top');
  var allSections = [heroTop].concat(sections).filter(Boolean);

  function updateScrollspy() {
    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var activeId = allSections.length ? allSections[0].id : null;

    allSections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        activeId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var targetId = link.getAttribute('href').slice(1);
      link.classList.toggle('active', targetId === activeId);
    });
  }

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
    updateScrollspy();
  }

  function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('no-scroll');
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('no-scroll', isOpen);
    });

    Array.prototype.forEach.call(mobileMenu.querySelectorAll('a'), function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateScrollspy);
  onScroll();
})();
