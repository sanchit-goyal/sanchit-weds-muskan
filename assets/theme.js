/* Shared invitation engine behaviour. Reads window.THEME = {open, fx, petal, spark, burst, scratch}. */
(function () {
  var T = window.THEME || {};
  var doc = document.documentElement, body = document.body;
  doc.classList.add('js');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- music ---------- */
  var bgm = $('#bgm'), mbtn = $('#music');
  if (bgm) bgm.volume = .55;
  mbtn && mbtn.addEventListener('click', function () {
    if (bgm.paused) { bgm.play().catch(function () {}); mbtn.classList.remove('muted'); mbtn.setAttribute('aria-label', 'Mute music'); }
    else { bgm.pause(); mbtn.classList.add('muted'); mbtn.setAttribute('aria-label', 'Play music'); }
  });

  /* ---------- ambient particles ---------- */
  var fx = $('#fx'), g = fx.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), parts = [];
  function size() { W = innerWidth; H = innerHeight; fx.width = W * dpr; fx.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size(); addEventListener('resize', size);
  var kinds = T.fx || ['sparkles'];
  function mk(kind, initial) {
    var p = { k: kind, x: Math.random() * W, y: initial ? Math.random() * H : -20, ph: Math.random() * 6.3 };
    if (kind === 'petals') { p.s = 5 + Math.random() * 6; p.vy = 18 + Math.random() * 26; p.vx = -8 + Math.random() * 16; p.r = Math.random() * 6.3; p.vr = (Math.random() - .5) * 1.6; }
    else if (kind === 'sparkles') { p.s = 1 + Math.random() * 2.4; p.vy = 6 + Math.random() * 14; p.vx = -4 + Math.random() * 8; }
    else if (kind === 'stars') { p.y = Math.random() * H * .7; p.s = .6 + Math.random() * 1.5; p.vy = 0; p.vx = 0; }
    else if (kind === 'fireflies') { p.y = H * .35 + Math.random() * H * .65; p.s = 1.5 + Math.random() * 2; p.vy = -4 - Math.random() * 6; p.vx = 0; }
    else if (kind === 'bubbles') { p.y = initial ? Math.random() * H : H + 20; p.s = 2 + Math.random() * 5; p.vy = -10 - Math.random() * 16; p.vx = 0; }
    return p;
  }
  var counts = { petals: 16, sparkles: 26, stars: 60, fireflies: 16, bubbles: 14 };
  kinds.forEach(function (k) { for (var i = 0; i < (counts[k] || 12); i++) parts.push(mk(k, true)); });
  var petalC = T.petal || '#f2c4bd', sparkC = T.spark || '#f1d38c';
  var last = performance.now(), visible = true;
  document.addEventListener('visibilitychange', function () { visible = !document.hidden; last = performance.now(); });
  function draw(now) {
    var dt = Math.min(.05, (now - last) / 1000); last = now;
    if (visible && !reduce) {
      g.clearRect(0, 0, W, H);
      var t = now / 1000;
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y += p.vy * dt; p.x += (p.vx + Math.sin(t * .7 + p.ph) * 10) * dt;
        if (p.y > H + 30 || p.y < -40) { parts[i] = mk(p.k, false); if (p.k === 'bubbles' || p.k === 'fireflies') parts[i].y = H + 10; continue; }
        if (p.x < -30) p.x = W + 20; if (p.x > W + 30) p.x = -20;
        if (p.k === 'petals') {
          p.r += p.vr * dt;
          g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.scale(Math.cos(t * 1.4 + p.ph) * .9 + .1 > 0 ? 1 : -1, Math.abs(Math.cos(t * 1.4 + p.ph)) * .7 + .3);
          g.globalAlpha = .85; g.fillStyle = petalC; g.beginPath();
          g.moveTo(0, -p.s); g.bezierCurveTo(p.s, -p.s * .6, p.s * .8, p.s * .7, 0, p.s); g.bezierCurveTo(-p.s * .8, p.s * .7, -p.s, -p.s * .6, 0, -p.s); g.fill();
          g.globalAlpha = .25; g.fillStyle = '#fff'; g.beginPath(); g.ellipse(-p.s * .2, -p.s * .2, p.s * .25, p.s * .5, 0, 0, 6.3); g.fill(); g.restore();
        } else {
          var a = p.k === 'stars' ? .25 + .75 * Math.abs(Math.sin(t * .9 + p.ph)) : p.k === 'bubbles' ? .35 : .3 + .7 * Math.abs(Math.sin(t * 1.6 + p.ph));
          var r = p.s * (p.k === 'fireflies' ? 4 : p.k === 'bubbles' ? 1 : 3);
          g.globalAlpha = a;
          if (p.k === 'bubbles') { g.strokeStyle = 'rgba(255,255,255,.8)'; g.lineWidth = 1; g.beginPath(); g.arc(p.x, p.y, r, 0, 6.3); g.stroke(); }
          else {
            var gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
            gr.addColorStop(0, '#fffbe9'); gr.addColorStop(.25, sparkC); gr.addColorStop(1, 'rgba(255,255,255,0)');
            g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, r, 0, 6.3); g.fill();
            if (p.k === 'stars' && p.s > 1.6) { g.fillStyle = '#fff'; g.fillRect(p.x - r * 1.2, p.y - .4, r * 2.4, .8); g.fillRect(p.x - .4, p.y - r * 1.2, .8, r * 2.4); }
          }
        }
      }
      g.globalAlpha = 1;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  /* ---------- celebratory burst ---------- */
  var bc = $('#burst'), bg = bc.getContext('2d'), bparts = [], brun = false;
  function burst(x, y, n, fromTop) {
    if (reduce) return;
    bc.width = innerWidth * dpr; bc.height = innerHeight * dpr; bg.setTransform(dpr, 0, 0, dpr, 0, 0);
    var cols = T.burst || [petalC, sparkC, '#ffffff'];
    for (var i = 0; i < n; i++) bparts.push(fromTop ?
      { x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * .6, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3, g: .05, w: 6 + Math.random() * 6, h: 4 + Math.random() * 4, r: Math.random() * 6.3, vr: (Math.random() - .5) * .2, c: cols[i % cols.length], petal: i % 2 === 0, t: 0 } :
      { x: x, y: y, vx: (Math.random() - .5) * 13, vy: -Math.random() * 12 - 4, g: .25, w: Math.random() * 7 + 4, h: Math.random() * 4 + 3, r: Math.random() * 6.3, vr: (Math.random() - .5) * .3, c: cols[i % cols.length], petal: i % 3 === 0, t: 0 });
    if (!brun) { brun = true; requestAnimationFrame(bstep); }
  }
  function bstep() {
    bg.clearRect(0, 0, innerWidth, innerHeight);
    bparts = bparts.filter(function (p) { return p.y < innerHeight + 30 && p.t < 420; });
    bparts.forEach(function (p) {
      p.t++; p.vy += p.g; p.vx *= .99; p.x += p.vx + Math.sin(p.t * .05) * .6; p.y += p.vy; p.r += p.vr;
      bg.save(); bg.translate(p.x, p.y); bg.rotate(p.r); bg.scale(1, Math.abs(Math.cos(p.t * .08)) * .8 + .2); bg.fillStyle = p.c;
      if (p.petal) { bg.beginPath(); bg.ellipse(0, 0, p.w * .7, p.h, 0, 0, 6.3); bg.fill(); } else bg.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      bg.restore();
    });
    if (bparts.length) requestAnimationFrame(bstep); else { brun = false; bg.clearRect(0, 0, innerWidth, innerHeight); }
  }

  /* ---------- opening ---------- */
  var op = $('#op'), tap = $('#tap');
  var seq = {
    doors: [1300, 2300, 3000], arch: [1300, 2400, 3200], gates: [1900, 3000, 3800], glass: [1000, 2100, 2900],
    curtains: [1500, 2800, 3700], bow: [1900, 2900, 3700], envelope: [2900, 3200, 4100, 2650],
    book: [2500, 2700, 3700, 2250], card: [1900, 2400, 3300, 1650]
  }[T.open] || [1200, 2200, 3000];
  var opened = false;
  function openIt() {
    if (opened) return; opened = true;
    op.classList.add('open');
    if (bgm) bgm.play().then(function () { mbtn.hidden = false; }).catch(function () { mbtn.hidden = false; mbtn.classList.add('muted'); });
    if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) {}
    var k = reduce ? 0 : 1;
    if (seq[3]) setTimeout(function () { op.classList.add('zoom'); }, seq[3] * k);
    if (/doors|arch|curtains|bow|glass/.test(T.open)) setTimeout(function () { op.style.transition = 'background-color 1.2s'; op.style.backgroundColor = 'transparent'; op.style.background = 'transparent'; }, 500 * k);
    setTimeout(function () {
      body.classList.add('opened'); body.classList.remove('locked');
      burst(innerWidth / 2, innerHeight * .4, 140, true);
    }, seq[0] * k);
    setTimeout(function () { op.classList.add('fade'); }, seq[1] * k);
    setTimeout(function () { op.classList.add('gone'); }, seq[2] * k);
  }
  tap.addEventListener('click', openIt);
  op.addEventListener('click', function (e) { if (e.target === op || e.target.closest('.leaf,.scene,.bookwrap,.flip,.tapwrap')) openIt(); });

  /* ---------- parallax ---------- */
  var lays = [].slice.call(document.querySelectorAll('.scene .lay[data-depth]')), ticking = false;
  function par() {
    var y = scrollY;
    if (y < innerHeight * 1.2) lays.forEach(function (l) { l.style.transform = 'translate3d(0,' + (y * parseFloat(l.dataset.depth)).toFixed(1) + 'px,0)'; });
    var hero = $('.hero'); if (hero && y < innerHeight) { hero.style.transform = 'translateY(' + (y * .25).toFixed(1) + 'px)'; hero.style.opacity = Math.max(0, 1 - y / (innerHeight * .8)).toFixed(3); }
    ticking = false;
  }
  if (!reduce) addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(par); } }, { passive: true });

  /* ---------- reveal on scroll ---------- */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (f) { io.observe(f); });
  } else rv.forEach(function (f) { f.classList.add('in'); });

  /* ---------- scratch heart ---------- */
  var box = $('#scratch'), cv = $('#scratchCanvas');
  if (box && cv) {
    var sg = cv.getContext('2d'), done = false, moves = 0, down = false, lastPt = null;
    var heart = 'M150 262C60 196 8 150 8 86 8 40 44 10 86 10c28 0 50 16 64 40 14-24 36-40 64-40 42 0 78 30 78 76 0 64-52 110-142 176Z';
    var sc = T.scratch || ['#f3e6c8', '#d8b878', '#a8823f'];
    var paint = function () {
      var r = box.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = r.width * d; cv.height = r.height * d;
      sg.setTransform(1, 0, 0, 1, 0, 0); sg.globalCompositeOperation = 'source-over';
      sg.scale(cv.width / 300, cv.height / 276);
      var p = new Path2D(heart), gr = sg.createRadialGradient(120, 90, 10, 150, 140, 200);
      gr.addColorStop(0, sc[0]); gr.addColorStop(.5, sc[1]); gr.addColorStop(1, sc[2]);
      sg.fillStyle = gr; sg.fill(p); sg.save(); sg.clip(p);
      for (var i = 0; i < 1500; i++) { sg.fillStyle = Math.random() < .55 ? 'rgba(255,255,255,' + (Math.random() * .8) + ')' : 'rgba(0,0,0,' + (Math.random() * .18) + ')'; sg.fillRect(Math.random() * 300, Math.random() * 276, 1.4, 1.4); }
      sg.font = 'italic 22px ' + getComputedStyle(body).fontFamily; sg.textAlign = 'center'; sg.fillStyle = 'rgba(255,255,255,.85)'; sg.fillText('scratch here', 150, 140);
      sg.restore(); sg.globalCompositeOperation = 'destination-out';
    };
    var pos = function (e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * 300 / r.width, y: (e.clientY - r.top) * 276 / r.height }; };
    var check = function () {
      var d = sg.getImageData(0, 0, cv.width, cv.height).data, clear = 0, total = 0;
      for (var i = 3; i < d.length; i += 64) { total++; if (d[i] < 30) clear++; }
      if (clear / total > .7) reveal();
    };
    var at = function (pt) {
      sg.lineWidth = 38; sg.lineCap = 'round'; sg.lineJoin = 'round';
      sg.beginPath(); sg.moveTo(lastPt ? lastPt.x : pt.x, lastPt ? lastPt.y : pt.y); sg.lineTo(pt.x + .1, pt.y + .1); sg.stroke();
      lastPt = pt; if (++moves % 12 === 0) check();
    };
    var reveal = function () {
      if (done) return; done = true; box.classList.add('done');
      $('#scratchHint').textContent = 'Our forever begins';
      var r = box.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 170);
    };
    cv.addEventListener('pointerdown', function (e) { if (done) return; down = true; lastPt = null; cv.setPointerCapture(e.pointerId); at(pos(e)); });
    cv.addEventListener('pointermove', function (e) { if (down && !done) at(pos(e)); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) { cv.addEventListener(t, function () { down = false; lastPt = null; if (!done) check(); }); });
    cv.tabIndex = 0; cv.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') reveal(); });
    var fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    paint(); fontsReady.then(function () { if (!done) paint(); });
    var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (!done) paint(); }, 200); });
  }

  /* ---------- countdown: 18 Dec 2026, 9:00 PM IST ---------- */
  var target = Date.UTC(2026, 11, 18, 15, 30, 0), ids = ['cd-d', 'cd-h', 'cd-m', 'cd-s'];
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var d = Math.max(0, target - Date.now());
    var v = [Math.floor(d / 864e5), pad(Math.floor(d % 864e5 / 36e5)), pad(Math.floor(d % 36e5 / 6e4)), pad(Math.floor(d % 6e4 / 1e3))];
    ids.forEach(function (id, i) {
      var el = document.getElementById(id); if (!el) return;
      if (el.textContent !== String(v[i])) { el.textContent = v[i]; el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip'); }
    });
  }
  tick(); setInterval(tick, 1000);
})();
