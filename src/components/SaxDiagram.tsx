/**
 * SaxDiagram.tsx — Diagrama anatômico do Saxofone Tenor
 *
 * Design: "Precision Instrument" — referência cursodesaxofone.com.br
 * ViewBox: 200 × 500  (proporcional, compacto, claro)
 *
 * ANATOMIA (de cima para baixo):
 *   Oct key  ──── gota esq do tubo (y=32)
 *   Palm D/C ──── ovals esq (y=48 / 66)
 *   Side Eb/C ─── ovals dir (y=48 / 66)
 *   Polegar(T) ── elipse integrada ao tubo (y=84)
 *   [1] ─────────── círculo (y=108)
 *   Bis ─────────── dot dir, entre 1 e 2 (y=132)
 *   [2] ─────────── círculo (y=158)
 *   [3] + Pinky esq (y=208)
 *   ─── DIV ──────── (y=243)
 *   [4] + Side Fs/Cup (y=270)
 *   [5] ─────────── círculo (y=320)
 *   [6] + Pinky dir (y=370)
 *   Legenda ──────── (y=420)
 */
import React from 'react';

interface Props { pressed: string[]; }

// ────────────────────────────────────────────────────────────
//  DESIGN SYSTEM
// ────────────────────────────────────────────────────────────
const C = {
    bg: '#080705',
    tube: '#11100A',
    tSk: '#282010',
    on: '#C8820E',
    onLt: '#F0AD30',
    onGl: 'rgba(200,130,14,0.5)',
    off: '#0D0B06',
    offSk: '#382E16',
    lblOn: '#F0B030',
    lblOff: '#2C2210',
    div: '#1A1608',
};

// Tubo: duas linhas verticais
const LX = 82;   // borda esq do tubo
const RX = 118;  // borda dir do tubo
const CX = 100;  // centro dos tone-holes

const isOn = (id: string, p: string[]) => p.includes(id);

// ─── FILTER IDs ─────────────────────────────────────────────
const GLOW_ID = 'kg';

// ────────────────────────────────────────────────────────────
//  PRIMITIVOS
// ────────────────────────────────────────────────────────────

/** Tone hole principal — grande círculo numerado */
function Hole({ cy, r = 16, id, p, label }: {
    cy: number; r?: number; id: string; p: string[]; label: string;
}) {
    const a = isOn(id, p);
    return (
        <g>
            {a && <circle cx={CX} cy={cy} r={r + 8} fill={C.onGl}
                style={{ filter: `url(#${GLOW_ID})` }} />}
            <circle cx={CX} cy={cy} r={r}
                fill={a ? C.on : C.off} stroke={a ? C.onLt : C.offSk}
                strokeWidth={a ? 2.2 : 1.5}
                style={{ transition: 'fill .18s, stroke .18s' }} />
            <text x={CX} y={cy} style={{
                fontFamily: "'DM Mono',monospace", fontSize: r * .85, fontWeight: '700',
                fill: a ? '#FFF5DC' : C.lblOff,
                textAnchor: 'middle', dominantBaseline: 'middle', pointerEvents: 'none',
                transition: 'fill .18s',
            }}>{label}</text>
        </g>
    );
}

/** Polegar — elipse integrada na lateral direita do tubo */
function Thumb({ cy, id, p }: { cy: number; id: string; p: string[] }) {
    const a = isOn(id, p);
    const ex = RX + 16, ey = cy;
    return (
        <g>
            {a && <ellipse cx={ex} cy={ey} rx={18} ry={10} fill={C.onGl}
                style={{ filter: `url(#${GLOW_ID})` }} />}
            <ellipse cx={ex} cy={ey} rx={15} ry={9}
                fill={a ? C.on : C.off} stroke={a ? C.onLt : C.offSk}
                strokeWidth={a ? 2 : 1.5}
                style={{ transition: 'all .18s' }} />
            {/* Conector para o tubo */}
            <line x1={RX} y1={ey} x2={ex - 15} y2={ey}
                stroke={a ? C.onLt : C.tSk} strokeWidth={a ? 1 : .7} />
            <text x={ex} y={ey} style={{
                fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: '700',
                fill: a ? '#FFF5DC' : C.lblOff,
                textAnchor: 'middle', dominantBaseline: 'middle', pointerEvents: 'none',
            }}>T</text>
        </g>
    );
}

/** Chave de oitava — forma de gota/gancho à esquerda */
function OctKey({ cy, id, p }: { cy: number; id: string; p: string[] }) {
    const a = isOn(id, p);
    const ex = LX - 14, ey = cy;
    return (
        <g>
            {a && <ellipse cx={ex} cy={ey} rx={13} ry={8} fill={C.onGl}
                style={{ filter: `url(#${GLOW_ID})` }} />}
            <ellipse cx={ex} cy={ey} rx={11} ry={7}
                fill={a ? C.on : C.off} stroke={a ? C.onLt : C.offSk}
                strokeWidth={a ? 2 : 1.5}
                style={{ transition: 'all .18s' }} />
            <line x1={ex + 11} y1={ey} x2={LX} y2={ey}
                stroke={a ? C.onLt : C.tSk} strokeWidth={a ? 1 : .7} />
            <text x={ex} y={ey} style={{
                fontFamily: "'DM Mono',monospace", fontSize: 6.5,
                fill: a ? '#FFF5DC' : C.lblOff,
                textAnchor: 'middle', dominantBaseline: 'middle', pointerEvents: 'none',
            }}>Oct</text>
        </g>
    );
}

/** Palm key — oval horizontal esquerdo */
function PalmKey({ cy, w = 28, h = 12, id, p, label }: {
    cy: number; w?: number; h?: number; id: string; p: string[]; label: string;
}) {
    const a = isOn(id, p);
    const ex = LX - 6 - w / 2, ey = cy;
    return (
        <g>
            {a && <ellipse cx={ex} cy={ey} rx={w / 2 + 4} ry={h / 2 + 4} fill={C.onGl}
                style={{ filter: `url(#${GLOW_ID})` }} />}
            <ellipse cx={ex} cy={ey} rx={w / 2} ry={h / 2}
                fill={a ? C.on : C.off} stroke={a ? C.onLt : C.offSk}
                strokeWidth={a ? 2 : 1.5}
                style={{ transition: 'all .18s' }} />
            <line x1={ex + w / 2} y1={ey} x2={LX} y2={ey}
                stroke={a ? C.onLt : C.tSk} strokeWidth={a ? 1 : .7} />
            <text x={ex} y={ey} style={{
                fontFamily: "'DM Mono',monospace", fontSize: 6,
                fill: a ? '#FFF5DC' : C.lblOff,
                textAnchor: 'middle', dominantBaseline: 'middle', pointerEvents: 'none',
            }}>{label}</text>
        </g>
    );
}

/** Side key — oval vertical direito */
function SideOval({ cy, rw = 9, rh = 16, id, p, label }: {
    cy: number; rw?: number; rh?: number; id: string; p: string[]; label: string;
}) {
    const a = isOn(id, p);
    const ex = RX + rw + 6, ey = cy;
    return (
        <g>
            {a && <ellipse cx={ex} cy={ey} rx={rw + 4} ry={rh + 4} fill={C.onGl}
                style={{ filter: `url(#${GLOW_ID})` }} />}
            <ellipse cx={ex} cy={ey} rx={rw} ry={rh}
                fill={a ? C.on : C.off} stroke={a ? C.onLt : C.offSk}
                strokeWidth={a ? 2 : 1.5}
                style={{ transition: 'all .18s' }} />
            <line x1={RX} y1={ey} x2={ex - rw} y2={ey}
                stroke={a ? C.onLt : C.tSk} strokeWidth={a ? 1 : .7} />
            <text x={ex} y={ey} style={{
                fontFamily: "'DM Mono',monospace", fontSize: 5.5,
                fill: a ? '#FFF5DC' : C.lblOff,
                textAnchor: 'middle', dominantBaseline: 'middle', pointerEvents: 'none',
            }}>{label}</text>
        </g>
    );
}

/** Bis key — círculo pequeno entre 1 e 2, lado dir */
function BisKey({ cy, id, p }: { cy: number; id: string; p: string[] }) {
    const a = isOn(id, p);
    const ex = RX + 10, ey = cy;
    return (
        <g>
            {a && <circle cx={ex} cy={ey} r={9} fill={C.onGl}
                style={{ filter: `url(#${GLOW_ID})` }} />}
            <circle cx={ex} cy={ey} r={7}
                fill={a ? C.on : C.off} stroke={a ? C.onLt : C.offSk}
                strokeWidth={a ? 1.8 : 1.3}
                style={{ transition: 'all .18s' }} />
            <line x1={RX} y1={ey} x2={ex - 7} y2={ey}
                stroke={a ? C.onLt : C.tSk} strokeWidth={a ? 1 : .6} />
        </g>
    );
}

/** Pinky key — retângulo arredondado pequeno */
function PinkyKey({ cx, cy, w = 26, h = 11, id, p, label }: {
    cx: number; cy: number; w?: number; h?: number; id: string; p: string[]; label: string;
}) {
    const a = isOn(id, p);
    return (
        <g>
            {a && <rect x={cx - w / 2 - 3} y={cy - h / 2 - 3} width={w + 6} height={h + 6} rx={5}
                fill={C.onGl} style={{ filter: `url(#${GLOW_ID})` }} />}
            <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={3.5}
                fill={a ? C.on : C.off} stroke={a ? C.onLt : C.offSk}
                strokeWidth={a ? 1.8 : 1.3}
                style={{ transition: 'all .18s' }} />
            <text x={cx} y={cy} style={{
                fontFamily: "'DM Mono',monospace", fontSize: 6,
                fill: a ? '#FFF5DC' : C.lblOff,
                textAnchor: 'middle', dominantBaseline: 'middle',
                fontWeight: a ? '600' : '400', pointerEvents: 'none',
            }}>{label}</text>
        </g>
    );
}

/** Mini wire conector (pinky → tubo) */
function Wire({ x1, y1, x2, y2, id, p }: {
    x1: number; y1: number; x2: number; y2: number; id: string; p: string[];
}) {
    const a = isOn(id, p);
    return <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={a ? C.onLt : C.tSk} strokeWidth={a ? .9 : .6} />;
}

/** Low key cup — retângulo dir decorativo */
function LowCup({ y, h = 46 }: { y: number; h?: number }) {
    const cx = RX + 18, w = 30;
    return (
        <g>
            <rect x={cx - w / 2} y={y} width={w} height={h} rx={6}
                fill={C.tube} stroke={C.tSk} strokeWidth="1.3" />
            <line x1={cx - w / 2 + 3} y1={y + h * .35} x2={cx + w / 2 - 3} y2={y + h * .35}
                stroke={C.tSk} strokeWidth=".9" />
            <line x1={cx - w / 2 + 3} y1={y + h * .65} x2={cx + w / 2 - 3} y2={y + h * .65}
                stroke={C.tSk} strokeWidth=".9" />
        </g>
    );
}

// ────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ────────────────────────────────────────────────────────────
const SaxDiagram: React.FC<Props> = ({ pressed: p }) => {
    // Posições Y (compacto, 50px entre holes)
    const y1 = 108, y2 = 158, y3 = 208;
    const yDiv = 242;
    const y4 = 268, y5 = 318, y6 = 368;

    // Pinky esq (ao lado de tecla 3, 3 peças)
    const pLx = LX - 34;  // centro X dos pinky esq
    // Pinky dir (ao lado de tecla 6, 3 peças)
    // mesmo pLx

    return (
        <svg viewBox="0 0 200 470"
            style={{ width: '100%', maxWidth: 200, display: 'block', margin: '0 auto' }}
            aria-label="Diagrama de digitação do saxofone tenor"
        >
            <defs>
                <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#131108" />
                    <stop offset="100%" stopColor="#070604" />
                </linearGradient>
                <linearGradient id="tubeG" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0F0E09" />
                    <stop offset="100%" stopColor="#13110A" />
                </linearGradient>
                <filter id={GLOW_ID} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {/* Grain */}
                <pattern id="gr" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                    <circle cx=".8" cy=".8" r=".4" fill="rgba(255,200,60,.022)" />
                </pattern>
            </defs>

            {/* ── Card ── */}
            <rect x="2" y="2" width="196" height="466" rx="13"
                fill="url(#bgG)" stroke={C.div} strokeWidth="1.5" />
            <rect x="2" y="2" width="196" height="466" rx="13"
                fill="url(#gr)" />

            {/* ── TUBO (faixa entre as duas linhas) ── */}
            <rect x={LX} y="18" width={RX - LX} height={y6 + 18 + 16}
                fill="url(#tubeG)" />
            <line x1={LX} y1="18" x2={LX} y2={y6 + 34}
                stroke={C.tSk} strokeWidth="2.2" />
            <line x1={RX} y1="18" x2={RX} y2={y6 + 34}
                stroke={C.tSk} strokeWidth="2.2" />
            {/* Tampas arredondadas do tubo */}
            <rect x={LX} y="16" width={RX - LX} height="5" rx="2"
                fill={C.tSk} />
            <rect x={LX} y={y6 + 32} width={RX - LX} height="5" rx="2"
                fill={C.tSk} />

            {/* ══════════════ TOPO ══════════════════════════════════ */}
            {/* Octave key */}
            <OctKey cy={32} id="oct" p={p} />

            {/* Palm D */}
            <PalmKey cy={48} w={26} h={12} id="pD" p={p} label="Palm D" />
            {/* Palm C */}
            <PalmKey cy={66} w={26} h={12} id="pC" p={p} label="Palm C" />

            {/* Side Eb */}
            <SideOval cy={50} rw={8} rh={14} id="sEb" p={p} label="SdEb" />
            {/* Side C */}
            <SideOval cy={72} rw={8} rh={14} id="sC" p={p} label="Sd C" />

            {/* Polegar */}
            <Thumb cy={88} id="T" p={p} />

            {/* micro-label MÃO ESQ */}
            <text x={CX} y={100} style={{
                fontFamily: "'DM Mono',monospace", fontSize: 5, fill: '#181408',
                textAnchor: 'middle', letterSpacing: 2,
            }}>MÃO ESQ.</text>

            {/* ══════════════ TECLA 1 ═══════════════════════════════ */}
            <Hole cy={y1} r={16} id="1" p={p} label="1" />
            {/* Bis — entre 1 e 2 */}
            <BisKey cy={Math.round((y1 + y2) / 2)} id="bis" p={p} />

            {/* ══════════════ TECLA 2 ═══════════════════════════════ */}
            <Hole cy={y2} r={16} id="2" p={p} label="2" />

            {/* ══════════════ TECLA 3 + Pinky esq ══════════════════ */}
            <Hole cy={y3} r={16} id="3" p={p} label="3" />

            {/* Pinky esquerdo — 3 retângulos ao lado da tecla 3 */}
            <PinkyKey cx={pLx} cy={y3 - 16} id="lLow" p={p} label="Low" />
            <Wire x1={pLx + 13} y1={y3 - 16} x2={LX} y2={y3 - 10} id="lLow" p={p} />
            <PinkyKey cx={pLx} cy={y3} id="lBb" p={p} label="Sib" />
            <Wire x1={pLx + 13} y1={y3} x2={LX} y2={y3} id="lBb" p={p} />
            <PinkyKey cx={pLx} cy={y3 + 16} id="lAb" p={p} label="Sol#" />
            <Wire x1={pLx + 13} y1={y3 + 16} x2={LX} y2={y3 + 10} id="lAb" p={p} />

            {/* ══════════════ DIVISÓRIA ═════════════════════════════ */}
            <line x1="10" y1={yDiv} x2="190" y2={yDiv}
                stroke={C.div} strokeWidth="1.2" />
            <rect x={CX - 32} y={yDiv - 8} width={64} height={16} rx={4}
                fill="url(#bgG)" stroke={C.div} strokeWidth="1" />
            <text x={CX} y={yDiv} style={{
                fontFamily: "'DM Mono',monospace", fontSize: 5, fill: '#181408',
                textAnchor: 'middle', dominantBaseline: 'middle', letterSpacing: 2,
            }}>MÃO DIR.</text>

            {/* ══════════════ TECLA 4 + Side Fs + Low Cup ══════════ */}
            <Hole cy={y4} r={16} id="4" p={p} label="4" />
            {/* Fá# lateral */}
            <SideOval cy={y4 + 20} rw={8} rh={13} id="Fs" p={p} label="Fá#" />
            {/* Copo Low keys */}
            <LowCup y={y4 + 38} h={44} />

            {/* ══════════════ TECLA 5 ═══════════════════════════════ */}
            <Hole cy={y5} r={16} id="5" p={p} label="5" />

            {/* ══════════════ TECLA 6 + Pinky dir ══════════════════ */}
            <Hole cy={y6} r={16} id="6" p={p} label="6" />

            {/* Pinky direito — 3 retângulos ao lado da tecla 6 */}
            <PinkyKey cx={pLx} cy={y6 - 16} id="rBb" p={p} label="Sib" />
            <Wire x1={pLx + 13} y1={y6 - 16} x2={LX} y2={y6 - 10} id="rBb" p={p} />
            <PinkyKey cx={pLx} cy={y6} id="rCs" p={p} label="Dó#" />
            <Wire x1={pLx + 13} y1={y6} x2={LX} y2={y6} id="rCs" p={p} />
            <PinkyKey cx={pLx} cy={y6 + 16} id="rEb" p={p} label="Mi♭" />
            <Wire x1={pLx + 13} y1={y6 + 16} x2={LX} y2={y6 + 10} id="rEb" p={p} />

            {/* ══════════════ LEGENDA ═══════════════════════════════ */}
            <line x1="10" y1="408" x2="190" y2="408"
                stroke={C.div} strokeWidth=".8" />

            <circle cx={24} cy={422} r={8}
                fill={C.on} stroke={C.onLt} strokeWidth="2"
                style={{ filter: `drop-shadow(0 0 6px ${C.onGl})` }} />
            <text x={38} y={422} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 9, fill: '#9A8050',
                dominantBaseline: 'middle',
            }}>= pressionar</text>

            <circle cx={24} cy={438} r={8}
                fill={C.off} stroke={C.offSk} strokeWidth="1.5" />
            <text x={38} y={438} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: 9, fill: '#403520',
                dominantBaseline: 'middle',
            }}>= soltar</text>

            {/* Borda sutil */}
            <rect x="2" y="2" width="196" height="466" rx="13"
                fill="none" stroke="rgba(200,130,14,.09)" strokeWidth="1.5" />
        </svg>
    );
};

export default SaxDiagram;
