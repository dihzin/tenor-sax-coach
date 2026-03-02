// src/components/fingering/svg/SaxDiagramMap.tsx — v3 (refinamento fino)
// ViewBox: 0 0 60 130 | pressed=#08172A | main R=8.7 | paleta hierárquica
import React, { memo } from 'react';
import type { FingeringKeyId } from '../../../lib/fingering/types';

interface SaxDiagramMapProps {
    pressed: FingeringKeyId[];
    optional?: FingeringKeyId[];
    width?: number;
    height?: number;
}

// ── Paleta refinada ───────────────────────────────────────────
const C = {
    pressedFill: '#08172A',    // mais escuro — domina o eye
    pressedStroke: '#08172A',
    openFill: '#FBFAF8',
    openStroke: '#A0AEBF',    // mais leve — hierarquia clara
    openSW: 1.0,
    optFill: 'rgba(8,23,42,0.13)',
    optStroke: '#4E6A85',
    optDash: '2.5 1.5',   // mais perceptível
    tube: '#EDE9E0',
    tubeStroke: '#C0B8AC',
    sideSW: 0.85,         // side/palm: stroke mais fino
};

// ── Geometria ─────────────────────────────────────────────────
const LX = 17;      // borda esq tubo
const RX = 36;      // borda dir tubo
const CX = 26.5;    // centro tone holes
const R = 8.7;     // main stack +8%

// Y – distribuição generosa
const Y = {
    oct: 9, palmD: 9, palmC: 20,
    sEb: 9, sC: 21,
    T: 29,
    h1: 42, bis: 54,
    h2: 65,
    h3: 80,
    div: 91,
    h4: 101,
    h5: 113, sFs: 117,
    h6: 124,
};

// ── style helper com override de sw ──────────────────────────
function sty(
    id: FingeringKeyId,
    p: FingeringKeyId[],
    opt: FingeringKeyId[],
    sw?: number,
) {
    if (p.includes(id)) return { fill: C.pressedFill, stroke: C.pressedStroke, sw: sw ?? 1, dash: undefined };
    if (opt.includes(id)) return { fill: C.optFill, stroke: C.optStroke, sw: sw ?? C.openSW, dash: C.optDash };
    return { fill: C.openFill, stroke: C.openStroke, sw: sw ?? C.openSW, dash: undefined };
}

interface BP { id: FingeringKeyId; p: FingeringKeyId[]; opt: FingeringKeyId[] }

const Dot = memo(({ cx, cy, r = R, id, p, opt, sw }: BP & { cx: number; cy: number; r?: number; sw?: number }) => {
    const s = sty(id, p, opt, sw);
    return <circle cx={cx} cy={cy} r={r} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Dot.displayName = 'Dot';

const Ov = memo(({ cx, cy, rx, ry, id, p, opt, sw }: BP & { cx: number; cy: number; rx: number; ry: number; sw?: number }) => {
    const s = sty(id, p, opt, sw);
    return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Ov.displayName = 'Ov';

const Bx = memo(({ x, y, w, h, id, p, opt, sw }: BP & { x: number; y: number; w: number; h: number; sw?: number }) => {
    const s = sty(id, p, opt, sw);
    return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Bx.displayName = 'Bx';

// ── Component ─────────────────────────────────────────────────
const SaxDiagramMap: React.FC<SaxDiagramMapProps> = memo(({
    pressed, optional = [], width = 60, height = 130,
}) => {
    const p = pressed;
    const opt = optional;
    // PLX com -16 → cluster pinky visualmente separado do tubo
    const PLX = LX - 16;

    return (
        <svg viewBox="0 0 60 130" width={width} height={height} aria-hidden="true">

            {/* Tubo */}
            <rect x={LX} y={6} width={RX - LX} height={122}
                fill={C.tube} stroke={C.tubeStroke} strokeWidth="0.7" />

            {/* Oct Key — stroke fino (side hierarchy) */}
            <Ov cx={LX - 9} cy={Y.oct} rx={8} ry={5} id="oct" p={p} opt={opt} sw={C.sideSW} />
            <line x1={LX - 1} y1={Y.oct} x2={LX} y2={Y.oct} stroke={C.tubeStroke} strokeWidth="0.5" />

            {/* Palm Keys — menores, stroke fino */}
            <Ov cx={LX - 10} cy={Y.palmD} rx={7.5} ry={4} id="pD" p={p} opt={opt} sw={C.sideSW} />
            <Ov cx={LX - 10} cy={Y.palmC} rx={7.5} ry={4} id="pC" p={p} opt={opt} sw={C.sideSW} />

            {/* Side Keys — menores, stroke fino */}
            <Ov cx={RX + 7} cy={Y.sEb} rx={5} ry={7.5} id="sEb" p={p} opt={opt} sw={C.sideSW} />
            <Ov cx={RX + 7} cy={Y.sC} rx={5} ry={7.5} id="sC" p={p} opt={opt} sw={C.sideSW} />

            {/* Polegar — maior, stroke médio */}
            <Ov cx={RX + 11} cy={Y.T} rx={11} ry={5.5} id="T" p={p} opt={opt} sw={C.sideSW} />
            <line x1={RX} y1={Y.T} x2={RX + 0.5} y2={Y.T} stroke={C.tubeStroke} strokeWidth="0.5" />

            {/* Tecla 1 — main stack, R=8.7 */}
            <Dot cx={CX} cy={Y.h1} id="1" p={p} opt={opt} />

            {/* Bis Key — pequena, lado dir */}
            <Dot cx={RX + 6} cy={Y.bis} r={4.2} id="bis" p={p} opt={opt} sw={C.sideSW} />
            <line x1={RX} y1={Y.bis} x2={RX + 2} y2={Y.bis} stroke={C.tubeStroke} strokeWidth="0.45" />

            {/* Tecla 2 */}
            <Dot cx={CX} cy={Y.h2} id="2" p={p} opt={opt} />

            {/* Tecla 3 */}
            <Dot cx={CX} cy={Y.h3} id="3" p={p} opt={opt} />

            {/* Pinky Esq — cluster separado (PLX offset extra) */}
            <Bx x={PLX} y={Y.h3 - 10} w={14} h={6.5} id="lLow" p={p} opt={opt} sw={C.sideSW} />
            <Bx x={PLX} y={Y.h3} w={14} h={6.5} id="lBb" p={p} opt={opt} sw={C.sideSW} />
            <Bx x={PLX} y={Y.h3 + 10} w={14} h={6.5} id="lAb" p={p} opt={opt} sw={C.sideSW} />
            <line x1={PLX + 7} y1={Y.h3 - 10} x2={LX} y2={Y.h3 - 5} stroke={C.tubeStroke} strokeWidth="0.45" />
            <line x1={PLX + 7} y1={Y.h3} x2={LX} y2={Y.h3} stroke={C.tubeStroke} strokeWidth="0.45" />
            <line x1={PLX + 7} y1={Y.h3 + 10} x2={LX} y2={Y.h3 + 5} stroke={C.tubeStroke} strokeWidth="0.45" />

            {/* Separador mão dir */}
            <line x1="3" y1={Y.div} x2="57" y2={Y.div}
                stroke={C.tubeStroke} strokeWidth="0.5" strokeDasharray="3 2" />

            {/* Tecla 4 */}
            <Dot cx={CX} cy={Y.h4} id="4" p={p} opt={opt} />

            {/* Tecla 5 */}
            <Dot cx={CX} cy={Y.h5} id="5" p={p} opt={opt} />

            {/* Fá# Lateral */}
            <Ov cx={RX + 7} cy={Y.sFs} rx={5} ry={6.5} id="Fs" p={p} opt={opt} sw={C.sideSW} />
            <line x1={RX} y1={Y.sFs} x2={RX + 2} y2={Y.sFs} stroke={C.tubeStroke} strokeWidth="0.45" />

            {/* Tecla 6 */}
            <Dot cx={CX} cy={Y.h6} id="6" p={p} opt={opt} />

            {/* Pinky Dir — cluster separado */}
            <Bx x={PLX} y={Y.h6 - 10} w={14} h={6.5} id="rBb" p={p} opt={opt} sw={C.sideSW} />
            <Bx x={PLX} y={Y.h6} w={14} h={6.5} id="rCs" p={p} opt={opt} sw={C.sideSW} />
            <Bx x={PLX} y={Y.h6 + 10} w={14} h={6.5} id="rEb" p={p} opt={opt} sw={C.sideSW} />
            <line x1={PLX + 7} y1={Y.h6 - 10} x2={LX} y2={Y.h6 - 5} stroke={C.tubeStroke} strokeWidth="0.45" />
            <line x1={PLX + 7} y1={Y.h6} x2={LX} y2={Y.h6} stroke={C.tubeStroke} strokeWidth="0.45" />
            <line x1={PLX + 7} y1={Y.h6 + 10} x2={LX} y2={Y.h6 + 5} stroke={C.tubeStroke} strokeWidth="0.45" />
        </svg>
    );
});

SaxDiagramMap.displayName = 'SaxDiagramMap';
export default SaxDiagramMap;
