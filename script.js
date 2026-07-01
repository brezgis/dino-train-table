const SVG_NS = "http://www.w3.org/2000/svg";

/* ---------- Data ---------- */

const ANIMALS = [
  { id: "saber", name: "Saber-Tooth", color: "#eeb03e", note: 261.63,
    fact: "A saber-toothed cat's fangs could grow up to 18 cm long — longer than your whole hand." },
  { id: "mammoth", name: "Woolly Mammoth", color: "#93bccf", note: 293.66,
    fact: "Woolly mammoths had curved tusks up to 4.5 meters long, handy for sweeping snow off their food." },
  { id: "trex", name: "T. Rex", color: "#efdca4", note: 493.88,
    fact: "Despite its huge head, a T. rex's arms were barely longer than a human's." },
  { id: "triceratops", name: "Triceratops", color: "#e6ab98", note: 523.25,
    fact: "Triceratops means “three-horned face” in Greek." },
  { id: "stego", name: "Stegosaurus", color: "#b7d5e2", note: 587.33,
    fact: "A Stegosaurus's brain was roughly the size of a walnut." },
  { id: "bronto", name: "Long-Neck", color: "#e6cfa0", note: 659.25,
    fact: "Long-necked dinosaurs like this one could be longer than two school buses." },
  { id: "anky", name: "Ankylosaurus", color: "#bcce8f", note: 698.46,
    fact: "Ankylosaurus had a built-in bony club at the end of its tail for self-defense." },
  { id: "ptero", name: "Pterodactyl", color: "#b9ddca", note: 783.99,
    fact: "Pterodactyls weren't dinosaurs at all — they were flying reptiles." },
];

const ANCHOR = { x: 70, y: 65 };
const ENGINE_ANCHOR = { x: 55, y: 68 };
const ENGINE_GAP = 130;
const SPACING = 145;
const BASE_SPEED = 70; // px/sec at speedFactor 1
const HALF = 160;      // arc-length half-width of the bridge ramp (longer = gentler blend)
const LIFT = 34;       // how high the over-pass rides above the crossing
const OVER_LAYER_MARGIN = HALF + 90; // cover the whole car before its anchor reaches the bridge
const FLY_HALF = 155, FLY_LIFT = 62; // the tall flyover hump that arcs over the water on one lobe
const VB_W = 1800, VB_H = 1120;   // a good landscape rectangle with room to spread out

/* ---------- Art ---------- */

function spinWheel(cx, cy, r) {
  return `<g class="wheel-spin" style="transform-origin:${cx}px ${cy}px">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#2c2418"></circle>
    <rect x="${cx - 1.1}" y="${cy - r + 2}" width="2.2" height="${(r - 2) * 2}" rx="1" fill="#6e6e6e"></rect>
    <rect x="${cx - r + 2}" y="${cy - 1.1}" width="${(r - 2) * 2}" height="2.2" rx="1" fill="#6e6e6e"></rect>
    <circle cx="${cx}" cy="${cy}" r="${(r * 0.32).toFixed(1)}" fill="#d2d2d2"></circle>
  </g>`;
}
function wagonMarkup(color) {
  return `
    <rect x="0" y="38" width="10" height="8" rx="2" fill="#555"></rect>
    <rect x="130" y="38" width="10" height="8" rx="2" fill="#555"></rect>
    <rect class="wagon-body" x="10" y="20" width="120" height="45" rx="12" fill="${color}"></rect>
    ${spinWheel(35, 68, 12)}
    ${spinWheel(105, 68, 12)}
  `;
}

const ART = {
  // Saber-toothed cat: tawny head seated on the rim, ears up, two long fangs hanging down.
  saber: () => `
    <ellipse cx="70" cy="0" rx="20" ry="19" fill="#cf9450" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M55,-13 L51,-28 L64,-15 Z" fill="#cf9450" stroke="#2c2418" stroke-width="2"></path>
    <path d="M85,-13 L89,-28 L76,-15 Z" fill="#cf9450" stroke="#2c2418" stroke-width="2"></path>
    <ellipse cx="70" cy="6" rx="11" ry="8" fill="#ecca9c"></ellipse>
    <circle cx="63" cy="-3" r="2.4" fill="#2c2418"></circle>
    <circle cx="77" cy="-3" r="2.4" fill="#2c2418"></circle>
    <path d="M66,4 L74,4 L70,9 Z" fill="#5a3a1f"></path>
    <path d="M65,9 L63,20 L68,11 Z" fill="#fbf4e4" stroke="#c9b48c" stroke-width="0.7"></path>
    <path d="M75,9 L77,20 L72,11 Z" fill="#fbf4e4" stroke="#c9b48c" stroke-width="0.7"></path>
  `,
  // Woolly mammoth: shaggy brown dome, small ears, trunk, two big curved tusks.
  mammoth: () => `
    <path d="M46,20 Q40,-16 70,-18 Q100,-16 94,20 Z" fill="#8a5a34" stroke="#2c2418" stroke-width="2"></path>
    <ellipse cx="53" cy="2" rx="7" ry="10" fill="#754a28" stroke="#2c2418" stroke-width="1.5"></ellipse>
    <ellipse cx="87" cy="2" rx="7" ry="10" fill="#754a28" stroke="#2c2418" stroke-width="1.5"></ellipse>
    <path d="M70,4 Q63,20 71,27" stroke="#2c2418" stroke-width="12" fill="none" stroke-linecap="round"></path>
    <path d="M70,4 Q63,20 71,27" stroke="#8a5a34" stroke-width="9" fill="none" stroke-linecap="round"></path>
    <path d="M62,12 Q49,22 60,30" stroke="#2c2418" stroke-width="7.5" fill="none" stroke-linecap="round"></path>
    <path d="M78,12 Q91,22 80,30" stroke="#2c2418" stroke-width="7.5" fill="none" stroke-linecap="round"></path>
    <path d="M62,12 Q49,22 60,30" stroke="#f3ead2" stroke-width="5" fill="none" stroke-linecap="round"></path>
    <path d="M78,12 Q91,22 80,30" stroke="#f3ead2" stroke-width="5" fill="none" stroke-linecap="round"></path>
    <circle cx="62" cy="-4" r="2.3" fill="#2c2418"></circle>
    <circle cx="78" cy="-4" r="2.3" fill="#2c2418"></circle>
  `,
  // T. rex: big head over a chest that seats to the rim, teeth at the jaw, tiny arm.
  trex: () => `
    <path d="M60,10 q-9,3 -6,11" stroke="#2c2418" stroke-width="7" fill="none" stroke-linecap="round"></path>
    <path d="M60,10 q-9,3 -6,11" stroke="#4f7d4d" stroke-width="4" fill="none" stroke-linecap="round"></path>
    <path d="M50,20 Q44,3 58,-3 Q62,-28 86,-26 Q106,-24 103,-3 Q102,6 90,8 Q93,20 83,20 L58,20 Q50,20 50,20 Z" fill="#5b8c5a" stroke="#2c2418" stroke-width="2" stroke-linejoin="round"></path>
    <path d="M67,9 Q81,14 98,5" stroke="#2c2418" stroke-width="1.6" fill="none" stroke-linecap="round"></path>
    <path d="M71,9 L73,14 L75,9 Z" fill="#fff"></path>
    <path d="M81,10 L83,15 L85,10 Z" fill="#fff"></path>
    <path d="M91,7 L93,11 L95,7 Z" fill="#fff"></path>
    <circle cx="84" cy="-14" r="3.6" fill="#fff" stroke="#2c2418" stroke-width="1"></circle>
    <circle cx="85" cy="-14" r="1.7" fill="#111"></circle>
    <circle cx="100" cy="-3" r="1.4" fill="#2c2418"></circle>
  `,
  // Triceratops: frill behind, big head to the rim, brow horns + nose horn, eyes.
  triceratops: () => `
    <path d="M38,-8 A32,30 0 0 1 102,-8 L100,-2 Q70,7 40,-2 Z" fill="#caa977" stroke="#2c2418" stroke-width="2"></path>
    <ellipse cx="70" cy="6" rx="20" ry="15" fill="#8c6239" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M56,-7 L52,-25 L63,-11 Z" fill="#e8d9c0" stroke="#2c2418" stroke-width="1.5"></path>
    <path d="M84,-7 L88,-25 L77,-11 Z" fill="#e8d9c0" stroke="#2c2418" stroke-width="1.5"></path>
    <path d="M66,14 L70,22 L74,14 Z" fill="#e8d9c0" stroke="#2c2418" stroke-width="1.2"></path>
    <circle cx="63" cy="4" r="2" fill="#2c2418"></circle>
    <circle cx="77" cy="4" r="2" fill="#2c2418"></circle>
  `,
  // Stegosaurus: long low body seated on the rim, head at the front, tail, plates on the back.
  stego: () => `
    <ellipse cx="70" cy="12" rx="46" ry="12" fill="#6a9a54" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M113,9 Q129,5 134,13" stroke="#2c2418" stroke-width="10" fill="none" stroke-linecap="round"></path>
    <path d="M113,9 Q129,5 134,13" stroke="#6a9a54" stroke-width="7" fill="none" stroke-linecap="round"></path>
    <ellipse cx="30" cy="3" rx="12" ry="10" fill="#6a9a54" stroke="#2c2418" stroke-width="2"></ellipse>
    <circle cx="25" cy="1" r="1.8" fill="#111"></circle>
    <polygon points="44,3 50,-16 56,3" fill="#e07a3f" stroke="#2c2418" stroke-width="1.5"></polygon>
    <polygon points="58,3 66,-23 74,3" fill="#e07a3f" stroke="#2c2418" stroke-width="1.5"></polygon>
    <polygon points="76,3 84,-20 92,3" fill="#e07a3f" stroke="#2c2418" stroke-width="1.5"></polygon>
    <polygon points="94,3 100,-10 106,3" fill="#e07a3f" stroke="#2c2418" stroke-width="1.5"></polygon>
  `,
  // Long-neck: rounded body on the rim, tail out back, long neck sweeping up to a small head.
  bronto: () => `
    <path d="M112,9 Q128,7 133,15" stroke="#2c2418" stroke-width="11" fill="none" stroke-linecap="round"></path>
    <path d="M46,6 Q30,-16 40,-42 Q44,-54 57,-52" stroke="#2c2418" stroke-width="16" fill="none" stroke-linecap="round"></path>
    <ellipse cx="74" cy="12" rx="42" ry="12" fill="#6fa8a3" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M112,9 Q128,7 133,15" stroke="#6fa8a3" stroke-width="8" fill="none" stroke-linecap="round"></path>
    <path d="M46,6 Q30,-16 40,-42 Q44,-54 57,-52" stroke="#6fa8a3" stroke-width="13" fill="none" stroke-linecap="round"></path>
    <ellipse cx="58" cy="-53" rx="10" ry="8" fill="#6fa8a3" stroke="#2c2418" stroke-width="1.5"></ellipse>
    <circle cx="61" cy="-55" r="1.6" fill="#111"></circle>
  `,
  // Ankylosaurus: armored body on the rim, head at the front, back plates, clubbed tail (kept in bounds).
  anky: () => `
    <path d="M114,9 Q124,7 122,15" stroke="#2c2418" stroke-width="10" fill="none" stroke-linecap="round"></path>
    <path d="M22,18 Q16,2 36,0 Q70,-5 104,0 Q124,2 118,18 Z" fill="#9c7a4a" stroke="#2c2418" stroke-width="2"></path>
    <path d="M114,9 Q124,7 122,15" stroke="#9c7a4a" stroke-width="7" fill="none" stroke-linecap="round"></path>
    <circle cx="121" cy="15" r="7" fill="#7a5f3a" stroke="#2c2418" stroke-width="2"></circle>
    <ellipse cx="26" cy="9" rx="12" ry="9" fill="#b08a52" stroke="#2c2418" stroke-width="2"></ellipse>
    <circle cx="20" cy="8" r="1.6" fill="#111"></circle>
    <polygon points="42,0 48,-9 54,0" fill="#7a5f3a" stroke="#2c2418" stroke-width="1.2"></polygon>
    <polygon points="58,-2 64,-12 70,-2" fill="#7a5f3a" stroke="#2c2418" stroke-width="1.2"></polygon>
    <polygon points="76,-2 82,-12 88,-2" fill="#7a5f3a" stroke="#2c2418" stroke-width="1.2"></polygon>
    <polygon points="94,0 100,-8 106,0" fill="#7a5f3a" stroke="#2c2418" stroke-width="1.2"></polygon>
  `,
  // Pterodactyl: wings spread behind, body seated with little feet on the rim, crest + beak up top.
  ptero: () => `
    <path d="M68,2 Q40,-16 15,-3 Q42,1 60,9 Z" fill="#9a7dba" stroke="#2c2418" stroke-width="2"></path>
    <path d="M72,2 Q100,-16 125,-3 Q98,1 80,9 Z" fill="#9a7dba" stroke="#2c2418" stroke-width="2"></path>
    <path d="M70,-1 L70,-24" stroke="#2c2418" stroke-width="11" fill="none" stroke-linecap="round"></path>
    <ellipse cx="70" cy="8" rx="10" ry="12" fill="#8e6fae" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M70,-1 L70,-24" stroke="#8e6fae" stroke-width="8" fill="none" stroke-linecap="round"></path>
    <ellipse cx="70" cy="-28" rx="8" ry="7" fill="#8e6fae" stroke="#2c2418" stroke-width="1.5"></ellipse>
    <path d="M63,-33 L70,-45 L74,-32 Z" fill="#6a4f8a" stroke="#2c2418" stroke-width="1"></path>
    <path d="M70,-31 L83,-35 L70,-25 Z" fill="#f2a33a" stroke="#2c2418" stroke-width="1"></path>
    <circle cx="73" cy="-29" r="1.6" fill="#111"></circle>
    <path d="M64,17 L62,23 M76,17 L78,23" stroke="#2c2418" stroke-width="4" stroke-linecap="round"></path>
    <path d="M64,17 L62,23 M76,17 L78,23" stroke="#c98a3a" stroke-width="2.2" stroke-linecap="round"></path>
  `,
};

function carInnerSVG(animal) {
  return wagonMarkup(animal.color) + ART[animal.id]();
}

function engineInnerSVG() {
  return `
    <rect x="0" y="10" width="90" height="55" rx="10" fill="#d6433a" stroke="#2c2418" stroke-width="3"></rect>
    <rect x="85" y="20" width="45" height="35" rx="14" fill="#c23a32" stroke="#2c2418" stroke-width="3"></rect>
    <rect x="96" y="-14" width="14" height="37" rx="4" fill="#3a3a3a" stroke="#2c2418" stroke-width="2"></rect>
    <ellipse cx="103" cy="-14" rx="9" ry="4" fill="#4a4a4a" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M130,55 L148,68 L130,68 Z" fill="#3a3a3a" stroke="#2c2418" stroke-width="2"></path>
    <circle cx="126" cy="32" r="6" fill="#ffe27a" stroke="#2c2418" stroke-width="2"></circle>
    <rect x="14" y="18" width="30" height="22" rx="4" fill="#bfe6ff" stroke="#2c2418" stroke-width="2"></rect>
    ${spinWheel(25, 68, 15)}
    ${spinWheel(65, 68, 15)}
    ${spinWheel(115, 64, 9)}
  `;
}

const STACK_TIP = { x: 103, y: -18 };

/* ---------- Audio ---------- */

let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}
function tone(freq, dur = 0.35, type = "triangle", delay = 0) {
  ensureAudio();
  const t0 = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(0.25, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}
function playToot() {
  tone(587, 0.22, "sawtooth", 0);
  tone(440, 0.32, "sawtooth", 0.18);
}
function playShuffleJingle() {
  const notes = [...ANIMALS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map((a) => a.note)
    .sort((a, b) => a - b);
  notes.forEach((n, i) => tone(n, 0.16, "triangle", i * 0.1));
}

/* ---------- Geometry helpers ---------- */

function mod(n, m) {
  return ((n % m) + m) % m;
}
function localToWorld(px, py, angleDeg, anchor, local) {
  const rad = (angleDeg * Math.PI) / 180;
  const lx = local.x - anchor.x;
  const ly = local.y - anchor.y;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: px + (lx * cos - ly * sin),
    y: py + (lx * sin + ly * cos),
  };
}
const circDist = (a, b, T) => { let d = Math.abs(a - b) % T; return Math.min(d, T - d); };
function mk(tag, attrs) { const e = document.createElementNS(SVG_NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }

/* ---------- Figure-8 track: an organic hand-authored spline (meandering & wonky) ---------- */

// control points in design space; the closed Catmull-Rom spline through them self-crosses once
const CTRL = [
  { x: 585, y: 150 }, { x: 800, y: 140 }, { x: 935, y: 300 }, { x: 775, y: 460 }, { x: 570, y: 420 },
  { x: 435, y: 200 }, { x: 250, y: 210 }, { x: 140, y: 325 }, { x: 265, y: 445 }, { x: 455, y: 415 },
];
function catmull(ctrl, per) {
  const out = [], n = ctrl.length;
  for (let i = 0; i < n; i++) {
    const p0 = ctrl[(i - 1 + n) % n], p1 = ctrl[i], p2 = ctrl[(i + 1) % n], p3 = ctrl[(i + 2) % n];
    for (let k = 0; k < per; k++) {
      const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  return out;
}
function segInt(ax, ay, bx, by, cx, cy, ex, ey) {
  const r1x = bx - ax, r1y = by - ay, r2x = ex - cx, r2y = ey - cy, den = r1x * r2y - r1y * r2x;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((cx - ax) * r2y - (cy - ay) * r2x) / den, u = ((cx - ax) * r1y - (cy - ay) * r1x) / den;
  if (t > 0 && t < 1 && u > 0 && u < 1) return { x: ax + t * r1x, y: ay + t * r1y, t, u };
  return null;
}
function buildFigure8() {
  const raw = catmull(CTRL, 42);
  let mnx = 1e9, mny = 1e9, mxx = -1e9, mxy = -1e9;
  for (const p of raw) { if (p.x < mnx) mnx = p.x; if (p.x > mxx) mxx = p.x; if (p.y < mny) mny = p.y; if (p.y > mxy) mxy = p.y; }
  const mgx = 250, MG_TOP = 190, MG_BOT = 150, bw = mxx - mnx, bh = mxy - mny;
  const iw = VB_W - 2 * mgx, ih = VB_H - MG_TOP - MG_BOT, sc = Math.min(iw / bw, ih / bh);
  const padX = (iw - bw * sc) / 2, padY = (ih - bh * sc) / 2, NS = raw.length;
  const pts = raw.map(p => ({ x: mgx + padX + (p.x - mnx) * sc, y: MG_TOP + padY + (p.y - mny) * sc }));
  const cum = [0];
  for (let i = 1; i < NS; i++) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  const totalLen = cum[NS - 1] + Math.hypot(pts[0].x - pts[NS - 1].x, pts[0].y - pts[NS - 1].y);
  const segLen = (i) => (i < NS - 1 ? cum[i + 1] - cum[i] : totalLen - cum[NS - 1]);
  // detect the single self-crossing → the two passes that make the centre bridge
  let sOver = cum[Math.round(NS / 4)], sUnder = cum[Math.round(3 * NS / 4)];
  found:
  for (let i = 0; i < NS; i++) {
    const a = (i + 1) % NS;
    for (let j = i + 2; j < NS; j++) {
      if (i === 0 && j === NS - 1) continue;
      const b = (j + 1) % NS;
      const r = segInt(pts[i].x, pts[i].y, pts[a].x, pts[a].y, pts[j].x, pts[j].y, pts[b].x, pts[b].y);
      if (r) {
        const sa = cum[i] + r.t * segLen(i), sb = cum[j] + r.u * segLen(j);
        if (Math.min(Math.abs(sa - sb), totalLen - Math.abs(sa - sb)) < 150) continue;
        sOver = sa; sUnder = sb; break found;
      }
    }
  }
  return { pts, cum, totalLen, NS, sOver, sUnder };
}
const F8 = buildFigure8();

// raised zones: the humble centre bridge (self-crossing) + a tall flyover over water on the big right lobe.
// the flyover sits at the top of the right lobe (rightmost half of the table).
let iFly = -1, flyMinY = 1e9;
for (let i = 0; i < F8.NS; i++) { if (F8.pts[i].x > VB_W / 2 && F8.pts[i].y < flyMinY) { flyMinY = F8.pts[i].y; iFly = i; } }
const LIFT_ZONES = [
  { s: F8.sOver, half: HALF, lift: LIFT, bridge: true },
  { s: F8.cum[iFly], half: FLY_HALF, lift: FLY_LIFT, bridge: false },
];
const inAnyZone = (s) => LIFT_ZONES.some(z => circDist(s, z.s, F8.totalLen) < z.half);

function posAt(s) {
  const { pts, cum, NS, totalLen } = F8;
  s = mod(s, totalLen);
  let i, j, f;
  if (s >= cum[NS - 1]) { i = NS - 1; j = 0; const L = totalLen - cum[NS - 1]; f = L > 0 ? (s - cum[NS - 1]) / L : 0; }
  else { let lo = 0, hi = NS - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (cum[m] <= s) lo = m; else hi = m - 1; } i = lo; j = i + 1; f = (s - cum[i]) / (cum[j] - cum[i]); }
  const ax = pts[i].x, ay = pts[i].y, bx = pts[j].x, by = pts[j].y;
  return { x: ax + (bx - ax) * f, y: ay + (by - ay) * f, angle: (Math.atan2(by - ay, bx - ax) * 180) / Math.PI };
}
function liftAt(s) {
  let m = 0;
  for (const z of LIFT_ZONES) {
    const d = circDist(s, z.s, F8.totalLen);
    if (d < z.half) m = Math.max(m, z.lift * 0.5 * (1 + Math.cos((Math.PI * d) / z.half)));
  }
  return m;
}
function trackPathWithoutOverpass() {
  // draw the flat track everywhere EXCEPT inside a raised zone; each gap breaks into a new sub-path
  const { pts, cum, NS } = F8;
  let d = "", pen = false;
  for (let i = 0; i < NS; i++) {
    if (inAnyZone(cum[i])) { pen = false; continue; }
    d += (pen ? "L" : "M") + pts[i].x.toFixed(1) + "," + pts[i].y.toFixed(1) + " ";
    pen = true;
  }
  return d.trim();
}

/* ---------- The bridge over the crossing (built once, sits between the two car layers) ---------- */

function buildBridge() {
  const ns = 28, top = [];
  for (let k = -ns; k <= ns; k++) {
    const s = F8.sOver + (k / ns) * (HALF + 12), p = posAt(s), lift = liftAt(s), rad = (p.angle * Math.PI) / 180;
    top.push({ x: p.x, y: p.y - lift, nx: Math.cos(rad + Math.PI / 2), ny: Math.sin(rad + Math.PI / 2), lift });
  }
  const dstr = (a) => a.map((p, i) => (i ? "L" : "M") + p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
  // soft ground shadow, only under the RAISED part of the deck (so it doesn't bleed onto flat track)
  const shadowPts = top.filter((t) => t.lift > LIFT * 0.3).map((t) => ({ x: t.x, y: t.y + t.lift + 3 + t.lift * 0.3 }));
  if (shadowPts.length > 1) {
    bridgeLayer.appendChild(mk("path", { d: dstr(shadowPts), fill: "none", stroke: "rgba(0,0,0,0.08)", "stroke-width": 38, "stroke-linecap": "round" }));
    bridgeLayer.appendChild(mk("path", { d: dstr(shadowPts), fill: "none", stroke: "rgba(0,0,0,0.12)", "stroke-width": 24, "stroke-linecap": "round" }));
  }
  // stone piers under the highest part of the deck
  for (const kk of [-0.44, 0.44]) {
    const s = F8.sOver + kk * HALF, p = posAt(s), lift = liftAt(s);
    bridgeLayer.appendChild(mk("rect", { x: (p.x - 7).toFixed(1), y: (p.y - lift).toFixed(1), width: 14, height: (lift + 11).toFixed(1), rx: 2, fill: "#8a7550" }));
    bridgeLayer.appendChild(mk("rect", { x: (p.x - 7).toFixed(1), y: (p.y - lift).toFixed(1), width: 5, height: (lift + 11).toFixed(1), rx: 2, fill: "#a89268" }));
  }
  // the deck IS the track, just ramped up — identical strokes + butt caps so the ends flow straight in
  const d = dstr(top);
  bridgeLayer.appendChild(mk("path", { d, fill: "none", stroke: "#d8b27a", "stroke-width": 64, "stroke-linecap": "butt", "stroke-linejoin": "round" }));
  bridgeLayer.appendChild(mk("path", { d, fill: "none", stroke: "#8a6a3f", "stroke-width": 50, "stroke-linecap": "butt", "stroke-linejoin": "round" }));
  bridgeLayer.appendChild(mk("path", { d, fill: "none", stroke: "#6b4f2a", "stroke-width": 50, "stroke-linecap": "butt", "stroke-dasharray": "6 16", opacity: "0.55" }));
  // guard rails, only where the deck is actually lifted (nothing lands on the flat approach)
  const rail = top.filter(p => p.lift > LIFT * 0.16);
  if (rail.length > 1) {
    bridgeLayer.appendChild(mk("path", { d: dstr(rail.map(p => ({ x: p.x + p.nx * 25, y: p.y + p.ny * 25 }))), fill: "none", stroke: "#7a5a33", "stroke-width": 4, "stroke-linecap": "round" }));
    bridgeLayer.appendChild(mk("path", { d: dstr(rail.map(p => ({ x: p.x - p.nx * 25, y: p.y - p.ny * 25 }))), fill: "none", stroke: "#7a5a33", "stroke-width": 4, "stroke-linecap": "round" }));
  }
}

/* ---------- The flyover over the water (a raised hump on one lobe, on stilts) ---------- */

// a genuine wiggly body of water, not a plain circle
function drawWigglyWater(g, cx, cy, rx, ry) {
  const N = 46, pts = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const wob = 1 + 0.11 * Math.sin(a * 3 + 0.7) + 0.07 * Math.sin(a * 5 + 2.3) + 0.04 * Math.sin(a * 8 + 1.1);
    pts.push([cx + Math.cos(a) * rx * wob, cy + Math.sin(a) * ry * wob]);
  }
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ") + " Z";
  g.appendChild(mk("path", { d, fill: "#3f93cf" }));
  g.appendChild(mk("path", { d, fill: "none", stroke: "#bfe6f7", "stroke-width": 3 }));
  g.appendChild(mk("ellipse", { cx: (cx - rx * 0.28).toFixed(1), cy: (cy - ry * 0.34).toFixed(1), rx: (rx * 0.3).toFixed(1), ry: (ry * 0.14).toFixed(1), fill: "rgba(255,255,255,0.28)" }));
}

function buildFlyover() {
  const z = LIFT_ZONES.find(zz => !zz.bridge);
  if (!z) return;
  const ns = 44, top = [];
  for (let k = -ns; k <= ns; k++) {
    const s = z.s + (k / ns) * (z.half + 12), p = posAt(s), li = liftAt(s), rad = (p.angle * Math.PI) / 180;
    top.push({ x: p.x, y: p.y - li, nx: Math.cos(rad + Math.PI / 2), ny: Math.sin(rad + Math.PI / 2), li });
  }
  const c = posAt(z.s);
  // wiggly lake straddling the flyover footprint
  drawWigglyWater(lakeLayer, c.x, c.y + 6, 205, 128);
  // soft shadow under the raised part
  const sh = top.filter(t => t.li > z.lift * 0.22).map(t => [t.x, t.y + t.li + 5]);
  if (sh.length > 1) archLayer.appendChild(mk("path", { d: sh.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "), fill: "none", stroke: "rgba(0,0,0,0.13)", "stroke-width": 42, "stroke-linecap": "round" }));
  // stilts down into the water
  const step = Math.max(4, Math.round(top.length / 13));
  for (let k = 0; k < top.length; k += step) {
    const t = top[k]; if (t.li < 8) continue;
    archLayer.appendChild(mk("rect", { x: (t.x - 5).toFixed(1), y: t.y.toFixed(1), width: 10, height: (t.li + 12).toFixed(1), rx: 2, fill: "#8a7550" }));
    archLayer.appendChild(mk("rect", { x: (t.x - 5).toFixed(1), y: t.y.toFixed(1), width: 4, height: (t.li + 12).toFixed(1), rx: 2, fill: "#a89268" }));
  }
  // raised deck — same wooden palette + ties as the track, butt caps to blend into the loop
  const deckD = top.map((t, i) => (i ? "L" : "M") + t.x.toFixed(1) + "," + t.y.toFixed(1)).join(" ");
  archLayer.appendChild(mk("path", { d: deckD, fill: "none", stroke: "#d8b27a", "stroke-width": 64, "stroke-linecap": "butt", "stroke-linejoin": "round" }));
  archLayer.appendChild(mk("path", { d: deckD, fill: "none", stroke: "#8a6a3f", "stroke-width": 50, "stroke-linecap": "butt", "stroke-linejoin": "round" }));
  archLayer.appendChild(mk("path", { d: deckD, fill: "none", stroke: "#6b4f2a", "stroke-width": 50, "stroke-linecap": "butt", "stroke-dasharray": "6 16", opacity: "0.55" }));
  // guard rails only where it's actually up in the air
  const rail = top.filter(t => t.li > z.lift * 0.16);
  if (rail.length > 1) {
    archLayer.appendChild(mk("path", { d: rail.map((t, i) => (i ? "L" : "M") + (t.x + t.nx * 25).toFixed(1) + "," + (t.y + t.ny * 25).toFixed(1)).join(" "), fill: "none", stroke: "#7a5a33", "stroke-width": 4, "stroke-linecap": "round" }));
    archLayer.appendChild(mk("path", { d: rail.map((t, i) => (i ? "L" : "M") + (t.x - t.nx * 25).toFixed(1) + "," + (t.y - t.ny * 25).toFixed(1)).join(" "), fill: "none", stroke: "#7a5a33", "stroke-width": 4, "stroke-linecap": "round" }));
  }
}

/* ---------- Build scene ---------- */

const lakeLayer = document.getElementById("lakeLayer");
const archLayer = document.getElementById("archLayer");
const trackBallast = document.getElementById("trackBallast");
const trackPathEl = document.getElementById("trackPath");
const trackTies = document.getElementById("trackTies");
const trackD = trackPathWithoutOverpass();
trackBallast.setAttribute("d", trackD);
trackPathEl.setAttribute("d", trackD);
trackTies.setAttribute("d", trackD);
trackBallast.style.strokeLinecap = "butt";
trackPathEl.style.strokeLinecap = "butt";
const underLayer = document.getElementById("underLayer");
const bridgeLayer = document.getElementById("bridgeLayer");
const overLayer = document.getElementById("overLayer");
const smokeLayer = document.getElementById("smokeLayer");
const trackSvg = document.getElementById("trackSvg");
const infoPanel = document.getElementById("infoPanel");
const queueEl = document.getElementById("queue");
const goBtn = document.getElementById("goBtn");
const speedSlider = document.getElementById("speedSlider");
const shuffleBtn = document.getElementById("shuffleBtn");
const modeToggle = document.getElementById("modeToggle");

const dragLayer = document.getElementById("dragLayer");

/* ---------- Vehicles: the engine + every car is a pick-up-able object ---------- */

const COUPLE_GAP = SPACING + 26;   // adjacent vehicles couple when their anchors are this close
const SNAP_DIST = 64;              // drop within this (svg units) of the track → it snaps on
const vehicles = [];
let heldV = null;
const pointer = { x: 0, y: 0 };

function svgPoint(e) {
  const pt = trackSvg.createSVGPoint();
  pt.x = e.clientX; pt.y = e.clientY;
  const p = pt.matrixTransform(trackSvg.getScreenCTM().inverse());
  return { x: p.x, y: p.y };
}
function nearestOnTrack(x, y) {
  let best = 1e18, bs = 0;
  for (let i = 0; i < F8.NS; i++) {
    const dx = F8.pts[i].x - x, dy = F8.pts[i].y - y, d = dx * dx + dy * dy;
    if (d < best) { best = d; bs = F8.cum[i]; }
  }
  return { s: bs, dist: Math.sqrt(best) };
}

function grab(e, v) {
  if (e.button != null && e.button !== 0) return;   // left button / touch only
  e.preventDefault();
  heldV = v;
  v.held = true;
  v.onTrack = false;
  const p = svgPoint(e); pointer.x = p.x; pointer.y = p.y;
  v.el.classList.add("held");
  dragLayer.appendChild(v.el);
  ensureAudio();
  if (v.kind === "engine") { playToot(); burstSmoke(2); }
  else if (v.animal) tone(v.animal.note);
}
window.addEventListener("pointermove", (e) => {
  if (!heldV) return;
  const p = svgPoint(e); pointer.x = p.x; pointer.y = p.y;
});
window.addEventListener("pointerup", (e) => {
  if (!heldV) return;
  const p = svgPoint(e);
  const near = nearestOnTrack(p.x, p.y);
  if (near.dist < SNAP_DIST) { heldV.onTrack = true; heldV.s = near.s; }   // snap onto the track
  else { heldV.onTrack = false; heldV.hx = p.x; heldV.hy = p.y; }          // park it on the felt
  heldV.held = false;
  heldV.el.classList.remove("held");
  heldV = null;
});

function makeVehicle(kind, animal) {
  const el = document.createElementNS(SVG_NS, "g");
  el.classList.add(kind === "engine" ? "engine-group" : "car");
  el.innerHTML = kind === "engine" ? engineInnerSVG() : carInnerSVG(animal);
  const v = { kind, animal, el, anchor: kind === "engine" ? ENGINE_ANCHOR : ANCHOR, s: 0, onTrack: true, held: false, hx: 0, hy: 0 };
  el.addEventListener("pointerdown", (e) => grab(e, v));
  underLayer.appendChild(el);
  vehicles.push(v);
  return v;
}

const engine = makeVehicle("engine", null);
ANIMALS.forEach((a) => makeVehicle("car", a));

// initial train: engine leading, cars coupled behind it (all pulled → full speed)
const startS = F8.totalLen * 0.2;
engine.s = startS;
vehicles.filter((v) => v.kind === "car").forEach((v, i) => { v.s = mod(startS - (i + 1) * SPACING, F8.totalLen); });

buildBridge();
buildFlyover();

/* ---------- Run state / speed ---------- */

let running = true;   // ambient piece: the train runs on load (audio still waits for a click)
let speedFactor = speedSlider ? Number(speedSlider.value) : 2;

if (goBtn) {
  goBtn.addEventListener("click", () => {
    running = !running;
    goBtn.textContent = running ? "⏸ Stop" : "▶ Go";
    goBtn.classList.toggle("is-running", running);
    trackSvg.classList.toggle("running", running);
    if (running) ensureAudio();
  });
  goBtn.textContent = "⏸ Stop";
  goBtn.classList.add("is-running");
}
trackSvg.classList.add("running");   // keep wheels spinning even without the Go/Stop button

if (speedSlider) speedSlider.addEventListener("input", (e) => {
  speedFactor = Number(e.target.value);
});

/* ---------- Smoke ---------- */

const puffs = [];
let smokeTimer = 0;

function emitPuff() {
  // emit from the funnel (tracks the engine's position + rotation), then rise up the screen
  const tip = localToWorld(lastEnginePos.x, lastEnginePos.y, lastEnginePos.angle, ENGINE_ANCHOR, STACK_TIP);
  const el = document.createElementNS(SVG_NS, "circle");
  el.setAttribute("fill", "#f2f2f2");
  smokeLayer.appendChild(el);
  puffs.push({
    el,
    x: tip.x + (Math.random() - 0.5) * 5,
    y: tip.y,
    r: 5 + Math.random() * 3,
    o: 0.78,
    vx: (Math.random() - 0.5) * 10,
    vy: -24 - Math.random() * 12,
    gr: 14,
  });
}
function burstSmoke(count) {
  for (let i = 0; i < count; i++) setTimeout(emitPuff, i * 70);
}
function updatePuffs(dt) {
  for (let i = puffs.length - 1; i >= 0; i--) {
    const q = puffs[i];
    q.x += q.vx * dt; q.y += q.vy * dt; q.r += q.gr * dt; q.o -= 0.85 * dt;
    if (q.o <= 0) { q.el.remove(); puffs.splice(i, 1); continue; }
    q.el.setAttribute("cx", q.x.toFixed(1));
    q.el.setAttribute("cy", q.y.toFixed(1));
    q.el.setAttribute("r", q.r.toFixed(1));
    q.el.setAttribute("opacity", q.o.toFixed(2));
  }
}

/* ---------- Physics + animation loop ---------- */

let lastTime = null;
let lastEnginePos = { x: 0, y: 0, angle: 0 };
let strain = 0;   // 0 = rolling free, → 1 = bogged down under front-load (drives the smoke rate)

// place a vehicle that's on the track, with bridge lift + over/under layering
function positionOnTrack(v) {
  const p = posAt(v.s), lift = liftAt(v.s), ty = p.y - lift;
  v.el.setAttribute("transform", `translate(${p.x.toFixed(2)},${ty.toFixed(2)}) rotate(${p.angle.toFixed(2)}) translate(${-v.anchor.x},${-v.anchor.y})`);
  const target = circDist(v.s, F8.sOver, F8.totalLen) < OVER_LAYER_MARGIN ? overLayer : underLayer;
  if (v.el.parentNode !== target) target.appendChild(v.el);
  if (v.kind === "engine") lastEnginePos = { x: p.x, y: ty, angle: p.angle };
}
// place a vehicle that's in-hand or parked on the felt (upright, in the top layer)
function positionOffTrack(v) {
  const x = v.held ? pointer.x : v.hx, y = v.held ? pointer.y : v.hy, sc = v.held ? 1.12 : 1;
  v.el.setAttribute("transform", `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${sc}) translate(${-v.anchor.x},${-v.anchor.y})`);
  if (v.el.parentNode !== dragLayer) dragLayer.appendChild(v.el);
}

// the engine drives whatever it's coupled to: cars behind are pulled (free), cars ahead are pushed
// (dead weight). Enough cars ahead and it strains, crawls, and finally can't move at all.
function updateTrain(dt) {
  const onTrack = vehicles.filter((v) => v.onTrack && !v.held).sort((a, b) => a.s - b.s);
  const eng = onTrack.find((v) => v.kind === "engine");
  if (!eng || !running) { strain = 0; return; }
  const n = onTrack.length, ei = onTrack.indexOf(eng);
  const front = [], rear = [];
  let prev = eng;
  for (let k = 1; k < n; k++) {                       // walk forward → cars being pushed
    const cur = onTrack[(ei + k) % n];
    if (mod(cur.s - prev.s, F8.totalLen) > COUPLE_GAP) break;
    front.push(cur); prev = cur;
  }
  prev = eng;
  for (let k = 1; k < n; k++) {                       // walk backward → cars being pulled
    const cur = onTrack[(ei - k + n) % n];
    if (mod(prev.s - cur.s, F8.totalLen) > COUPLE_GAP) break;
    rear.push(cur); prev = cur;
  }
  const speedMult = Math.max(0, 1 - front.length * 0.17);   // ~6 cars in front and it stalls out
  strain = 1 - speedMult;
  eng.s = mod(eng.s + BASE_SPEED * speedFactor * speedMult * dt, F8.totalLen);
  front.forEach((v, i) => { v.s = mod(eng.s + (i + 1) * SPACING, F8.totalLen); });   // rigid couplers
  rear.forEach((v, i) => { v.s = mod(eng.s - (i + 1) * SPACING, F8.totalLen); });
}

function frame(timestamp) {
  if (lastTime == null) lastTime = timestamp;
  let dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  if (dt > 0.05) dt = 0.05;   // clamp after tab-switches so nothing lurches

  updateTrain(dt);
  for (const v of vehicles) {
    if (v.onTrack && !v.held) positionOnTrack(v);
    else positionOffTrack(v);
  }

  // the engine puffs whenever it's on the track — faster/harder when it's straining under load
  if (engine.onTrack && !engine.held && running) {
    smokeTimer -= dt;
    if (smokeTimer <= 0) { emitPuff(); smokeTimer = 0.16 - strain * 0.09; }
  }
  updatePuffs(dt);

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
