// src/components/fingering/svg/SaxDiagramMap.tsx
// ─────────────────────────────────────────────────────────────
// Diagrama de saxofone para o MAPA GLOBAL
// Visual técnico: sem glow, sem sombras. Pressed=sólido, Open=outline.
// ViewBox: 0 0 52 80 — compacto para tiles do mapa
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { FingeringKeyId } from '../../../lib/fingering/types';

interface SaxDiagramMapProps {
    pressed: FingeringKeyId[];
    optional?: FingeringKeyId[];
    width?: number;
    height?: number;
}

// ── Paleta técnica ────────────────────────────────────────────
const T = {
    pressed: '#1A3A5C',   // azul naval — tecla pressionada
    prstSk: '#2A5080',   // stroke da tecla pressionada
    open: '#FFFFFF',   // tecla aberta (vazia)
    openSk: '#8A9BB0',   // stroke da aberta
    tube: '#E8E4DC',   // corpo do tubo
    tubeSk: '#B0A898',   // border do tubo
    optional: 'rgba(26,58,92,0.35)', // semitransparente
    optSk: '#1A3A5C',
};

// ── Dimensões do tubo ─────────────────────────────────────────
const LX = 18;   // borda esq do tubo
const RX = 34;   // borda dir do tubo
const CX = 26;   // centro dos tone holes

// ── Posições Y ────────────────────────────────────────────────
const Y = {
    oct: 8, palmD: 8, palmC: 16, sideEb: 8, sideC: 16,
    T: 22,
    h1: 30, bis: 39,
    h2: 48,
    h3: 60,
    h4: 72,
    h5: 82, sideFs: 87,
    h6: 92,
    div: 67,
};

// ── Helpers ───────────────────────────────────────────────────
function isPressed(id: FingeringKeyId, p: FingeringKeyId[]) {
    return p.includes(id);
}
function fillStroke(id: FingeringKeyId, p: FingeringKeyId[], opt: FingeringKeyId[]) {
    if (p.includes(id)) return { fill: T.pressed, stroke: T.prstSk, sw: 1.5 };
    if (opt.includes(id)) return { fill: T.optional, stroke: T.optSk, sw: 1, dash: '2,1' };
    return { fill: T.open, stroke: T.openSk, sw: 1 };
}

interface Props { id: FingeringKeyId; p: FingeringKeyId[]; opt: FingeringKeyId[] }

const Hole = memo(({ cx, cy, r, id, p, opt }: Props & { cx: number; cy: number; r: number }) => {
    const s = fillStroke(id, p, opt);
    return (
        <circle cx={cx} cy={cy} r={r}
            fill={s.fill} stroke={s.stroke} strokeWidth={s.sw}
            strokeDasharray={s.dash}
        />
    );
});
Hole.displayName = 'Hole';

const Oval = memo(({ cx, cy, rx, ry, id, p, opt }: Props & { cx: number; cy: number; rx: number; ry: number }) => {
    const s = fillStroke(id, p, opt);
    return (
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
            fill={s.fill} stroke={s.stroke} strokeWidth={s.sw}
            strokeDasharray={s.dash}
        />
    );
});
Oval.displayName = 'Oval';

const PinkyRect = memo(({ x, y, w, h, id, p, opt }: Props & { x: number; y: number; w: number; h: number }) => {
    const s = fillStroke(id, p, opt);
    return (
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2}
            fill={s.fill} stroke={s.stroke} strokeWidth={s.sw}
            strokeDasharray={s.dash}
        />
    );
});
PinkyRect.displayName = 'PinkyRect';

// ── Main Component ────────────────────────────────────────────
const SaxDiagramMap: React.FC<SaxDiagramMapProps> = memo(({
    pressed, optional = [], width = 52, height = 104,
}) => {
    const p = pressed;
    const opt = optional;

    const pLx = LX - 12;    // x dos pinky esq

    return (
        <svg
            viewBox="0 0 52 104"
            width={width}
            height={height}
            aria-hidden="true"
        >
            {/* ── Tubo ─────────────────────────────── */}
            <rect x={LX} y={5} width={RX - LX} height={93}
                fill={T.tube} stroke={T.tubeSk} strokeWidth="1" rx="1" />

            {/* ── OCT KEY (esq, topo) ─────────────── */}
            <Oval cx={LX - 8} cy={Y.oct} rx={7} ry={5} id="oct" p={p} opt={opt} />
            <line x1={LX - 1} y1={Y.oct} x2={LX} y2={Y.oct}
                stroke={isPressed('oct', p) ? T.prstSk : T.tubeSk} strokeWidth="0.7" />

            {/* ── PALM KEYS (esq) ─────────────────── */}
            <Oval cx={LX - 10} cy={Y.palmD} rx={8} ry={4} id="pD" p={p} opt={opt} />
            <Oval cx={LX - 10} cy={Y.palmC} rx={8} ry={4} id="pC" p={p} opt={opt} />

            {/* ── SIDE KEYS (dir) ─────────────────── */}
            <Oval cx={RX + 7} cy={Y.sideEb} rx={5} ry={8} id="sEb" p={p} opt={opt} />
            <Oval cx={RX + 7} cy={Y.sideC} rx={5} ry={8} id="sC" p={p} opt={opt} />

            {/* ── POLEGAR (dir) ───────────────────── */}
            <Oval cx={RX + 9} cy={Y.T} rx={9} ry={5} id="T" p={p} opt={opt} />
            <line x1={RX + 0} y1={Y.T} x2={RX} y2={Y.T}
                stroke={isPressed('T', p) ? T.prstSk : T.tubeSk} strokeWidth="0.7" />

            {/* ── TECLA 1 ─────────────────────────── */}
            <Hole cx={CX} cy={Y.h1} r={6} id="1" p={p} opt={opt} />

            {/* ── BIS KEY (dir, entre 1 e 2) ──────── */}
            <Hole cx={RX + 6} cy={Y.bis} r={3.5} id="bis" p={p} opt={opt} />
            <line x1={RX} y1={Y.bis} x2={RX + 2.5} y2={Y.bis}
                stroke={isPressed('bis', p) ? T.prstSk : T.tubeSk} strokeWidth="0.6" />

            {/* ── TECLA 2 ─────────────────────────── */}
            <Hole cx={CX} cy={Y.h2} r={6} id="2" p={p} opt={opt} />

            {/* ── TECLA 3 + Pinky esq ─────────────── */}
            <Hole cx={CX} cy={Y.h3} r={6} id="3" p={p} opt={opt} />

            {/* Pinky esq group */}
            <PinkyRect x={pLx} y={Y.h3 - 9} w={14} h={6} id="lLow" p={p} opt={opt} />
            <PinkyRect x={pLx} y={Y.h3} w={14} h={6} id="lBb" p={p} opt={opt} />
            <PinkyRect x={pLx} y={Y.h3 + 9} w={14} h={6} id="lAb" p={p} opt={opt} />
            {/* Wires */}
            <line x1={pLx + 7} y1={Y.h3 - 9} x2={LX} y2={Y.h3 - 4}
                stroke={T.tubeSk} strokeWidth="0.5" />
            <line x1={pLx + 7} y1={Y.h3} x2={LX} y2={Y.h3}
                stroke={T.tubeSk} strokeWidth="0.5" />
            <line x1={pLx + 7} y1={Y.h3 + 9} x2={LX} y2={Y.h3 + 4}
                stroke={T.tubeSk} strokeWidth="0.5" />

            {/* ── DIVISÓRIA MÃO DIR ────────────────── */}
            <line x1="4" y1={Y.div} x2="48" y2={Y.div}
                stroke={T.tubeSk} strokeWidth="0.5" strokeDasharray="2,2" />

            {/* ── TECLA 4 ─────────────────────────── */}
            <Hole cx={CX} cy={Y.h4} r={6} id="4" p={p} opt={opt} />

            {/* Fá# lateral */}
            <Oval cx={RX + 7} cy={Y.sideFs} rx={5} ry={7} id="Fs" p={p} opt={opt} />
            <line x1={RX} y1={Y.sideFs} x2={RX + 2} y2={Y.sideFs}
                stroke={isPressed('Fs', p) ? T.prstSk : T.tubeSk} strokeWidth="0.6" />

            {/* ── TECLA 5 ─────────────────────────── */}
            <Hole cx={CX} cy={Y.h5} r={6} id="5" p={p} opt={opt} />

            {/* ── TECLA 6 + Pinky dir ─────────────── */}
            <Hole cx={CX} cy={Y.h6} r={6} id="6" p={p} opt={opt} />

            {/* Pinky dir group */}
            <PinkyRect x={pLx} y={Y.h6 - 9} w={14} h={6} id="rBb" p={p} opt={opt} />
            <PinkyRect x={pLx} y={Y.h6} w={14} h={6} id="rCs" p={p} opt={opt} />
            <PinkyRect x={pLx} y={Y.h6 + 9} w={14} h={6} id="rEb" p={p} opt={opt} />
            {/* Wires */}
            <line x1={pLx + 7} y1={Y.h6 - 9} x2={LX} y2={Y.h6 - 4}
                stroke={T.tubeSk} strokeWidth="0.5" />
            <line x1={pLx + 7} y1={Y.h6} x2={LX} y2={Y.h6}
                stroke={T.tubeSk} strokeWidth="0.5" />
            <line x1={pLx + 7} y1={Y.h6 + 9} x2={LX} y2={Y.h6 + 4}
                stroke={T.tubeSk} strokeWidth="0.5" />
        </svg>
    );
});

SaxDiagramMap.displayName = 'SaxDiagramMap';
export default SaxDiagramMap;
