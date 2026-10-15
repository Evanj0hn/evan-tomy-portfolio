/**
 * animations.js — scroll-reveal, animated counters, hero typing effect,
 * and the experience timeline's scroll-linked progress line.
 */
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Staggered scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  var siblingIndex = new Map();
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    var idx = siblingIndex.get(parent) || 0;
    el.style.transitionDelay = Math.min(idx * 70, 420) + 'ms';
    siblingIndex.set(parent, idx + 1);
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString();
      return;
    }
    var duration = 1200;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------- Hero typing effect ---------- */
  var typingEl = document.getElementById('typing-text');
  var roles = [
    'Computer Science Student',
    'Data Engineer',
    'Systems Enthusiast',
    'Hackathon Organizer',
    'Game Developer'
  ];

  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = roles[0];
    } else {
      (function typeLoop(state) {
        var current = roles[state.roleIndex];

        if (!state.deleting) {
          state.charIndex++;
          typingEl.textContent = current.slice(0, state.charIndex);
          if (state.charIndex === current.length) {
            state.deleting = true;
            setTimeout(function () { typeLoop(state); }, 1600);
            return;
          }
        } else {
          state.charIndex--;
          typingEl.textContent = current.slice(0, state.charIndex);
          if (state.charIndex === 0) {
            state.deleting = false;
            state.roleIndex = (state.roleIndex + 1) % roles.length;
          }
        }

        setTimeout(function () { typeLoop(state); }, state.deleting ? 35 : 65);
      })({ roleIndex: 0, charIndex: 0, deleting: false });
    }
  }

  /* ---------- Experience timeline progress line ---------- */
  var timeline = document.querySelector('.timeline');
  var timelineFill = document.querySelector('.timeline-line-fill');

  function updateTimelineFill() {
    if (!timeline || !timelineFill) return;
    var rect = timeline.getBoundingClientRect();
    var viewportMarker = window.innerHeight * 0.75;
    var total = rect.height;
    var progressed = Math.min(Math.max(viewportMarker - rect.top, 0), total);
    var pct = total > 0 ? (progressed / total) * 100 : 0;
    timelineFill.style.height = pct + '%';
  }

  window.addEventListener('scroll', updateTimelineFill, { passive: true });
  window.addEventListener('resize', updateTimelineFill);
  updateTimelineFill();
})();
