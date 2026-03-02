// src/components/fingering/svg/SaxDiagramMap.tsx — v4 (editorial didático)
// ─────────────────────────────────────────────────────────────
// Hierarquia: main holes > side keys > palm keys > pinky cluster
// Coordenadas orgânicas: spacing equidistante para leitura natural
// diffKeys: teclas diferentes (modo comparação) → âmbar
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { FingeringKeyId } from '../../../lib/fingering/types';

export interface SaxDiagramMapProps {
    pressed: FingeringKeyId[];
    optional?: FingeringKeyId[];
    /** Teclas que diferem no modo comparação — renderizadas em âmbar */
    diffKeys?: FingeringKeyId[];
    width?: number;
    height?: number;
}

// ── Paleta ───────────────────────────────────────────────────
const P = {
    pressedFill: '#06101A',   // máximo escuro
    pressedStroke: '#06101A',
    openFill: '#F9F8F5',
    openStroke: '#A8B5C4',
    openSW: 0.9,
    optFill: 'rgba(6,16,26,0.11)',
    optStroke: '#4A6580',
    optDash: '2.5 1.5',
    diffPressedFill: '#B86010', // âmbar — tecla muda e está pressionada
    diffOpenFill: 'rgba(184,96,16,0.10)',
    diffStroke: '#B86010',
    diffDash: '3 1.5',
    tube: '#EAE6DC',
    tubeStroke: '#C2BAB0',
    // stroke por tipo
    mainSW: 1.0,
    sideSW: 0.80,
    pinkySW: 0.80,
};

// ── Geometria ────────────────────────────────────────────────
// Tubo central
const LX = 18;   // borda esq
const RX = 37;   // borda dir
const CX = 27;   // centro holes

// Main stack: espaçamento equidistante 20px
// R determinado pela hierarquia: main=9, bis=4.5, side/palm menores
const R_MAIN = 9.0;
const R_BIS = 4.5;

// Y positions — orgânicas, equidistantes por grupo
const Y = {
    // topo auxiliares (oitava, palm, side)
    oct: 9,
    palmD: 9, palmC: 20,
    sEb: 9, sC: 20,
    T: 30,
    // mão esquerda — equidistante 20px
    h1: 44,
    bis: 54,   // entre h1 e h2, lado dir
    h2: 64,
    h3: 84,
    // separador
    div: 94,
    // mão direita — equidistante 13px
    h4: 105,
    h5: 118,
    sFs: 121,   // Fá# lateral, próximo de h5/h6
    h6: 131,
};

// ── style helper com hierarquia e diff ───────────────────────
type KeyState = 'pressed' | 'open' | 'optional';

function getKeyState(
    id: FingeringKeyId,
    pressed: FingeringKeyId[],
    opt: FingeringKeyId[],
): KeyState {
    if (pressed.includes(id)) return 'pressed';
    if (opt.includes(id)) return 'optional';
    return 'open';
}

function sty(
    id: FingeringKeyId,
    pressed: FingeringKeyId[],
    opt: FingeringKeyId[],
    diff: FingeringKeyId[],
    swOverride?: number,
) {
    const state = getKeyState(id, pressed, opt);
    const isDiff = diff.includes(id);

    if (isDiff) {
        // Modo comparação: âmbar
        if (state === 'pressed') return {
            fill: P.diffPressedFill, stroke: P.diffStroke,
            sw: swOverride ?? P.mainSW, dash: undefined,
            cls: 'sax-key sax-key--pressed sax-key--diff',
        };
        return {
            fill: P.diffOpenFill, stroke: P.diffStroke,
            sw: swOverride ?? P.openSW, dash: P.diffDash,
            cls: 'sax-key sax-key--open sax-key--diff',
        };
    }

    if (state === 'pressed') return {
        fill: P.pressedFill, stroke: P.pressedStroke,
        sw: swOverride ?? P.mainSW, dash: undefined,
        cls: 'sax-key sax-key--pressed',
    };
    if (state === 'optional') return {
        fill: P.optFill, stroke: P.optStroke,
        sw: swOverride ?? P.openSW, dash: P.optDash,
        cls: 'sax-key sax-key--optional',
    };
    return {
        fill: P.openFill, stroke: P.openStroke,
        sw: swOverride ?? P.openSW, dash: undefined,
        cls: 'sax-key sax-key--open',
    };
}

// ── Sub-componentes memorizados ───────────────────────────────
interface BP {
    id: FingeringKeyId;
    pr: FingeringKeyId[];
    op: FingeringKeyId[];
    df: FingeringKeyId[];
    sw?: number;
}

const Dot = memo(({ cx, cy, r, id, pr, op, df, sw }: BP & { cx: number; cy: number; r: number }) => {
    const s = sty(id, pr, op, df, sw);
    return <circle className={s.cls} cx={cx} cy={cy} r={r} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Dot.displayName = 'Dot';

const Ov = memo(({ cx, cy, rx, ry, id, pr, op, df, sw }: BP & { cx: number; cy: number; rx: number; ry: number }) => {
    const s = sty(id, pr, op, df, sw);
    return <ellipse className={s.cls} cx={cx} cy={cy} rx={rx} ry={ry} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />;
});
Ov.displayName = 'Ov';

const Bx = memo(({ x, y, w, h, id, pr, op, df, sw }: BP & { x: number; y: number; w: number; h: number }) => {
    const s = sty(id, pr, op, df, sw);
    return (
        <rect
            className={s.cls}
            x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2.5}
            fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash}
        />
    );
});
Bx.displayName = 'Bx';

// ── Component principal ───────────────────────────────────────
const SaxDiagramMap: React.FC<SaxDiagramMapProps> = memo(({
    pressed, optional = [], diffKeys = [], width = 65, height = 145,
}) => {
    const pr = pressed;
    const op = optional;
    const df = diffKeys;

    // Cluster pinky: offset lateral maior para separação visual clara
    const PLX = LX - 17;

    return (
        <svg viewBox="0 0 60 140" width={width} height={height} aria-hidden="true">

            {/* Tubo */}
            <rect x={LX} y={7} width={RX - LX} height={130}
                fill={P.tube} stroke={P.tubeStroke} strokeWidth="0.7" rx="1" />

            {/* ── Oitava — lado esq, stroke fino */}
            <Ov cx={LX - 9} cy={Y.oct} rx={7.5} ry={4.5}
                id="oct" pr={pr} op={op} df={df} sw={P.sideSW} />
            <line x1={LX - 1.5} y1={Y.oct} x2={LX} y2={Y.oct}
                stroke={P.tubeStroke} strokeWidth="0.45" />

            {/* ── Palm Keys — menores, hierarquia secundária */}
            <Ov cx={LX - 10} cy={Y.palmD} rx={7} ry={3.8}
                id="pD" pr={pr} op={op} df={df} sw={P.sideSW} />
            <Ov cx={LX - 10} cy={Y.palmC} rx={7} ry={3.8}
                id="pC" pr={pr} op={op} df={df} sw={P.sideSW} />

            {/* ── Side Keys — lado dir, verticais, stride fino */}
            <Ov cx={RX + 7} cy={Y.sEb} rx={4.8} ry={7.5}
                id="sEb" pr={pr} op={op} df={df} sw={P.sideSW} />
            <Ov cx={RX + 7} cy={Y.sC} rx={4.8} ry={7.5}
                id="sC" pr={pr} op={op} df={df} sw={P.sideSW} />

            {/* ── Polegar — oval largo */}
            <Ov cx={RX + 11} cy={Y.T} rx={11} ry={5.5}
                id="T" pr={pr} op={op} df={df} sw={P.sideSW} />
            <line x1={RX} y1={Y.T} x2={RX + 0.5} y2={Y.T}
                stroke={P.tubeStroke} strokeWidth="0.45" />

            {/* ── Tecla 1 — main stack R_MAIN */}
            <Dot cx={CX} cy={Y.h1} r={R_MAIN} id="1" pr={pr} op={op} df={df} />

            {/* ── Bis — pequena, dir, stride fino */}
            <Dot cx={RX + 6} cy={Y.bis} r={R_BIS}
                id="bis" pr={pr} op={op} df={df} sw={P.sideSW} />
            <line x1={RX} y1={Y.bis} x2={RX + 1.5} y2={Y.bis}
                stroke={P.tubeStroke} strokeWidth="0.4" />

            {/* ── Tecla 2 */}
            <Dot cx={CX} cy={Y.h2} r={R_MAIN} id="2" pr={pr} op={op} df={df} />

            {/* ── Tecla 3 */}
            <Dot cx={CX} cy={Y.h3} r={R_MAIN} id="3" pr={pr} op={op} df={df} />

            {/* ── Pinky esq — cluster com offset lateral (separação visual) */}
            <Bx x={PLX} y={Y.h3 - 11} w={13.5} h={6.5} id="lLow" pr={pr} op={op} df={df} sw={P.pinkySW} />
            <Bx x={PLX} y={Y.h3} w={13.5} h={6.5} id="lBb" pr={pr} op={op} df={df} sw={P.pinkySW} />
            <Bx x={PLX} y={Y.h3 + 11} w={13.5} h={6.5} id="lAb" pr={pr} op={op} df={df} sw={P.pinkySW} />
            {[Y.h3 - 11, Y.h3, Y.h3 + 11].map((py, i) => (
                <line key={i}
                    x1={PLX + 6.75} y1={py} x2={LX - 0.5} y2={Y.h3 + (i - 1) * 4}
                    stroke={P.tubeStroke} strokeWidth="0.4"
                />
            ))}

            {/* ── Separador mão dir */}
            <line x1="3" y1={Y.div} x2="57" y2={Y.div}
                stroke={P.tubeStroke} strokeWidth="0.5" strokeDasharray="3 2" />

            {/* ── Tecla 4 */}
            <Dot cx={CX} cy={Y.h4} r={R_MAIN} id="4" pr={pr} op={op} df={df} />

            {/* ── Tecla 5 */}
            <Dot cx={CX} cy={Y.h5} r={R_MAIN} id="5" pr={pr} op={op} df={df} />

            {/* ── Fá# lateral */}
            <Ov cx={RX + 7} cy={Y.sFs} rx={4.8} ry={6.5}
                id="Fs" pr={pr} op={op} df={df} sw={P.sideSW} />
            <line x1={RX} y1={Y.sFs} x2={RX + 1.5} y2={Y.sFs}
                stroke={P.tubeStroke} strokeWidth="0.4" />

            {/* ── Tecla 6 */}
            <Dot cx={CX} cy={Y.h6} r={R_MAIN} id="6" pr={pr} op={op} df={df} />

            {/* ── Pinky dir — cluster */}
            <Bx x={PLX} y={Y.h6 - 11} w={13.5} h={6.5} id="rBb" pr={pr} op={op} df={df} sw={P.pinkySW} />
            <Bx x={PLX} y={Y.h6} w={13.5} h={6.5} id="rCs" pr={pr} op={op} df={df} sw={P.pinkySW} />
            <Bx x={PLX} y={Y.h6 + 11} w={13.5} h={6.5} id="rEb" pr={pr} op={op} df={df} sw={P.pinkySW} />
            {[Y.h6 - 11, Y.h6, Y.h6 + 11].map((py, i) => (
                <line key={i}
                    x1={PLX + 6.75} y1={py} x2={LX - 0.5} y2={Y.h6 + (i - 1) * 4}
                    stroke={P.tubeStroke} strokeWidth="0.4"
                />
            ))}
        </svg>
    );
});

SaxDiagramMap.displayName = 'SaxDiagramMap';
export default SaxDiagramMap;
