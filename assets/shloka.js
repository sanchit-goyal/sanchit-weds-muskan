/* Ganesh vandana intro: chanted shloka (assets/shloka.mp3) with each word lighting up as it is sung. */
(function () {
  var MARKS = [{"w": "श्री", "t0": 2.6, "t1": 3.25}, {"w": "गणेशाय", "t0": 3.5, "t1": 4.71}, {"w": "नमः", "t0": 4.86, "t1": 5.56}, {"w": "वक्रतुण्ड", "t0": 6.66, "t1": 7.77}, {"w": "महाकाय", "t0": 7.89, "t1": 9.14}, {"w": "सूर्यकोटि", "t0": 9.69, "t1": 11.07}, {"w": "समप्रभ", "t0": 11.19, "t1": 12.2}, {"w": "निर्विघ्नं", "t0": 13.2, "t1": 14.27}, {"w": "कुरु", "t0": 14.39, "t1": 15.0}, {"w": "मे", "t0": 15.05, "t1": 15.66}, {"w": "देव", "t0": 15.71, "t1": 16.38}, {"w": "सर्वकार्येषु", "t0": 16.93, "t1": 18.73}, {"w": "सर्वदा", "t0": 18.85, "t1": 19.95}], TOTAL = 25.26;
  var el = document.getElementById('shl'); if (!el) return;
  var words = el.querySelectorAll('.w'), au = new Audio('../assets/shloka.mp3?v=1'), skip = el.querySelector('.skip'), prog = el.querySelector('.prog');
  au.preload = 'auto';
  var cv = el.querySelector('canvas'), g = cv.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2), W, H, parts = [], live = true;
  function size() { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size(); addEventListener('resize', size);
  function mk(init) { return { x: Math.random() * W, y: init ? Math.random() * H : H + 10, r: .6 + Math.random() * 2.2, vy: 8 + Math.random() * 18, ph: Math.random() * 6.3, petal: Math.random() < .28, rot: Math.random() * 6.3 }; }
  for (var i = 0; i < 60; i++) parts.push(mk(true));
  var last = performance.now();
  (function loop(now) {
    if (!live) return;
    var dt = Math.min(.05, (now - last) / 1000); last = now; g.clearRect(0, 0, W, H);
    parts.forEach(function (p, i) {
      p.y -= p.vy * dt; p.x += Math.sin(now / 1300 + p.ph) * 8 * dt; if (p.y < -12) parts[i] = mk(false);
      var a = .35 + .5 * Math.abs(Math.sin(now / 900 + p.ph));
      if (p.petal) { g.save(); g.translate(p.x, p.y); g.rotate(p.rot + now / 1800); g.globalAlpha = a * .8; g.fillStyle = i % 2 ? '#f5a623' : '#e98a2b'; g.beginPath(); g.ellipse(0, 0, p.r * 2.6, p.r * 1.3, 0, 0, 6.3); g.fill(); g.restore(); }
      else { var gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4); gr.addColorStop(0, 'rgba(255,240,200,' + a + ')'); gr.addColorStop(1, 'rgba(255,200,120,0)'); g.fillStyle = gr; g.beginPath(); g.arc(p.x, p.y, p.r * 4, 0, 6.3); g.fill(); }
    });
    requestAnimationFrame(loop);
  })(last);
  var raf, finished = false, clock0 = 0, useAudio = true;
  function now() { return useAudio ? au.currentTime : (performance.now() - clock0) / 1000; }
  function sync() {
    var t = now();
    for (var i = 0; i < MARKS.length && i < words.length; i++) {
      var on = t >= MARKS[i].t0 - .05 && t < MARKS[i].t1 + .25;
      words[i].classList.toggle('on', on);
      words[i].classList.toggle('done', t >= MARKS[i].t1 + .25);
    }
    prog.style.width = Math.min(100, t / TOTAL * 100) + '%';
    if (t >= TOTAL - 2.6) return finish();
    raf = requestAnimationFrame(sync);
  }
  function finish() {
    if (finished) return; finished = true; cancelAnimationFrame(raf);
    words.forEach(function (w) { w.classList.remove('on'); w.classList.add('done'); });
    var v = useAudio ? au.volume : 0, f = setInterval(function () { v = Math.max(0, v - .06); au.volume = v; if (!v) { clearInterval(f); au.pause(); } }, 90);
    setTimeout(function () { el.classList.add('out'); if (done_cb) done_cb(); }, 500);
    setTimeout(function () { el.classList.add('gone'); live = false; }, 2100);
  }
  var done_cb = null, unlocked = false;
  window.Shloka = {
    unlock: function () { if (unlocked) return; unlocked = true; var p = au.play(); if (p) p.then(function () { au.pause(); au.currentTime = 0; }).catch(function () {}); },
    begin: function (cb) {
      done_cb = cb; el.classList.add('show', 'playing');
      au.currentTime = 0;
      au.play().then(function () { raf = requestAnimationFrame(sync); }).catch(function () {
        useAudio = false; clock0 = performance.now(); raf = requestAnimationFrame(sync);
      });
    }
  };
  skip.addEventListener('click', finish);
})();
