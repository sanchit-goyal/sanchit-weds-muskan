// In-browser invite video renderer: animates 1080x1920 cards with Ken Burns motion,
// varied transitions, gold sparkles and background music, records to MP4/WebM and downloads.
window.InviteRender = async function (opts) {
  const { cards, music, name, perCard = 7.2, trans = 1.2, intro = 0.8 } = opts;
  const W = 1080, H = 1920, FPS = 30;
  const log = (m) => { window.__renderLog = (window.__renderLog || '') + m + '\n'; };
  window.__renderDone = false; window.__renderLog = '';

  // ---- load images ----
  const imgs = await Promise.all(cards.map(u => new Promise((res, rej) => {
    const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('img ' + u)); i.src = u;
  })));
  log('images ' + imgs.length);

  // ---- canvas ----
  let cv = document.getElementById('__rc');
  if (!cv) { cv = document.createElement('canvas'); cv.id = '__rc'; document.body.appendChild(cv); }
  cv.width = W; cv.height = H;
  cv.style.cssText = 'position:fixed;left:0;top:0;height:100vh;width:auto;z-index:99999;background:#000';
  const g = cv.getContext('2d');

  // ---- audio ----
  const ac = new AudioContext();
  await ac.resume();
  const buf = await ac.decodeAudioData(await (await fetch(music)).arrayBuffer());
  const n = imgs.length;
  const total = intro + n * perCard - (n - 1) * trans + 1.2;
  const src = ac.createBufferSource(); src.buffer = buf;
  const gain = ac.createGain();
  const dest = ac.createMediaStreamDestination();
  src.connect(gain); gain.connect(dest);
  gain.gain.setValueAtTime(0, 0);

  // ---- recorder ----
  const vs = cv.captureStream(FPS);
  const stream = new MediaStream([...vs.getVideoTracks(), ...dest.stream.getAudioTracks()]);
  const types = ['video/mp4;codecs=avc1.640028,mp4a.40.2', 'video/mp4;codecs=avc1,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm'];
  const mime = types.find(t => MediaRecorder.isTypeSupported(t));
  log('mime ' + mime);
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 12e6, audioBitsPerSecond: 192e3 });
  const chunks = []; rec.ondataavailable = e => e.data.size && chunks.push(e.data);

  // ---- sparkles ----
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const parts = Array.from({ length: 70 }, () => ({
    x: rnd() * W, y: rnd() * H, r: 2 + rnd() * 5, vy: 20 + rnd() * 50, vx: -10 + rnd() * 20,
    ph: rnd() * 6.28, petal: rnd() < 0.3, rot: rnd() * 6.28
  }));
  const ease = u => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;

  function drawCard(img, p, k, alpha = 1, extraScale = 1, dy = 0) {
    const zin = k % 2 === 0;
    const s = (zin ? 1 + 0.07 * p : 1.07 - 0.07 * p) * extraScale;
    const px = (k % 3 - 1) * 18 * (p - .5), py = (k % 2 ? 14 : -14) * (p - .5);
    g.save(); g.globalAlpha = alpha;
    g.translate(W / 2 + px, H / 2 + py + dy); g.scale(s, s);
    g.drawImage(img, -W / 2, -H / 2, W, H); g.restore();
  }

  function frame(t) {
    g.globalAlpha = 1; g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    const step = perCard - trans;
    for (let i = 0; i < n; i++) {
      const st = intro + i * step, en = st + perCard;
      if (t < st - 0.001 || t > en) continue;
      const p = Math.min(1, Math.max(0, (t - st) / perCard));
      const inT = (t - st) / trans;           // 0..1 during incoming transition
      const outT = (t - (en - trans)) / trans; // 0..1 during outgoing transition
      const type = (i - 1) % 5;               // transition used when card i comes in
      if (i > 0 && inT < 1) {
        const u = ease(Math.max(0, inT));
        if (type === 0) drawCard(imgs[i], p, i, u);
        else if (type === 1) drawCard(imgs[i], p, i, Math.min(1, u * 1.5), 1, (1 - u) * H * 0.35);
        else if (type === 2) { g.save(); g.beginPath(); g.arc(W / 2, H / 2, u * Math.hypot(W, H) / 2 + 1, 0, 6.29); g.clip(); drawCard(imgs[i], p, i); g.restore(); }
        else if (type === 3) drawCard(imgs[i], p, i, u, 0.88 + 0.12 * u);
        else { g.save(); g.beginPath(); const x = -W * 0.4 + u * W * 1.9; g.moveTo(x, 0); g.lineTo(x - W * 0.5, H); g.lineTo(-W, H); g.lineTo(-W, 0); g.closePath(); g.clip(); drawCard(imgs[i], p, i); g.restore(); }
      } else if (!(i < n - 1 && outT > 0 && ((i) % 5 === 3))) {
        drawCard(imgs[i], p, i, i === 0 ? Math.min(1, (t - intro + 0.6) / 0.9) : 1);
      }
      // outgoing card for zoom-through: draw above incoming
      if (i < n - 1 && outT > 0 && (i % 5) === 3) {
        const u = ease(Math.min(1, outT));
        drawCard(imgs[i], p, i, 1 - u, 1 + 0.25 * u);
      }
    }
    // golden flash on transition type 3 midpoints
    for (let i = 1; i < n; i++) {
      if ((i - 1) % 5 !== 3) continue;
      const st = intro + i * step, d = Math.abs(t - (st + trans / 2));
      if (d < trans / 2) { g.globalAlpha = 0.35 * (1 - d / (trans / 2)); g.fillStyle = '#fff1cf'; g.fillRect(0, 0, W, H); }
    }
    // sparkles & petals
    for (const q of parts) {
      const y = (q.y + q.vy * t) % (H + 40) - 20, x = (q.x + q.vx * t + 30 * Math.sin(t * .6 + q.ph) + W) % W;
      const a = 0.35 + 0.45 * Math.abs(Math.sin(t * 1.7 + q.ph));
      g.globalAlpha = a;
      if (q.petal) { g.save(); g.translate(x, y); g.rotate(q.rot + t * .8); g.fillStyle = '#f3b6a6'; g.beginPath(); g.ellipse(0, 0, q.r * 1.6, q.r * .8, 0, 0, 6.29); g.fill(); g.restore(); }
      else { const gr = g.createRadialGradient(x, y, 0, x, y, q.r * 3); gr.addColorStop(0, '#fff6d8'); gr.addColorStop(.3, '#f2c76b'); gr.addColorStop(1, 'rgba(242,199,107,0)'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, q.r * 3, 0, 6.29); g.fill(); }
    }
    // vignette
    g.globalAlpha = 1;
    const vg = g.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.28)');
    g.fillStyle = vg; g.fillRect(0, 0, W, H);
    // fade in/out
    const fin = Math.min(1, t / intro), fout = Math.min(1, (total - t) / 1.4);
    const f = Math.min(fin, fout);
    if (f < 1) { g.globalAlpha = 1 - Math.max(0, f); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
  }

  frame(0);
  rec.start(500);
  const t0 = ac.currentTime + 0.15;
  src.start(t0);
  gain.gain.setValueAtTime(0, t0); gain.gain.linearRampToValueAtTime(0.9, t0 + 1.5);
  gain.gain.setValueAtTime(0.9, t0 + total - 2.5); gain.gain.linearRampToValueAtTime(0, t0 + total);
  await new Promise(res => {
    const loop = () => {
      const t = ac.currentTime - t0;
      if (t >= total) return res();
      frame(Math.max(0, t));
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
  rec.stop(); src.stop();
  await new Promise(r => rec.onstop = r);
  const blob = new Blob(chunks, { type: mime.split(';')[0] });
  const ext = mime.includes('mp4') ? 'mp4' : 'webm';
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name + '.' + ext;
  document.body.appendChild(a); a.click();
  log('done ' + (blob.size / 1e6).toFixed(1) + 'MB ' + total.toFixed(1) + 's ' + a.download);
  window.__renderDone = true;
  ac.close();
  return window.__renderLog;
};
