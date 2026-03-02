// src/components/fingering/svg/SaxDiagramMap.tsx — v5 (nível referência mundial)
// ─────────────────────────────────────────────────────────────
// Diagrama instrumento real: gradiente no tubo, hierarquia de tom,
// micro-variação orgânica, pinky cluster com presença, +8% tamanho
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { FingeringKeyId } from '../../../lib/fingering/types';

export interface SaxDiagramMapProps {
    pressed: FingeringKeyId[];
    optional?: FingeringKeyId[];
    diffKeys?: FingeringKeyId[];
    width?: number;
    height?: number;
}

// ── Paleta — hierarquia de tom por tipo de chave ─────────────
const P = {
    // Pressed: main mais escuro que side/pinky → hierarquia visual
    mainPressed: '#030C14',
    sidePressed: '#142538',   // levemente mais claro que main
    pinkyPressed: '#1A2E42',   // mais claro ainda
    // Open
    openFill: '#F6F4EF',
    openStroke: '#9AAABB',
    openSW: 0.85,
    // Optional
    optFill: 'rgba(4,12,24,0.09)',
    optStroke: '#3E5870',
    optDash: '2.5 1.5',
    // Diff (comparação)
    diffPressedFill: '#B86010',
    diffOpenFill: 'rgba(184,96,16,0.10)',
    diffStroke: '#B86010',
    diffDash: '3 1.5',
    // Tubo
    tubeStroke: '#B4AAA0',
    // stroke por tipo: main=mais espesso → mais presença
    mainSW: 1.05,
    sideSW: 0.78,
    pinkySW: 0.78,
};

// ── Geometria — +8% presença (+viewBox escálado via width/height) ─
const LX = 18; const RX = 37; const CX = 27;
const R_MAIN = 9.0;
const R_BIS = 4.5;

// Y positions — micro-variação para look orgânico (não ícone)
const Y = {
    oct: 9,
    palmD: 9, palmC: 20,
    sEb: 9, sC: 20.5,   // sC ligeiramente diferente de sEb
    T: 30,
    h1: 44,
    bis: 54,
    h2: 64.3,   // micro-variação (+0.3)
    h3: 83.7,   // micro-variação (-0.3)
    div: 94,
    h4: 105,
    h5: 118.2,   // micro-variação (+0.2)
    sFs: 121.5,
    h6: 131,
};

// ── Style helper com hierarquia de kind + diff ────────────────
type KeyKind = 'main' | 'side' | 'pinky';
type KeyState = 'pressed' | 'open' | 'optional';

function getState(id: FingeringKeyId, pr: FingeringKeyId[], op: FingeringKeyId[]): KeyState {
    if (pr.includes(id)) return 'pressed';
    if (op.includes(id)) return 'optional';
    return 'open';
}

function sty(
    id: FingeringKeyId,
    pr: FingeringKeyId[],
    op: FingeringKeyId[],
    df: FingeringKeyId[],
    kind: KeyKind = 'main',
    sw?: number,
) {
    const state = getState(id, pr, op);
    const isDiff = df.includes(id);
    const swBase = sw ?? (kind === 'main' ? P.mainSW : kind === 'side' ? P.sideSW : P.pinkySW);

    if (isDiff) {
        const cls = `sax-key sax-key--${state === 'pressed' ? 'pressed' : 'open'} sax-key--diff`;
        return state === 'pressed'
            ? { fill: P.diffPressedFill, stroke: P.diffStroke, sw: swBase, dash: undefined, cls }
            : { fill: P.diffOpenFill, stroke: P.diffStroke, sw: swBase, dash: P.diffDash, cls };
    }

    if (state === 'pressed') {
        const fill = kind === 'main' ? P.mainPressed : kind === 'side' ? P.sidePressed : P.pinkyPressed;
        return { fill, stroke: fill, sw: swBase, dash: undefined, cls: 'sax-key sax-key--pressed' };
    }
    if (state === 'optional') {
        return { fill: P.optFill, stroke: P.optStroke, sw: swBase, dash: P.optDash, cls: 'sax-key sax-key--optional' };
    }
    return { fill: P.openFill, stroke: P.openStroke, sw: swBase, dash: undefined, cls: 'sax-key sax-key--open' };
}

// ── Primitivas memorizadas com kind ──────────────────────────
interface BP {
    id: FingeringKeyId;
    pr: FingeringKeyId[];
    op: FingeringKeyId[];
    df: FingeringKeyId[];
    kind?: KeyKind;
    sw?: number;
}

const Dot = memo(({ cx, cy, r, id, pr, op, df, kind = 'main', sw }: BP & { cx: number; cy: number; r: number }) => {
    const s = sty(id, pr, op, df, kind, sw);
    return <circle className={s.cls} cx={cx} cy={cy} r={r} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Dot.displayName = 'Dot';

const Ov = memo(({ cx, cy, rx, ry, id, pr, op, df, kind = 'side', sw }: BP & { cx: number; cy: number; rx: number; ry: number }) => {
    const s = sty(id, pr, op, df, kind, sw);
    return <ellipse className={s.cls} cx={cx} cy={cy} rx={rx} ry={ry} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Ov.displayName = 'Ov';

const Bx = memo(({ x, y, w, h, id, pr, op, df, kind = 'pinky', sw }: BP & { x: number; y: number; w: number; h: number }) => {
    const s = sty(id, pr, op, df, kind, sw);
    return (
        <rect className={s.cls}
            x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2.5}
            fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash}
        />
    );
});
Bx.displayName = 'Bx';

// ── Component principal ───────────────────────────────────────
const SaxDiagramMap: React.FC<SaxDiagramMapProps> = memo(({
    pressed, optional = [], diffKeys = [], width = 70, height = 157,
}) => {
    const pr = pressed;
    const op = optional;
    const df = diffKeys;
    // Cluster pinky: mais separado (+3px vs v4)
    const PLX = LX - 20;

    return (
        <svg viewBox="0 0 65 148" width={width} height={height} aria-hidden="true">
            <defs>
                {/* Gradiente sutil no tubo — micro contraste 3D */}
                <linearGradient id="sg-tube" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D0CAC0" />
                    <stop offset="30%" stopColor="#EAE6DC" />
                    <stop offset="70%" stopColor="#E8E4DA" />
                    <stop offset="100%" stopColor="#CEC8BE" />
                </linearGradient>
                {/* Gradiente para chave oitava */}
                <linearGradient id="sg-side" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E5E1D8" />
                    <stop offset="100%" stopColor="#D8D4CB" />
                </linearGradient>
            </defs>

            {/* ── Tubo — corpo com profundidade e leve espessura variável ── */}
            <rect x={LX} y={7} width={RX - LX} height={136}
                fill="url(#sg-tube)" stroke={P.tubeStroke} strokeWidth="0.9" rx="1.5" />
            {/* Linha de sombra esq (profundidade do tubo) */}
            <line x1={LX + 1.8} y1={8} x2={LX + 1.8} y2={142}
                stroke="#B0A898" strokeWidth="0.7" opacity="0.6" />

            {/* ── Oitava */}
            <Ov cx={LX - 9} cy={Y.oct} rx={7.5} ry={4.5}
                id="oct" pr={pr} op={op} df={df} kind="side" />
            <line x1={LX - 1.5} y1={Y.oct} x2={LX} y2={Y.oct}
                stroke={P.tubeStroke} strokeWidth="0.45" />

            {/* ── Palm Keys */}
            <Ov cx={LX - 10} cy={Y.palmD} rx={7} ry={3.8}
                id="pD" pr={pr} op={op} df={df} kind="side" />
            <Ov cx={LX - 10} cy={Y.palmC} rx={7} ry={3.5}
                id="pC" pr={pr} op={op} df={df} kind="side" />

            {/* ── Side Keys dir (leve assimetria: sEb taller, sC slightly smaller) */}
            <Ov cx={RX + 7} cy={Y.sEb} rx={4.8} ry={7.5}
                id="sEb" pr={pr} op={op} df={df} kind="side" />
            <Ov cx={RX + 7} cy={Y.sC} rx={4.6} ry={7.2}
                id="sC" pr={pr} op={op} df={df} kind="side" />

            {/* ── Polegar */}
            <Ov cx={RX + 11} cy={Y.T} rx={11} ry={5.5}
                id="T" pr={pr} op={op} df={df} kind="side" />
            <line x1={RX} y1={Y.T} x2={RX + 0.5} y2={Y.T}
                stroke={P.tubeStroke} strokeWidth="0.45" />

            {/* ── Main stack — hierarquia de tom: mais escuro que side ── */}
            <Dot cx={CX} cy={Y.h1} r={R_MAIN} id="1" pr={pr} op={op} df={df} kind="main" />

            {/* ── Bis */}
            <Dot cx={RX + 6} cy={Y.bis} r={R_BIS}
                id="bis" pr={pr} op={op} df={df} kind="side" />
            <line x1={RX} y1={Y.bis} x2={RX + 1.5} y2={Y.bis}
                stroke={P.tubeStroke} strokeWidth="0.4" />

            <Dot cx={CX} cy={Y.h2} r={R_MAIN} id="2" pr={pr} op={op} df={df} kind="main" />
            <Dot cx={CX} cy={Y.h3} r={R_MAIN} id="3" pr={pr} op={op} df={df} kind="main" />

            {/* ── Pinky esq — cluster com maior separação e volume ── */}
            <Bx x={PLX} y={Y.h3 - 12} w={14} h={7.2} id="lLow" pr={pr} op={op} df={df} kind="pinky" />
            <Bx x={PLX} y={Y.h3} w={14} h={7.2} id="lBb" pr={pr} op={op} df={df} kind="pinky" />
            <Bx x={PLX} y={Y.h3 + 12} w={14} h={7.2} id="lAb" pr={pr} op={op} df={df} kind="pinky" />
            {[Y.h3 - 12, Y.h3, Y.h3 + 12].map((py, i) => (
                <line key={i}
                    x1={PLX + 7} y1={py} x2={LX - 0.5} y2={Y.h3 + (i - 1) * 4.5}
                    stroke={P.tubeStroke} strokeWidth="0.45"
                />
            ))}

            {/* ── Separador */}
            <line x1="3" y1={Y.div} x2="62" y2={Y.div}
                stroke={P.tubeStroke} strokeWidth="0.55" strokeDasharray="3 2.5" />

            {/* ── Main stack dir ── */}
            <Dot cx={CX} cy={Y.h4} r={R_MAIN} id="4" pr={pr} op={op} df={df} kind="main" />
            <Dot cx={CX} cy={Y.h5} r={R_MAIN} id="5" pr={pr} op={op} df={df} kind="main" />

            {/* ── Fá# lateral */}
            <Ov cx={RX + 7} cy={Y.sFs} rx={4.8} ry={6.5}
                id="Fs" pr={pr} op={op} df={df} kind="side" />
            <line x1={RX} y1={Y.sFs} x2={RX + 1.5} y2={Y.sFs}
                stroke={P.tubeStroke} strokeWidth="0.4" />

            <Dot cx={CX} cy={Y.h6} r={R_MAIN} id="6" pr={pr} op={op} df={df} kind="main" />

            {/* ── Pinky dir */}
            <Bx x={PLX} y={Y.h6 - 12} w={14} h={7.2} id="rBb" pr={pr} op={op} df={df} kind="pinky" />
            <Bx x={PLX} y={Y.h6} w={14} h={7.2} id="rCs" pr={pr} op={op} df={df} kind="pinky" />
            <Bx x={PLX} y={Y.h6 + 12} w={14} h={7.2} id="rEb" pr={pr} op={op} df={df} kind="pinky" />
            {[Y.h6 - 12, Y.h6, Y.h6 + 12].map((py, i) => (
                <line key={i}
                    x1={PLX + 7} y1={py} x2={LX - 0.5} y2={Y.h6 + (i - 1) * 4.5}
                    stroke={P.tubeStroke} strokeWidth="0.45"
                />
            ))}
        </svg>
    );
});

SaxDiagramMap.displayName = 'SaxDiagramMap';
export default SaxDiagramMap;
