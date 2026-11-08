// Theme definitions: palette, fonts, opening style, hero scene and ambient effects.
// Each entry becomes /<slug>/index.html when tools/build.js runs.
const L = { // light base
  bg: '#fbf7f0', ink: '#3f3630', muted: '#85776a', head: '#4a3b31', accent: '#b08d57', 'accent-deep': '#8a6a3a',
  line: 'rgba(176,141,87,.35)', card: '#fffdf9', 'card-shadow': 'rgba(90,70,40,.10)', tile: 'rgba(176,141,87,.06)',
  btn: '#8a6a3a', 'btn-ink': '#fff', paper: '#fffaf1', 'paper-ink': '#4a3b31', light: '#fff6dc',
  'hero-ink': '#4a3b31', 'hero-accent': '#8a6a3a', 'hero-shadow': 'rgba(255,255,255,.7)', name1: '#4a3b31', name2: '#e2c58a',
  'o-ink': '#fff', 'o-shadow': 'rgba(0,0,0,.45)', 'm-ink': '#fff8e8', 'm-line': 'rgba(255,248,232,.7)',
  'rb-hi': '#ffffff', rb: '#e9e1d2', 'rb-lo': '#cbbfa8', 'o-veil': 'rgba(255,255,255,.08)', 'o-panel': '#f4ede1',
  fl1: '#f2cfc8', fl2: '#ffffff', 'fl-c': '#d9b26a', leaf: '#9aa883', radius: '6px'
};
const D = { // dark base
  ink: '#efe6d4', muted: '#bfb197', head: '#f3e7cc', accent: '#d4b06a', 'accent-deep': '#e2c27e', line: 'rgba(212,176,106,.35)',
  'card-shadow': 'rgba(0,0,0,.45)', tile: 'rgba(212,176,106,.07)', btn: '#d4b06a', 'btn-ink': '#1a1408', 'paper-ink': '#3a2f22', paper: '#fbf5e8',
  'hero-ink': '#f6ecd6', 'hero-accent': '#e2c27e', 'hero-shadow': 'rgba(0,0,0,.6)', name1: '#f6ecd6', name2: '#ffe3a0', light: '#fff2cf',
  'o-ink': '#f6ecd6', 'o-shadow': 'rgba(0,0,0,.6)', 'm-ink': '#3a2a10', 'm-line': 'rgba(70,50,20,.55)', 'map-filter': 'invert(.9) hue-rotate(180deg) saturate(.6)',
  fl1: '#f4efe6', fl2: '#d8c9a8', 'fl-c': '#d4b06a', leaf: '#6f7d5c', radius: '6px'
};
const gold = { m: '#c9a45e', 'm-hi': '#f3dea8', 'm-lo': '#8d6a2f', 'm-ink': '#fff6df', 'm-line': 'rgba(255,246,223,.75)' };
const goldDarkInk = { m: '#d4b06a', 'm-hi': '#fbe7b4', 'm-lo': '#94702f', 'm-ink': '#4a3412', 'm-line': 'rgba(74,52,18,.5)' };

// Event details and layout shared by every theme
const COMMON = { noMusicBtn: true, shlokaHero: true, inviteCard: true, ringName: 'The Yes Moment', ringTime: '7:00 PM', scratchTime: '8:00 PM onwards', baraatName: 'Baraat Nikasi', baraatTime: '6:00 PM', baraatPlace: 'Near The Ramana Grand', vivahName: 'Preeti Bhoj', vivahTime: '8:00 PM onwards' };

module.exports = [
  { slug: 'imperial', name: 'Royal Imperial', blurb: 'Rose-gold filigree gates open onto a palace at golden hour',
    open: 'gates', scene: 'palace', fx: ['petals', 'sparkles'], fonts: ['Great Vibes', 'Playfair Display'],
    v: { ...L, bg: '#fbf3ef', head: '#6b4038', accent: '#b9826c', 'accent-deep': '#9a6352', btn: '#9a6352', line: 'rgba(185,130,108,.35)', name1: '#6b4038', name2: '#f0c2ad',
      'hero-accent': '#9a6352', 'paper-ink': '#6b4038', 'o-bg': '#2b1a16', 'o-line': '#e9c2a8', 'o-veil': 'rgba(60,30,20,.12)', ...gold, m: '#c98f78', 'm-hi': '#f6d3c3', 'm-lo': '#94594a',
      sky1: '#f7c9a7', sky2: '#fbe8d6', sun: '#fff1d6', pal: '#e9cdbd', win: '#ffd99a', water1: '#f2c6ad', water2: '#f8e3d4', fl1: '#f3c3b6', 'fl-c': '#e0b07a' },
    petal: '#f0b9ab', spark: '#f6d29a', scratch: ['#f8ddd2', '#dca793', '#a96a58'] },

  { slug: 'majesty', name: 'Royal Majesty', blurb: 'A porcelain-blue wax seal breaks over a painterly ballroom palace',
    open: 'envelope', ribbonX: true, scene: 'palace', fx: ['petals', 'sparkles'], fonts: ['Pinyon Script', 'Cinzel'],
    v: { ...L, bg: '#f1f5f9', ink: '#33435a', muted: '#6f7f95', head: '#34507a', accent: '#a5895a', 'accent-deep': '#7b6236', line: 'rgba(120,145,180,.35)', card: '#fbfdff',
      btn: '#34507a', paper: '#fbfdff', 'paper-ink': '#34507a', name1: '#34507a', name2: '#c9d8ee', 'hero-accent': '#5a7194', 'hero-ink': '#34507a', 'card-shadow': 'rgba(40,70,110,.12)',
      'o-bg': 'radial-gradient(circle at 50% 40%,#dfe8f2,#b9cadc)', o1: '#cfdceb', o2: '#b7c9de', 'o-ink': '#34507a', 'o-shadow': 'rgba(255,255,255,.8)',
      m: '#a9bfd8', 'm-hi': '#e3edf7', 'm-lo': '#7d97b6', 'm-ink': '#f7fbff', 'm-line': 'rgba(255,255,255,.75)', 'o-line': '#c2a46a',
      sky1: '#c7d6e8', sky2: '#eef3f9', sun: '#ffffff', pal: '#dfe7f1', win: '#fff3d6', water1: '#c9d8ea', water2: '#eaf1f8', fl1: '#c4d4ea', fl2: '#ffffff', 'fl-c': '#e4cf9c', leaf: '#9fb2c2' },
    petal: '#b8cbe4', spark: '#e9dcb4', scratch: ['#e6eef8', '#a9bfd8', '#6f8aac'] },

  { slug: 'monarch', name: 'Royal Monarch', blurb: 'A sky-blue satin bow unties between pearl drapes to a lakeside view',
    open: 'bow', scene: 'lake', fx: ['petals', 'sparkles'], fonts: ['Parisienne', 'Cormorant Garamond'],
    v: { ...L, bg: '#f5f8fa', ink: '#3b4a57', muted: '#748392', head: '#456583', accent: '#9a8458', 'accent-deep': '#6f5c36', line: 'rgba(122,154,186,.35)', btn: '#456583',
      name1: '#456583', name2: '#cfe0ef', 'hero-accent': '#55779a', 'hero-ink': '#456583', 'paper-ink': '#456583',
      'o-bg': '#eef2f4', 'o-panel': 'repeating-linear-gradient(90deg,#f6f1e6 0 18px,#ece4d3 18px 22px,#faf6ee 22px 40px)', rb: '#a9c1d9', 'rb-hi': '#dbe8f4', 'rb-lo': '#7f9dbd',
      'o-ink': '#456583', 'o-shadow': 'rgba(255,255,255,.9)', m: '#f6efe0', 'm-hi': '#ffffff', 'm-lo': '#d9cdb3', 'm-ink': '#456583', 'm-line': 'rgba(69,101,131,.4)',
      sky1: '#bcd3e8', sky2: '#f1f6fa', sun: '#ffffff', mt1: '#b8c9d8', mt2: '#93aa9a', water1: '#a8c3d9', water2: '#dce9f2', fl1: '#ffffff', fl2: '#dce8f3', 'fl-c': '#e6cf93', leaf: '#97ab8a' },
    petal: '#ffffff', spark: '#e9dcb4', scratch: ['#eef4f9', '#a9c1d9', '#6f8fb2'] },

  { slug: 'flora', name: 'Royal Flora', blurb: 'Ivory doors swing open into a garden of blush blossoms and sage',
    open: 'doors', floralDoors: true, scene: 'garden', fx: ['petals', 'sparkles'], fonts: ['Great Vibes', 'Playfair Display'],
    v: { ...L, bg: '#f9f6ef', head: '#5d6b4f', accent: '#b58f68', 'accent-deep': '#8c6a45', btn: '#6d7c5e', name1: '#5d6b4f', name2: '#efd3c8', 'hero-accent': '#7a6248', 'hero-ink': '#5d6b4f', 'paper-ink': '#5d6b4f',
      'o-bg': '#efe9dc', o1: '#efe7d7', o2: '#fbf7ef', 'o-line': '#c8ad85', 'o-ink': '#5d6b4f', 'o-shadow': 'rgba(255,255,255,.9)', ...gold,
      sky1: '#f3ece0', sky2: '#fbf8f2', fl1: '#f2c9c1', fl2: '#fbe9e4', 'fl-c': '#e0b36d', leaf: '#9caa86' },
    petal: '#f1c3ba', spark: '#f1d9a2', scratch: ['#f3ece0', '#c9b79a', '#8c7a5a'] },

  { slug: 'blush', name: 'Royal Blush', blurb: 'Blush floral doors with rose-gold detailing and a turning mandala',
    open: 'doors', floralDoors: true, scene: 'ornate', fx: ['petals', 'sparkles'], fonts: ['Allura', 'Playfair Display'],
    v: { ...L, bg: '#fcf3f1', head: '#7a4a4a', accent: '#c08b78', 'accent-deep': '#9c6656', btn: '#b0766a', line: 'rgba(192,139,120,.35)', name1: '#7a4a4a', name2: '#f6cfc4', 'hero-accent': '#9c6656', 'hero-ink': '#7a4a4a', 'paper-ink': '#7a4a4a',
      'o-bg': '#f3d9d3', o1: '#f0d0c8', o2: '#fae6e1', 'o-line': '#c9907c', 'o-ink': '#7a4a4a', 'o-shadow': 'rgba(255,255,255,.9)', m: '#d39b88', 'm-hi': '#f7d8cd', 'm-lo': '#9e6654',
      sky1: '#f8e0da', sky2: '#fdf5f2', fl1: '#f3bfb3', fl2: '#ffffff', 'fl-c': '#e3b37f', leaf: '#b3b994' },
    petal: '#f0b2a5', spark: '#f4cfa0', scratch: ['#fbe4de', '#e1a998', '#a96654'] },

  { slug: 'vintage', name: 'Royal Vintage', blurb: 'A navy wax-sealed envelope on aged parchment with dusty-blue roses',
    open: 'envelope', scene: 'garden', fx: ['petals'], fonts: ['Pinyon Script', 'Cormorant Garamond'],
    v: { ...L, bg: '#f2e9d6', 'bg-tex': 'radial-gradient(circle at 20% 10%,rgba(160,120,60,.10),transparent 40%),radial-gradient(circle at 80% 70%,rgba(160,120,60,.12),transparent 45%)', 'tex-op': 1,
      card: '#f8f1e2', ink: '#3b3a45', muted: '#7a7064', head: '#2c3a5a', accent: '#8a6f45', 'accent-deep': '#6b5532', btn: '#2c3a5a', line: 'rgba(110,90,60,.35)', name1: '#2c3a5a', name2: '#a9bcd6',
      'hero-accent': '#5a6f93', 'hero-ink': '#2c3a5a', paper: '#f8f0dd', 'paper-ink': '#2c3a5a', 'hero-veil': 'radial-gradient(ellipse 70% 55% at 50% 50%,rgba(244,236,218,.85),rgba(244,236,218,0) 75%)',
      'o-bg': 'radial-gradient(circle at 50% 45%,#efe2c6,#d6c29c)', o1: '#2f3d5e', o2: '#26324d', 'o-line': '#c9a86a', 'o-ink': '#2c3a5a', 'o-shadow': 'rgba(255,255,255,.7)',
      m: '#b8323a', 'm-hi': '#e0646a', 'm-lo': '#7a1b22', 'm-ink': '#fbe3d6', 'm-line': 'rgba(251,227,214,.55)',
      sky1: '#efe3c9', sky2: '#f6eedd', fl1: '#9fb3cf', fl2: '#d6e0ec', 'fl-c': '#e6d3a3', leaf: '#8f9a7c' },
    petal: '#a9bcd6', spark: '#e1c98f', scratch: ['#efe3c9', '#b9a37c', '#7a6644'] },

  { slug: 'prism', name: 'Royal Prism', blurb: 'Frosted sage glass doors slide apart in a sweep of golden light',
    open: 'glass', scene: 'ornate', fx: ['sparkles', 'petals'], fonts: ['Great Vibes', 'Italiana'],
    v: { ...L, bg: '#f3f5ef', head: '#4e5d47', accent: '#b49656', 'accent-deep': '#86703c', btn: '#5e6e55', line: 'rgba(140,160,120,.4)', name1: '#4e5d47', name2: '#f1dfa9', 'hero-accent': '#86703c', 'hero-ink': '#4e5d47', 'paper-ink': '#4e5d47',
      'o-bg': '#dfe6d7', 'o-veil': 'linear-gradient(160deg,rgba(176,196,160,.55),rgba(214,226,200,.35) 50%,rgba(160,184,146,.55))', 'o-line': 'rgba(255,255,255,.7)', 'o-ink': '#4e5d47', 'o-shadow': 'rgba(255,255,255,.9)', ...gold,
      sky1: '#e8eedf', sky2: '#fbfcf8', fl1: '#ffffff', fl2: '#eef2e6', 'fl-c': '#e1c27a', leaf: '#98aa86' },
    petal: '#ffffff', spark: '#f1d48a', scratch: ['#eef2e6', '#b9c6a8', '#7e916c'] },

  { slug: 'marine', name: 'Royal Marine', blurb: 'Golden filigree gates under pearl arches open to a turquoise sea',
    open: 'gates', scene: 'ocean', fx: ['sparkles', 'bubbles'], fonts: ['Parisienne', 'Cinzel'],
    v: { ...L, bg: '#f1f8f7', ink: '#2f4a4d', muted: '#6c8789', head: '#1f6670', accent: '#b8975a', 'accent-deep': '#8b6c35', btn: '#1f6670', line: 'rgba(60,140,150,.3)', name1: '#1f6670', name2: '#bfe9ea',
      'hero-accent': '#2a7d88', 'hero-ink': '#1f6670', 'paper-ink': '#1f6670', 'o-bg': '#0f3b42', 'o-line': '#e0c58a', 'o-veil': 'rgba(10,50,55,.08)', ...gold,
      sky1: '#bfe6ea', sky2: '#f4fbfb', sun: '#fffbe9', water1: '#3fb3bd', water2: '#9be0e2', arch: '#f6f1e6', fl1: '#ffffff', fl2: '#f2ece0', 'fl-c': '#e6cf93', leaf: '#8db3a6' },
    petal: '#ffffff', spark: '#f3dc9c', scratch: ['#e3f4f4', '#8fcfd3', '#3d8f98'] },

  { slug: 'pearlsky', name: 'Royal Pearlsky', blurb: 'A pearl satin bow unties on midnight velvet under a full moon',
    open: 'bow', scene: 'night', fx: ['stars', 'sparkles'], fonts: ['Great Vibes', 'Cinzel'], dark: true,
    v: { ...D, bg: '#0f1830', card: '#16213d', head: '#f4ecdd', accent: '#d8c49a', 'accent-deep': '#efdcb2', line: 'rgba(216,196,154,.3)', name1: '#f7f2e8', name2: '#ffffff',
      'o-bg': '#0d1630', 'o-panel': 'repeating-linear-gradient(90deg,#0f1a36 0,#1b2850 2.5%,#0e1833 5%)', rb: '#efe8da', 'rb-hi': '#ffffff', 'rb-lo': '#c4b9a3',
      m: '#f1ece2', 'm-hi': '#ffffff', 'm-lo': '#c5bba8', 'm-ink': '#1b2850', 'm-line': 'rgba(27,40,80,.4)',
      'hero-bg': '#0d1630', 'hero-veil': 'radial-gradient(ellipse 70% 50% at 50% 55%,rgba(13,22,48,.75),rgba(13,22,48,0) 75%)',
      sky1: '#0b1328', sky2: '#24345e', moon: '#f6f1e2', pal: '#0a1124', win: '#f3d796', fl1: '#f4efe6', fl2: '#dfe6f3', 'fl-c': '#e6d3a3', leaf: '#4f6176' },
    petal: '#f4efe6', spark: '#fff1cc', burst: ['#f4efe6', '#ffffff', '#d8c49a'], scratch: ['#f4f0e8', '#d9d1c1', '#a59a86'] },

  { slug: 'moonveil', name: 'Royal Moonveil', blurb: 'A sheer organza bow on black velvet, framed by gilded laurels',
    open: 'bow', organza: true, scene: 'night', fx: ['stars', 'sparkles'], fonts: ['Pinyon Script', 'Cinzel'], dark: true,
    v: { ...D, bg: '#0b0b0d', card: '#141416', line: 'rgba(212,176,106,.35)',
      'o-bg': '#060607', 'o-panel': 'repeating-linear-gradient(90deg,#0a0a0b 0,#19191c 2.5%,#09090a 5%)', rb: 'rgba(245,240,230,.55)', 'rb-hi': 'rgba(255,255,255,.75)', 'rb-lo': 'rgba(200,190,170,.45)',
      ...goldDarkInk, 'hero-bg': '#08080a', 'hero-veil': 'radial-gradient(ellipse 70% 50% at 50% 55%,rgba(8,8,10,.8),rgba(8,8,10,0) 75%)',
      sky1: '#050506', sky2: '#1c1b22', moon: '#f4ead2', pal: '#0d0d10', win: '#e9c77b', fl1: '#d4b06a', fl2: '#b8934c', 'fl-c': '#f3dfa6', leaf: '#b8934c' },
    petal: '#e9d9b0', spark: '#f2cf7e', burst: ['#d4b06a', '#fff2cf', '#ffffff'], scratch: ['#f6e7c0', '#d4b06a', '#8d6a2f'] },

  { slug: 'violet', name: 'Royal Violet', blurb: 'A pearlescent lavender envelope with a pearl charm seal',
    open: 'envelope', scene: 'garden', fx: ['petals', 'sparkles'], fonts: ['Allura', 'Playfair Display'], events2: true, noTapNames: true, noMusic: true, bgFlora: true, mergedHero: true, noHeroDate: true, calStart: '180000', variants: true, scratchTime: '6:00 PM onwards',
    v: { ...L, bg: '#f7f4fa', ink: '#4a3f58', muted: '#86799a', head: '#5e4a7d', accent: '#a98ec8', 'accent-deep': '#7a5fa0', btn: '#6e568f', line: 'rgba(160,135,195,.35)', name1: '#5e4a7d', name2: '#e6d8f6',
      'hero-accent': '#7a5fa0', 'hero-ink': '#5e4a7d', paper: '#fdfbff', 'paper-ink': '#5e4a7d',
      'o-bg': 'radial-gradient(circle at 50% 40%,#efe7f7,#cfc0e4)', o1: '#d8c9ec', o2: '#c6b3e0', 'o-line': '#ffffff', 'o-ink': '#5e4a7d', 'o-shadow': 'rgba(255,255,255,.8)',
      m: '#f3eef8', 'm-hi': '#ffffff', 'm-lo': '#cbbfd9', 'm-ink': '#7a5fa0', 'm-line': 'rgba(122,95,160,.45)',
      sky1: '#ece3f6', sky2: '#fbf8fd', fl1: '#d7c3ee', fl2: '#ffffff', 'fl-c': '#e9d8a6', leaf: '#a6b29a' },
    petal: '#d7c3ee', spark: '#f2e2b6', scratch: ['#f1eaf8', '#c6b3e0', '#8a70b0'] },

  { slug: 'elegance', name: 'Royal Elegance', blurb: 'Crimson velvet curtains rise on a cream palace with glowing windows',
    open: 'curtains', scene: 'palace', fx: ['petals', 'sparkles'], fonts: ['Great Vibes', 'Cinzel'],
    v: { ...L, bg: '#faf5ea', head: '#7d1f2a', accent: '#b8955a', 'accent-deep': '#8c6a35', btn: '#7d1f2a', line: 'rgba(184,149,90,.4)', name1: '#7d1f2a', name2: '#f0c9a0', 'hero-accent': '#8c6a35', 'hero-ink': '#7d1f2a', 'paper-ink': '#7d1f2a',
      'o-bg': '#1d0a0d', o1: '#5e0f19', o2: '#9a2231', 'o-line': '#d9b46a', ...gold,
      sky1: '#f4dcc0', sky2: '#fbf3e6', sun: '#fff3da', pal: '#efe2cc', win: '#ffcf7a', water1: '#ead6bd', water2: '#f8eee0', fl1: '#c23a48', fl2: '#f6e6d6', 'fl-c': '#e6c27a', leaf: '#8c9a72' },
    petal: '#b82e3c', spark: '#f3d491', scratch: ['#f6e7d0', '#d6b07a', '#9a2231'] },

  { slug: 'prestige', name: 'Royal Prestige', blurb: 'Cinematic letterbox, golden rays and a gilded card that flips to reveal',
    open: 'card', bars: true, scene: 'ornate', fx: ['sparkles'], fonts: ['Pinyon Script', 'Cinzel'], dark: true,
    v: { ...D, bg: '#17120d', card: '#1f1912', head: '#f2e3c2', accent: '#cfab68', 'accent-deep': '#e6c789', line: 'rgba(207,171,104,.32)',
      'o-bg': 'radial-gradient(circle at 50% 50%,#2a2015,#0b0806)', o2: 'linear-gradient(150deg,#2a2016,#120d08)', 'o-line': '#cfab68', ...goldDarkInk,
      'hero-bg': 'radial-gradient(circle at 50% 40%,#2a2016,#0e0a07)', 'hero-veil': 'none', sky1: '#120d08', sky2: '#2a2016' },
    spark: '#f3d491', burst: ['#cfab68', '#fff1cc', '#ffffff'], scratch: ['#f3e2b8', '#cfab68', '#7d5f2c'] },

  { slug: 'heritage', name: 'Royal Heritage', blurb: 'Carved maroon palace doors open to marigold petals over Agra',
    open: 'doors', scene: 'palace', fx: ['petals', 'sparkles'], fonts: ['Great Vibes', 'Cinzel'],
    v: { ...L, bg: '#f8f0e2', head: '#6e1d22', accent: '#c08a3e', 'accent-deep': '#93641f', btn: '#6e1d22', line: 'rgba(192,138,62,.38)', name1: '#6e1d22', name2: '#f3c37a', 'hero-accent': '#93641f', 'hero-ink': '#6e1d22', 'paper-ink': '#6e1d22',
      'o-bg': '#2a0c0e', o1: '#5a1418', o2: '#7d2228', 'o-line': '#d9a95a', ...gold,
      sky1: '#f2c38f', sky2: '#fbe9cf', sun: '#fff0cc', pal: '#f3e4cc', win: '#ffc96b', water1: '#e9c49a', water2: '#f8e6cf', fl1: '#f0a830', fl2: '#e8732c', 'fl-c': '#fff0b0', leaf: '#7f9466' },
    petal: '#f0a830', spark: '#ffd27a', burst: ['#f0a830', '#e8732c', '#ffd27a', '#ffffff'], scratch: ['#f7e2bd', '#d9a95a', '#93641f'] },

  { slug: 'crest', name: 'Royal Crest', blurb: 'An antique burgundy wax crest on ivory, opening to a quiet lake',
    open: 'envelope', scene: 'lake', fx: ['petals', 'sparkles'], fonts: ['Pinyon Script', 'Playfair Display'],
    v: { ...L, bg: '#faf6ee', head: '#5c1a26', accent: '#b0905a', 'accent-deep': '#866a38', btn: '#5c1a26', name1: '#5c1a26', name2: '#efcfb4', 'hero-accent': '#7a4a3a', 'hero-ink': '#5c1a26', 'paper-ink': '#5c1a26',
      'o-bg': 'radial-gradient(circle at 50% 40%,#f5efe3,#ddd0b8)', o1: '#f1e9da', o2: '#e4d8c2', 'o-line': '#b0905a', 'o-ink': '#5c1a26', 'o-shadow': 'rgba(255,255,255,.8)',
      m: '#7a1f2e', 'm-hi': '#b0485a', 'm-lo': '#4a0f19', 'm-ink': '#f5dcc8', 'm-line': 'rgba(245,220,200,.5)',
      sky1: '#e8dccb', sky2: '#f8f3ea', sun: '#fffaf0', mt1: '#cdbfae', mt2: '#a3a58a', water1: '#c9c0b0', water2: '#efe8dc', fl1: '#f7efe4', fl2: '#ecd2c7', 'fl-c': '#d9b26a', leaf: '#9aa47e' },
    petal: '#f2ddd4', spark: '#ead19a', scratch: ['#f1e9da', '#c9ad7f', '#7a1f2e'] },

  { slug: 'legacy', name: 'Royal Legacy', blurb: 'Burgundy velvet curtains with antique-gold fringe part at dusk',
    open: 'curtains', scene: 'palace', fx: ['sparkles', 'fireflies'], fonts: ['Great Vibes', 'Cinzel'], dark: true,
    v: { ...D, bg: '#22090e', card: '#2e0f15', head: '#f3dfc0', accent: '#c9a160', 'accent-deep': '#e2bf7f', line: 'rgba(201,161,96,.32)',
      'o-bg': '#140407', o1: '#4a0b14', o2: '#7a1626', 'o-line': '#c9a160', ...gold,
      'hero-bg': '#1a0609', 'hero-veil': 'radial-gradient(ellipse 70% 50% at 50% 50%,rgba(26,6,9,.8),rgba(26,6,9,0) 75%)',
      sky1: '#2a0a12', sky2: '#6a2a2a', sun: '#f2b36b', pal: '#1a0609', win: '#f5c36b', water1: '#3a1218', water2: '#5a2228', fl1: '#7a1626', fl2: '#c9a160', 'fl-c': '#f3d491', leaf: '#5d4a2a' },
    spark: '#f3d491', burst: ['#c9a160', '#7a1626', '#fff1cc'], scratch: ['#f3dfc0', '#c9a160', '#7a1626'] },

  { slug: 'emerald-noir', name: 'Emerald Noir', blurb: 'Deep emerald doors with gold corners swing open in luxury',
    open: 'doors', scene: 'ornate', fx: ['sparkles'], fonts: ['Pinyon Script', 'Cinzel'], dark: true,
    v: { ...D, bg: '#0b1f18', card: '#0f2a21', head: '#f1e4c4', accent: '#cfae66', 'accent-deep': '#e6c785', line: 'rgba(207,174,102,.32)',
      'o-bg': '#04120d', o1: '#0a2a1f', o2: '#134434', 'o-line': '#cfae66', ...goldDarkInk,
      'hero-bg': 'radial-gradient(circle at 50% 40%,#134434,#071812)', 'hero-veil': 'none', sky1: '#071812', sky2: '#134434' },
    spark: '#f0d38c', burst: ['#cfae66', '#2f7a5c', '#fff1cc'], scratch: ['#f1e4c4', '#cfae66', '#134434'] },

  { slug: 'crimson-royale', name: 'Crimson Royale', blurb: 'A charcoal-and-gold card flips to reveal crimson luxury',
    open: 'card', scene: 'ornate', fx: ['sparkles', 'petals'], fonts: ['Great Vibes', 'Playfair Display'], dark: true,
    v: { ...D, bg: '#151517', card: '#1d1d20', head: '#f2e3c6', accent: '#c9a25e', 'accent-deep': '#e4c27f', line: 'rgba(201,162,94,.3)',
      'o-bg': 'radial-gradient(circle at 50% 45%,#2a2a2e,#0b0b0c)', o2: 'linear-gradient(150deg,#2b2b2f,#141416)', 'o-line': '#c9a25e', m: '#8e1424', 'm-hi': '#c8394b', 'm-lo': '#560a14', 'm-ink': '#f6dcc0', 'm-line': 'rgba(246,220,192,.5)',
      'hero-bg': 'radial-gradient(circle at 50% 40%,#2a1216,#0d0d0f)', 'hero-veil': 'none', sky1: '#0d0d0f', sky2: '#2a1216', name2: '#ff9aa6' },
    petal: '#9e1a2c', spark: '#f0cf87', burst: ['#9e1a2c', '#c9a25e', '#fff1cc'], scratch: ['#f2e3c6', '#c9a25e', '#8e1424'] },

  { slug: 'rose-gold-blush', name: 'Rose Gold Blush', blurb: 'An ornate rose-gold palace arch with blush floral doors',
    open: 'arch', scene: 'garden', fx: ['petals', 'sparkles'], fonts: ['Great Vibes', 'Playfair Display'],
    v: { ...L, bg: '#fdf4f1', head: '#7c4b47', accent: '#c48e7c', 'accent-deep': '#a06a59', btn: '#a96f61', line: 'rgba(196,142,124,.35)', name1: '#7c4b47', name2: '#f8d2c6', 'hero-accent': '#a06a59', 'hero-ink': '#7c4b47', 'paper-ink': '#7c4b47',
      'o-bg': '#f2d6cf', o1: '#efcfc6', o2: '#f9e5df', 'o-line': '#c48e7c', 'o-frame': '#f7e4dd', 'o-ink': '#7c4b47', 'o-shadow': 'rgba(255,255,255,.9)', m: '#cf9a87', 'm-hi': '#f6d7cc', 'm-lo': '#9b6352',
      sky1: '#f7dcd4', sky2: '#fef7f4', fl1: '#f1b7a9', fl2: '#ffffff', 'fl-c': '#e4b27d', leaf: '#b0b893' },
    petal: '#f0b2a5', spark: '#f4cfa0', scratch: ['#fbe4de', '#e1a998', '#a96654'] },

  { slug: 'modern-minimal', name: 'Modern Minimal', blurb: 'A deep-navy geometric book cover opens page by page',
    open: 'book', scene: 'ornate', geo: true, fx: ['sparkles'], fonts: ['Italiana', 'Cinzel'], script: 'Italiana', dark: true,
    v: { ...D, bg: '#0e1626', card: '#131d31', head: '#f1e6cc', accent: '#c8a868', 'accent-deep': '#e1c487', line: 'rgba(200,168,104,.3)', radius: '2px',
      'o-bg': 'radial-gradient(circle at 50% 50%,#18243d,#070b14)', o1: '#0f1830', o2: 'linear-gradient(135deg,#162343,#0b1428)', 'o-line': '#c8a868', ...goldDarkInk,
      'hero-bg': 'radial-gradient(circle at 50% 40%,#18243d,#090e1a)', 'hero-veil': 'none', sky1: '#090e1a', sky2: '#18243d' },
    spark: '#efd395', burst: ['#c8a868', '#ffffff', '#5a6f9a'], scratch: ['#f1e6cc', '#c8a868', '#3a4a6e'] },

  { slug: 'majestic-love', name: 'Majestic Love', blurb: 'Champagne velvet curtains reveal an ivory-and-gold palace',
    open: 'curtains', scene: 'palace', fx: ['petals', 'sparkles'], fonts: ['Pinyon Script', 'Playfair Display'],
    v: { ...L, bg: '#fbf7ee', head: '#5a4526', accent: '#b8955a', 'accent-deep': '#8c6a35', btn: '#8c6a35', name1: '#5a4526', name2: '#f3d9a0',
      'o-bg': '#2a2010', o1: '#a88350', o2: '#d8bb86', 'o-line': '#fff0c9', ...gold,
      sky1: '#f6e3c2', sky2: '#fdf8ee', sun: '#fff6dd', pal: '#f3e8d2', win: '#ffd88e', water1: '#efdcbc', water2: '#faf1e2', fl1: '#ffffff', fl2: '#f4e4c4', 'fl-c': '#e1bd6e', leaf: '#a9ae88' },
    petal: '#ffffff', spark: '#f3d491', scratch: ['#f6e9cc', '#d8bb86', '#8c6a35'] }
].map(t => ({ ...COMMON, ...t }));
