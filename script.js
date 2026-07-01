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
  { id: "dimetrodon", name: "Dimetrodon", color: "#f0c1d2", note: 830.6,
    fact: "Dimetrodon had a tall sail on its back that may have helped it warm up in the sun." },
  { id: "raptor", name: "Velociraptor", color: "#9fd7b5", note: 880.0,
    fact: "Velociraptors were about the size of a turkey, but they had sharp curved claws." },
  { id: "parasaur", name: "Parasaurolophus", color: "#f3c26f", note: 932.3,
    fact: "Parasaurolophus had a long hollow crest that may have made deep trumpet sounds." },
  { id: "spino", name: "Spinosaurus", color: "#a9c8ef", note: 987.8,
    fact: "Spinosaurus had a sail on its back and a long snout for catching fish." },
  { id: "plesio", name: "Plesiosaur", color: "#d8c0f0", note: 1046.5,
    fact: "Plesiosaurs were ocean reptiles with paddle-like flippers and very long necks." },
];

/* ---------- Tuning ---------- */

const ANCHOR = { x: 70, y: 65 };        // car art anchor (between the axles)
const ENGINE_ANCHOR = { x: 55, y: 68 };
const SPACING = 145;                    // anchor-to-anchor distance of coupled vehicles
const SPEED = 132;                      // px/sec for a personality-1.0 engine
const SNAP_DIST = 64;                   // drop within this of a rail and it snaps on
const COUPLE_REACH = SPACING * 1.35;    // how far couplers reach when you drop stock near a train
const CONTACT = SPACING + 14;           // anchor gap at which bumpers touch (pushing begins)
const VB_W = 2160, VB_H = 1120;         // the table (0..1800) plus the toy tray on the right
const TABLE_W = 1800;
const TRAY_X = 1808;                    // left rim of the tray region
const RAD = Math.PI / 180;

const LIVERIES = [
  { color: "#d6433a", num: 1 },
  { color: "#3a7ca5", num: 2 },
  { color: "#5d9948", num: 3 },
];
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
    <path class="saber-ear-twitch" d="M55,-13 L51,-28 L64,-15 Z" fill="#cf9450" stroke="#2c2418" stroke-width="2"></path>
    <path class="saber-ear-twitch" d="M85,-13 L89,-28 L76,-15 Z" fill="#cf9450" stroke="#2c2418" stroke-width="2"></path>
    <ellipse cx="70" cy="6" rx="11" ry="8" fill="#ecca9c"></ellipse>
    <circle class="blink blink-saber" cx="63" cy="-3" r="2.4" fill="#2c2418"></circle>
    <circle class="blink blink-saber" cx="77" cy="-3" r="2.4" fill="#2c2418"></circle>
    <path d="M66,4 L74,4 L70,9 Z" fill="#5a3a1f"></path>
    <path d="M65,9 L63,20 L68,11 Z" fill="#fbf4e4" stroke="#c9b48c" stroke-width="0.7"></path>
    <path d="M75,9 L77,20 L72,11 Z" fill="#fbf4e4" stroke="#c9b48c" stroke-width="0.7"></path>
  `,
  // Woolly mammoth: shaggy brown dome, small ears, trunk, two big curved tusks.
  mammoth: () => `
    <path d="M46,20 Q40,-16 70,-18 Q100,-16 94,20 Z" fill="#8a5a34" stroke="#2c2418" stroke-width="2"></path>
    <ellipse cx="53" cy="2" rx="7" ry="10" fill="#754a28" stroke="#2c2418" stroke-width="1.5"></ellipse>
    <ellipse cx="87" cy="2" rx="7" ry="10" fill="#754a28" stroke="#2c2418" stroke-width="1.5"></ellipse>
    <g class="trunk-sway">
      <path d="M70,4 Q63,20 71,27" stroke="#2c2418" stroke-width="12" fill="none" stroke-linecap="round"></path>
      <path d="M70,4 Q63,20 71,27" stroke="#8a5a34" stroke-width="9" fill="none" stroke-linecap="round"></path>
    </g>
    <path d="M62,12 Q49,22 60,30" stroke="#2c2418" stroke-width="7.5" fill="none" stroke-linecap="round"></path>
    <path d="M78,12 Q91,22 80,30" stroke="#2c2418" stroke-width="7.5" fill="none" stroke-linecap="round"></path>
    <path d="M62,12 Q49,22 60,30" stroke="#f3ead2" stroke-width="5" fill="none" stroke-linecap="round"></path>
    <path d="M78,12 Q91,22 80,30" stroke="#f3ead2" stroke-width="5" fill="none" stroke-linecap="round"></path>
    <circle class="blink blink-mammoth" cx="62" cy="-4" r="2.3" fill="#2c2418"></circle>
    <circle class="blink blink-mammoth" cx="78" cy="-4" r="2.3" fill="#2c2418"></circle>
  `,
  // T. rex: big head over a chest that seats to the rim, teeth at the jaw, tiny arm.
  trex: () => `
    <path d="M60,10 q-9,3 -6,11" stroke="#2c2418" stroke-width="7" fill="none" stroke-linecap="round"></path>
    <path d="M60,10 q-9,3 -6,11" stroke="#4f7d4d" stroke-width="4" fill="none" stroke-linecap="round"></path>
    <g class="trex-head-bob">
      <path d="M50,20 Q44,3 58,-3 Q62,-28 86,-26 Q106,-24 103,-3 Q102,6 90,8 Q93,20 83,20 L58,20 Q50,20 50,20 Z" fill="#5b8c5a" stroke="#2c2418" stroke-width="2" stroke-linejoin="round"></path>
      <path d="M67,9 Q81,14 98,5" stroke="#2c2418" stroke-width="1.6" fill="none" stroke-linecap="round"></path>
      <path d="M71,9 L73,14 L75,9 Z" fill="#fff"></path>
      <path d="M81,10 L83,15 L85,10 Z" fill="#fff"></path>
      <path d="M91,7 L93,11 L95,7 Z" fill="#fff"></path>
      <circle cx="84" cy="-14" r="3.6" fill="#fff" stroke="#2c2418" stroke-width="1"></circle>
      <circle class="blink blink-trex" cx="85" cy="-14" r="1.7" fill="#111"></circle>
      <circle cx="100" cy="-3" r="1.4" fill="#2c2418"></circle>
    </g>
  `,
  // Triceratops: frill behind, big head to the rim, brow horns + nose horn, eyes.
  triceratops: () => `
    <g class="triceratops-nod">
      <path d="M38,-8 A32,30 0 0 1 102,-8 L100,-2 Q70,7 40,-2 Z" fill="#caa977" stroke="#2c2418" stroke-width="2"></path>
      <ellipse cx="70" cy="6" rx="20" ry="15" fill="#8c6239" stroke="#2c2418" stroke-width="2"></ellipse>
      <path d="M56,-7 L52,-25 L63,-11 Z" fill="#e8d9c0" stroke="#2c2418" stroke-width="1.5"></path>
      <path d="M84,-7 L88,-25 L77,-11 Z" fill="#e8d9c0" stroke="#2c2418" stroke-width="1.5"></path>
      <path d="M66,14 L70,22 L74,14 Z" fill="#e8d9c0" stroke="#2c2418" stroke-width="1.2"></path>
      <circle class="blink blink-triceratops" cx="63" cy="4" r="2" fill="#2c2418"></circle>
      <circle class="blink blink-triceratops" cx="77" cy="4" r="2" fill="#2c2418"></circle>
    </g>
  `,
  // Stegosaurus: long low body seated on the rim, head at the front, tail, plates on the back.
  stego: () => `
    <ellipse cx="70" cy="12" rx="46" ry="12" fill="#6a9a54" stroke="#2c2418" stroke-width="2"></ellipse>
    <g class="tail-sway stego-tail">
      <path d="M113,9 Q129,5 134,13" stroke="#2c2418" stroke-width="10" fill="none" stroke-linecap="round"></path>
      <path d="M113,9 Q129,5 134,13" stroke="#6a9a54" stroke-width="7" fill="none" stroke-linecap="round"></path>
    </g>
    <ellipse cx="30" cy="3" rx="12" ry="10" fill="#6a9a54" stroke="#2c2418" stroke-width="2"></ellipse>
    <circle class="blink blink-stego" cx="25" cy="1" r="1.8" fill="#111"></circle>
    <polygon points="44,3 50,-16 56,3" fill="#e07a3f" stroke="#2c2418" stroke-width="1.5"></polygon>
    <polygon points="58,3 66,-23 74,3" fill="#e07a3f" stroke="#2c2418" stroke-width="1.5"></polygon>
    <polygon points="76,3 84,-20 92,3" fill="#e07a3f" stroke="#2c2418" stroke-width="1.5"></polygon>
    <polygon points="94,3 100,-10 106,3" fill="#e07a3f" stroke="#2c2418" stroke-width="1.5"></polygon>
  `,
  // Long-neck: rounded body on the rim, tail out back, long neck sweeping up to a small head.
  bronto: () => `
    <path d="M112,9 Q128,7 133,15" stroke="#2c2418" stroke-width="11" fill="none" stroke-linecap="round"></path>
    <ellipse cx="74" cy="12" rx="42" ry="12" fill="#6fa8a3" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M112,9 Q128,7 133,15" stroke="#6fa8a3" stroke-width="8" fill="none" stroke-linecap="round"></path>
    <g class="neck-sway bronto-neck">
      <path d="M46,6 Q30,-16 40,-42 Q44,-54 57,-52" stroke="#2c2418" stroke-width="16" fill="none" stroke-linecap="round"></path>
      <path d="M46,6 Q30,-16 40,-42 Q44,-54 57,-52" stroke="#6fa8a3" stroke-width="13" fill="none" stroke-linecap="round"></path>
      <ellipse cx="58" cy="-53" rx="10" ry="8" fill="#6fa8a3" stroke="#2c2418" stroke-width="1.5"></ellipse>
      <circle class="blink blink-bronto" cx="61" cy="-55" r="1.6" fill="#111"></circle>
    </g>
  `,
  // Ankylosaurus: armored body on the rim, head at the front, back plates, clubbed tail (kept in bounds).
  anky: () => `
    <path d="M22,18 Q16,2 36,0 Q70,-5 104,0 Q124,2 118,18 Z" fill="#9c7a4a" stroke="#2c2418" stroke-width="2"></path>
    <g class="tail-sway anky-tail">
      <path d="M114,9 Q124,7 122,15" stroke="#2c2418" stroke-width="10" fill="none" stroke-linecap="round"></path>
      <path d="M114,9 Q124,7 122,15" stroke="#9c7a4a" stroke-width="7" fill="none" stroke-linecap="round"></path>
      <circle cx="121" cy="15" r="7" fill="#7a5f3a" stroke="#2c2418" stroke-width="2"></circle>
    </g>
    <ellipse cx="26" cy="9" rx="12" ry="9" fill="#b08a52" stroke="#2c2418" stroke-width="2"></ellipse>
    <circle class="blink blink-anky" cx="20" cy="8" r="1.6" fill="#111"></circle>
    <polygon points="42,0 48,-9 54,0" fill="#7a5f3a" stroke="#2c2418" stroke-width="1.2"></polygon>
    <polygon points="58,-2 64,-12 70,-2" fill="#7a5f3a" stroke="#2c2418" stroke-width="1.2"></polygon>
    <polygon points="76,-2 82,-12 88,-2" fill="#7a5f3a" stroke="#2c2418" stroke-width="1.2"></polygon>
    <polygon points="94,0 100,-8 106,0" fill="#7a5f3a" stroke="#2c2418" stroke-width="1.2"></polygon>
  `,
  // Pterodactyl: wings spread behind, body seated with little feet on the rim, crest + beak up top.
  ptero: () => `
    <path class="wing wing-left" d="M68,2 Q40,-16 15,-3 Q42,1 60,9 Z" fill="#9a7dba" stroke="#2c2418" stroke-width="2"></path>
    <path class="wing wing-right" d="M72,2 Q100,-16 125,-3 Q98,1 80,9 Z" fill="#9a7dba" stroke="#2c2418" stroke-width="2"></path>
    <path d="M70,-1 L70,-24" stroke="#2c2418" stroke-width="11" fill="none" stroke-linecap="round"></path>
    <ellipse cx="70" cy="8" rx="10" ry="12" fill="#8e6fae" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M70,-1 L70,-24" stroke="#8e6fae" stroke-width="8" fill="none" stroke-linecap="round"></path>
    <ellipse cx="70" cy="-28" rx="8" ry="7" fill="#8e6fae" stroke="#2c2418" stroke-width="1.5"></ellipse>
    <path d="M63,-33 L70,-45 L74,-32 Z" fill="#6a4f8a" stroke="#2c2418" stroke-width="1"></path>
    <path d="M70,-31 L83,-35 L70,-25 Z" fill="#f2a33a" stroke="#2c2418" stroke-width="1"></path>
    <circle class="blink blink-ptero" cx="73" cy="-29" r="1.6" fill="#111"></circle>
    <path d="M64,17 L62,23 M76,17 L78,23" stroke="#2c2418" stroke-width="4" stroke-linecap="round"></path>
    <path d="M64,17 L62,23 M76,17 L78,23" stroke="#c98a3a" stroke-width="2.2" stroke-linecap="round"></path>
  `,
  // Dimetrodon: low sprawling body, big warm sail on the back, croc head at the front (facing left).
  dimetrodon: () => `
    <path d="M112,13 Q129,11 134,19" stroke="#2c2418" stroke-width="9" fill="none" stroke-linecap="round"></path>
    <path d="M112,13 Q129,11 134,19" stroke="#7e9a52" stroke-width="6" fill="none" stroke-linecap="round"></path>
    <ellipse cx="72" cy="14" rx="45" ry="11" fill="#7e9a52" stroke="#2c2418" stroke-width="2"></ellipse>
    <g class="sail-shimmer dimetrodon-sail">
      <path d="M42,9 Q56,-38 78,-41 Q100,-37 108,9 Z" fill="#e08a54" stroke="#2c2418" stroke-width="2" stroke-linejoin="round"></path>
      <path d="M54,3 L60,-24 M68,1 L74,-35 M84,1 L86,-31 M98,4 L98,-13" stroke="#b45f3e" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
    </g>
    <ellipse cx="29" cy="10" rx="15" ry="10" fill="#7e9a52" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M15,8 Q6,11 13,17 L27,16" fill="#7e9a52" stroke="#2c2418" stroke-width="1.8" stroke-linejoin="round"></path>
    <path d="M16,14 l4,-0.5 M22,16 l0,-3" stroke="#fff" stroke-width="1.3" stroke-linecap="round"></path>
    <circle class="blink blink-dimetrodon" cx="31" cy="6" r="2" fill="#111"></circle>
  `,
  // Velociraptor: compact hunter, head low and forward (facing left), stiff tail, little clawed foot.
  raptor: () => `
    <path d="M100,8 Q122,0 134,10" stroke="#2c2418" stroke-width="8" fill="none" stroke-linecap="round"></path>
    <path d="M100,8 Q122,0 134,10" stroke="#8bbf7a" stroke-width="5" fill="none" stroke-linecap="round"></path>
    <path d="M96,18 Q104,-2 86,-12 Q66,-22 46,-16 Q34,-12 34,0 Q36,10 54,14 Q78,16 96,18 Z" fill="#8bbf7a" stroke="#2c2418" stroke-width="2" stroke-linejoin="round"></path>
    <g class="raptor-head-tilt">
      <path d="M46,-15 Q31,-16 24,-8 Q34,-6 46,-8 Z" fill="#8bbf7a" stroke="#2c2418" stroke-width="1.6" stroke-linejoin="round"></path>
      <path d="M25,-9 l7,1" stroke="#2c2418" stroke-width="0.9" fill="none"></path>
      <circle class="blink blink-raptor" cx="42" cy="-11" r="2" fill="#111"></circle>
    </g>
    <path d="M60,18 q-4,6 2,11 q4,-2 3,-6" stroke="#2c2418" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M60,18 q-4,6 2,11 q4,-2 3,-6" stroke="#8bbf7a" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
  `,
  // Parasaurolophus: gentle duckbill (facing left) with a long tube crest sweeping back over its neck.
  parasaur: () => `
    <path d="M110,13 Q127,11 133,19" stroke="#2c2418" stroke-width="9" fill="none" stroke-linecap="round"></path>
    <path d="M110,13 Q127,11 133,19" stroke="#6aa39d" stroke-width="6" fill="none" stroke-linecap="round"></path>
    <ellipse cx="76" cy="14" rx="40" ry="11" fill="#6aa39d" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M56,10 Q46,-8 52,-22 Q58,-32 46,-34" stroke="#2c2418" stroke-width="14" fill="none" stroke-linecap="round"></path>
    <path d="M56,10 Q46,-8 52,-22 Q58,-32 46,-34" stroke="#6aa39d" stroke-width="11" fill="none" stroke-linecap="round"></path>
    <g class="crest-sway">
      <path d="M50,-38 Q72,-46 92,-30" stroke="#2c2418" stroke-width="9" fill="none" stroke-linecap="round"></path>
      <path d="M50,-38 Q72,-46 92,-30" stroke="#8bbcb6" stroke-width="6" fill="none" stroke-linecap="round"></path>
    </g>
    <ellipse cx="40" cy="-33" rx="14" ry="10" fill="#6aa39d" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M28,-35 Q18,-37 20,-30 L34,-30 Z" fill="#e0b06a" stroke="#2c2418" stroke-width="1.6" stroke-linejoin="round"></path>
    <circle class="blink blink-parasaur" cx="38" cy="-36" r="1.9" fill="#111"></circle>
  `,
  // Spinosaurus: teal body, tall angular sail, a long fish-catching snout at the front (facing left).
  spino: () => `
    <path d="M110,13 Q127,11 133,19" stroke="#2c2418" stroke-width="9" fill="none" stroke-linecap="round"></path>
    <path d="M110,13 Q127,11 133,19" stroke="#4e9a8a" stroke-width="6" fill="none" stroke-linecap="round"></path>
    <ellipse cx="74" cy="14" rx="42" ry="11" fill="#4e9a8a" stroke="#2c2418" stroke-width="2"></ellipse>
    <g class="sail-sway spino-sail">
      <path d="M48,9 L62,-34 L82,-34 L98,9 Z" fill="#d66b54" stroke="#2c2418" stroke-width="2" stroke-linejoin="round"></path>
      <path d="M60,4 L66,-26 M74,3 L76,-30 M86,4 L84,-24" stroke="#9f4639" stroke-width="1.6" fill="none" stroke-linecap="round"></path>
    </g>
    <path d="M50,10 Q40,-2 44,-14 Q48,-24 60,-23 L60,-10 Q56,4 50,10 Z" fill="#4e9a8a" stroke="#2c2418" stroke-width="2" stroke-linejoin="round"></path>
    <path d="M44,-16 Q28,-19 16,-13 Q30,-11 45,-9 Z" fill="#4e9a8a" stroke="#2c2418" stroke-width="1.8" stroke-linejoin="round"></path>
    <path d="M18,-13 l24,3" stroke="#2c2418" stroke-width="0.9" fill="none"></path>
    <circle class="blink blink-spino" cx="50" cy="-15" r="2" fill="#111"></circle>
  `,
  // Plesiosaur: round sea reptile with paddle flippers and a long curving neck (head facing left).
  plesio: () => `
    <path d="M108,15 Q124,13 130,20" stroke="#2c2418" stroke-width="8" fill="none" stroke-linecap="round"></path>
    <path d="M108,15 Q124,13 130,20" stroke="#4f8fbd" stroke-width="5" fill="none" stroke-linecap="round"></path>
    <path d="M56,20 Q44,30 33,24 M92,20 Q106,30 117,24" stroke="#2c2418" stroke-width="8" fill="none" stroke-linecap="round"></path>
    <path d="M56,20 Q44,30 33,24 M92,20 Q106,30 117,24" stroke="#5a9ccb" stroke-width="5" fill="none" stroke-linecap="round"></path>
    <ellipse cx="74" cy="14" rx="40" ry="12" fill="#4f8fbd" stroke="#2c2418" stroke-width="2"></ellipse>
    <g class="neck-sway plesio-neck">
      <path d="M52,11 Q36,-6 44,-30 Q49,-46 66,-47" stroke="#2c2418" stroke-width="13" fill="none" stroke-linecap="round"></path>
      <path d="M52,11 Q36,-6 44,-30 Q49,-46 66,-47" stroke="#4f8fbd" stroke-width="10" fill="none" stroke-linecap="round"></path>
      <ellipse cx="70" cy="-49" rx="13" ry="9" fill="#4f8fbd" stroke="#2c2418" stroke-width="2"></ellipse>
      <path d="M58,-50 Q49,-51 51,-45 L64,-45 Z" fill="#4f8fbd" stroke="#2c2418" stroke-width="1.5" stroke-linejoin="round"></path>
      <circle class="blink blink-plesio" cx="66" cy="-51" r="1.8" fill="#111"></circle>
    </g>
  `,
};

function carInnerSVG(animal) {
  return wagonMarkup(animal.color) + ART[animal.id]();
}

function engineInnerSVG(bodyColor = "#d6433a") {
  return `
    <rect x="0" y="10" width="90" height="55" rx="10" fill="${bodyColor}" stroke="#2c2418" stroke-width="3"></rect>
    <rect x="85" y="20" width="45" height="35" rx="14" fill="${bodyColor}" stroke="#2c2418" stroke-width="3"></rect>
    <rect x="96" y="-14" width="14" height="37" rx="4" fill="#3a3a3a" stroke="#2c2418" stroke-width="2"></rect>
    <ellipse cx="103" cy="-14" rx="9" ry="4" fill="#4a4a4a" stroke="#2c2418" stroke-width="2"></ellipse>
    <path d="M127,44 L149,76 L127,76 Z" fill="#3a3a3a" stroke="#2c2418" stroke-width="2"></path>
    <circle cx="126" cy="32" r="6" fill="#ffe27a" stroke="#2c2418" stroke-width="2"></circle>
    <rect x="14" y="18" width="30" height="22" rx="4" fill="#bfe6ff" stroke="#2c2418" stroke-width="2"></rect>
    ${spinWheel(25, 68, 15)}
    ${spinWheel(65, 68, 15)}
    ${spinWheel(115, 64, 9)}
  `;
}

const STACK_TIP = { x: 103, y: -18 };

/* ---------- Audio (all little synth blips; nothing loads) ---------- */

let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}
function tone(freq, dur = 0.35, type = "triangle", delay = 0, vol = 0.25) {
  if (!audioCtx) return;
  const t0 = audioCtx.currentTime + delay;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}
function playToot() {
  tone(587, 0.22, "sawtooth", 0, 0.2);
  tone(440, 0.32, "sawtooth", 0.18, 0.2);
}
function playClack() {          // two toy trains meeting
  tone(150, 0.06, "square", 0, 0.18);
  tone(95, 0.09, "square", 0.03, 0.16);
}
function playClick() {          // a wooden switch lever
  tone(950, 0.035, "square", 0, 0.12);
  tone(520, 0.05, "square", 0.03, 0.1);
}
function playClunk() {          // dropped back in the tray
  tone(170, 0.09, "triangle", 0, 0.22);
  tone(110, 0.12, "triangle", 0.04, 0.18);
}

/* ---------- Small helpers ---------- */

function mod(n, m) { return ((n % m) + m) % m; }
function mk(tag, attrs) { const e = document.createElementNS(SVG_NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* ---------- The track network ----------
   A little graph of wooden track. Nodes are junctions; every edge that meets a
   node arrives along the node's tangent line (one sign or the other), which is
   what makes the joints read as real turnouts. Trains may run either way along
   any edge; at a junction you can only continue onto a branch that leaves on
   the opposite side of the tangent — no hairpins, just like wooden track.

   The layout: a meandering outer loop, two S-curve connectors crossing at a
   lake in the middle (a low causeway under a tall flyover), and a two-track
   station along the bottom. Six junctions, each with a tappable lever. */

/*GEOM-BEGIN*/
const NODES = {
  A:  { x: 555,  y: 212, deg: 5,   lev: -1 },  // top-west: carry on, or dive SE
  DN: { x: 1245, y: 224, deg: 3,   lev: -1 },  // top-east: the climb rejoins the top
  C:  { x: 1385, y: 882, deg: 14,  lev: 1 },   // bottom-east: the dive lands here
  P1: { x: 1120, y: 886, deg: 2,   lev: 1 },   // station, east throat
  P2: { x: 645,  y: 880, deg: -3,  lev: 1 },   // station, west throat
  B:  { x: 300,  y: 705, deg: -83, lev: -1 },  // left side: up and over, or climb away NE
};

const EDGE_DEFS = [
  { id: "top",   a: "A",  b: "DN", via: [[830, 178], [1070, 208]] },
  { id: "right", a: "DN", b: "C",  via: [[1490, 262], [1652, 432], [1662, 660], [1520, 822]] },
  { id: "bse",   a: "C",  b: "P1", via: [[1250, 892]] },
  { id: "stn",   a: "P1", b: "P2", via: [[965, 826], [800, 824]] },   // station, near track
  { id: "sts",   a: "P1", b: "P2", via: [[965, 946], [800, 944]] },   // station, far track
  { id: "bsw",   a: "P2", b: "B",  via: [[475, 862], [340, 805]] },
  { id: "left",  a: "B",  b: "A",  via: [[262, 522], [296, 338], [415, 246]] },
  { id: "dive",  a: "A",  b: "C",  via: [[690, 300], [795, 478], [930, 610], [1080, 730], [1230, 830]] },
  { id: "climb", a: "B",  b: "DN", via: [[340, 620], [470, 540], [640, 498], [810, 458], [975, 398], [1100, 310]] },
];

// open Catmull-Rom through q[1..m-2]; q[0] and q[m-1] are phantom tangent handles
function catmullOpen(q, per) {
  const out = [], m = q.length;
  for (let i = 1; i < m - 2; i++) {
    const p0 = q[i - 1], p1 = q[i], p2 = q[i + 1], p3 = q[i + 2];
    for (let k = 0; k < per; k++) {
      const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        y: 0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      });
    }
  }
  const last = q[m - 2];
  out.push({ x: last[0], y: last[1] });
  return out;
}

const EDGES = [];
function buildGraph() {
  for (const id in NODES) {
    const n = NODES[id];
    n.id = id;
    n.tx = Math.cos(n.deg * RAD); n.ty = Math.sin(n.deg * RAD);
    n.branches = [];
    n.sel = 0;
  }
  EDGE_DEFS.forEach((def, idx) => {
    const na = NODES[def.a], nb = NODES[def.b];
    const ctrl = [[na.x, na.y], ...def.via, [nb.x, nb.y]];
    // phantom handles force the spline to leave/arrive EXACTLY along each node's
    // tangent: Catmull-Rom's end tangent is (next - phantom)/2, so the phantom is
    // the next control point reflected through the node's tangent line
    const dA = Math.hypot(ctrl[1][0] - na.x, ctrl[1][1] - na.y);
    const sgA = ((ctrl[1][0] - na.x) * na.tx + (ctrl[1][1] - na.y) * na.ty) >= 0 ? 1 : -1;
    const dB = Math.hypot(nb.x - ctrl[ctrl.length - 2][0], nb.y - ctrl[ctrl.length - 2][1]);
    const sgB = ((nb.x - ctrl[ctrl.length - 2][0]) * nb.tx + (nb.y - ctrl[ctrl.length - 2][1]) * nb.ty) >= 0 ? 1 : -1;
    const q = [
      [ctrl[1][0] - na.tx * sgA * 2 * dA, ctrl[1][1] - na.ty * sgA * 2 * dA],
      ...ctrl,
      [ctrl[ctrl.length - 2][0] + nb.tx * sgB * 2 * dB, ctrl[ctrl.length - 2][1] + nb.ty * sgB * 2 * dB],
    ];
    const pts = catmullOpen(q, 22);
    const cum = [0];
    for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    const E = { id: def.id, idx, aNode: def.a, bNode: def.b, pts, cum, len: cum[cum.length - 1], zones: [] };
    EDGES.push(E);
    // register the two attachments (ports) on their nodes
    const dirA = { x: (pts[1].x - pts[0].x), y: (pts[1].y - pts[0].y) };
    const dirB = { x: (pts[pts.length - 2].x - pts[pts.length - 1].x), y: (pts[pts.length - 2].y - pts[pts.length - 1].y) };
    na.branches.push({ edgeIdx: idx, end: "a", side: (dirA.x * na.tx + dirA.y * na.ty) >= 0 ? 1 : -1 });
    nb.branches.push({ edgeIdx: idx, end: "b", side: (dirB.x * nb.tx + dirB.y * nb.ty) >= 0 ? 1 : -1 });
  });
  for (const id in NODES) {
    const n = NODES[id];
    const plus = n.branches.filter((b) => b.side > 0), minus = n.branches.filter((b) => b.side < 0);
    n.choices = plus.length === 2 ? plus : minus.length === 2 ? minus : null;
  }
}
buildGraph();

const edgeByName = (name) => EDGES.find((e) => e.id === name);

/* the two connectors cross once: that point gets the lake, a causeway and a flyover */
function segInt(ax, ay, bx, by, cx, cy, ex, ey) {
  const r1x = bx - ax, r1y = by - ay, r2x = ex - cx, r2y = ey - cy, den = r1x * r2y - r1y * r2x;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((cx - ax) * r2y - (cy - ay) * r2x) / den, u = ((cx - ax) * r1y - (cy - ay) * r1x) / den;
  if (t > 0 && t < 1 && u > 0 && u < 1) return { t, u };
  return null;
}
function findCrossing() {
  const d = edgeByName("dive"), c = edgeByName("climb");
  for (let i = 0; i < d.pts.length - 1; i++) {
    for (let j = 0; j < c.pts.length - 1; j++) {
      const r = segInt(d.pts[i].x, d.pts[i].y, d.pts[i + 1].x, d.pts[i + 1].y,
                       c.pts[j].x, c.pts[j].y, c.pts[j + 1].x, c.pts[j + 1].y);
      if (r) {
        return {
          x: d.pts[i].x + (d.pts[i + 1].x - d.pts[i].x) * r.t,
          y: d.pts[i].y + (d.pts[i + 1].y - d.pts[i].y) * r.t,
          sDive: d.cum[i] + (d.cum[i + 1] - d.cum[i]) * r.t,
          sClimb: c.cum[j] + (c.cum[j + 1] - c.cum[j]) * r.u,
        };
      }
    }
  }
  return null;
}
const CROSS = findCrossing();
if (CROSS) {
  edgeByName("dive").zones.push({ s: CROSS.sDive, half: 200, lift: 16, kind: "cause" });
  edgeByName("climb").zones.push({ s: CROSS.sClimb, half: 200, lift: 54, kind: "fly" });
}
const LAKE = CROSS ? { x: CROSS.x, y: CROSS.y + 4, rx: 198, ry: 122 } : { x: 900, y: 500, rx: 190, ry: 120 };
/*GEOM-END*/

/* ---------- Moving along the network ---------- */

function posAt(e, s) {
  const E = EDGES[e], pts = E.pts, cum = E.cum;
  s = Math.max(0, Math.min(E.len, s));
  let lo = 0, hi = pts.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (cum[m] <= s) lo = m; else hi = m - 1; }
  const i = Math.min(lo, pts.length - 2), f = (s - cum[i]) / Math.max(1e-9, cum[i + 1] - cum[i]);
  const ax = pts[i].x, ay = pts[i].y, bx = pts[i + 1].x, by = pts[i + 1].y;
  return { x: ax + (bx - ax) * f, y: ay + (by - ay) * f, angle: Math.atan2(by - ay, bx - ax) / RAD };
}
function liftAt(e, s) {
  let m = 0;
  for (const z of EDGES[e].zones) {
    const d = Math.abs(s - z.s);
    if (d < z.half) m = Math.max(m, z.lift * 0.5 * (1 + Math.cos((Math.PI * d) / z.half)));
  }
  return m;
}
function zoneKindAt(e, s, margin = 78) {
  for (const z of EDGES[e].zones) if (Math.abs(s - z.s) < z.half + margin) return z.kind;
  return null;
}

// choose the branch a vehicle continues onto after arriving at `node` via `arriving`
function exitBranch(node, arriving) {
  const opts = node.branches.filter((b) => b.side !== arriving.side);
  if (!opts.length) return null;
  if (opts.length === 1) return opts[0];
  return opts[Math.min(node.sel, opts.length - 1)];
}

// pos: { e, s, dir }; move it `dist` (>= 0) along the network, following switch levers
function advance(pos, dist) {
  let guard = 10;
  while (dist > 1e-9 && guard-- > 0) {
    const E = EDGES[pos.e];
    const target = pos.s + pos.dir * dist;
    if (target >= 0 && target <= E.len) { pos.s = target; return pos; }
    const endName = pos.dir > 0 ? "b" : "a";
    dist -= pos.dir > 0 ? E.len - pos.s : pos.s;
    const node = NODES[pos.dir > 0 ? E.bNode : E.aNode];
    const arriving = node.branches.find((b) => b.edgeIdx === pos.e && b.end === endName);
    const out = exitBranch(node, arriving);
    if (!out) { pos.dir *= -1; pos.s = pos.dir > 0 ? 0 : E.len; continue; }
    pos.e = out.edgeIdx;
    if (out.end === "a") { pos.s = 0; pos.dir = 1; } else { pos.s = EDGES[out.edgeIdx].len; pos.dir = -1; }
  }
  return pos;
}

/* scan ahead of a position for the first on-track vehicle within maxDist.
   Exact (covers s-ranges edge by edge), follows the levers like advance does. */
let onTrackByEdge = new Map();
function rebuildTrackIndex() {
  onTrackByEdge = new Map();
  for (const v of vehicles) {
    if (v.state !== "track") continue;
    if (!onTrackByEdge.has(v.pos.e)) onTrackByEdge.set(v.pos.e, []);
    onTrackByEdge.get(v.pos.e).push(v);
  }
}
function scanAhead(start, maxDist, ignore) {
  const pos = { e: start.e, s: start.s, dir: start.dir };
  let traveled = 0, guard = 8;
  while (traveled < maxDist && guard-- > 0) {
    const E = EDGES[pos.e];
    const span = Math.min(maxDist - traveled, pos.dir > 0 ? E.len - pos.s : pos.s);
    let best = null;
    for (const v of onTrackByEdge.get(pos.e) || []) {
      if (ignore && ignore.has(v)) continue;
      const d = (v.pos.s - pos.s) * pos.dir;
      if (d > 1e-6 && d <= span + 1e-6 && (!best || d < best.d)) best = { v, d };
    }
    if (best) return { veh: best.v, gap: traveled + best.d, dir: pos.dir };
    traveled += span;
    if (traveled >= maxDist - 1e-6) return null;
    pos.s += pos.dir * span;
    advance(pos, 0.01);           // hop across the node
    traveled += 0.01;
  }
  return null;
}

function nearestOnTrack(x, y) {
  let best = 1e18, be = 0, bs = 0;
  for (const E of EDGES) {
    for (let i = 0; i < E.pts.length; i += 2) {
      const dx = E.pts[i].x - x, dy = E.pts[i].y - y, d = dx * dx + dy * dy;
      if (d < best) { best = d; be = E.idx; bs = E.cum[i]; }
    }
  }
  return { e: be, s: bs, dist: Math.sqrt(best) };
}
function mulberry32(seed) {
  return function rand() {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function footprintClear(x, y, w, h, pad = 0) {
  const pts = [
    [x, y], [x + w, y], [x, y + h], [x + w, y + h],
    [x + w * 0.5, y], [x + w * 0.5, y + h],
    [x, y + h * 0.5], [x + w, y + h * 0.5],
  ];
  return pts.every(([px, py]) => feltClear(px, py, pad));
}
function addFern(parent, x, y, scale, delay) {
  const g = mk("g", { transform: `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${scale.toFixed(2)})` });
  const sway = mk("g", { class: "decor-sway", style: `animation-delay:${delay.toFixed(2)}s` });
  sway.appendChild(mk("path", { d: "M0,0 C-10,-20 -10,-35 -4,-50", fill: "none", stroke: "#446f45", "stroke-width": 4, "stroke-linecap": "round" }));
  sway.appendChild(mk("path", { d: "M0,0 C11,-20 12,-34 6,-48", fill: "none", stroke: "#587c47", "stroke-width": 4, "stroke-linecap": "round" }));
  sway.appendChild(mk("path", { d: "M-3,-18 l-13,-7 M-5,-27 l-12,-4 M-5,-36 l-10,-2 M5,-17 l14,-7 M7,-27 l13,-4 M7,-36 l10,-2", fill: "none", stroke: "#6f8f50", "stroke-width": 3, "stroke-linecap": "round" }));
  g.appendChild(sway);
  parent.appendChild(g);
}
function addGrass(parent, x, y, scale, delay) {
  const g = mk("g", { transform: `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${scale.toFixed(2)})` });
  const sway = mk("g", { class: "decor-sway decor-grass", style: `animation-delay:${delay.toFixed(2)}s` });
  sway.appendChild(mk("path", { d: "M0,0 C-5,-16 -3,-27 2,-38 M0,0 C6,-17 10,-27 17,-34 M0,0 C-12,-12 -16,-20 -15,-29 M0,0 C3,-10 3,-20 -2,-31", fill: "none", stroke: "#6d8446", "stroke-width": 4, "stroke-linecap": "round" }));
  g.appendChild(sway);
  parent.appendChild(g);
}
function addBoulder(parent, x, y, scale) {
  const g = mk("g", { transform: `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${scale.toFixed(2)})` });
  g.appendChild(mk("ellipse", { cx: 0, cy: 0, rx: 24, ry: 14, fill: "rgba(43,54,37,0.12)" }));
  g.appendChild(mk("path", { d: "M-25,2 Q-17,-20 7,-18 Q28,-14 30,5 Q19,18 -9,17 Q-25,14 -25,2 Z", fill: "#7f8262", stroke: "#677052", "stroke-width": 2 }));
  g.appendChild(mk("path", { d: "M-10,-12 Q2,-18 16,-9", fill: "none", stroke: "#a4a77c", "stroke-width": 3, "stroke-linecap": "round", opacity: "0.55" }));
  parent.appendChild(g);
}
function addFlower(parent, x, y, scale) {
  const g = mk("g", { transform: `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${scale.toFixed(2)})` });
  g.appendChild(mk("path", { d: "M0,0 C0,-9 1,-16 3,-24", fill: "none", stroke: "#597043", "stroke-width": 2.5, "stroke-linecap": "round" }));
  for (const a of [0, 72, 144, 216, 288]) {
    const rad = (a * Math.PI) / 180;
    g.appendChild(mk("ellipse", { cx: (3 + Math.cos(rad) * 5).toFixed(1), cy: (-27 + Math.sin(rad) * 5).toFixed(1), rx: 3.8, ry: 2.8, fill: "#d59670", transform: `rotate(${a} 3 -27)` }));
  }
  g.appendChild(mk("circle", { cx: 3, cy: -27, r: 2.4, fill: "#d4b45c" }));
  parent.appendChild(g);
}
function addBone(parent, x, y, scale) {
  const g = mk("g", { transform: `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(-13) scale(${scale.toFixed(2)})` });
  g.appendChild(mk("path", { d: "M-26,0 L24,0", fill: "none", stroke: "#d9cfaa", "stroke-width": 10, "stroke-linecap": "round" }));
  for (const cx of [-30, 30]) {
    g.appendChild(mk("circle", { cx, cy: -5, r: 7, fill: "#d9cfaa" }));
    g.appendChild(mk("circle", { cx, cy: 5, r: 7, fill: "#d9cfaa" }));
  }
  g.appendChild(mk("path", { d: "M-22,4 Q0,14 22,4", fill: "none", stroke: "#8a7d5d", "stroke-width": 2, "stroke-linecap": "round", opacity: "0.35" }));
  parent.appendChild(g);
}
function addAmmonite(parent, x, y, scale) {
  const g = mk("g", { transform: `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(9) scale(${scale.toFixed(2)})` });
  g.appendChild(mk("circle", { cx: 0, cy: 0, r: 18, fill: "#b39a6f", stroke: "#7f6a4d", "stroke-width": 2 }));
  g.appendChild(mk("path", { d: "M8,1 C8,-8 -4,-11 -10,-4 C-18,6 -4,18 8,11 C18,4 16,-13 1,-18", fill: "none", stroke: "#6f5e46", "stroke-width": 3, "stroke-linecap": "round" }));
  g.appendChild(mk("path", { d: "M-3,-15 l4,9 M7,-11 l-7,8 M12,-2 l-10,2 M8,8 l-8,-5", fill: "none", stroke: "#d6c298", "stroke-width": 1.6, "stroke-linecap": "round" }));
  parent.appendChild(g);
}

/* ---------- Scene layers ---------- */

const trackSvg = document.getElementById("trackSvg");
const lakeLayer = document.getElementById("lakeLayer");
const decorLayer = document.getElementById("decorLayer");
const trackBallast = document.getElementById("trackBallast");
const trackPathEl = document.getElementById("trackPath");
const trackTies = document.getElementById("trackTies");
const switchLayer = document.getElementById("switchLayer");
const archLayer = document.getElementById("archLayer");
const underLayer = document.getElementById("underLayer");
const midLayer = document.getElementById("midLayer");
const bridgeLayer = document.getElementById("bridgeLayer");
const overLayer = document.getElementById("overLayer");
const smokeLayer = document.getElementById("smokeLayer");
const trayLayer = document.getElementById("trayLayer");
const dragLayer = document.getElementById("dragLayer");

/* ---------- Flat track (every edge, minus the raised stretches) ---------- */

function flatTrackD() {
  let d = "";
  for (const E of EDGES) {
    let pen = false;
    for (let i = 0; i < E.pts.length; i++) {
      if (E.zones.some((z) => Math.abs(E.cum[i] - z.s) < z.half)) { pen = false; continue; }
      d += (pen ? "L" : "M") + E.pts[i].x.toFixed(1) + "," + E.pts[i].y.toFixed(1) + " ";
      pen = true;
    }
  }
  return d.trim();
}

/* ---------- Water + the two crossings over it ---------- */

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

function deckPath(edge, zone, ns) {
  const top = [];
  for (let k = -ns; k <= ns; k++) {
    const s = zone.s + (k / ns) * (zone.half + 12);
    const p = posAt(edge.idx, s), li = liftAt(edge.idx, s), rad = p.angle * RAD;
    top.push({ x: p.x, y: p.y - li, nx: Math.cos(rad + Math.PI / 2), ny: Math.sin(rad + Math.PI / 2), li });
  }
  return top;
}
const dstr = (a) => a.map((p, i) => (i ? "L" : "M") + p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");

// the low wooden causeway that carries the dive across the water
function buildCauseway() {
  const E = edgeByName("dive"), z = E.zones.find((zz) => zz.kind === "cause");
  if (!z) return;
  const top = deckPath(E, z, 30);
  const sh = top.filter((t) => t.li > z.lift * 0.2).map((t) => ({ x: t.x, y: t.y + t.li + 4 }));
  if (sh.length > 1) archLayer.appendChild(mk("path", { d: dstr(sh), fill: "none", stroke: "rgba(20,40,60,0.18)", "stroke-width": 44, "stroke-linecap": "round" }));
  const step = Math.max(3, Math.round(top.length / 16));
  for (let k = 0; k < top.length; k += step) {
    const t = top[k]; if (t.li < 3) continue;
    for (const off of [-19, 19]) {
      archLayer.appendChild(mk("rect", { x: (t.x + t.nx * off - 4.5).toFixed(1), y: (t.y + t.ny * off).toFixed(1), width: 9, height: (t.li + 10).toFixed(1), rx: 2, fill: "#8a7550" }));
      archLayer.appendChild(mk("rect", { x: (t.x + t.nx * off - 4.5).toFixed(1), y: (t.y + t.ny * off).toFixed(1), width: 3.5, height: (t.li + 10).toFixed(1), rx: 2, fill: "#a89268" }));
    }
  }
  const d = dstr(top);
  archLayer.appendChild(mk("path", { d, fill: "none", stroke: "#e2bc86", "stroke-width": 66, "stroke-linecap": "butt", "stroke-linejoin": "round" }));
  archLayer.appendChild(mk("path", { d, fill: "none", stroke: "#8a6a3f", "stroke-width": 48, "stroke-linecap": "butt", "stroke-linejoin": "round" }));
  archLayer.appendChild(mk("path", { d, fill: "none", stroke: "#6b4f2a", "stroke-width": 48, "stroke-linecap": "butt", "stroke-dasharray": "6 16", opacity: "0.55" }));
  // low curbs along the deck edges, only where it is actually up on posts
  const curb = top.filter((t) => t.li > 3);
  if (curb.length > 1) {
    archLayer.appendChild(mk("path", { d: dstr(curb.map((p) => ({ x: p.x + p.nx * 30, y: p.y + p.ny * 30 }))), fill: "none", stroke: "#8a5f33", "stroke-width": 5, "stroke-linecap": "round" }));
    archLayer.appendChild(mk("path", { d: dstr(curb.map((p) => ({ x: p.x - p.nx * 30, y: p.y - p.ny * 30 }))), fill: "none", stroke: "#8a5f33", "stroke-width": 5, "stroke-linecap": "round" }));
  }
}

// the tall flyover that carries the climb over both the water and the causeway
function buildFlyover() {
  const E = edgeByName("climb"), z = E.zones.find((zz) => zz.kind === "fly");
  if (!z) return;
  const top = deckPath(E, z, 44);
  const sh = top.filter((t) => t.li > z.lift * 0.18).map((t) => ({ x: t.x, y: t.y + t.li + 6 }));
  if (sh.length > 1) archLayer.appendChild(mk("path", { d: dstr(sh), fill: "none", stroke: "rgba(0,0,0,0.16)", "stroke-width": 46, "stroke-linecap": "round" }));
  const step = Math.max(4, Math.round(top.length / 15));
  for (let k = 0; k < top.length; k += step) {
    const t = top[k]; if (t.li < 8) continue;
    archLayer.appendChild(mk("rect", { x: (t.x - 5).toFixed(1), y: t.y.toFixed(1), width: 10, height: (t.li + 12).toFixed(1), rx: 2, fill: "#8a7550" }));
    archLayer.appendChild(mk("rect", { x: (t.x - 5).toFixed(1), y: t.y.toFixed(1), width: 4, height: (t.li + 12).toFixed(1), rx: 2, fill: "#a89268" }));
  }
  const d = dstr(top);
  bridgeLayer.appendChild(mk("path", { d, fill: "none", stroke: "#e2bc86", "stroke-width": 68, "stroke-linecap": "butt", "stroke-linejoin": "round" }));
  bridgeLayer.appendChild(mk("path", { d, fill: "none", stroke: "#8a6a3f", "stroke-width": 50, "stroke-linecap": "butt", "stroke-linejoin": "round" }));
  bridgeLayer.appendChild(mk("path", { d, fill: "none", stroke: "#6b4f2a", "stroke-width": 50, "stroke-linecap": "butt", "stroke-dasharray": "6 16", opacity: "0.55" }));
  const rail = top.filter((t) => t.li > z.lift * 0.12);
  if (rail.length > 1) {
    bridgeLayer.appendChild(mk("path", { d: dstr(rail.map((p) => ({ x: p.x + p.nx * 31, y: p.y + p.ny * 31 }))), fill: "none", stroke: "#5f4426", "stroke-width": 5.5, "stroke-linecap": "round" }));
    bridgeLayer.appendChild(mk("path", { d: dstr(rail.map((p) => ({ x: p.x - p.nx * 31, y: p.y - p.ny * 31 }))), fill: "none", stroke: "#5f4426", "stroke-width": 5.5, "stroke-linecap": "round" }));
  }
}

/* ---------- Station platform ---------- */

const PLATFORM = { x: 805, y: 866, w: 225, h: 40 };
function buildPlatform() {
  const p = PLATFORM;
  switchLayer.appendChild(mk("rect", { x: p.x + 3, y: p.y + 4, width: p.w, height: p.h, rx: 5, fill: "rgba(43,54,37,0.14)" }));
  switchLayer.appendChild(mk("rect", { x: p.x, y: p.y, width: p.w, height: p.h, rx: 5, fill: "#d9b077", stroke: "#8d6745", "stroke-width": 3 }));
  for (let i = 1; i < 10; i++) switchLayer.appendChild(mk("path", { d: `M${p.x + (p.w / 10) * i},${p.y + 3} v${p.h - 6}`, stroke: "#c39b62", "stroke-width": 2 }));
  // two little benches waiting for passengers
  for (const bx of [p.x + 42, p.x + 151]) {
    switchLayer.appendChild(mk("rect", { x: bx, y: p.y + 11, width: 32, height: 8, rx: 2.5, fill: "#8d6745" }));
    switchLayer.appendChild(mk("rect", { x: bx + 2, y: p.y + 19, width: 3.5, height: 7, fill: "#6e4e33" }));
    switchLayer.appendChild(mk("rect", { x: bx + 26.5, y: p.y + 19, width: 3.5, height: 7, fill: "#6e4e33" }));
  }
}

/* ---------- Switch levers ---------- */

const LEVERS = [];
function branchAwayAngle(branch) {
  const E = EDGES[branch.edgeIdx];
  const probe = Math.min(46, E.len * 0.4);
  if (branch.end === "a") return posAt(E.idx, probe).angle;
  return posAt(E.idx, E.len - probe).angle + 180;
}
function branchTintD(branch, dist = 66) {
  const E = EDGES[branch.edgeIdx];
  const pts = [];
  for (let s = 6; s <= dist; s += 10) {
    const p = posAt(E.idx, branch.end === "a" ? s : E.len - s);
    pts.push(p);
  }
  return dstr(pts);
}
function buildLevers() {
  // a smooth wooden pad at every junction hides the tie seams where edges meet
  for (const id in NODES) {
    const n = NODES[id];
    switchLayer.appendChild(mk("circle", { cx: n.x, cy: n.y, r: 24, fill: "#8a6a3f" }));
  }
  for (const id in NODES) {
    const n = NODES[id];
    if (!n.choices) continue;
    const nx = -n.ty * 52 * n.lev, ny = n.tx * 52 * n.lev;
    const g = mk("g", { class: "lever", transform: `translate(${(n.x + nx).toFixed(1)},${(n.y + ny).toFixed(1)})` });
    const tints = n.choices.map((br) =>
      mk("path", { d: branchTintD(br), fill: "none", stroke: "#e9c98f", "stroke-width": 12, "stroke-linecap": "round", opacity: "0" }));
    tints.forEach((t) => switchLayer.appendChild(t));
    g.appendChild(mk("circle", { cx: 0, cy: 0, r: 13, fill: "#8d6745", stroke: "#5f3717", "stroke-width": 2.5 }));
    g.appendChild(mk("circle", { cx: 0, cy: 0, r: 4, fill: "#5f3717" }));
    const arm = mk("g", { class: "lever-arm" });
    arm.appendChild(mk("rect", { x: 0, y: -3, width: 27, height: 6, rx: 3, fill: "#6b4f2a" }));
    arm.appendChild(mk("circle", { cx: 29, cy: 0, r: 8, fill: "#e8b23e", stroke: "#9c752a", "stroke-width": 2.5 }));
    g.appendChild(arm);
    g.appendChild(mk("circle", { cx: 0, cy: 0, r: 34, fill: "transparent", class: "lever-hit" }));
    switchLayer.appendChild(g);
    const lever = { node: n, arm, tints, angles: n.choices.map(branchAwayAngle) };
    LEVERS.push(lever);
    const apply = () => {
      arm.style.transform = `rotate(${lever.angles[n.sel]}deg)`;
      tints.forEach((t, i) => t.setAttribute("opacity", i === n.sel ? "0.85" : "0"));
    };
    apply();
    lever.apply = apply;
    g.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      ensureAudio();
      n.sel ^= 1;
      apply();
      playClick();
    });
  }
}

/* ---------- Clearance testing for decor ---------- */

const allTrackPts = [];
function collectTrackPts() {
  for (const E of EDGES) for (let i = 0; i < E.pts.length; i += 2) allTrackPts.push(E.pts[i]);
}
function trackClearance(x, y) {
  let best = 1e9;
  for (const p of allTrackPts) {
    const dx = p.x - x, dy = p.y - y, d = dx * dx + dy * dy;
    if (d < best) best = d;
  }
  return Math.sqrt(best);
}
function lakeClear(x, y, pad = 0) {
  const dx = (x - LAKE.x) / (LAKE.rx + 28 + pad);
  const dy = (y - LAKE.y) / (LAKE.ry + 28 + pad);
  return dx * dx + dy * dy > 1;
}
function rectClear(x, y, r, rx, ry, rw, rh) {
  return x < rx - r || x > rx + rw + r || y < ry - r || y > ry + rh + r;
}
function feltClear(x, y, radius = 0) {
  if (!(x > 80 + radius && x < TABLE_W - 75 - radius && y > 80 + radius && y < VB_H - 60 - radius)) return false;
  if (trackClearance(x, y) < 58 + radius) return false;
  if (!lakeClear(x, y, 30 + radius)) return false;
  if (!rectClear(x, y, radius + 16, PLATFORM.x, PLATFORM.y, PLATFORM.w, PLATFORM.h)) return false;
  for (const id in NODES) {
    const n = NODES[id];
    if (Math.hypot(n.x - n.ty * 48 * n.lev - x, n.y + n.tx * 48 * n.lev - y) < 52 + radius) return false;
  }
  return true;
}

/* ---------- Decor: sparse prehistoric felt clutter ---------- */

const placedDecor = [];
function buildDecor() {
  const rand = mulberry32(19570612);
  const makers = ["fern", "grass", "grass", "boulder", "fern", "flower", "grass", "boulder", "fern", "grass", "flower", "grass", "ammonite", "fern", "bone"];
  for (let i = 0, attempts = 0; i < makers.length && attempts < 600; attempts++) {
    const x = 120 + rand() * (TABLE_W - 240);
    const y = 130 + rand() * (VB_H - 230);
    const r = makers[i] === "boulder" ? 34 : 24;
    if (!feltClear(x, y, r)) continue;
    if (placedDecor.some((p) => Math.hypot(p.x - x, p.y - y) < p.r + r + 42)) continue;
    placedDecor.push({ x, y, r });
    const sc = 0.58 + rand() * 0.34;
    const delay = -rand() * 6;
    if (makers[i] === "fern") addFern(decorLayer, x, y, sc, delay);
    else if (makers[i] === "grass") addGrass(decorLayer, x, y, sc, delay);
    else if (makers[i] === "boulder") addBoulder(decorLayer, x, y, sc);
    else if (makers[i] === "flower") addFlower(decorLayer, x, y, sc);
    else if (makers[i] === "bone") addBone(decorLayer, x, y, sc);
    else addAmmonite(decorLayer, x, y, sc);
    i++;
  }
}

/* the retro station sign, standing just south of the station */
function buildSign() {
  const w = 185, h = 88, sc = 0.82;
  const spots = [[1210, 470], [1180, 520], [700, 966], [235, 120]];
  let x = -1, y = -1;
  for (const [sx, sy] of spots) {
    if (footprintClear(sx - 10, sy - 10, w * sc + 20, (h + 60) * sc + 20, 6)) { x = sx; y = sy; break; }
  }
  if (x < 0) return;
  const g = mk("g", { transform: `translate(${x},${y}) scale(${sc})` });
  g.appendChild(mk("ellipse", { cx: w / 2, cy: h + 46, rx: 82, ry: 14, fill: "rgba(43,54,37,0.13)" }));
  g.appendChild(mk("rect", { x: 30, y: h - 3, width: 10, height: 57, rx: 2, fill: "#806846" }));
  g.appendChild(mk("rect", { x: w - 40, y: h - 3, width: 10, height: 57, rx: 2, fill: "#806846" }));
  g.appendChild(mk("rect", { x: 0, y: 0, width: w, height: h, rx: 14, fill: "#f5e7bf", stroke: "#8d6745", "stroke-width": 5 }));
  g.appendChild(mk("rect", { x: 11, y: 12, width: w - 22, height: h - 24, rx: 9, fill: "none", stroke: "#3f9392", "stroke-width": 4 }));
  g.appendChild(mk("path", { d: `M${w - 43},20 l7,13 l15,2 l-11,10 l3,15 l-14,-7 l-13,8 l2,-15 l-11,-10 l15,-3 Z`, fill: "#d5a84c", stroke: "#a57936", "stroke-width": 2 }));
  const t1 = mk("text", { x: w / 2 - 8, y: 47, "text-anchor": "middle", fill: "#315f61", "font-size": 26, "font-weight": 800, "font-family": "Avenir Next, Segoe UI, sans-serif" });
  t1.textContent = "DINO";
  const t2 = mk("text", { x: w / 2 - 8, y: 70, "text-anchor": "middle", fill: "#c75f4b", "font-size": 22, "font-weight": 800, "font-family": "Avenir Next, Segoe UI, sans-serif" });
  t2.textContent = "JUNCTION";
  g.appendChild(t1);
  g.appendChild(t2);
  decorLayer.appendChild(g);
  placedDecor.push({ x: x + (w * sc) / 2, y: y + (h * sc) / 2, r: 95 });
}

/* the Meganeura, perched on a boulder — a table is no place for flying */
function buildPerchedBug() {
  const rand = mulberry32(80217);
  let x = -1, y = -1;
  for (let k = 0; k < 300; k++) {
    const cx = 120 + rand() * (TABLE_W - 240), cy = 130 + rand() * (VB_H - 230);
    if (!feltClear(cx, cy, 42)) continue;
    if (placedDecor.some((p) => Math.hypot(p.x - cx, p.y - cy) < p.r + 60)) continue;
    x = cx; y = cy; break;
  }
  if (x < 0) return;
  placedDecor.push({ x, y, r: 42 });
  addBoulder(decorLayer, x, y, 0.72);
  const g = mk("g", { id: "meganeura", transform: `translate(${(x + 2).toFixed(1)},${(y - 14).toFixed(1)}) rotate(-24)` });
  g.innerHTML = `
    <g class="mega-wings">
      <ellipse cx="-4" cy="-9" rx="5" ry="14" fill="rgba(190,228,236,0.55)" stroke="#5f817d" stroke-width="0.7" transform="rotate(-14 -4 -9)"></ellipse>
      <ellipse cx="4" cy="-9" rx="5" ry="14" fill="rgba(190,228,236,0.55)" stroke="#5f817d" stroke-width="0.7" transform="rotate(14 4 -9)"></ellipse>
      <ellipse cx="-4" cy="9" rx="5" ry="14" fill="rgba(190,228,236,0.5)" stroke="#5f817d" stroke-width="0.7" transform="rotate(14 -4 9)"></ellipse>
      <ellipse cx="4" cy="9" rx="5" ry="14" fill="rgba(190,228,236,0.5)" stroke="#5f817d" stroke-width="0.7" transform="rotate(-14 4 9)"></ellipse>
    </g>
    <rect x="-14" y="-2" width="27" height="4" rx="2" fill="#3a6350"></rect>
    <circle cx="13" cy="0" r="3.3" fill="#3a6350"></circle>
    <circle cx="14.3" cy="-1.2" r="0.8" fill="#111"></circle>
    <circle cx="14.3" cy="1.2" r="0.8" fill="#111"></circle>
  `;
  decorLayer.appendChild(g);
}

/* ---------- The toy tray bolted onto the right edge ---------- */

const ENGINE_SLOTS = [];
const CAR_SLOTS = [];
function buildTray() {
  const x0 = TRAY_X, x1 = VB_W - 14, y0 = 26, y1 = VB_H - 26;
  trayLayer.appendChild(mk("rect", { x: x0, y: y0, width: x1 - x0, height: y1 - y0, rx: 22, fill: "#8a5a2e", stroke: "#5f3717", "stroke-width": 6 }));
  trayLayer.appendChild(mk("rect", { x: x0 + 12, y: y0 + 12, width: x1 - x0 - 24, height: y1 - y0 - 24, rx: 14, fill: "#a97b47" }));
  // wood grain
  const rand = mulberry32(4212);
  for (let i = 0; i < 9; i++) {
    const gy = y0 + 30 + rand() * (y1 - y0 - 60);
    trayLayer.appendChild(mk("path", { d: `M${x0 + 22},${gy.toFixed(1)} q${(x1 - x0) / 3},${(rand() * 14 - 7).toFixed(1)} ${x1 - x0 - 44},0`, stroke: "rgba(95,55,23,0.18)", "stroke-width": 2.5, fill: "none" }));
  }
  // engine shelf
  trayLayer.appendChild(mk("rect", { x: x0 + 20, y: y0 + 22, width: x1 - x0 - 40, height: 130, rx: 10, fill: "#966639", stroke: "#5f3717", "stroke-width": 3, opacity: "0.9" }));
  // car bin
  trayLayer.appendChild(mk("rect", { x: x0 + 20, y: y0 + 168, width: x1 - x0 - 40, height: y1 - y0 - 210, rx: 10, fill: "#966639", stroke: "#5f3717", "stroke-width": 3, opacity: "0.9" }));
  const cxA = x0 + 96, cxB = x0 + 258;
  const rnd = mulberry32(99173);
  for (let i = 0; i < 3; i++) ENGINE_SLOTS.push({ x: x0 + 66 + i * 106, y: y0 + 92, rot: rnd() * 8 - 4, sc: 0.6, v: null });
  for (let r = 0; r < 7; r++) {
    CAR_SLOTS.push({ x: cxA + rnd() * 14 - 7, y: y0 + 230 + r * 118 + rnd() * 10 - 5, rot: rnd() * 18 - 9, sc: 0.64, v: null });
    CAR_SLOTS.push({ x: cxB + rnd() * 14 - 7, y: y0 + 230 + r * 118 + rnd() * 10 - 5, rot: rnd() * 18 - 9, sc: 0.64, v: null });
  }
}
function takeSlot(v) {
  const slots = v.kind === "engine" ? ENGINE_SLOTS : CAR_SLOTS;
  const slot = slots.find((s) => !s.v) || slots[0];
  slot.v = v;
  v.slot = slot;
  v.state = "tray";
}
function freeSlot(v) {
  if (v.slot) { v.slot.v = null; v.slot = null; }
}

/* ---------- Vehicles ----------
   Every engine and car is a little standing cutout toy. On the track it leans
   with the rails but never tips upside down: when its heading crosses vertical
   it does a quick paper-flip (squash to edge-on, come back mirrored). */

const vehicles = [];
const TRAINS = [];
let held = null;
const pointer = { x: 0, y: 0 };
let ptrHist = [];

function svgPoint(e) {
  const pt = trackSvg.createSVGPoint();
  pt.x = e.clientX; pt.y = e.clientY;
  const p = pt.matrixTransform(trackSvg.getScreenCTM().inverse());
  return { x: p.x, y: p.y };
}

function makeVehicle(kind, animal, liveryIdx = 0) {
  const el = document.createElementNS(SVG_NS, "g");
  el.classList.add(kind === "engine" ? "engine-group" : "car");
  if (kind === "engine") {
    const L = LIVERIES[liveryIdx];
    el.innerHTML = engineInnerSVG(L.color) +
      `<circle cx="66" cy="32" r="9" fill="#f7efdc" stroke="#2c2418" stroke-width="1.6"></circle>
       <text x="66" y="36.5" text-anchor="middle" font-size="12.5" font-weight="800" fill="#3a2e26" font-family="Avenir Next, Segoe UI, sans-serif">${L.num}</text>`;
  } else {
    el.innerHTML = carInnerSVG(animal);
  }
  const v = {
    kind, animal, el,
    anchor: kind === "engine" ? ENGINE_ANCHOR : ANCHOR,
    state: "felt", pos: { e: 0, s: 0, dir: 1 }, facing: 1,
    mir: 0, mirA: 0, hx: 200, hy: 200, slot: null, train: null,
    rolling: false, world: null, rp: null,
    pers: kind === "engine" ? [1.0, 0.93, 1.07][liveryIdx] : 1,
  };
  el.addEventListener("pointerdown", (e) => grab(e, v));
  underLayer.appendChild(el);
  vehicles.push(v);
  return v;
}

/* ---------- Rendering one sprite (with the mirror flip) ---------- */

function renderSprite(v, x, y, psi, sc) {
  const k = Math.max(0.06, Math.abs(1 - 2 * v.mirA));
  const ax = v.anchor.x, ay = v.anchor.y;
  const mir = v.mirA >= 0.5;
  const rot = mir ? psi - 180 : psi;
  const kx = mir ? -k : k;
  v.el.setAttribute("transform",
    `translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rot.toFixed(2)}) scale(${(kx * sc).toFixed(3)},${sc}) translate(${-ax},${-ay})`);
  v.rp = { x, y, rot, kx: kx * sc, sy: sc };
  v.world = { x, y };
}
function vehWorldPoint(v, local) {
  if (!v.rp) return { x: 0, y: 0 };
  const lx = (local.x - v.anchor.x) * v.rp.kx, ly = (local.y - v.anchor.y) * v.rp.sy;
  const r = v.rp.rot * RAD, c = Math.cos(r), s = Math.sin(r);
  return { x: v.rp.x + lx * c - ly * s, y: v.rp.y + lx * s + ly * c };
}

function positionVehicle(v, dt) {
  let targetParent, x, y, psi, sc = 1;
  if (v.state === "track") {
    const p = posAt(v.pos.e, v.pos.s);
    const lift = liftAt(v.pos.e, v.pos.s);
    let ang = mod(p.angle + (v.facing < 0 ? 180 : 0) + 180, 360) - 180;
    const c = Math.cos(ang * RAD);
    if (v.mir === 0 && c < -0.18) v.mir = 1;
    else if (v.mir === 1 && c > 0.18) v.mir = 0;
    x = p.x; y = p.y - lift; psi = ang;
    const kind = zoneKindAt(v.pos.e, v.pos.s);
    targetParent = kind === "fly" ? overLayer : kind === "cause" ? midLayer : underLayer;
  } else if (v.state === "held") {
    x = pointer.x; y = pointer.y; sc = 1.1;
    psi = v.mirA >= 0.5 ? 180 : 0;
    targetParent = dragLayer;
  } else if (v.state === "tray") {
    x = v.slot.x; y = v.slot.y; sc = v.slot.sc;
    psi = (v.mirA >= 0.5 ? 180 : 0) + v.slot.rot;
    targetParent = trayLayer;
  } else {
    x = v.hx; y = v.hy;
    psi = v.mirA >= 0.5 ? 180 : 0;
    targetParent = dragLayer;
  }
  // ease the paper-flip
  const goal = v.mir;
  if (v.mirA !== goal) {
    const step = dt * 4.5;
    v.mirA = v.mirA < goal ? Math.min(goal, v.mirA + step) : Math.max(goal, v.mirA - step);
  }
  renderSprite(v, x, y, psi, sc);
  if (v.el.parentNode !== targetParent) targetParent.appendChild(v.el);
  v.el.classList.toggle("rolling", v.state === "track" && v.rolling);
  v.rolling = false;
}

/* ---------- Trains ---------- */

function makeTrain(engine) {
  const t = {
    engine, cars: [],
    wobW: (Math.PI * 2) / (37 + Math.random() * 16), wobPh: Math.random() * 6.28,
    ramp: 0, scoot: 0, lastSpeed: 0, headOnT: 0, contact: null, strain: 0, smokeT: 0,
  };
  engine.train = t;
  TRAINS.push(t);
  return t;
}
function dissolveTrain(t) {
  t.cars.forEach((c) => (c.train = null));
  t.engine.train = null;
  const i = TRAINS.indexOf(t);
  if (i >= 0) TRAINS.splice(i, 1);
}
const trainMembers = (t) => [t.engine, ...t.cars];

function coupleTone() { tone(340, 0.07, "square", 0, 0.1); }

function coupleCarToTail(t, car, dd, gap) {
  car.pos.dir = dd;
  const delta = gap - SPACING;
  if (delta > 0.5) advance(car.pos, delta);
  else if (delta < -0.5) { car.pos.dir = -dd; advance(car.pos, -delta); car.pos.dir = dd; }
  car.facing = dd;
  car.train = t;
  t.cars.push(car);
  coupleTone();
}

// a dropped car reaches for a train tail in either direction
function tryCoupleDroppedCar(v) {
  for (const dd of [1, -1]) {
    const h = scanAhead({ e: v.pos.e, s: v.pos.s, dir: dd }, COUPLE_REACH, new Set([v]));
    if (!h || !h.veh.train) continue;
    const t = h.veh.train;
    if (trainMembers(t)[trainMembers(t).length - 1] !== h.veh) continue;   // only the tail couples
    if (h.veh.pos.dir !== h.dir) continue;                                 // that end must be the back
    coupleCarToTail(t, v, dd, h.gap);
    tryAutoCouples(t);
    return true;
  }
  return false;
}

// loose cars sitting just behind a train's tail hook on, one per pass (chains build up)
function tryAutoCouples(t) {
  let guard = 14, added = true;
  while (added && guard-- > 0) {
    added = false;
    const tail = trainMembers(t)[trainMembers(t).length - 1];
    for (const c of vehicles) {
      if (c.state !== "track" || c.train || c.kind !== "car" || c === held) continue;
      for (const dd of [1, -1]) {
        const h = scanAhead({ e: c.pos.e, s: c.pos.s, dir: dd }, COUPLE_REACH, new Set([c]));
        if (h && h.veh === tail && h.veh.pos.dir === h.dir) {
          coupleCarToTail(t, c, dd, h.gap);
          added = true;
          break;
        }
      }
      if (added) break;
    }
  }
}

function updateTrains(dt, now) {
  rebuildTrackIndex();
  const advanced = new Set();
  for (const t of TRAINS) {
    const members = trainMembers(t);
    const ignore = new Set(members);
    let pushChain = [], other = null, headOn = false;
    let probe = { e: t.engine.pos.e, s: t.engine.pos.s, dir: t.engine.pos.dir };
    let guard = 8;
    while (guard-- > 0) {
      const h = scanAhead(probe, CONTACT + 6, ignore);
      if (!h || h.gap > CONTACT + 4) break;
      if (h.veh.train && h.veh.train !== t) { other = h.veh.train; headOn = h.veh.pos.dir !== h.dir; break; }
      pushChain.push({ v: h.veh, dir: h.dir });
      ignore.add(h.veh);
      probe = { e: h.veh.pos.e, s: h.veh.pos.s, dir: h.dir };
    }
    t.ramp = Math.min(1, t.ramp + dt / 1.1);
    const wob = 1 + 0.06 * Math.sin(now * t.wobW + t.wobPh);
    const loadMult = Math.max(0, 1 - pushChain.length * 0.17);
    t.strain = 1 - loadMult;
    let sp = SPEED * t.engine.pers * wob * t.ramp * loadMult;
    if (other) {
      if (headOn) {
        sp = 0; t.strain = 1;
        if (t.contact !== other) playClack();
        t.headOnT += dt;
        // after a stubborn standoff, the smaller train gives way and backs off
        if (t.headOnT > 3.4) {
          const theirs = 1 + other.cars.length;
          if (members.length < theirs || (members.length === theirs && t.wobPh <= other.wobPh)) {
            for (const m of members) m.pos.dir *= -1;
            t.scoot = 0.45;
          }
          t.headOnT = -1.5; other.headOnT = -1.5;
        }
      } else {
        if (t.contact !== other) { playClack(); other.scoot = 0.5; }
        sp = Math.min(sp, Math.max(0, other.lastSpeed));
        t.strain = Math.max(t.strain, 0.55);
      }
      t.contact = other;
    } else {
      t.contact = null;
      if (t.headOnT > 0) t.headOnT = 0;
    }
    if (t.headOnT < 0) t.headOnT = Math.min(0, t.headOnT + dt);
    sp *= 1 + t.scoot;
    t.scoot *= Math.exp(-dt / 0.9);
    if (t.scoot < 0.01) t.scoot = 0;
    t.lastSpeed = sp;
    const ds = sp * dt;
    if (ds > 0.0001) {
      for (const m of members) if (!advanced.has(m)) { advance(m.pos, ds); advanced.add(m); m.rolling = true; }
      for (const pc of pushChain) if (!advanced.has(pc.v)) { pc.v.pos.dir = pc.dir; advance(pc.v.pos, ds); advanced.add(pc.v); pc.v.rolling = true; }
    }
    // a lever flipped under a moving train splits it: the strays fall loose
    for (let i = 0; i < t.cars.length; i++) {
      const prevV = i === 0 ? t.engine : t.cars[i - 1];
      if (prevV.world && t.cars[i].world &&
          Math.hypot(prevV.world.x - t.cars[i].world.x, prevV.world.y - t.cars[i].world.y) > SPACING * 1.85) {
        t.cars.splice(i).forEach((c) => (c.train = null));
        break;
      }
    }
  }
}

/* ---------- Picking things up and putting them down ---------- */

function grab(e, v) {
  if (e.button != null && e.button !== 0) return;
  if (held) return;
  e.preventDefault();
  e.stopPropagation();
  ensureAudio();
  if (v.train) {
    if (v.kind === "engine") dissolveTrain(v.train);
    else {
      const t = v.train;
      const i = t.cars.indexOf(v);
      t.cars.splice(i).forEach((c) => (c.train = null));
      v.train = null;
    }
  }
  freeSlot(v);
  held = v;
  v.state = "held";
  const p = svgPoint(e);
  pointer.x = p.x; pointer.y = p.y;
  ptrHist = [{ t: performance.now(), x: p.x, y: p.y }];
  v.el.classList.add("held");
  dragLayer.appendChild(v.el);
  if (v.kind === "engine") playToot();
  else if (v.animal) tone(v.animal.note);
}

window.addEventListener("pointermove", (e) => {
  if (!held) return;
  const p = svgPoint(e);
  pointer.x = p.x; pointer.y = p.y;
  ptrHist.push({ t: performance.now(), x: p.x, y: p.y });
  if (ptrHist.length > 10) ptrHist.shift();
});

function dropDir(near) {
  const tang = posAt(near.e, near.s).angle * RAD;
  const tx = Math.cos(tang), ty = Math.sin(tang);
  const nowT = performance.now();
  const old = ptrHist.find((h) => nowT - h.t < 260) || ptrHist[0];
  const last = ptrHist[ptrHist.length - 1];
  const dtm = Math.max(1, nowT - old.t);
  const vx = ((last.x - old.x) / dtm) * 1000, vy = ((last.y - old.y) / dtm) * 1000;
  if (Math.hypot(vx, vy) < 60) return tx >= 0 ? 1 : -1;
  return vx * tx + vy * ty >= 0 ? 1 : -1;
}

window.addEventListener("pointerup", () => {
  if (!held) return;
  const v = held;
  held = null;
  v.el.classList.remove("held");
  if (pointer.x > TRAY_X - 30) {
    takeSlot(v);
    v.mir = 0; v.mirA = 0;
    playClunk();
    return;
  }
  const near = nearestOnTrack(pointer.x, pointer.y);
  if (near.dist < SNAP_DIST) {
    // a hand never drops one toy inside another: slide along the rail to a clear spot
    const isTaken = (e, s) => vehicles.some((v2) => v2 !== v && v2.state === "track" && v2.pos.e === e && Math.abs(v2.pos.s - s) < 110);
    let s = near.s;
    for (const off of [0, 65, -65, 130, -130, 195, -195]) {
      const cand = Math.max(8, Math.min(EDGES[near.e].len - 8, near.s + off));
      if (!isTaken(near.e, cand)) { s = cand; break; }
    }
    near.s = s;
    v.state = "track";
    const dir = dropDir(near);
    v.pos = { e: near.e, s: near.s, dir };
    v.facing = dir;
    const ang = mod(posAt(near.e, near.s).angle + (dir < 0 ? 180 : 0) + 180, 360) - 180;
    v.mir = Math.cos(ang * RAD) < 0 ? 1 : 0;
    v.mirA = v.mir;
    rebuildTrackIndex();
    if (v.kind === "engine") {
      const t = makeTrain(v);
      playToot();
      setTimeout(() => burstSmoke(v, 2), 120);
      tryAutoCouples(t);
    } else {
      tryCoupleDroppedCar(v);
    }
  } else {
    v.state = "felt";
    v.hx = pointer.x; v.hy = pointer.y;
  }
});

/* ---------- Smoke ---------- */

const puffs = [];
function emitPuff(engine) {
  const tip = vehWorldPoint(engine, STACK_TIP);
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
function burstSmoke(engine, count) {
  for (let i = 0; i < count; i++) setTimeout(() => emitPuff(engine), i * 70);
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

/* ---------- Ambient start: someone was just playing here ---------- */

function ambientStart() {
  for (const id in NODES) NODES[id].sel = Math.random() < 0.5 ? 0 : 1;
  LEVERS.forEach((l) => l.apply());
  const nTrains = Math.random() < 0.45 ? 2 : 1;
  const liveries = shuffled([0, 1, 2]);
  const animals = shuffled(ANIMALS);
  const spots = shuffled([
    { e: "top", f: 0.5 }, { e: "right", f: 0.5 }, { e: "left", f: 0.5 }, { e: "dive", f: 0.7 },
  ]);
  let ai = 0;
  for (let k = 0; k < nTrains; k++) {
    const eng = makeVehicle("engine", null, liveries[k]);
    const E = edgeByName(spots[k].e);
    const dir = Math.random() < 0.5 ? 1 : -1;
    eng.state = "track";
    eng.pos = { e: E.idx, s: E.len * spots[k].f, dir };
    eng.facing = dir;
    const t = makeTrain(eng);
    t.ramp = 1;
    const nCars = 2 + Math.floor(Math.random() * 3);
    for (let c = 0; c < nCars; c++) {
      const car = makeVehicle("car", animals[ai++]);
      const back = { e: eng.pos.e, s: eng.pos.s, dir: -dir };
      advance(back, SPACING * (c + 1));
      car.state = "track";
      car.pos = { e: back.e, s: back.s, dir: -back.dir };
      car.facing = car.pos.dir;
      car.train = t;
      t.cars.push(car);
    }
  }
  for (const li of liveries.slice(nTrains)) takeSlot(makeVehicle("engine", null, li));
  if (Math.random() < 0.3 && ai < ANIMALS.length) {
    const g = makeVehicle("car", animals[ai++]);
    for (let tries = 0; tries < 90; tries++) {
      const x = 160 + Math.random() * (TABLE_W - 340), y = 160 + Math.random() * (VB_H - 320);
      if (!feltClear(x, y, 85)) continue;
      if (placedDecor.some((p) => Math.hypot(p.x - x, p.y - y) < p.r + 92)) continue;
      g.state = "felt"; g.hx = x; g.hy = y;
      break;
    }
    if (g.state !== "felt") takeSlot(g);
  }
  while (ai < ANIMALS.length) takeSlot(makeVehicle("car", animals[ai++]));
  for (const v of vehicles) {
    if (v.state !== "track") continue;
    const ang = mod(posAt(v.pos.e, v.pos.s).angle + (v.facing < 0 ? 180 : 0) + 180, 360) - 180;
    v.mir = Math.cos(ang * RAD) < 0 ? 1 : 0;
    v.mirA = v.mir;
  }
}

/* ---------- Build it all + run ---------- */

const trackD = flatTrackD();
trackBallast.setAttribute("d", trackD);
trackPathEl.setAttribute("d", trackD);
trackTies.setAttribute("d", trackD);
trackBallast.style.strokeLinecap = "butt";
trackPathEl.style.strokeLinecap = "butt";
collectTrackPts();
drawWigglyWater(lakeLayer, LAKE.x, LAKE.y, LAKE.rx, LAKE.ry);
buildCauseway();
buildFlyover();
buildPlatform();
buildLevers();
buildSign();
buildDecor();
buildPerchedBug();
buildTray();
ambientStart();

// a small handle for automated smoke tests (harmless in normal play)
window.__dino = { NODES, EDGES, LEVERS, vehicles, TRAINS, advance, posAt, nearestOnTrack, SPACING };

let lastTime = null;
function frame(timestamp) {
  if (lastTime == null) lastTime = timestamp;
  let dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  if (dt > 0.05) dt = 0.05;

  updateTrains(dt, timestamp / 1000);
  for (const v of vehicles) positionVehicle(v, dt);

  for (const t of TRAINS) {
    const eng = t.engine;
    if (eng.state !== "track") continue;
    if (t.lastSpeed > 4 || t.strain > 0.5) {
      t.smokeT -= dt;
      if (t.smokeT <= 0) { emitPuff(eng); t.smokeT = 0.16 - t.strain * 0.09; }
    }
  }
  updatePuffs(dt);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
