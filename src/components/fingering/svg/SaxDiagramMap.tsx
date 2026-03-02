// src/components/fingering/svg/SaxDiagramMap.tsx
// ─────────────────────────────────────────────────────────────
// Diagrama de sax para o MAPA GLOBAL — v2
// ViewBox: 0 0 60 130 — espaçoso, didático
// Paleta técnica: pressed=sólido escuro, open=outline fino
// Sem glow, sem sombra — painel de referência
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { FingeringKeyId } from '../../../lib/fingering/types';

interface SaxDiagramMapProps {
    pressed: FingeringKeyId[];
    optional?: FingeringKeyId[];
    width?: number;
    height?: number;
}

// ── Paleta (forçar contraste máximo) ─────────────────────────
const C = {
    pressedFill: '#0D2640',   // azul naval escuro — DOMINANTE
    pressedStroke: '#0D2640',
    openFill: '#FAFAF8',   // quase branco
    openStroke: '#8A9BB5',   // azul-cinza claro, fino
    openSW: 1.2,
    optFill: 'rgba(13,38,64,0.18)',
    optStroke: '#587090',
    optDash: '2 1.5',
    tube: '#F0EDE5',   // bege muito claro (quase invisível)
    tubeStroke: '#BDB5A8',   // separador de tubo
};

// ── Geometria ─────────────────────────────────────────────────
const LX = 17;    // borda esq do tubo
const RX = 36;    // borda dir do tubo
const CX = 26.5;  // centro dos tone holes
const R = 8;     // raio dos tone holes principais

// Y positions – distribuição generosa
const Y = {
    // topo: oct, palm keys, side keys, polegar
    oct: 9,
    palmD: 9,
    palmC: 20,
    sEb: 9,
    sC: 21,
    T: 29,
    // mão esquerda
    h1: 42,
    bis: 54,
    h2: 65,
    h3: 80,
    // separador visual
    div: 91,
    // mão direita
    h4: 101,
    h5: 113,
    sFs: 117,
    h6: 124,
};

// ── Helpers ───────────────────────────────────────────────────
function style(id: FingeringKeyId, p: FingeringKeyId[], opt: FingeringKeyId[]) {
    if (p.includes(id)) return {
        fill: C.pressedFill, stroke: C.pressedStroke, sw: 1, dash: undefined,
    };
    if (opt.includes(id)) return {
        fill: C.optFill, stroke: C.optStroke, sw: 1, dash: C.optDash,
    };
    return {
        fill: C.openFill, stroke: C.openStroke, sw: C.openSW, dash: undefined,
    };
}

interface BaseProps { id: FingeringKeyId; p: FingeringKeyId[]; opt: FingeringKeyId[] }

const Circle = memo(({ cx, cy, r = R, id, p, opt }: BaseProps & { cx: number; cy: number; r?: number }) => {
    const s = style(id, p, opt);
    return <circle cx={cx} cy={cy} r={r} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Circle.displayName = 'Circle';

const Oval = memo(({ cx, cy, rx, ry, id, p, opt }: BaseProps & { cx: number; cy: number; rx: number; ry: number }) => {
    const s = style(id, p, opt);
    return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Oval.displayName = 'Oval';

const Rect = memo(({ x, y, w, h, id, p, opt }: BaseProps & { x: number; y: number; w: number; h: number }) => {
    const s = style(id, p, opt);
    return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={1.5} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Rect.displayName = 'Rect';

// ── Component ─────────────────────────────────────────────────
const SaxDiagramMap: React.FC<SaxDiagramMapProps> = memo(({
    pressed, optional = [], width = 60, height = 130,
}) => {
    const p = pressed;
    const opt = optional;
    const PLX = LX - 14; // X do cluster pinky esquerdo

    return (
        <svg
            viewBox="0 0 60 130"
            width={width}
            height={height}
            aria-hidden="true"
        >
            {/* ── Tubo central ─────────────────────── */}
            <rect x={LX} y={6} width={RX - LX} height={120}
                fill={C.tube} stroke={C.tubeStroke} strokeWidth="0.8" />

            {/* ── Chave de Oitava (esq, topo) ──────── */}
            <Oval cx={LX - 9} cy={Y.oct} rx={8} ry={5} id="oct" p={p} opt={opt} />
            <line x1={LX - 1} y1={Y.oct} x2={LX} y2={Y.oct} stroke={C.tubeStroke} strokeWidth="0.6" />

            {/* ── Palm Keys (canto esq, topo) ──────── */}
            <Oval cx={LX - 10} cy={Y.palmD} rx={9} ry={4.5} id="pD" p={p} opt={opt} />
            <Oval cx={LX - 10} cy={Y.palmC} rx={9} ry={4.5} id="pC" p={p} opt={opt} />

            {/* ── Side Keys (dir, topo) ─────────────── */}
            <Oval cx={RX + 7.5} cy={Y.sEb} rx={5.5} ry={8} id="sEb" p={p} opt={opt} />
            <Oval cx={RX + 7.5} cy={Y.sC} rx={5.5} ry={8} id="sC" p={p} opt={opt} />

            {/* ── Polegar (dir) ────────────────────── */}
            <Oval cx={RX + 11} cy={Y.T} rx={11} ry={5.5} id="T" p={p} opt={opt} />
            <line x1={RX} y1={Y.T} x2={RX + 0.5} y2={Y.T} stroke={C.tubeStroke} strokeWidth="0.6" />

            {/* ── Tecla 1 ──────────────────────────── */}
            <Circle cx={CX} cy={Y.h1} id="1" p={p} opt={opt} />

            {/* ── Bis Key ──────────────────────────── */}
            <Circle cx={RX + 6} cy={Y.bis} r={4} id="bis" p={p} opt={opt} />
            <line x1={RX} y1={Y.bis} x2={RX + 2} y2={Y.bis} stroke={C.tubeStroke} strokeWidth="0.5" />

            {/* ── Tecla 2 ──────────────────────────── */}
            <Circle cx={CX} cy={Y.h2} id="2" p={p} opt={opt} />

            {/* ── Tecla 3 ──────────────────────────── */}
            <Circle cx={CX} cy={Y.h3} id="3" p={p} opt={opt} />

            {/* ── Pinky Esq (junto à tecla 3) ──────── */}
            <Rect x={PLX} y={Y.h3 - 10} w={15} h={7} id="lLow" p={p} opt={opt} />
            <Rect x={PLX} y={Y.h3} w={15} h={7} id="lBb" p={p} opt={opt} />
            <Rect x={PLX} y={Y.h3 + 10} w={15} h={7} id="lAb" p={p} opt={opt} />
            {/* Wires pinky esq */}
            <line x1={PLX + 7.5} y1={Y.h3 - 10} x2={LX} y2={Y.h3 - 5} stroke={C.tubeStroke} strokeWidth="0.5" />
            <line x1={PLX + 7.5} y1={Y.h3} x2={LX} y2={Y.h3} stroke={C.tubeStroke} strokeWidth="0.5" />
            <line x1={PLX + 7.5} y1={Y.h3 + 10} x2={LX} y2={Y.h3 + 5} stroke={C.tubeStroke} strokeWidth="0.5" />

            {/* ── Separador mão direita ────────────── */}
            <line x1="4" y1={Y.div} x2="56" y2={Y.div}
                stroke={C.tubeStroke} strokeWidth="0.6" strokeDasharray="3 2" />

            {/* ── Tecla 4 ──────────────────────────── */}
            <Circle cx={CX} cy={Y.h4} id="4" p={p} opt={opt} />

            {/* ── Tecla 5 ──────────────────────────── */}
            <Circle cx={CX} cy={Y.h5} id="5" p={p} opt={opt} />

            {/* ── Fá# Lateral ──────────────────────── */}
            <Oval cx={RX + 7.5} cy={Y.sFs} rx={5.5} ry={7} id="Fs" p={p} opt={opt} />
            <line x1={RX} y1={Y.sFs} x2={RX + 2} y2={Y.sFs} stroke={C.tubeStroke} strokeWidth="0.5" />

            {/* ── Tecla 6 ──────────────────────────── */}
            <Circle cx={CX} cy={Y.h6} id="6" p={p} opt={opt} />

            {/* ── Pinky Dir (junto à tecla 6) ──────── */}
            <Rect x={PLX} y={Y.h6 - 10} w={15} h={7} id="rBb" p={p} opt={opt} />
            <Rect x={PLX} y={Y.h6} w={15} h={7} id="rCs" p={p} opt={opt} />
            <Rect x={PLX} y={Y.h6 + 10} w={15} h={7} id="rEb" p={p} opt={opt} />
            {/* Wires pinky dir */}
            <line x1={PLX + 7.5} y1={Y.h6 - 10} x2={LX} y2={Y.h6 - 5} stroke={C.tubeStroke} strokeWidth="0.5" />
            <line x1={PLX + 7.5} y1={Y.h6} x2={LX} y2={Y.h6} stroke={C.tubeStroke} strokeWidth="0.5" />
            <line x1={PLX + 7.5} y1={Y.h6 + 10} x2={LX} y2={Y.h6 + 5} stroke={C.tubeStroke} strokeWidth="0.5" />
        </svg>
    );
});

SaxDiagramMap.displayName = 'SaxDiagramMap';
export default SaxDiagramMap;
