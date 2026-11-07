// Generates /<slug>/index.html for every theme in tools/themes.js, plus the root gallery.
// Run: node tools/build.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const THEMES = require('./themes');

/* ---------- helpers ---------- */
let seed = 1;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const hexA = (hex, a) => { const h = hex.replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
const fam = f => ({
  'Great Vibes': 'Great+Vibes', 'Pinyon Script': 'Pinyon+Script', 'Parisienne': 'Parisienne', 'Allura': 'Allura', 'Italiana': 'Italiana',
  'Playfair Display': 'Playfair+Display:wght@400;500;600', 'Cinzel': 'Cinzel:wght@400;500;600', 'Cormorant Garamond': 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500'
})[f];
const fontsHref = fs_ => 'https://fonts.googleapis.com/css2?' + [...new Set([...fs_, 'Cormorant Garamond'])].map(f => 'family=' + fam(f)).join('&') + '&family=Tiro+Devanagari+Hindi&display=swap';

/* ---------- shared SVG defs ---------- */
const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  <pattern id="fil" width="64" height="150" patternUnits="userSpaceOnUse">
    <g fill="none" style="stroke:var(--o-line)" stroke-width="1.5" stroke-linecap="round">
      <path d="M0 0V150M64 0V150" stroke-width="2.4"/><path d="M0 75H64" stroke-width="1"/>
      <path d="M32 6c-14 0-20 14-12 22 6 5 13 1 11-5M32 6c14 0 20 14 12 22-6 5-13 1-11-5M32 6v32M24 38c4 4 12 4 16 0"/>
      <path d="M32 112c-14 0-20-14-12-22 6-5 13-1 11 5M32 112c14 0 20-14 12-22-6-5-13-1-11 5M32 112V80M24 80c4-4 12-4 16 0"/>
      <path d="M2 40c10 2 14 12 8 18M62 40c-10 2-14 12-8 18M2 110c10-2 14-12 8-18M62 110c-10-2-14-12-8-18"/>
      <path d="M32 118v26M26 132c3 3 9 3 12 0"/></g>
    <g style="fill:var(--o-line)"><circle cx="32" cy="38" r="2"/><circle cx="32" cy="80" r="2"/><circle cx="32" cy="75" r="3.2"/><circle cx="32" cy="146" r="2.4"/></g>
  </pattern>
  <pattern id="geo" width="56" height="56" patternUnits="userSpaceOnUse">
    <g fill="none" style="stroke:var(--accent)" stroke-width=".8"><path d="M28 0L56 28 28 56 0 28Z"/><path d="M28 10L46 28 28 46 10 28Z"/><path d="M0 0L10 10M56 0L46 10M0 56L10 46M56 56L46 46"/></g>
  </pattern>
  <symbol id="corner" viewBox="0 0 46 46"><g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
    <path d="M3 43V15C3 8 8 3 15 3H43"/><path d="M9 37V19c0-6 4-10 10-10h18"/><path d="M15 15c6 0 9 4 7 8-2 3-6 2-6-1"/>
    <path d="M3 30c4-2 7 0 6 4M30 3c-2 4 0 7 4 6"/></g><circle cx="15" cy="15" r="1.8" fill="currentColor"/></symbol>
  <symbol id="flourish" viewBox="0 0 100 160"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
    <circle cx="50" cy="80" r="26"/><circle cx="50" cy="80" r="20" stroke-dasharray="2 4"/>
    <path d="M50 54C50 34 36 26 26 30M50 54C50 34 64 26 74 30M50 106c0 20-14 28-24 24M50 106c0 20 14 28 24 24"/>
    <path d="M50 10v30M50 120v30M30 30c-8-6-10-14-4-18M70 30c8-6 10-14 4-18M30 130c-8 6-10 14-4 18M70 130c8 6 10 14 4 18"/>
    <path d="M24 80H6M76 80h18M40 80c0-6 4-10 10-10s10 4 10 10-4 10-10 10-10-4-10-10z"/></g>
    <g fill="currentColor"><circle cx="50" cy="8" r="3"/><circle cx="50" cy="152" r="3"/><circle cx="4" cy="80" r="2.5"/><circle cx="96" cy="80" r="2.5"/></g></symbol>
  <symbol id="bl" viewBox="-12 -12 24 24">
    <g style="fill:var(--fl1)"><circle cx="0" cy="-6" r="5.6"/><circle cx="5.7" cy="-1.9" r="5.6"/><circle cx="3.5" cy="4.9" r="5.6"/><circle cx="-3.5" cy="4.9" r="5.6"/><circle cx="-5.7" cy="-1.9" r="5.6"/></g>
    <g style="fill:var(--fl2)" opacity=".55"><circle cx="0" cy="-4" r="2.6"/><circle cx="3.8" cy="-1.2" r="2.6"/><circle cx="2.3" cy="3.2" r="2.6"/><circle cx="-2.3" cy="3.2" r="2.6"/><circle cx="-3.8" cy="-1.2" r="2.6"/></g>
    <circle r="2.6" style="fill:var(--fl-c)"/></symbol>
  <symbol id="bud" viewBox="-8 -8 16 16"><circle r="6.5" style="fill:var(--fl2)"/><circle r="4" style="fill:var(--fl1)" opacity=".8"/><circle r="1.6" style="fill:var(--fl-c)"/></symbol>
  <symbol id="lf" viewBox="0 -7 24 14"><path d="M0 0C6-8 17-8 24 0 17 8 6 8 0 0Z" style="fill:var(--leaf)"/><path d="M1 0H21" stroke="rgba(255,255,255,.35)" stroke-width=".8"/></symbol>
  <symbol id="bird" viewBox="0 0 30 12"><path d="M0 6C6 0 11 1 15 7 19 1 24 0 30 6 24 4 19 6 15 11 11 6 6 4 0 6Z" fill="currentColor"/></symbol>
</defs></svg>`;

const divider = `<svg class="divider" viewBox="0 0 200 22" aria-hidden="true"><path d="M0 11H78M122 11H200M80 11c6-9 14-9 20 0 6 9 14 9 20 0" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="100" cy="11" r="3" fill="currentColor"/></svg>`;
const corners = ['tl', 'tr', 'bl', 'br'].map(c => `<svg class="corner c-${c}" aria-hidden="true"><use href="#corner"/></svg>`).join('');
const medal = (wax, extra = '') => `<button id="tap" class="medal${wax ? ' wax' : ''}" aria-label="Tap to open the invitation"${extra}><span class="mono">S<small>&amp;</small>M</span><span class="lbl">Tap to open</span></button>`;
const tapNames = (hint = true) => `<div class="tap-names"><div class="n">Sanchit &amp; Muskan</div><div class="d">18 · 12 · 2026 · Agra</div>${hint ? '<div class="tap-hint">Tap to open</div>' : ''}</div>`;

/* floral cluster: blossoms + leaves around (x,y) */
function cluster(x, y, n, spread, s = 1) {
  let out = '';
  for (let i = 0; i < n + 2; i++) {
    const a = rnd() * 6.28, r = rnd() * spread, w = (16 + rnd() * 12) * s;
    out += `<use href="#lf" x="${(x + Math.cos(a) * r * 1.3 - w / 2).toFixed(1)}" y="${(y + Math.sin(a) * r * 1.1 - w / 4).toFixed(1)}" width="${w.toFixed(1)}" height="${(w / 2).toFixed(1)}" transform="rotate(${(a * 57.3).toFixed(0)} ${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)})"/>`;
  }
  for (let i = 0; i < n; i++) {
    const a = rnd() * 6.28, r = rnd() * spread, w = (14 + rnd() * 16) * s, big = rnd() < .65;
    out += `<use href="#${big ? 'bl' : 'bud'}" x="${(x + Math.cos(a) * r - w / 2).toFixed(1)}" y="${(y + Math.sin(a) * r - w / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${w.toFixed(1)}"/>`;
  }
  return out;
}
const stop = (o, v, op = 1) => `<stop offset="${o}" style="stop-color:var(--${v})" stop-opacity="${op}"/>`;
const svgOpen = (ar = 'xMidYMax slice') => `<svg viewBox="0 0 400 800" preserveAspectRatio="${ar}" aria-hidden="true">`;

/* ---------- hero scenes ---------- */
function scene(t, P) {
  seed = t.slug.length * 97 + P.length * 13;
  const sky = `<defs><linearGradient id="${P}sky" x1="0" y1="0" x2="0" y2="1">${stop(0, 'sky1')}${stop(1, 'sky2')}</linearGradient>
    <linearGradient id="${P}wat" x1="0" y1="0" x2="0" y2="1">${stop(0, 'water1')}${stop(1, 'water2')}</linearGradient>
    <radialGradient id="${P}sun">${stop(0, 'sun')}${stop(.35, 'sun', .55)}${stop(1, 'sun', 0)}</radialGradient></defs>
    <rect width="400" height="800" fill="url(#${P}sky)"/>`;
  const sideFlowers = `<div class="lay" data-depth="-.06">${svgOpen()}${cluster(10, 790, 14, 60, 1.6)}${cluster(390, 790, 14, 60, 1.6)}${cluster(-6, 40, 9, 46, 1.3)}${cluster(406, 40, 9, 46, 1.3)}</svg></div>`;
  const birds = `<g class="birds" style="color:var(--hero-accent)" opacity=".55">${[0, 1, 2, 3, 4].map(i => `<use href="#bird" x="${30 + i * 22}" y="${150 + (i % 2) * 16 + i * 6}" width="${22 - i * 2}" height="9" style="animation-delay:-${i * 2.3}s"/>`).join('')}</g>`;
  const palace = (id, y0 = 0, sc = 1) => `<g id="${id}" transform="translate(${200 - 200 * sc} ${y0}) scale(${sc})" style="fill:var(--pal)">
      <rect x="62" y="536" width="276" height="26"/><rect x="72" y="404" width="9" height="134"/><rect x="319" y="404" width="9" height="134"/>
      <path d="M68 406c0-10 6-16 8.5-18 2.5 2 8.5 8 8.5 18zM315 406c0-10 6-16 8.5-18 2.5 2 8.5 8 8.5 18z"/>
      <rect x="112" y="440" width="176" height="98"/><path d="M146 442c0-30 22-56 54-74 32 18 54 44 54 74z"/><rect x="158" y="432" width="84" height="12"/>
      <path d="M198 368v-30h4v30z"/><circle cx="200" cy="334" r="4"/>
      <path d="M118 442c0-14 9-22 16-26 7 4 16 12 16 26zM250 442c0-14 9-22 16-26 7 4 16 12 16 26z"/>
      <g class="windows" style="fill:var(--win)"><path d="M184 538v-52c0-12 8-22 16-28 8 6 16 16 16 28v52z" opacity=".85"/>
        <path d="M128 538v-30c0-7 5-12 9-15 4 3 9 8 9 15v30zM254 538v-30c0-7 5-12 9-15 4 3 9 8 9 15v30z" opacity=".7"/>
        <path d="M128 488v-20c0-5 4-9 9-11 5 2 9 6 9 11v20zM254 488v-20c0-5 4-9 9-11 5 2 9 6 9 11v20z" opacity=".55"/></g></g>`;
  const s = t.scene;
  if (s === 'lake') return `<div class="scene">
    <div class="lay" data-depth=".12">${svgOpen()}${sky}<circle cx="200" cy="340" r="120" fill="url(#${P}sun)"/>${birds}</svg></div>
    <div class="lay" data-depth=".22">${svgOpen()}<path d="M0 476L52 430 96 452 160 384 222 436 284 396 346 446 400 414V560H0Z" style="fill:var(--mt1)" opacity=".85"/>
      <path d="M0 530C70 488 130 506 196 516S330 486 400 506V570H0Z" style="fill:var(--mt2)"/>
      <rect y="548" width="400" height="252" fill="url(#${P}wat)"/>
      <g style="fill:var(--sun)">${[...Array(9)].map((_, i) => `<rect class="shimmer" x="${170 + (i % 3) * 14 - i}" y="${566 + i * 18}" width="${36 - i * 2}" height="2" rx="1" style="animation-delay:-${i * .5}s"/>`).join('')}</g></svg></div>
    ${sideFlowers}</div>`;
  if (s === 'palace') return `<div class="scene">
    <div class="lay" data-depth=".1">${svgOpen()}${sky}<circle cx="200" cy="360" r="170" fill="url(#${P}sun)"/>${birds}</svg></div>
    <div class="lay" data-depth=".2">${svgOpen()}${palace(P + 'pal')}<rect y="562" width="400" height="238" fill="url(#${P}wat)"/>
      <use href="#${P}pal" transform="translate(0 1124) scale(1 -1)" opacity=".22"/>
      <g style="fill:var(--sun)">${[...Array(7)].map((_, i) => `<rect class="shimmer" x="${180 - i * 3}" y="${590 + i * 22}" width="${40 + i * 6}" height="2" rx="1" style="animation-delay:-${i * .6}s"/>`).join('')}</g></svg></div>
    ${sideFlowers}</div>`;
  if (s === 'ocean') return `<div class="scene">
    <div class="lay" data-depth=".1">${svgOpen()}${sky}<circle cx="200" cy="440" r="140" fill="url(#${P}sun)"/>${birds}</svg></div>
    <div class="lay" data-depth=".18">${svgOpen()}<rect y="462" width="400" height="338" fill="url(#${P}wat)"/>
      <g fill="none" stroke="rgba(255,255,255,.65)" stroke-width="1.6" stroke-linecap="round">
      ${[0, 1, 2, 3, 4, 5].map(i => `<path class="wave${i % 2 ? ' b' : ''}" d="M-40 ${500 + i * 46}q25 -8 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0"/>`).join('')}</g>
      <g style="fill:var(--sun)">${[...Array(8)].map((_, i) => `<rect class="shimmer" x="${182 - i * 4}" y="${474 + i * 16}" width="${36 + i * 8}" height="2" rx="1" style="animation-delay:-${i * .4}s"/>`).join('')}</g></svg></div>
    <div class="lay" data-depth="-.04">${svgOpen()}<path fill-rule="evenodd" d="M0 0H400V800H0ZM40 800V300C40 170 120 96 200 70 280 96 360 170 360 300V800Z" style="fill:var(--arch)"/>
      <path d="M40 800V300C40 170 120 96 200 70 280 96 360 170 360 300V800" fill="none" style="stroke:var(--accent)" stroke-width="2"/>
      <g style="fill:var(--fl2)">${[...Array(23)].map((_, i) => { const u = i / 22, a = Math.PI * (1 - u); const x = 200 + Math.cos(a) * 164, y = 300 - Math.sin(a) * 222 * (u < .5 ? 1 : 1); return `<circle cx="${x.toFixed(1)}" cy="${(y + 6).toFixed(1)}" r="4.2" stroke="rgba(0,0,0,.08)"/>`; }).join('')}</g>
      ${cluster(40, 780, 12, 50, 1.5)}${cluster(360, 780, 12, 50, 1.5)}${cluster(200, 74, 9, 34, 1.2)}</svg></div></div>`;
  if (s === 'night') return `<div class="scene">
    <div class="lay" data-depth=".08">${svgOpen()}<defs><linearGradient id="${P}sky" x1="0" y1="0" x2="0" y2="1">${stop(0, 'sky1')}${stop(1, 'sky2')}</linearGradient>
      <radialGradient id="${P}mg">${stop(0, 'moon', .6)}${stop(1, 'moon', 0)}</radialGradient></defs><rect width="400" height="800" fill="url(#${P}sky)"/>
      <circle class="moonglow" cx="300" cy="150" r="140" fill="url(#${P}mg)"/><circle cx="300" cy="150" r="46" style="fill:var(--moon)"/>
      <g fill="rgba(0,0,0,.06)"><circle cx="286" cy="140" r="9"/><circle cx="314" cy="164" r="6"/><circle cx="306" cy="134" r="4"/></g>
      <g fill="rgba(255,255,255,.06)"><ellipse cx="120" cy="300" rx="120" ry="16"/><ellipse cx="330" cy="340" rx="100" ry="12"/></g></svg></div>
    <div class="lay" data-depth=".18">${svgOpen()}${palace(P + 'pal', 40, 1)}<rect y="602" width="400" height="198" style="fill:var(--sky1)"/>
      <use href="#${P}pal" transform="translate(0 1204) scale(1 -1)" opacity=".25"/>
      <g style="fill:var(--moon)">${[...Array(7)].map((_, i) => `<rect class="shimmer" x="${280 - i * 2}" y="${620 + i * 20}" width="${30 + i * 6}" height="2" rx="1" style="animation-delay:-${i * .5}s"/>`).join('')}</g></svg></div>
    ${sideFlowers}</div>`;
  if (s === 'garden') {
    let arc = '';
    for (let i = 0; i <= 26; i++) { const a = Math.PI * (1.04 + i / 26 * 0.92 * -1 + 0.94); const x = 200 + Math.cos(Math.PI - i / 26 * Math.PI) * 168, y = 420 - Math.sin(i / 26 * Math.PI) * 300; arc += cluster(x, y, 3, 16, 1.05); }
    let strands = '';
    for (let k = 0; k < 6; k++) { const x = 30 + k * 68 + (rnd() * 20 - 10), len = 4 + Math.floor(rnd() * 4); let g = ''; for (let j = 0; j < len; j++) g += `<use href="#bud" x="${(x - 6 + (j % 2) * 4).toFixed(1)}" y="${(j * 14).toFixed(1)}" width="${12 - j * .8}" height="${12 - j * .8}"/>`; strands += `<g class="sway" style="animation-delay:-${k * .9}s"><path d="M${x} 0V${len * 14}" stroke="var(--leaf)" stroke-width=".8" opacity=".5"/>${g}</g>`; }
    return `<div class="scene">
    <div class="lay" data-depth=".1">${svgOpen()}${sky}<circle cx="200" cy="380" r="200" fill="url(#${P}sun)" opacity=".7"/></svg></div>
    <div class="lay" data-depth=".04">${svgOpen('xMidYMid slice')}${strands}<g opacity=".95">${arc}</g>${cluster(40, 740, 16, 70, 1.6)}${cluster(360, 740, 16, 70, 1.6)}${cluster(200, 800, 12, 80, 1.4)}</svg></div></div>`;
  }
  // ornate
  let man = '';
  const n = t.geo ? 12 : 24;
  for (let i = 0; i < n; i++) man += t.geo ? `<path d="M200 220L230 400 200 580 170 400Z" transform="rotate(${i * 360 / n} 200 400)"/>` : `<path d="M200 230C222 290 222 340 200 380 178 340 178 290 200 230Z" transform="rotate(${i * 15} 200 400)"/><circle cx="200" cy="214" r="3" transform="rotate(${i * 15 + 7.5} 200 400)"/>`;
  return `<div class="scene" style="background:var(--hero-bg)">
    <div class="lay" data-depth=".15">${svgOpen('xMidYMid slice')}<defs><radialGradient id="${P}sun">${stop(0, 'light', .35)}${stop(1, 'light', 0)}</radialGradient></defs>
      ${t.geo ? '<rect width="400" height="800" fill="url(#geo)" style="color:var(--accent)" opacity=".10"/>' : ''}
      <circle cx="200" cy="400" r="260" fill="url(#${P}sun)"/>
      <g class="mandala" fill="none" style="stroke:var(--accent)" stroke-width="1" opacity=".32"><circle cx="200" cy="400" r="190"/><circle cx="200" cy="400" r="176" stroke-dasharray="2 6"/><circle cx="200" cy="400" r="150"/>${man}<circle cx="200" cy="400" r="120"/></g></svg></div>
    <div class="lay" data-depth="-.04" style="color:var(--accent)">${svgOpen('xMidYMid slice')}
      <use href="#corner" x="8" y="8" width="120" height="120"/><use href="#corner" x="-392" y="8" width="120" height="120" transform="scale(-1 1)"/>
      <use href="#corner" x="8" y="-792" width="120" height="120" transform="scale(1 -1)"/><use href="#corner" x="-392" y="-792" width="120" height="120" transform="scale(-1 -1)"/>
      ${t.scene === 'ornate' && !t.geo && t.fx.includes('petals') ? cluster(20, 790, 10, 50, 1.3) + cluster(380, 790, 10, 50, 1.3) : ''}</svg></div></div>`;
}

/* ---------- openings ---------- */
function opening(t) {
  const o = t.open;
  if (o === 'doors') {
    const orn = t.floralDoors
      ? `<svg class="orn" viewBox="0 0 100 160" style="width:70%"><use href="#flourish"/></svg><svg viewBox="0 0 200 120" style="position:absolute;left:0;top:2%;width:100%">${cluster(100, 30, 10, 40, 1.4)}</svg><svg viewBox="0 0 200 120" style="position:absolute;left:0;bottom:2%;width:100%">${cluster(100, 96, 10, 40, 1.4)}</svg>`
      : `<svg class="orn" viewBox="0 0 100 160"><use href="#flourish"/></svg>`;
    return `<div id="op" class="o-doors"><div class="glow"></div>
      <div class="leaf l"><div class="pane"></div>${orn}<i class="knob"></i></div><div class="leaf r"><div class="pane"></div>${orn}<i class="knob"></i></div>
      <div class="tapwrap">${medal(false)}</div>${tapNames(false)}</div>`;
  }
  if (o === 'arch') {
    const leaf = `<svg class="orn" viewBox="0 0 200 800" preserveAspectRatio="none"><g fill="none" stroke="currentColor" vector-effect="non-scaling-stroke">
      <rect x="22" y="230" width="156" height="220" rx="4" vector-effect="non-scaling-stroke"/><rect x="34" y="244" width="132" height="192" rx="3" vector-effect="non-scaling-stroke"/>
      <rect x="22" y="480" width="156" height="250" rx="4" vector-effect="non-scaling-stroke"/><rect x="34" y="494" width="132" height="222" rx="3" vector-effect="non-scaling-stroke"/></g></svg>`;
    return `<div id="op" class="o-arch"><div class="glow"></div>
      <div class="leaf l">${leaf}</div><div class="leaf r">${leaf}</div>
      <div class="frame"><svg viewBox="0 0 400 800" preserveAspectRatio="none"><path fill-rule="evenodd" d="M0 0H400V800H0ZM34 800V300C34 170 116 92 200 52 284 92 366 170 366 300V800Z" style="fill:var(--o-frame)"/>
        <path d="M34 800V300C34 170 116 92 200 52 284 92 366 170 366 300V800M20 800V296C20 160 108 76 200 34 292 76 380 160 380 296V800" fill="none" style="stroke:var(--o-line)" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>
        <svg viewBox="0 0 200 160" style="position:absolute;left:-6%;top:-2%;width:46%">${cluster(40, 40, 14, 50, 1.4)}</svg><svg viewBox="0 0 200 160" style="position:absolute;right:-6%;top:-2%;width:46%">${cluster(160, 40, 14, 50, 1.4)}</svg>
        <svg viewBox="0 0 200 160" style="position:absolute;left:-8%;bottom:-3%;width:50%">${cluster(40, 130, 14, 50, 1.5)}</svg><svg viewBox="0 0 200 160" style="position:absolute;right:-8%;bottom:-3%;width:50%">${cluster(160, 130, 14, 50, 1.5)}</svg></div>
      <div class="tapwrap">${medal(false)}</div>${tapNames(false)}</div>`;
  }
  if (o === 'gates' || o === 'glass') {
    const leaf = o === 'gates'
      ? `<svg class="orn"><rect width="100%" height="100%" fill="url(#fil)"/><rect x="2%" y="1%" width="96%" height="98%" fill="none" stroke="currentColor" stroke-width="5"/><rect x="5%" y="3%" width="90%" height="94%" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
      : `<svg class="orn"><rect x="7%" y="5%" width="86%" height="90%" rx="8" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="11%" y="8%" width="78%" height="84%" rx="6" fill="none" stroke="currentColor" stroke-width=".6" stroke-dasharray="3 5"/></svg><svg viewBox="0 0 200 200" style="position:absolute;left:0;bottom:4%;width:100%;opacity:.9">${cluster(100, 150, 10, 46, 1.3)}</svg>`;
    return `<div id="op" class="o-${o}"><div class="behind">${scene(t, 'op')}</div><div class="glow"></div>
      <div class="leaf l">${leaf}</div><div class="leaf r">${leaf}</div>
      <div class="tapwrap">${medal(false)}</div>${tapNames(false)}</div>`;
  }
  if (o === 'curtains') {
    const tassel = `<svg viewBox="0 0 26 90"><path d="M13 0V20" stroke="var(--o-line)" stroke-width="2"/><circle cx="13" cy="26" r="7" style="fill:var(--o-line)"/><path d="M6 32h14l5 52H1z" style="fill:var(--o-line)"/><path d="M5 44h16M4 56h18M3 68h20" stroke="rgba(0,0,0,.25)"/></svg>`;
    let sw = ''; for (let i = 0; i < 5; i++) sw += `<path d="M${i * 80} 0Q${i * 80 + 40} 92 ${i * 80 + 80} 0" />`;
    return `<div id="op" class="o-curtains"><div class="glow"></div>
      <div class="leaf l"></div><div class="leaf r"></div>
      <div class="valance"><svg viewBox="0 0 400 100" preserveAspectRatio="none"><defs><linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">${stop(0, 'o1')}${stop(1, 'o2')}</linearGradient></defs>
        <rect width="400" height="34" fill="url(#vg)"/><g fill="url(#vg)" stroke="var(--o-line)" stroke-width="1.5" vector-effect="non-scaling-stroke">${sw}</g>
        <g fill="none" stroke="var(--o-line)" stroke-width="3" stroke-dasharray="1 3" vector-effect="non-scaling-stroke">${sw.replace(/Q(\d+) 92/g, (m, a) => `Q${a} 98`)}</g></svg></div>
      <div class="tassel l">${tassel}</div><div class="tassel r">${tassel}</div>
      <div class="tapwrap">${medal(false)}</div>${tapNames()}</div>`;
  }
  if (o === 'bow') {
    return `<div id="op" class="o-bow"${t.organza ? ' style="--rb-op:.92"' : ''}><div class="glow"></div>
      <div class="leaf l"></div><div class="leaf r"></div><div class="band l"></div><div class="band r"></div>
      <div class="bow"><svg viewBox="0 0 520 320"><defs><linearGradient id="rbg" x1="0" y1="0" x2="0" y2="1">${stop(0, 'rb-hi')}${stop(.45, 'rb')}${stop(1, 'rb-lo')}</linearGradient></defs>
        <g fill="url(#rbg)" stroke="rgba(0,0,0,.08)">
        <path class="tailL" d="M248 168C228 210 196 262 160 310L196 318C222 278 244 226 262 170Z"/><path class="tailR" d="M272 168C292 210 324 262 360 310L324 318C298 278 276 226 258 170Z"/>
        <path class="loopL" d="M262 156C206 58 92 44 66 106 48 156 150 184 262 156Z"/><path class="loopR" d="M258 156C314 58 428 44 454 106 472 156 370 184 258 156Z"/>
        <path class="knot" d="M236 136h48c6 0 8 6 8 12v20c0 6-2 12-8 12h-48c-6 0-8-6-8-12v-20c0-6 2-12 8-12z"/></g>
        <g fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5"><path class="loopL" d="M240 150C200 90 120 80 96 114"/><path class="loopR" d="M280 150C320 90 400 80 424 114"/></g></svg></div>
      <div class="tapwrap">${medal(false, ' style="width:clamp(86px,22vw,104px)"')}</div>${tapNames()}</div>`;
  }
  if (o === 'envelope') {
    const rib = t.ribbonX ? `<div class="ribbonX"><svg viewBox="0 0 400 800" preserveAspectRatio="none"><path d="M-20 -20L420 820M420 -20L-20 820" stroke="var(--o-line)" stroke-width="10" vector-effect="non-scaling-stroke" opacity=".85"/></svg></div>` : '';
    return `<div id="op" class="o-envelope">${rib}<div class="glow"></div>
      <div class="scene"><div class="env-back"></div>
        <div class="letter"><div class="s">The wedding of</div><div class="n">Sanchit &amp; Muskan</div><div class="s">18 December 2026 · Agra</div></div>
        <div class="env-front"><svg viewBox="0 0 440 310" preserveAspectRatio="none"><path d="M0 0L224 178 0 310Z" style="fill:var(--o1)"/><path d="M440 0L216 178 440 310Z" style="fill:var(--o1)"/><path d="M440 0L216 178 440 310Z" fill="rgba(0,0,0,.05)"/>
          <path d="M0 310L220 150 440 310Z" style="fill:var(--o1)"/><path d="M0 310L220 150 440 310Z" fill="rgba(255,255,255,.06)"/><path d="M0 310L220 150 440 310" fill="none" style="stroke:var(--o-line)" stroke-width="1" opacity=".6"/></svg></div>
        <div class="env-flap"><svg viewBox="0 0 440 180" preserveAspectRatio="none"><path d="M0 0H440L232 172Q220 182 208 172Z" style="fill:var(--o1)"/><path d="M0 0H440L232 172Q220 182 208 172Z" fill="rgba(255,255,255,.08)"/><path d="M10 4L220 170 430 4" fill="none" style="stroke:var(--o-line)" stroke-width="1" opacity=".7"/></svg></div>
        ${medal(true)}</div>${tapNames()}</div>`;
  }
  if (o === 'book') {
    return `<div id="op" class="o-book"><div class="glow"></div>
      <div class="bookwrap"><div class="stack"></div>
        <div class="page"><div class="s">Together with their families</div><div class="n">Sanchit<br>&amp;<br>Muskan</div><div class="s">18 · 12 · 2026 · Agra</div></div>
        <div class="cover"><div class="front"><svg class="orn"><rect width="100%" height="100%" fill="url(#geo)" opacity=".18"/><rect x="6%" y="4.5%" width="88%" height="91%" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8.5%" y="6.5%" width="83%" height="87%" fill="none" stroke="currentColor" stroke-width=".7"/></svg>
          <div style="position:relative;text-align:center;color:var(--o-line)"><div style="font-size:11px;letter-spacing:.42em;margin-bottom:18px">THE WEDDING OF</div>${medal(false)}<div style="font-size:11px;letter-spacing:.42em;margin-top:18px">MMXXVI</div></div></div><div class="inside"></div></div></div>
      ${tapNames()}</div>`;
  }
  // card
  return `<div id="op" class="o-card">${t.bars ? '<div class="bars"></div>' : ''}<div class="rays"></div><div class="glow"></div>
    <div class="flip"><div class="face front"><svg class="orn"><rect x="5%" y="3.5%" width="90%" height="93%" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8%" y="5.5%" width="84%" height="89%" rx="7" fill="none" stroke="currentColor" stroke-width=".6"/>
      <use href="#corner" x="12%" y="7%" width="50" height="50"/><use href="#corner" x="-88%" y="7%" width="50" height="50" transform="scale(-1 1)"/></svg>
      <div style="position:relative;color:var(--o-line);font-size:11px;letter-spacing:.42em;margin-bottom:20px">YOU ARE INVITED</div>${medal(false)}<div style="position:relative;color:var(--o-line);font-size:11px;letter-spacing:.42em;margin-top:20px">18 · 12 · 2026</div></div>
      <div class="face back"><div class="s">Together with their families</div><div class="n">Sanchit<br>&amp; Muskan</div><div class="s">Agra</div></div></div>
    ${tapNames()}</div>`;
}


/* ---------- Ganesh vandana intro (themes with shloka: true) ---------- */
function shlokaIntro() {
  const W = a => a.split(' ').map(x => `<span class="w">${x}</span>`).join(' ');
  let r1 = '', r2 = '';
  for (let i = 0; i < 16; i++) r1 += `<path d="M200 60C222 110 222 150 200 180 178 150 178 110 200 60Z" transform="rotate(${i * 22.5} 200 200)"/>`;
  for (let i = 0; i < 32; i++) r2 += `<circle cx="200" cy="26" r="3" transform="rotate(${i * 11.25} 200 200)"/>`;
  const diya = `<div class="diya"><svg viewBox="0 0 46 60"><defs><radialGradient id="fl"><stop offset="0" stop-color="#fff8d8"/><stop offset=".45" stop-color="#ffc24a"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient></defs>
    <circle cx="23" cy="24" r="22" fill="url(#fl)" opacity=".45"/><path class="flame" d="M23 8C27 16 30 21 30 26 30 31 27 34 23 34 19 34 16 31 16 26 16 21 19 16 23 8Z" fill="url(#fl)"/>
    <path d="M2 38C8 52 38 52 44 38Z" fill="#c9893a"/><path d="M2 38C8 46 38 46 44 38" fill="none" stroke="#f3d08a" stroke-width="1.5"/><path d="M14 51h18l-3 6H17Z" fill="#a8702e"/></svg></div>`;
  return `<div id="shl" role="dialog" aria-label="Shri Ganesh Vandana">
  <div class="halo"></div><div class="rays"></div>
  <svg class="mandala" viewBox="0 0 400 400" aria-hidden="true"><g class="r2" fill="currentColor">${r2}</g><g class="r1" fill="none" stroke="currentColor" stroke-width="1">${r1}<circle cx="200" cy="200" r="150" stroke-dasharray="2 5"/><circle cx="200" cy="200" r="186"/></g></svg>
  <canvas aria-hidden="true"></canvas>
  <div class="inner">
    <svg class="lotus" viewBox="0 0 120 70" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">
      <path d="M60 8C70 22 72 38 60 56 48 38 50 22 60 8Z"/><path d="M60 56C64 36 78 26 94 24 92 40 80 52 60 56Z"/><path d="M60 56C56 36 42 26 26 24 28 40 40 52 60 56Z"/>
      <path d="M60 56C78 46 98 44 114 50 100 60 80 62 60 56Z"/><path d="M60 56C42 46 22 44 6 50 20 60 40 62 60 56Z"/><path d="M30 64H90"/></g><circle cx="60" cy="4" r="2.4" fill="currentColor"/></svg>
    <div class="title">॥ ${W('श्री गणेशाय नमः')} ॥</div>
    <svg class="rule" viewBox="0 0 300 18" aria-hidden="true"><path d="M0 9H120M180 9H300M122 9c8-9 20-9 28 0 8 9 20 9 28 0" fill="none" stroke="currentColor"/><circle cx="150" cy="9" r="2.6" fill="currentColor"/></svg>
    <div class="verse"><span class="ln">${W('वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।')}</span><span class="ln">${W('निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥')}</span></div>
    <button class="begin" type="button"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>Begin with blessings</button>
  </div>
  <div class="diyas">${diya}${diya}</div>
  <button class="skip" type="button">Skip</button><div class="prog"></div>
</div>`;
}

/* ---------- page ---------- */
function page(t) {
  const [script, display] = t.fonts;
  const v = { ...t.v };
  const defaults = { 'o1': v.o2 || '#333', 'o2': v.o1 || '#555', 'o-frame': v.bg, 'hero-bg': v.bg, sky1: v.bg, sky2: v.card || v.bg, sun: v.light, mt1: v.leaf, mt2: v.leaf, water1: v.sky1 || v.bg, water2: v.bg, pal: v.card, win: v.light, arch: v.card, moon: '#fff', 'o-veil': 'transparent' };
  for (const k in defaults) if (!(k in v)) v[k] = defaults[k];
  if (!v['hero-veil']) v['hero-veil'] = `radial-gradient(ellipse 72% 52% at 50% 50%,${hexA(v.bg, .86)},${hexA(v.bg, 0)} 75%)`;
  if (!v['o-bg']) v['o-bg'] = v.o2;
  v.script = `"${t.script || script}",cursive`; v.display = `"${display}",serif`; v.serif = '"Cormorant Garamond",Georgia,serif';
  const css = ':root{' + Object.entries(v).map(([k, x]) => `--${k}:${x}`).join(';') + '}';
  const cfg = { target: t.vivahTime ? Date.UTC(2026, 11, 18, 14, 30) : undefined, open: t.open, fx: t.fx, petal: t.petal, spark: t.spark, burst: t.burst, scratch: t.scratch };
  const themeColor = (v['o-bg'].match(/#[0-9a-f]{6}/i) || [v.bg])[0];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Sanchit &amp; Muskan · ${t.name}</title>
<meta name="description" content="Sanchit &amp; Muskan are getting married · 18 December 2026 · Agra">
<meta property="og:title" content="Sanchit &amp; Muskan · 18.12.2026 · Agra">
<meta property="og:description" content="You're invited. Tap to open.">
<meta name="theme-color" content="${themeColor}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontsHref([script, display])}">
<link rel="stylesheet" href="../assets/theme.css">${t.shloka ? '\n<link rel="stylesheet" href="../assets/shloka.css">' : ''}
<style>${css}</style>
</head>
<body class="locked${t.dark ? ' dark' : ''}">
${DEFS}
<canvas id="fx" aria-hidden="true"></canvas><canvas id="burst" aria-hidden="true"></canvas>
<audio id="bgm" src="../assets/shubh-aarambh.mp3" loop preload="auto"></audio>
<button id="music" aria-label="Mute music" hidden><span class="bars"><i></i><i></i><i></i><i></i></span></button>

${t.shloka ? shlokaIntro() + '\n' : ''}${opening(t)}

<header class="stage">
  ${scene(t, 'h')}
  <div class="veil"></div>
  <div class="hero">
    <div class="ganesh h-in" style="--i:0">॥ श्री गणेशाय नमः ॥</div>
    <div class="kicker h-in" style="--i:1">We're getting married</div>
    <h1 class="name" style="--i:2">Sanchit</h1>
    <div class="par h-in" style="--i:3">Son of Smt. Seema Goyal &amp; Shri Sanjay Goyal</div>
    <div class="amp h-in" style="--i:4">&amp;</div>
    <div class="name" style="--i:5">Muskan</div>
    <div class="par h-in" style="--i:6">Daughter of Smt. Anjali Jain &amp; Late Shri Atul Jain</div>
    <div class="date h-in" style="--i:7"><i></i>18 · 12 · 2026<i></i></div>
  </div>
  <div class="scroll-cue">SCROLL<i></i></div>
</header>

<main>
  <section class="sec rv">${corners}
    <div class="deva st" style="--d:0">॥ श्री गणेशाय नमः ॥<small>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥</small></div>
    ${divider}
    <p class="memory st" style="--d:1">In loving memory of<br>Late Smt. Sarla Devi &amp; Late Shri Roop Kishore Goyal</p>
    <p class="st" style="--d:2">With the blessings of our elders, we are honoured to welcome you to the wedding of <b>Sanchit</b> &amp; <b>Muskan</b>, as they begin their journey together in faith and love.</p>
    <p class="st" style="--d:3">We thank you for being part of this blessed occasion.</p>
  </section>

  <section class="sec rv">${corners}
    <div class="eyebrow st">Save the date</div>
    <h2 class="h st" style="--d:1">Scratch to Reveal</h2>
    ${divider}
    <div class="scratch st" id="scratch" style="--d:2">
      <svg class="under" viewBox="0 0 300 276" aria-hidden="true"><path d="M150 262C60 196 8 150 8 86 8 40 44 10 86 10c28 0 50 16 64 40 14-24 36-40 64-40 42 0 78 30 78 76 0 64-52 110-142 176Z" style="fill:var(--paper);stroke:var(--accent)" stroke-width="2"/></svg>
      <div class="msg"><div class="a">You're Invited!</div><div class="b">December 18, 2026</div><div class="c">Friday</div><div class="c">${t.scratchTime || '9:00 PM · Agra'}</div></div>
      <canvas id="scratchCanvas" role="img" aria-label="Scratch the heart to reveal the wedding date"></canvas>
    </div>
    <div class="hint" id="scratchHint">Scratch the heart with your finger</div>
    <a class="btn" target="_blank" rel="noopener" href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Sanchit%20%26%20Muskan%20%E2%80%93%20Wedding&amp;dates=20261218T${t.vivahTime ? '200000' : '210000'}/20261219T010000&amp;ctz=Asia/Kolkata&amp;location=The%20Ramana%20Grand%2C%20Agra&amp;details=Shubh%20Vivah%20of%20Sanchit%20Goyal%20%26%20Muskan%20Agarwal">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>Save the date</a>
  </section>

  <section class="sec rv">${corners}
    <div class="eyebrow st">The countdown</div>
    <h2 class="h st" style="--d:1">Counting Down to Forever</h2>
    ${divider}
    <div class="count st" style="--d:2" aria-label="Countdown to the wedding">
      <div><b id="cd-d">--</b><span>Days</span></div><div><b id="cd-h">--</b><span>Hours</span></div>
      <div><b id="cd-m">--</b><span>Minutes</span></div><div><b id="cd-s">--</b><span>Seconds</span></div>
    </div>
  </section>

  <section class="sec rv">${corners}
    <div class="eyebrow st">The wedding day</div>
    <h2 class="h st" style="--d:1">Program Timeline</h2>
    ${divider}
    <div class="date-h st" style="--d:2">Friday, 18 December 2026</div>
    <div class="tl">
      <div class="ev st" style="--d:3"><div class="t">4:00 PM</div><div class="w">Tilak &amp; Ghudchadi</div><div class="s">Hotel Atithi · we welcome you</div></div>
      <div class="ev st" style="--d:4"><div class="t">${t.baraatTime || '7:00 PM'}</div><div class="w">${t.baraatName || 'Baraat Prasthan'}</div><div class="s">From Hotel Atithi · dance along!</div></div>
      <div class="ev st" style="--d:5"><div class="t">${t.vivahTime || '9:00 PM onwards'}</div><div class="w">${t.vivahName || 'Shubh Vivah'}</div><div class="s">The Ramana Grand · your presence means a lot</div></div>
    </div>
  </section>

  <section class="sec rv">${corners}
    <div class="eyebrow st">Celebrations</div>
    <h2 class="h st" style="--d:1">Pre-Wedding Events</h2>
    ${divider}
    <div class="date-h st" style="--d:2">Wednesday, 16 December</div>
    <div class="tl"><div class="ev st" style="--d:3"><div class="t">8:00 PM</div><div class="w">Ring Ceremony &amp; Sangeet</div><div class="s">Hotel Atithi, Agra</div></div></div>
    <div class="date-h st" style="--d:4">Thursday, 17 December</div>
    <div class="tl"><div class="ev st" style="--d:5"><div class="t">4:00 PM</div><div class="w">Mehendi</div><div class="s">Hotel Atithi, Agra</div></div></div>
    <div class="date-h st" style="--d:6">Friday, 18 December</div>
    <div class="tl"><div class="ev st" style="--d:7"><div class="t">8:00 AM</div><div class="w">Haldi</div><div class="s">Hotel Atithi, Agra</div></div></div>
  </section>

  <section class="sec rv">${corners}
    <div class="eyebrow st">Where</div>
    <h2 class="h st" style="--d:1">Venue</h2>
    ${divider}
    <div class="venue st" style="--d:2">
      <h3>The Ramana Grand</h3><p>Agra · ${t.vivahName || 'Shubh Vivah'}</p>
      <div class="map"><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&amp;query=The+Ramana+Grand+Agra">Open in Maps ↗</a>
        <iframe loading="lazy" title="Map of The Ramana Grand, Agra" src="https://maps.google.com/maps?q=The%20Ramana%20Grand%2C%20Agra&amp;z=15&amp;output=embed"></iframe></div>
    </div>
    <div class="venue st" style="--d:3">
      <h3>Hotel Atithi</h3><p>Agra · Pre-wedding functions, Tilak &amp; Baraat</p>
      <div class="map"><a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&amp;query=Hotel+Atithi+Agra">Open in Maps ↗</a>
        <iframe loading="lazy" title="Map of Hotel Atithi, Agra" src="https://maps.google.com/maps?q=Hotel%20Atithi%2C%20Agra&amp;z=15&amp;output=embed"></iframe></div>
    </div>
  </section>

  <section class="sec rv">${corners}
    <p class="big st">We can't wait to celebrate with you!</p>
    ${divider}
    <div class="eyebrow st" style="--d:1">With love</div>
    <div class="sig st" style="--d:2">Goyal Family</div>
  </section>
</main>
<footer>Sanchit &amp; Muskan<small>18 · 12 · 2026 · AGRA</small></footer>

<script>window.THEME=${JSON.stringify(cfg)}</script>
<script src="../assets/theme.js"></script>${t.shloka ? '\n<script src="../assets/shloka.js"></script>' : ''}
</body>
</html>
`;
}

/* ---------- gallery ---------- */
const OPEN_LABEL = { doors: 'Palace doors', arch: 'Palace arch', gates: 'Filigree gates', glass: 'Glass doors', curtains: 'Velvet curtains', bow: 'Satin bow', envelope: 'Wax-seal envelope', book: 'Book opening', card: 'Card reveal' };
function gallery() {
  const items = [
    { slug: 'royal', name: 'Royal Grace', blurb: 'Brown & cream curtains part to ivory drapes and pearl tassels', open: 'Curtains', sw: ['#f8f3ea', '#8a6a4a', '#c9ad7f'], ink: '#4b3a2c' },
    { slug: 'garden', name: 'Sage Garden', blurb: 'The original: garden doors, cream curtains and a scratch heart', open: 'Garden doors', sw: ['#f8f3ea', '#5f6c41', '#d9a6a0'], ink: '#4b4037' },
    ...THEMES.map(t => ({ slug: t.slug, name: t.name, blurb: t.blurb, open: OPEN_LABEL[t.open], sw: [t.v.bg, (t.v.o1 || t.v.m || '#000').startsWith('#') ? (t.v.o2 && t.v.o2.startsWith('#') ? t.v.o2 : t.v.o1 || t.v.m) : t.v.m, t.v.accent], ink: t.v.head, script: t.script || t.fonts[0], dark: t.dark }))
  ];
  const fontsUsed = [...new Set(THEMES.map(t => t.fonts[0]))];
  const cards = items.map((it, i) => `<a class="card" href="${it.slug}/" style="--i:${i};--a:${it.sw[0]};--b:${it.sw[1]};--c:${it.sw[2]}">
      <div class="pv${it.dark ? ' dk' : ''}"><div class="dr l"></div><div class="dr r"></div><div class="mono" style="font-family:'${it.script || 'Great Vibes'}',cursive"><span>S<small>&amp;</small>M</span></div></div>
      <div class="meta"><div class="nm">${it.name}</div><div class="op">${it.open}</div><div class="bl">${it.blurb}</div></div></a>`).join('\n    ');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Sanchit &amp; Muskan · Invitations</title>
<meta name="description" content="Sanchit &amp; Muskan are getting married · 18 December 2026 · Agra">
<meta property="og:title" content="Sanchit &amp; Muskan · 18.12.2026 · Agra">
<meta property="og:description" content="You're invited.">
<meta name="theme-color" content="#16120d">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontsHref([...fontsUsed, 'Cinzel'])}">
<style>
:root{--bg:#16120d;--ink:#f3e7cc;--mut:#b9a988;--gold:#d4b06a}
*{box-sizing:border-box;margin:0;padding:0}
body{background:radial-gradient(circle at 50% -10%,#3a2c18,var(--bg) 60%) fixed;color:var(--ink);font-family:"Cormorant Garamond",Georgia,serif;min-height:100vh;padding:0 16px 60px;-webkit-font-smoothing:antialiased}
header{text-align:center;padding:56px 0 30px}
.k{font-family:Cinzel,serif;font-size:12px;letter-spacing:.5em;color:var(--gold)}
h1{font-family:"Great Vibes",cursive;font-weight:400;font-size:clamp(56px,14vw,96px);line-height:1.05;margin-top:8px;background:linear-gradient(100deg,#f3e7cc 30%,#ffe3a0 50%,#f3e7cc 70%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sh 6s linear infinite}
@keyframes sh{0%{background-position:100% 0}100%{background-position:-150% 0}}
.sub{font-style:italic;color:var(--mut);font-size:19px;margin-top:6px}
.line{width:180px;height:1px;margin:22px auto 0;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:18px;max-width:1120px;margin:0 auto}
.card{display:block;text-decoration:none;color:inherit;border-radius:14px;overflow:hidden;background:rgba(255,255,255,.04);border:1px solid rgba(212,176,106,.22);
  opacity:0;transform:translateY(24px);animation:in .9s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:calc(var(--i)*.05s + .2s);transition:transform .35s,border-color .35s,box-shadow .35s}
@keyframes in{to{opacity:1;transform:none}}
.card:hover,.card:focus-visible{transform:translateY(-6px);border-color:rgba(212,176,106,.6);box-shadow:0 20px 40px rgba(0,0,0,.45);outline:none}
.pv{position:relative;height:190px;background:radial-gradient(circle at 50% 45%,var(--a),color-mix(in srgb,var(--a) 70%,var(--c)));overflow:hidden;display:grid;place-items:center}
.dr{position:absolute;top:0;bottom:0;width:50%;background:linear-gradient(90deg,var(--b),color-mix(in srgb,var(--b) 70%,#fff) 50%,var(--b));transition:transform 1s cubic-bezier(.7,0,.2,1)}
.dr::after{content:"";position:absolute;inset:10px;border:1px solid var(--c);opacity:.7;border-radius:3px}
.dr.l{left:0;box-shadow:inset -6px 0 12px rgba(0,0,0,.18)}.dr.r{right:0;box-shadow:inset 6px 0 12px rgba(0,0,0,.18)}
.card:hover .dr.l,.card:focus-visible .dr.l{transform:translateX(-92%)}.card:hover .dr.r,.card:focus-visible .dr.r{transform:translateX(92%)}
.mono{position:relative;z-index:2;white-space:nowrap;font-size:46px;color:var(--ink);width:96px;height:96px;border-radius:50%;display:grid;place-items:center;
  background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--c) 40%,#fff),var(--c) 60%,color-mix(in srgb,var(--c) 60%,#000));color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.3);box-shadow:0 8px 20px rgba(0,0,0,.3);transition:transform .6s}
.mono small{font-size:.5em;margin:0 2px}
.card:hover .mono{transform:scale(.8);opacity:.0;transition:transform .5s,opacity .4s}
.meta{padding:14px 16px 18px}
.nm{font-family:Cinzel,serif;font-size:17px;letter-spacing:.06em;color:var(--ink)}
.op{font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);margin-top:2px}
.bl{font-size:16px;color:var(--mut);margin-top:6px;line-height:1.35}
footer{text-align:center;color:var(--mut);font-size:14px;margin-top:40px;letter-spacing:.2em}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.card{opacity:1;transform:none}}
</style>
</head>
<body>
<header><div class="k">18 · 12 · 2026 · AGRA</div><h1>Sanchit &amp; Muskan</h1><div class="sub">Choose an invitation design · tap any card to open it</div><div class="line"></div></header>
<main class="grid">
    ${cards}
</main>
<footer>${items.length} DESIGNS · GOYAL FAMILY</footer>
</body>
</html>
`;
}

for (const t of THEMES) {
  fs.mkdirSync(path.join(ROOT, t.slug), { recursive: true });
  fs.writeFileSync(path.join(ROOT, t.slug, 'index.html'), page(t));
}
if (!process.argv.includes('--no-gallery')) fs.writeFileSync(path.join(ROOT, 'index.html'), gallery());
console.log('built', THEMES.length, 'themes');
