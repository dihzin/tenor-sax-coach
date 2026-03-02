import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// FINGERING DATA — keyed by note id
// Keys correspond to SVG element IDs in the diagram below
// ─────────────────────────────────────────────────────────────
const NOTES = [
  // ── GRAVE ──
  { id:"Bb1", name:"Sib", enh:"Lá#",  region:"grave", pressed:["oct","T","1","2","3","lBb","4","5","6","lLow","rBb"] },
  { id:"B1",  name:"Si",  enh:"Dób",  region:"grave", pressed:["T","1","2","3","lBb","4","5","6","lLow"] },
  { id:"C1",  name:"Dó",  enh:"Si#",  region:"grave", pressed:["T","1","2","3","4","5","6","lLow"] },
  { id:"Cs1", name:"Dó#", enh:"Réb",  region:"grave", pressed:["T","1","2","3","4","5","6","rCs"] },
  { id:"D1",  name:"Ré",  enh:"",     region:"grave", pressed:["T","1","2","3","4","5","6"] },
  { id:"Ds1", name:"Ré#", enh:"Mib",  region:"grave", pressed:["T","1","2","3","4","5","6","rEb"] },
  { id:"E1",  name:"Mi",  enh:"Fáb",  region:"grave", pressed:["T","1","2","3","4","5"] },
  { id:"F1",  name:"Fá",  enh:"Mi#",  region:"grave", pressed:["T","1","2","3","4"] },
  { id:"Fs1", name:"Fá#", enh:"Solb", region:"grave", pressed:["T","1","2","3","4","Fs"] },
  { id:"G1",  name:"Sol", enh:"",     region:"grave", pressed:["T","1","2","3"] },
  { id:"Ab1", name:"Sol#",enh:"Láb",  region:"grave", pressed:["T","1","2","3","lAb"] },
  { id:"A1",  name:"Lá",  enh:"",     region:"grave", pressed:["T","1","2"] },
  // ── MÉDIO ──
  { id:"Bb2", name:"Sib", enh:"Lá#",  region:"medio", pressed:["T","1","2","bis"] },
  { id:"B2",  name:"Si",  enh:"",     region:"medio", pressed:["T","1"] },
  { id:"C2",  name:"Dó",  enh:"",     region:"medio", pressed:["T","pC"] },
  { id:"Cs2", name:"Dó#", enh:"Réb",  region:"medio", pressed:["T","pD","1"] },
  { id:"D2",  name:"Ré",  enh:"",     region:"medio", pressed:["oct","T","1","2","3","4","5","6"] },
  { id:"Ds2", name:"Ré#", enh:"Mib",  region:"medio", pressed:["oct","T","1","2","3","4","5","6","rEb"] },
  { id:"E2",  name:"Mi",  enh:"",     region:"medio", pressed:["oct","T","1","2","3","4","5"] },
  { id:"F2",  name:"Fá",  enh:"",     region:"medio", pressed:["oct","T","1","2","3","4"] },
  { id:"Fs2", name:"Fá#", enh:"Solb", region:"medio", pressed:["oct","T","1","2","3","4","Fs"] },
  { id:"G2",  name:"Sol", enh:"",     region:"medio", pressed:["oct","T","1","2","3"] },
  { id:"Ab2", name:"Sol#",enh:"Láb",  region:"medio", pressed:["oct","T","1","2","3","lAb"] },
  { id:"A2",  name:"Lá",  enh:"",     region:"medio", pressed:["oct","T","1","2"] },
  { id:"Bb3", name:"Sib", enh:"Lá#",  region:"medio", pressed:["oct","T","1","2","bis"] },
  { id:"B3",  name:"Si",  enh:"",     region:"medio", pressed:["oct","T","1"] },
  // ── AGUDO ──
  { id:"C3",  name:"Dó",  enh:"",     region:"agudo", pressed:["oct","T","pC"] },
  { id:"Cs3", name:"Dó#", enh:"Réb",  region:"agudo", pressed:["oct","T","pD","1"] },
  { id:"D3",  name:"Ré",  enh:"",     region:"agudo", pressed:["oct","T","pD","1","2","3","4","5","6"] },
  { id:"Ds3", name:"Ré#", enh:"Mib",  region:"agudo", pressed:["oct","T","pD","1","2","3","4","5","6","rEb"] },
  { id:"E3",  name:"Mi",  enh:"",     region:"agudo", pressed:["oct","T","pD","1","2","3","4","5"] },
  { id:"F3",  name:"Fá",  enh:"",     region:"agudo", pressed:["oct","T","pD","1","2","3","4"] },
  { id:"Fs3", name:"Fá#", enh:"Solb", region:"agudo", pressed:["oct","T","pD","1","2","3","Fs"] },
  { id:"G3",  name:"Sol", enh:"",     region:"agudo", pressed:["oct","T","pD","1","2","3"] },
];

const REGION_COLOR = { grave:"#6AACF5", medio:"#E8B84B", agudo:"#E06B6B" };
const REGION_LABEL = { grave:"Grave", medio:"Médio", agudo:"Agudo" };

// ─────────────────────────────────────────────────────────────
// SAX DIAGRAM
// A detailed front-view fingering chart SVG
// Layout mirrors real sax fingering charts (like the reference)
// ─────────────────────────────────────────────────────────────
function SaxDiagram({ pressed }) {
  const p = (id) => pressed.includes(id);

  // Styles for each key type
  const mainKey = (id) => ({
    fill: p(id) ? "#D4891A" : "#1C1508",
    stroke: p(id) ? "#FFCC66" : "#4A3820",
    strokeWidth: p(id) ? 2 : 1.5,
    filter: p(id) ? "drop-shadow(0 0 7px rgba(212,137,26,0.9))" : "none",
    transition: "all 0.25s",
  });

  const auxKey = (id) => ({
    fill: p(id) ? "#D4891A" : "#161005",
    stroke: p(id) ? "#FFCC66" : "#3A2E18",
    strokeWidth: p(id) ? 1.8 : 1.2,
    filter: p(id) ? "drop-shadow(0 0 5px rgba(212,137,26,0.8))" : "none",
    transition: "all 0.25s",
  });

  const label = (id, size = 9) => ({
    fontFamily: "'DM Mono', monospace",
    fontSize: size,
    fill: p(id) ? "#FFF5D6" : "#6A5A3A",
    textAnchor: "middle",
    dominantBaseline: "middle",
    pointerEvents: "none",
    fontWeight: p(id) ? "700" : "400",
    transition: "all 0.25s",
  });

  const bodyFill = "#120F08";
  const bodyStroke = "#2E2210";

  return (
    <svg viewBox="0 0 260 780" style={{ width: "100%", maxWidth: 220, display: "block", margin: "0 auto" }}>
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A1408"/>
          <stop offset="50%" stopColor="#120F06"/>
          <stop offset="100%" stopColor="#0E0C05"/>
        </linearGradient>
        <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1408"/>
          <stop offset="100%" stopColor="#0A0804"/>
        </linearGradient>
      </defs>

      {/* ═══════════════════════════════════════
          BODY — main tube
      ═══════════════════════════════════════ */}
      <path
        d="M 105 55 L 145 55 L 148 560 Q 150 610 128 648 Q 106 690 78 680 Q 50 672 48 640 Q 46 610 64 598 L 88 588 L 90 55 Z"
        fill="url(#bodyGrad)" stroke={bodyStroke} strokeWidth="2"
      />
      {/* body highlight */}
      <path d="M 112 55 L 118 55 L 120 540 L 110 540 Z" fill="rgba(255,200,80,0.03)" />

      {/* Bell */}
      <path
        d="M 64 598 Q 46 610 46 640 Q 46 672 76 683 Q 106 694 130 678 Q 154 662 152 632 Q 150 602 128 590 Q 112 582 88 588 Z"
        fill="url(#bellGrad)" stroke={bodyStroke} strokeWidth="2"
      />
      {/* Bell decorative ring */}
      <ellipse cx="94" cy="636" rx="35" ry="26" fill="none" stroke="#2E2210" strokeWidth="1.5"/>
      <ellipse cx="94" cy="636" rx="28" ry="19" fill="none" stroke="#251B0C" strokeWidth="1"/>

      {/* Neck */}
      <rect x="100" y="22" width="35" height="38" rx="6" fill="#181208" stroke={bodyStroke} strokeWidth="1.5"/>
      <rect x="106" y="8" width="22" height="22" rx="5" fill="#12100A" stroke={bodyStroke} strokeWidth="1.5"/>
      {/* mouthpiece tenon */}
      <rect x="109" y="4" width="16" height="10" rx="3" fill="#0E0C08" stroke={bodyStroke} strokeWidth="1.2"/>

      {/* Key mechanism rods */}
      <rect x="120" y="185" width="3" height="260" fill="#1A1208" rx="1"/>
      <rect x="120" y="410" width="3" height="130" fill="#1A1208" rx="1"/>

      {/* ═══════════════════════════════════════
          LABELS: Left/Right hand
      ═══════════════════════════════════════ */}
      <text x="80" y="152" style={{ fontFamily:"'DM Mono',monospace", fontSize:7, fill:"#3A2E18", textAnchor:"middle", letterSpacing:1 }}>MÃO ESQ.</text>
      <line x1="48" y1="155" x2="112" y2="155" stroke="#2A2010" strokeWidth="0.8" strokeDasharray="2,3"/>

      <text x="80" y="355" style={{ fontFamily:"'DM Mono',monospace", fontSize:7, fill:"#3A2E18", textAnchor:"middle", letterSpacing:1 }}>MÃO DIR.</text>
      <line x1="48" y1="358" x2="112" y2="358" stroke="#2A2010" strokeWidth="0.8" strokeDasharray="2,3"/>

      {/* ═══════════════════════════════════════
          OCTAVE KEY (polegar esq, costas)
          shown on left side of neck
      ═══════════════════════════════════════ */}
      <rect x="148" y="62" width="36" height="15" rx="6" style={auxKey("oct")} />
      <text x="166" y="70" style={label("oct", 7.5)}>OITAVA</text>
      <line x1="148" y1="69" x2="143" y2="69" stroke={p("oct") ? "#FFCC66" : "#3A2E18"} strokeWidth="1.2"/>
      <text x="194" y="70" style={{ fontFamily:"'DM Mono',monospace", fontSize:6.5, fill:"#3A2E18" }}>polegar</text>

      {/* ═══════════════════════════════════════
          PALM KEYS (left hand, left side)
      ═══════════════════════════════════════ */}
      {/* pD — palm D */}
      <rect x="28" y="90" width="30" height="13" rx="5" style={auxKey("pD")} />
      <text x="43" y="97" style={label("pD", 7.5)}>Palm D</text>
      <line x1="58" y1="97" x2="100" y2="110" stroke={p("pD") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* pC — palm C */}
      <rect x="28" y="108" width="30" height="13" rx="5" style={auxKey("pC")} />
      <text x="43" y="115" style={label("pC", 7.5)}>Palm C</text>
      <line x1="58" y1="115" x2="100" y2="120" stroke={p("pC") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* ═══════════════════════════════════════
          LEFT HAND — 3 main tone holes (1, 2, 3)
      ═══════════════════════════════════════ */}
      {/* Key 1 — indicador esquerdo */}
      <circle cx="118" cy="192" r="20" style={mainKey("1")} />
      <text x="118" y="192" style={label("1", 11)}>1</text>

      {/* BIS key — between 1 and 2, right side */}
      <rect x="145" y="185" width="30" height="13" rx="5" style={auxKey("bis")} />
      <text x="160" y="192" style={label("bis", 7.5)}>Bis</text>
      <line x1="145" y1="191" x2="138" y2="191" stroke={p("bis") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* Key 2 — médio esquerdo */}
      <circle cx="118" cy="240" r="20" style={mainKey("2")} />
      <text x="118" y="240" style={label("2", 11)}>2</text>

      {/* Key 3 — anelar esquerdo */}
      <circle cx="118" cy="290" r="20" style={mainKey("3")} />
      <text x="118" y="290" style={label("3", 11)}>3</text>

      {/* Left pinky cluster — left side */}
      {/* lLow — Low Bb / Si low */}
      <rect x="28" y="280" width="34" height="14" rx="5" style={auxKey("lLow")} />
      <text x="45" y="287.5" style={label("lLow", 7.5)}>Low Bb</text>
      <line x1="62" y1="287" x2="95" y2="290" stroke={p("lLow") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* lBb — table Bb (Si♭) */}
      <rect x="28" y="298" width="34" height="14" rx="5" style={auxKey("lBb")} />
      <text x="45" y="305.5" style={label("lBb", 7.5)}>Mesa Sib</text>
      <line x1="62" y1="305" x2="95" y2="300" stroke={p("lBb") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* lAb — G# / Ab */}
      <rect x="28" y="316" width="34" height="14" rx="5" style={auxKey("lAb")} />
      <text x="45" y="323" style={label("lAb", 7.5)}>Sol# / Láb</text>
      <line x1="62" y1="323" x2="95" y2="310" stroke={p("lAb") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* ═══════════════════════════════════════
          Thumb rest area
      ═══════════════════════════════════════ */}
      <rect x="145" y="295" width="22" height="22" rx="4" fill="#0E0C06" stroke="#2A2010" strokeWidth="1"/>
      <text x="156" y="307" style={{ fontFamily:"'DM Mono',monospace", fontSize:6, fill:"#3A2E18", textAnchor:"middle" }}>GANCHO</text>

      {/* ═══════════════════════════════════════
          RIGHT HAND — 3 main tone holes (4, 5, 6)
      ═══════════════════════════════════════ */}
      {/* Key 4 — indicador direito */}
      <circle cx="118" cy="390" r="20" style={mainKey("4")} />
      <text x="118" y="390" style={label("4", 11)}>4</text>

      {/* Side F# key — right side */}
      <rect x="145" y="382" width="34" height="14" rx="5" style={auxKey("Fs")} />
      <text x="162" y="389.5" style={label("Fs", 7.5)}>Fá# lat.</text>
      <line x1="145" y1="389" x2="138" y2="389" stroke={p("Fs") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* Key 5 — médio direito */}
      <circle cx="118" cy="440" r="20" style={mainKey("5")} />
      <text x="118" y="440" style={label("5", 11)}>5</text>

      {/* Key 6 — anelar direito */}
      <circle cx="118" cy="490" r="20" style={mainKey("6")} />
      <text x="118" y="490" style={label("6", 11)}>6</text>

      {/* Right pinky cluster — left side of tube */}
      {/* rBb — low Bb spatula */}
      <rect x="28" y="470" width="34" height="14" rx="5" style={auxKey("rBb")} />
      <text x="45" y="477" style={label("rBb", 7.5)}>Sib bx.</text>
      <line x1="62" y1="477" x2="95" y2="480" stroke={p("rBb") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* rCs — C# / Db */}
      <rect x="28" y="488" width="34" height="14" rx="5" style={auxKey("rCs")} />
      <text x="45" y="495" style={label("rCs", 7.5)}>Dó# / Réb</text>
      <line x1="62" y1="495" x2="95" y2="492" stroke={p("rCs") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* rEb — Eb / D# */}
      <rect x="28" y="506" width="34" height="14" rx="5" style={auxKey("rEb")} />
      <text x="45" y="513" style={label("rEb", 7.5)}>Mi♭ / Ré#</text>
      <line x1="62" y1="513" x2="95" y2="506" stroke={p("rEb") ? "#FFCC66" : "#2A2010"} strokeWidth="0.8"/>

      {/* ═══════════════════════════════════════
          TONE HOLES (decorative pipe circles)
          small holes shown on body between keys
      ═══════════════════════════════════════ */}
      {[216, 264, 314, 414, 464, 514].map((y, i) => (
        <circle key={i} cx="118" cy={y} r="4" fill="#0A0805" stroke="#2A2010" strokeWidth="1"/>
      ))}

      {/* ═══════════════════════════════════════
          Octave pip (small hole on neck)
      ═══════════════════════════════════════ */}
      <circle cx="118" cy="70" r="5" fill={p("oct") ? "#D4891A" : "#161005"} stroke={p("oct") ? "#FFCC66" : "#3A2E18"} strokeWidth="1.5"
        style={{ filter: p("oct") ? "drop-shadow(0 0 4px rgba(212,137,26,0.8))" : "none", transition:"all 0.25s" }}/>

      {/* LEGEND AREA at bottom */}
      <line x1="40" y1="730" x2="210" y2="730" stroke="#2A2010" strokeWidth="0.8"/>
      <circle cx="55" cy="747" r="8" fill="#D4891A" stroke="#FFCC66" strokeWidth="1.5"
        style={{ filter:"drop-shadow(0 0 4px rgba(212,137,26,0.7))" }}/>
      <text x="70" y="747" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:8.5, fill:"#B09060", dominantBaseline:"middle" }}>
        = tecla fechada (dedo pressionado)
      </text>
      <circle cx="55" cy="763" r="8" fill="#1C1508" stroke="#4A3820" strokeWidth="1.5"/>
      <text x="70" y="763" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:8.5, fill:"#5A4A30", dominantBaseline:"middle" }}>
        = tecla aberta
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --gold:#D4891A; --gold-l:#F0B040; --gold-pale:#F5E6C8;
    --dark:#0D0B07; --dark2:#171309; --dark3:#211A0C;
    --copper:#8B5E3C; --cream:#F0E8D0; --muted:#7A6A50;
    --sidebar:196px;
  }
  html, body { height:100%; }
  body { background:var(--dark); font-family:'DM Sans',sans-serif; color:var(--cream); }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:var(--dark2); }
  ::-webkit-scrollbar-thumb { background:#3A2E1A; border-radius:3px; }

  .app {
    display:flex; min-height:100vh;
    background:var(--dark);
    background-image:
      radial-gradient(ellipse at 10% 70%, rgba(212,137,26,.05) 0%,transparent 55%),
      radial-gradient(ellipse at 90% 15%, rgba(139,94,60,.06) 0%,transparent 50%);
  }

  /* ── SIDEBAR ── */
  .sidebar {
    position:fixed; left:0; top:0; bottom:0; width:var(--sidebar);
    background:var(--dark2); border-right:1px solid rgba(212,137,26,.12);
    display:flex; flex-direction:column; z-index:100; padding:26px 0; overflow-y:auto;
  }
  .logo { padding:0 18px 22px; border-bottom:1px solid rgba(212,137,26,.1); margin-bottom:18px; }
  .logo-mark { font-family:'Playfair Display',serif; font-size:24px; font-weight:900; color:var(--gold); line-height:1; letter-spacing:-1px; }
  .logo-sub { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:3px; text-transform:uppercase; color:var(--muted); margin-top:3px; }
  .nav-group { margin-bottom:14px; }
  .nav-lbl { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:2px; text-transform:uppercase; color:var(--copper); padding:0 16px; margin-bottom:4px; }
  .nav-item { display:flex; align-items:center; gap:9px; padding:8px 12px; margin:0 5px 1px; border-radius:7px; cursor:pointer; font-size:12.5px; color:var(--muted); transition:all .18s; }
  .nav-item:hover { background:rgba(212,137,26,.07); color:var(--cream); }
  .nav-item.active { background:rgba(212,137,26,.13); color:var(--gold-l); }
  .nav-icon { font-size:14px; width:16px; text-align:center; }
  .sidebar-foot { margin-top:auto; padding:14px 12px 0; border-top:1px solid rgba(212,137,26,.09); }
  .lvl-badge { background:linear-gradient(135deg,var(--dark3),rgba(212,137,26,.09)); border:1px solid rgba(212,137,26,.16); border-radius:9px; padding:9px 11px; }
  .lvl-lbl { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:2px; color:var(--muted); text-transform:uppercase; }
  .lvl-name { font-size:13px; font-weight:500; color:var(--gold-l); margin:2px 0; }
  .lvl-bar { height:3px; background:rgba(255,255,255,.05); border-radius:2px; margin-top:5px; }
  .lvl-fill { height:100%; width:22%; background:linear-gradient(90deg,var(--copper),var(--gold)); border-radius:2px; }

  /* ── MAIN ── */
  .main { margin-left:var(--sidebar); padding:32px 36px; width:100%; max-width:1120px; }

  .pg-title { font-family:'Playfair Display',serif; font-size:30px; font-weight:900; color:var(--cream); line-height:1.1; letter-spacing:-1px; margin-bottom:4px; }
  .pg-title em { color:var(--gold); font-style:italic; }
  .pg-sub { font-size:13px; color:var(--muted); margin-bottom:24px; }

  /* ── LAYOUT ── */
  .layout { display:grid; grid-template-columns:240px 1fr; gap:20px; align-items:start; }

  /* ── DIAGRAM CARD ── */
  .diagram-card {
    background:var(--dark2); border:1px solid rgba(212,137,26,.14);
    border-radius:14px; padding:16px 12px;
    position:sticky; top:32px;
  }
  .note-header { text-align:center; margin-bottom:10px; }
  .note-big { font-family:'Playfair Display',serif; font-size:44px; font-weight:900; color:var(--gold-l); line-height:1; }
  .note-enh { font-family:'DM Mono',monospace; font-size:11px; color:var(--muted); margin-top:2px; }
  .note-region-pill {
    display:inline-block; font-family:'DM Mono',monospace; font-size:8px;
    letter-spacing:2px; text-transform:uppercase; padding:3px 12px;
    border-radius:20px; margin-top:6px;
  }
  .note-desc {
    font-size:11.5px; color:#C4B490; line-height:1.65; text-align:center;
    margin:10px 0 14px; padding:0 6px; min-height:44px;
  }
  .active-keys-box { background:var(--dark3); border:1px solid rgba(212,137,26,.09); border-radius:9px; padding:9px 10px; margin-top:12px; }
  .active-keys-title { font-family:'DM Mono',monospace; font-size:7px; letter-spacing:2px; text-transform:uppercase; color:var(--copper); margin-bottom:7px; }
  .chip { display:inline-flex; align-items:center; gap:4px; background:rgba(212,137,26,.12); border:1px solid rgba(212,137,26,.25); border-radius:5px; padding:3px 7px; margin:2px; font-family:'DM Mono',monospace; font-size:9.5px; color:var(--gold-l); }
  .chip-dot { width:5px; height:5px; border-radius:50%; background:var(--gold); flex-shrink:0; }

  /* ── RIGHT COLUMN ── */
  .right-col { display:flex; flex-direction:column; gap:18px; }

  /* Region section */
  .region-section {}
  .region-header { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
  .region-dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
  .region-name { font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:var(--cream); }
  .region-sub { font-size:11px; color:var(--muted); }

  /* Note buttons */
  .notes-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(58px,1fr)); gap:7px; }
  .note-btn {
    display:flex; flex-direction:column; align-items:center;
    padding:8px 5px; border-radius:9px;
    background:var(--dark2); border:1.5px solid rgba(212,137,26,.09);
    cursor:pointer; transition:all .17s; user-select:none;
  }
  .note-btn:hover { border-color:rgba(212,137,26,.3); background:var(--dark3); }
  .note-btn.active { border-color:var(--gold); background:rgba(212,137,26,.14); box-shadow:0 0 14px rgba(212,137,26,.2); }
  .note-btn-n { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:var(--cream); line-height:1; }
  .note-btn.active .note-btn-n { color:var(--gold-l); }
  .note-btn-e { font-family:'DM Mono',monospace; font-size:7.5px; color:var(--muted); margin-top:2px; }
  .note-btn-r { font-size:7.5px; font-family:'DM Mono',monospace; padding:2px 5px; border-radius:3px; margin-top:3px; }

  /* Tip / info boxes */
  .tip-card { background:rgba(212,137,26,.04); border:1px solid rgba(212,137,26,.13); border-radius:11px; padding:14px 16px; }
  .tip-title { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:2px; text-transform:uppercase; color:var(--copper); margin-bottom:6px; }
  .tip-text { font-size:12.5px; color:var(--cream); line-height:1.65; }

  .progress-card { background:var(--dark2); border:1px solid rgba(212,137,26,.1); border-radius:11px; padding:15px 16px; }
  .progress-title { font-family:'DM Mono',monospace; font-size:7.5px; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
  .prog-row { margin-bottom:9px; }
  .prog-row:last-child { margin-bottom:0; }
  .prog-head { display:flex; justify-content:space-between; margin-bottom:4px; }
  .prog-lbl { font-size:12px; color:var(--cream); }
  .prog-pct { font-family:'DM Mono',monospace; font-size:10px; }
  .prog-bar { height:4px; background:rgba(255,255,255,.05); border-radius:2px; }
  .prog-fill { height:100%; border-radius:2px; transition:width .4s; }

  /* Key legend panel */
  .legend-toggle { display:flex; align-items:center; gap:8px; background:var(--dark2); border:1px solid rgba(212,137,26,.1); border-radius:9px; padding:10px 14px; cursor:pointer; font-size:12.5px; color:var(--muted); transition:all .18s; margin-bottom:18px; }
  .legend-toggle:hover { border-color:rgba(212,137,26,.25); color:var(--cream); }
  .legend-panel { margin-bottom:18px; background:var(--dark2); border:1px solid rgba(212,137,26,.12); border-radius:13px; padding:18px; }
  .legend-title { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:var(--cream); margin-bottom:12px; }
  .legend-grid { display:grid; grid-template-columns:1fr 1fr; gap:5px; }
  .legend-row { display:flex; align-items:flex-start; gap:8px; padding:7px 9px; background:rgba(255,255,255,.015); border:1px solid rgba(212,137,26,.06); border-radius:7px; }
  .legend-row-dot { width:7px; height:7px; border-radius:50%; background:var(--gold); flex-shrink:0; margin-top:3px; }
  .legend-key { font-family:'DM Mono',monospace; font-size:9px; font-weight:600; color:var(--gold-l); }
  .legend-name { font-size:11px; color:var(--cream); margin-top:1px; }
  .legend-hand { font-size:10px; color:var(--muted); margin-top:1px; }
`;

const KEY_LEGEND = [
  { id:"oct",   name:"Oitava",        hand:"Polegar esq. (costas do tubo)" },
  { id:"T",     name:"Polegar (T)",   hand:"Polegar esquerdo, frente" },
  { id:"1",     name:"Tecla 1",       hand:"Indicador esquerdo" },
  { id:"2",     name:"Tecla 2",       hand:"Médio esquerdo" },
  { id:"3",     name:"Tecla 3",       hand:"Anelar esquerdo" },
  { id:"bis",   name:"Bis",           hand:"Lateral do indicador esq." },
  { id:"pC",    name:"Palm C",        hand:"Lateral esq., acima do 1" },
  { id:"pD",    name:"Palm D",        hand:"Lateral esq., acima do Palm C" },
  { id:"lBb",   name:"Mesa Sib",      hand:"Mindinho esq. (superior)" },
  { id:"lLow",  name:"Low Bb",        hand:"Mindinho esq. (inferior)" },
  { id:"lAb",   name:"Sol# / Láb",    hand:"Mindinho esq. (extra)" },
  { id:"4",     name:"Tecla 4",       hand:"Indicador direito" },
  { id:"5",     name:"Tecla 5",       hand:"Médio direito" },
  { id:"6",     name:"Tecla 6",       hand:"Anelar direito" },
  { id:"Fs",    name:"Fá# lateral",   hand:"Dedo auxiliar direito" },
  { id:"rBb",   name:"Sib baixo",     hand:"Mindinho dir. (superior)" },
  { id:"rCs",   name:"Dó# / Réb",     hand:"Mindinho dir. (médio)" },
  { id:"rEb",   name:"Mi♭ / Ré#",     hand:"Mindinho dir. (inferior)" },
];

const KEY_SHORT_LABEL = {
  oct:"Oitava", T:"Polegar", "1":"Tecla 1", "2":"Tecla 2", "3":"Tecla 3",
  bis:"Bis", pC:"Palm C", pD:"Palm D", lBb:"Mesa Sib", lLow:"Low Bb", lAb:"Sol#",
  "4":"Tecla 4", "5":"Tecla 5", "6":"Tecla 6", Fs:"Fá# lat.", rBb:"Sib bx.",
  rCs:"Dó#", rEb:"Mi♭",
};

const NAV = [
  { icon:"⊞", label:"Dashboard",  id:"home" },
  { icon:"◎", label:"Digitações", id:"fingering" },
  { icon:"♩", label:"Músicas",    id:"songs" },
  { icon:"◇", label:"Teoria",     id:"theory" },
  { icon:"◷", label:"Prática",    id:"practice" },
];

export default function SaxApp() {
  const [activeIdx, setActiveIdx] = useState(4); // Ré grave
  const [showLegend, setShowLegend] = useState(false);
  const [activeNav, setActiveNav] = useState("fingering");

  const cur = NOTES[activeIdx];
  const rc = REGION_COLOR[cur.region];

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-mark">SaxTenor</div>
            <div className="logo-sub">escola de sopro</div>
          </div>
          <div className="nav-group">
            <div className="nav-lbl">Navegação</div>
            {NAV.map(n => (
              <div key={n.id} className={`nav-item${activeNav===n.id?" active":""}`} onClick={()=>setActiveNav(n.id)}>
                <span className="nav-icon">{n.icon}</span>{n.label}
              </div>
            ))}
          </div>
          <div className="sidebar-foot">
            <div className="lvl-badge">
              <div className="lvl-lbl">Nível atual</div>
              <div className="lvl-name">Iniciante</div>
              <div className="lvl-bar"><div className="lvl-fill"/></div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="main">
          <div className="pg-title">Tabela de <em>Digitações</em></div>
          <div className="pg-sub">Clique em uma nota para ver exatamente onde posicionar os dedos</div>

          {/* Legend toggle */}
          <div className="legend-toggle" onClick={()=>setShowLegend(v=>!v)}>
            <span>📋</span>
            {showLegend?"Ocultar":"Ver"} mapa completo das chaves
            <span style={{marginLeft:"auto",color:"var(--gold)"}}>{showLegend?"▲":"▼"}</span>
          </div>

          {showLegend && (
            <div className="legend-panel">
              <div className="legend-title">Mapa de todas as chaves</div>
              <div className="legend-grid">
                {KEY_LEGEND.map(k => (
                  <div key={k.id} className="legend-row">
                    <div className="legend-row-dot"/>
                    <div>
                      <div className="legend-key">{k.id.toUpperCase()}</div>
                      <div className="legend-name">{k.name}</div>
                      <div className="legend-hand">{k.hand}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="layout">

            {/* ── LEFT: sticky diagram ── */}
            <div className="diagram-card">
              <div className="note-header">
                <div className="note-big">{cur.name}</div>
                {cur.enh && <div className="note-enh">= {cur.enh}</div>}
                <div className="note-region-pill" style={{
                  background:`${rc}18`, border:`1px solid ${rc}40`, color:rc,
                }}>
                  {REGION_LABEL[cur.region]}
                </div>
              </div>
              <div className="note-desc">{cur.desc ||
                (cur.region==="grave"
                  ? `Região grave — tecle com firmeza e sopro apoiado.`
                  : cur.region==="medio"
                  ? `Região médio — adicione a chave de oitava.`
                  : `Região aguda — embocadura mais firme.`)
              }</div>

              <SaxDiagram pressed={cur.pressed}/>

              <div className="active-keys-box">
                <div className="active-keys-title">Chaves pressionadas</div>
                {cur.pressed.map(k=>(
                  <span key={k} className="chip">
                    <span className="chip-dot"/>
                    {KEY_SHORT_LABEL[k]||k}
                  </span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: note picker ── */}
            <div className="right-col">
              {["grave","medio","agudo"].map(reg => (
                <div key={reg} className="region-section">
                  <div className="region-header">
                    <div className="region-dot" style={{background:REGION_COLOR[reg]}}/>
                    <span className="region-name">{REGION_LABEL[reg]}</span>
                    <span className="region-sub" style={{marginLeft:6}}>
                      — {reg==="grave"?"Sib–Lá":reg==="medio"?"Sib–Si":"Dó–Sol"}
                    </span>
                  </div>
                  <div className="notes-grid">
                    {NOTES.map((n,i)=>n.region!==reg?null:(
                      <div key={i}
                        className={`note-btn${activeIdx===i?" active":""}`}
                        onClick={()=>setActiveIdx(i)}
                      >
                        <span className="note-btn-n">{n.name}</span>
                        {n.enh && <span className="note-btn-e">{n.enh}</span>}
                        <span className="note-btn-r" style={{
                          background:`${REGION_COLOR[reg]}16`,
                          color:REGION_COLOR[reg],
                        }}>{REGION_LABEL[reg]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="tip-card">
                <div className="tip-title">💡 Dica para iniciantes</div>
                <div className="tip-text">
                  Comece pelas notas <strong style={{color:"var(--gold)"}}>Ré, Mi, Fá, Sol, Lá</strong> do registro grave — são as mais naturais para os dedos e aparecem em praticamente todas as músicas de nível inicial.
                </div>
              </div>

              <div className="progress-card">
                <div className="progress-title">Seu progresso</div>
                {[
                  {label:"Grave (Sib–Lá)",  pct:55, c:"#6AACF5"},
                  {label:"Médio (Sib–Si)",  pct:15, c:"#E8B84B"},
                  {label:"Agudo (Dó–Sol)",  pct:0,  c:"#E06B6B"},
                ].map((r,i)=>(
                  <div key={i} className="prog-row">
                    <div className="prog-head">
                      <span className="prog-lbl">{r.label}</span>
                      <span className="prog-pct" style={{color:r.c}}>{r.pct}%</span>
                    </div>
                    <div className="prog-bar">
                      <div className="prog-fill" style={{width:r.pct+"%",background:`linear-gradient(90deg,${r.c}55,${r.c})`}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
