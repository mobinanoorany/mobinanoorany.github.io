/* =========================================================
   som-demo.js — interactive Self-Organizing Map playground
   Pure vanilla JS + Canvas. Inspired by RepSC-SOM regionalization.
   ========================================================= */
(function () {
  'use strict';

  var canvas = document.getElementById('somCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;   // internal pixel space (640 x 480)

  /* ---------- State ---------- */
  var gridN = 8;            // grid is gridN x gridN
  var baseLR = 0.30;        // base learning rate
  var baseRadius = 3.0;     // base neighborhood radius (grid units)
  var neurons = [];         // each: { wx, wy (normalized 0..1), gx, gy, hue }
  var data = [];            // each: { x, y } normalized 0..1
  var iter = 0;
  var running = false;
  var rafId = null;
  var showRegions = true;
  var showMesh = true;
  var qError = '—';

  /* region rendering buffer (low-res) */
  var RC = 14; // cell size px
  var cols = Math.ceil(W / RC), rows = Math.ceil(H / RC);

  /* ---------- DOM ---------- */
  var el = {
    gridSize: document.getElementById('gridSize'),
    gridVal: document.getElementById('gridVal'),
    learnRate: document.getElementById('learnRate'),
    lrVal: document.getElementById('lrVal'),
    radius: document.getElementById('radius'),
    radVal: document.getElementById('radVal'),
    showRegions: document.getElementById('showRegions'),
    showMesh: document.getElementById('showMesh'),
    train: document.getElementById('trainBtn'),
    pause: document.getElementById('pauseBtn'),
    reset: document.getElementById('resetBtn'),
    blob: document.getElementById('blobBtn'),
    ring: document.getElementById('ringBtn'),
    clear: document.getElementById('clearBtn'),
    iterStat: document.getElementById('iterStat'),
    ptStat: document.getElementById('ptStat'),
    errStat: document.getElementById('errStat'),
    hint: document.getElementById('somHint')
  };

  /* ---------- Init / reset neurons ---------- */
  function initNeurons() {
    neurons = [];
    var lo = 0.30, hi = 0.70;
    for (var gy = 0; gy < gridN; gy++) {
      for (var gx = 0; gx < gridN; gx++) {
        var fx = gridN > 1 ? gx / (gridN - 1) : 0.5;
        var fy = gridN > 1 ? gy / (gridN - 1) : 0.5;
        neurons.push({
          gx: gx, gy: gy,
          wx: lo + fx * (hi - lo) + (Math.random() - 0.5) * 0.02,
          wy: lo + fy * (hi - lo) + (Math.random() - 0.5) * 0.02,
          // hue mapped across the 2D grid for region coloring
          hue: (fx * 200 + fy * 120) % 360
        });
      }
    }
    iter = 0;
    qError = '—';
    updateStats();
  }

  /* ---------- Best matching unit ---------- */
  function bmu(px, py) {
    var best = 0, bestD = Infinity;
    for (var i = 0; i < neurons.length; i++) {
      var dx = neurons[i].wx - px, dy = neurons[i].wy - py;
      var d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = i; }
    }
    return best;
  }

  /* ---------- One training epoch over a sample of points ---------- */
  function trainStep() {
    if (data.length === 0) return;
    // decay schedule keeps the map converging while sliders set the scale
    var decay = Math.exp(-iter / 700);
    var lr = baseLR * decay;
    var rad = baseRadius * decay + 0.6;
    var twoR2 = 2 * rad * rad;

    // stochastic: pick a handful of random points per step
    var picks = Math.min(data.length, 6);
    for (var s = 0; s < picks; s++) {
      var p = data[(Math.random() * data.length) | 0];
      var b = neurons[bmu(p.x, p.y)];
      for (var i = 0; i < neurons.length; i++) {
        var n = neurons[i];
        var gdx = n.gx - b.gx, gdy = n.gy - b.gy;
        var gd2 = gdx * gdx + gdy * gdy;
        if (gd2 > (rad * 3) * (rad * 3)) continue; // skip far neurons
        var h = Math.exp(-gd2 / twoR2);
        var force = lr * h;
        n.wx += force * (p.x - n.wx);
        n.wy += force * (p.y - n.wy);
      }
    }
    iter++;
  }

  /* ---------- Quantization error ---------- */
  function computeError() {
    if (data.length === 0) { qError = '—'; return; }
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      var b = neurons[bmu(data[i].x, data[i].y)];
      var dx = b.wx - data[i].x, dy = b.wy - data[i].y;
      sum += Math.sqrt(dx * dx + dy * dy);
    }
    qError = (sum / data.length).toFixed(4);
  }

  /* ---------- Rendering ---------- */
  function hslPaint(hue, a) { return 'hsla(' + hue + ',70%,55%,' + a + ')'; }

  function drawRegions() {
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var px = (c + 0.5) * RC / W;
        var py = (r + 0.5) * RC / H;
        var n = neurons[bmu(px, py)];
        ctx.fillStyle = hslPaint(n.hue, 0.16);
        ctx.fillRect(c * RC, r * RC, RC, RC);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // subtle background
    ctx.fillStyle = '#07070f';
    ctx.fillRect(0, 0, W, H);

    if (showRegions && data.length > 0) drawRegions();

    // neuron mesh
    if (showMesh) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(124,92,255,.45)';
      ctx.beginPath();
      for (var gy = 0; gy < gridN; gy++) {
        for (var gx = 0; gx < gridN; gx++) {
          var n = neurons[gy * gridN + gx];
          if (gx < gridN - 1) {
            var nr = neurons[gy * gridN + gx + 1];
            ctx.moveTo(n.wx * W, n.wy * H); ctx.lineTo(nr.wx * W, nr.wy * H);
          }
          if (gy < gridN - 1) {
            var nd = neurons[(gy + 1) * gridN + gx];
            ctx.moveTo(n.wx * W, n.wy * H); ctx.lineTo(nd.wx * W, nd.wy * H);
          }
        }
      }
      ctx.stroke();
    }

    // data points (colored by their BMU region)
    for (var i = 0; i < data.length; i++) {
      var p = data[i];
      var nn = neurons[bmu(p.x, p.y)];
      ctx.fillStyle = hslPaint(nn.hue, 0.9);
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // neuron nodes
    if (showMesh) {
      for (var k = 0; k < neurons.length; k++) {
        var nd2 = neurons[k];
        ctx.fillStyle = '#20e3c8';
        ctx.beginPath();
        ctx.arc(nd2.wx * W, nd2.wy * H, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /* ---------- Animation loop ---------- */
  function loop() {
    if (running) {
      for (var k = 0; k < 4; k++) trainStep(); // a few steps per frame
      if (iter % 12 === 0) computeError();
      updateStats();
    }
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function updateStats() {
    el.iterStat.textContent = iter;
    el.ptStat.textContent = data.length;
    el.errStat.textContent = qError;
  }

  /* ---------- Data generators ---------- */
  function gaussian() { // Box-Muller, std ~1
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function clamp01(x) { return Math.max(0.02, Math.min(0.98, x)); }

  function makeBlobs() {
    data = [];
    var k = 3 + ((Math.random() * 3) | 0);
    for (var c = 0; c < k; c++) {
      var cx = 0.18 + Math.random() * 0.64;
      var cy = 0.18 + Math.random() * 0.64;
      var spread = 0.04 + Math.random() * 0.05;
      var n = 45 + ((Math.random() * 35) | 0);
      for (var i = 0; i < n; i++) {
        data.push({ x: clamp01(cx + gaussian() * spread), y: clamp01(cy + gaussian() * spread) });
      }
    }
    resetAndStats();
  }

  function makeRing() {
    data = [];
    var cx = 0.5, cy = 0.5, R = 0.32;
    var n = 220;
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2;
      var rr = R + gaussian() * 0.03;
      data.push({ x: clamp01(cx + Math.cos(a) * rr), y: clamp01(cy + Math.sin(a) * rr * 0.85) });
    }
    resetAndStats();
  }

  function resetAndStats() {
    initNeurons();
    computeError();
    updateStats();
    hideHint();
  }

  function hideHint() { if (el.hint) el.hint.style.opacity = '0'; }

  /* ---------- Pointer input: scatter points ---------- */
  var drawing = false;
  function canvasPoint(e) {
    var rect = canvas.getBoundingClientRect();
    var cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    var cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x: clamp01(cx / rect.width), y: clamp01(cy / rect.height) };
  }
  function addAt(e) {
    var p = canvasPoint(e);
    // add a small cluster around the cursor for a nicer brush
    data.push(p);
    for (var i = 0; i < 2; i++) {
      data.push({ x: clamp01(p.x + gaussian() * 0.012), y: clamp01(p.y + gaussian() * 0.012) });
    }
    updateStats();
    hideHint();
  }
  canvas.addEventListener('mousedown', function (e) { drawing = true; addAt(e); });
  canvas.addEventListener('mousemove', function (e) { if (drawing) addAt(e); });
  window.addEventListener('mouseup', function () { drawing = false; });
  canvas.addEventListener('touchstart', function (e) { e.preventDefault(); drawing = true; addAt(e); }, { passive: false });
  canvas.addEventListener('touchmove', function (e) { e.preventDefault(); if (drawing) addAt(e); }, { passive: false });
  canvas.addEventListener('touchend', function () { drawing = false; });

  /* ---------- Controls ---------- */
  el.gridSize.addEventListener('input', function () {
    gridN = parseInt(this.value, 10);
    el.gridVal.textContent = gridN + ' × ' + gridN;
    initNeurons();
    computeError();
  });
  el.learnRate.addEventListener('input', function () {
    baseLR = parseInt(this.value, 10) / 100;
    el.lrVal.textContent = baseLR.toFixed(2);
  });
  el.radius.addEventListener('input', function () {
    baseRadius = parseInt(this.value, 10) / 10;
    el.radVal.textContent = baseRadius.toFixed(1);
  });
  el.showRegions.addEventListener('change', function () { showRegions = this.checked; });
  el.showMesh.addEventListener('change', function () { showMesh = this.checked; });

  el.train.addEventListener('click', function () {
    if (data.length === 0) { makeBlobs(); }
    running = true; hideHint();
  });
  el.pause.addEventListener('click', function () { running = false; });
  el.reset.addEventListener('click', function () { running = false; initNeurons(); computeError(); });
  el.blob.addEventListener('click', function () { makeBlobs(); });
  el.ring.addEventListener('click', function () { makeRing(); });
  el.clear.addEventListener('click', function () {
    running = false; data = []; initNeurons(); qError = '—'; updateStats();
    if (el.hint) el.hint.style.opacity = '1';
  });

  /* ---------- Boot ---------- */
  initNeurons();
  makeBlobs();
  running = false;
  // gently auto-start once the demo scrolls into view
  if ('IntersectionObserver' in window) {
    var seen = false;
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting && !seen) { seen = true; running = true; hideHint(); }
      });
    }, { threshold: 0.35 });
    io.observe(canvas);
  }
  loop();
})();