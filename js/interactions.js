/**
 * interactions.js — hero particle network, expandable project cards,
 * copy-to-clipboard email, mailto contact form, project tilt, footer year.
 */
(function () {
  var PARTICLE_COLOR = '#3b82f6';
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var noHover = window.matchMedia('(hover: none)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Expandable project details ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.project-toggle'), function (btn) {
    var details = btn.parentElement.querySelector('.project-details');
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      var label = btn.querySelector('span');
      if (label) label.textContent = isOpen ? 'View details' : 'Hide details';
      if (details) {
        details.style.maxHeight = isOpen ? '0px' : details.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Toast helper ---------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('visible'); }, 2400);
  }

  /* ---------- Copy email to clipboard ---------- */
  var copyBtn = document.getElementById('copy-email');

  function fallbackCopy(text) {
    var input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast('Email copied to clipboard');
    } catch (e) {
      showToast('Copy failed — email is ' + text);
    }
    document.body.removeChild(input);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () {
          showToast('Email copied to clipboard');
        }).catch(function () {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });
  }

  /* ---------- Contact form -> mailto ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();

      var subject = encodeURIComponent('Portfolio contact from ' + (name || 'website visitor'));
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:evanjohntomyy@gmail.com?subject=' + subject + '&body=' + body;
      showToast('Opening your email client…');
    });
  }

  /* ---------- Subtle 3D tilt on project cards ---------- */
  if (!prefersReducedMotion && !noHover) {
    Array.prototype.forEach.call(document.querySelectorAll('.project-card'), function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(800px) rotateX(' + (y * -6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-8px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Hero particle network ---------- */
  var canvas = document.getElementById('particle-canvas');
  if (canvas && !prefersReducedMotion) {
    var ctx = canvas.getContext('2d');
    var hero = canvas.closest('.hero');
    var particles = [];
    var width, height;

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      width = hero.offsetWidth;
      height = hero.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.min(70, Math.floor((width * height) / 18000));
      particles = new Array(count).fill(null).map(function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6
        };
      });
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var a = particles[i], b = particles[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = PARTICLE_COLOR;
            ctx.globalAlpha = (1 - dist / 130) * 0.35;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.8;
      ctx.fillStyle = PARTICLE_COLOR;
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(step);
  }
})();
