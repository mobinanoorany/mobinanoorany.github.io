/* =========================================================
   main.js — nav, reveals, hero neural net, typewriter, counters
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  /* ---------- Copy email to clipboard ---------- */
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      var label = copyBtn.querySelector('.contact__copy-text');
      var done = function () {
        copyBtn.classList.add('copied');
        if (label) label.textContent = 'Copied!';
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          if (label) label.textContent = 'Copy';
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(done);
      } else {
        var t = document.createElement('textarea');
        t.value = email; document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(t); done();
      }
    });
  }

  /* ---------- Demo tabs ---------- */
  var demoTabs = document.querySelectorAll('.demo-tab');
  if (demoTabs.length) {
    demoTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var name = tab.getAttribute('data-tab');
        demoTabs.forEach(function (t) {
          var on = (t === tab);
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        document.querySelectorAll('.demo-panel').forEach(function (p) {
          p.classList.toggle('is-active', p.id === 'tab-' + name);
        });
      });
    });
  }

  /* ---------- Cursor glow ---------- */
  var glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll('.stat__num[data-count]');
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Typewriter rotator ---------- */
  var rotator = document.getElementById('rotator');
  if (rotator) {
    var phrases = [
      'reasoning-capable AI',
      'agentic AI systems',
      'vision-language models',
      'RL for foundation models',
      'multimodal intelligence'
    ];
    var pi = 0, ci = 0, deleting = false;
    function type() {
      var word = phrases[pi];
      if (deleting) { ci--; } else { ci++; }
      rotator.textContent = word.substring(0, ci);
      var delay = deleting ? 45 : 95;
      if (!deleting && ci === word.length) { delay = 1700; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
      setTimeout(type, delay);
    }
    setTimeout(type, 900);
  }

  /* ---------- Stagger grid children ---------- */
  var staggerGroups = document.querySelectorAll('.cards, .projects, .pubs, .skills, .about__stats, .exp');
  staggerGroups.forEach(function (group) {
    var kids = group.querySelectorAll('.reveal');
    kids.forEach(function (kid, i) {
      kid.style.setProperty('--d', (i * 0.09) + 's');
    });
  });

  /* ---------- Scroll progress + parallax (rAF-throttled) ---------- */
  var progress = document.getElementById('scrollProgress');
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ticking = false;

  function onScrollFX() {
    // progress bar
    if (progress) {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var p = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      progress.style.width = p + '%';
    }
    // parallax
    if (!reduceMotion) {
      var vh = window.innerHeight;
      for (var i = 0; i < parallaxEls.length; i++) {
        var el = parallaxEls[i];
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        var rect = el.getBoundingClientRect();
        var offset = (rect.top + rect.height / 2 - vh / 2);
        el.style.transform = 'translateY(' + (offset * speed).toFixed(1) + 'px)';
      }
    }
    ticking = false;
  }
  function requestFX() {
    if (!ticking) { ticking = true; requestAnimationFrame(onScrollFX); }
  }
  window.addEventListener('scroll', requestFX, { passive: true });
  window.addEventListener('resize', requestFX);
  onScrollFX();

  /* ---------- Subtle 3D tilt on cards/projects ---------- */
  if (window.matchMedia('(hover: hover)').matches && !reduceMotion) {
    var tilters = document.querySelectorAll('.card, .project, .pub');
    tilters.forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'translateY(-6px) perspective(800px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' + (px * 5).toFixed(2) + 'deg)';
      });
      c.addEventListener('mouseleave', function () { c.style.transform = ''; });
    });
  }

  /* ---------- Hero neural network canvas ---------- */
  var canvas = document.getElementById('neuralCanvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ctx = canvas.getContext('2d');
    var nodes = [], w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(Math.floor((w * h) / 16000), 90);
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.8
        });
      }
    }

    var mouse = { x: -999, y: -999 };
    canvas.parentElement.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', function () { mouse.x = -999; mouse.y = -999; });

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.strokeStyle = 'rgba(124,92,255,' + (0.16 * (1 - d / 130)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }
        var mdx = n.x - mouse.x, mdy = n.y - mouse.y;
        var md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 160) {
          ctx.strokeStyle = 'rgba(32,227,200,' + (0.3 * (1 - md / 160)) + ')';
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }

        ctx.fillStyle = 'rgba(180,170,255,.8)';
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  }
})();