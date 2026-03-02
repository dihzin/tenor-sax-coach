// src/components/fingering/svg/StaffGlyph.tsx — v6 (partitura editorial definitiva)
// ─────────────────────────────────────────────────────────────
// Tudo em SVG nativo. Zero Unicode. Hierarquia: staff < acc < stem < note
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { StaffPosition } from '../../../lib/fingering/types';

interface StaffGlyphProps {
    staff: StaffPosition;
    width?: number;
    height?: number;
    palette?: 'technical' | 'gold';
}

// ── Geometria ─────────────────────────────────────────────────
const GAP = 7.5;
const TOP = 19;
const NRX = 7.1;           // notehead rx — massa dominante
const NRY = NRX * 0.575;  // ry — oval editorial, ratio 1.76:1
const ROT = -15;           // graus — padrão editorial clássico
const STEM_L = 25;
// Deslocamento óptico: nota senta levemente abaixo do centro matemático
const OPT_Y = 1.0;
// Ponto de saída da haste corrigido para elipse rotacionada:
// borda direita ≈ NRX·cos(ROT°) para angulo pequeno (~0.966)
const COS15 = 0.966;

// cores — hierarquia de contraste impressão
const STAFF_INK = '#162840';   // base neutra
const NOTE_INK = '#06101A';   // notehead — máximo escuro

const LINE_Y = Array.from({ length: 5 }, (_, i) => TOP + i * GAP);
const stepToY = (s: number) => TOP - s * GAP + OPT_Y;

// ─────────────────────────────────────────────────────────────
// ACIDENTAIS — SVG nativo com geometria tipográfica precisa
// ─────────────────────────────────────────────────────────────

// ── Sustenido (#): verticais finas + cruzetas oblíquas ────────
// Baseado em proporções de engraving profissional:
//   - Dois segmentos verticais ligeiramente mais largos que a nota
//   - Dois traços horizontais com obliquidade de ~15% (sobe da esq para dir)
//   - SW vertical < SW horizontal para hierarquia
const SharpSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    const vSep = 2.0;   // meio-distância entre as duas verticais
    const vH = 6.2;   // meia-altura de cada vertical
    const hW = 4.3;   // meia-largura horizontal
    const slope = 1.0;   // desnível y: esq mais baixo, dir mais alto
    const gap = 2.7;   // meio-distância entre os dois traços horizontais
    return (
        <g aria-hidden="true">
            {/* Vertical esq */}
            <line
                x1={x - vSep} y1={y - vH}
                x2={x - vSep} y2={y + vH}
                stroke={ink} strokeWidth={0.95} strokeLinecap="square"
            />
            {/* Vertical dir */}
            <line
                x1={x + vSep} y1={y - vH}
                x2={x + vSep} y2={y + vH}
                stroke={ink} strokeWidth={0.95} strokeLinecap="square"
            />
            {/* Cruzeta superior — sobe esq→dir */}
            <line
                x1={x - hW} y1={y - gap + slope}
                x2={x + hW} y2={y - gap - slope}
                stroke={ink} strokeWidth={1.40} strokeLinecap="round"
            />
            {/* Cruzeta inferior */}
            <line
                x1={x - hW} y1={y + gap + slope}
                x2={x + hW} y2={y + gap - slope}
                stroke={ink} strokeWidth={1.40} strokeLinecap="round"
            />
        </g>
    );
});
SharpSign.displayName = 'SharpSign';

// ── Bemol (b): haste longa + belly preenchida ─────────────────
// Belly: curva cúbica com tangentes calibradas para forma de "b" real
const FlatSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    const stemTop = y - 9.5;  // haste sobe (cauda longa)
    const bt = y - 0.5;       // topo da belly
    const bb = y + 4.5;       // base da belly
    const bw = 7.0;           // largura máxima da belly
    // Bezier: M → topo → curva → base, fechando no eixo x
    const d = `M ${x} ${bt} C ${x + bw} ${bt - 0.5} ${x + bw} ${bb + 0.5} ${x} ${bb}`;
    return (
        <g aria-hidden="true">
            <line
                x1={x} y1={stemTop} x2={x} y2={bb}
                stroke={ink} strokeWidth={1.05} strokeLinecap="round"
            />
            <path d={d} fill={ink} stroke="none" />
        </g>
    );
});
FlatSign.displayName = 'FlatSign';

// ── Bequadro (♮): duas hastes + quadrado aberto ───────────────
const NaturalSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    const lx = x - 2.3;
    const rx = x + 2.3;
    const bH = 3.0;
    return (
        <g aria-hidden="true">
            <line x1={lx} y1={y - 9} x2={lx} y2={y + bH} stroke={ink} strokeWidth={0.95} strokeLinecap="square" />
            <line x1={rx} y1={y - bH} x2={rx} y2={y + 9} stroke={ink} strokeWidth={0.95} strokeLinecap="square" />
            <line x1={lx} y1={y - bH} x2={rx} y2={y - bH} stroke={ink} strokeWidth={1.30} strokeLinecap="round" />
            <line x1={lx} y1={y + bH} x2={rx} y2={y + bH} stroke={ink} strokeWidth={1.30} strokeLinecap="round" />
        </g>
    );
});
NaturalSign.displayName = 'NaturalSign';

// ─────────────────────────────────────────────────────────────
// STAFF GLYPH
// ─────────────────────────────────────────────────────────────
const StaffGlyph: React.FC<StaffGlyphProps> = memo(({
    staff, width = 92, height = 80, palette = 'technical',
}) => {
    const noteInk = palette === 'technical' ? NOTE_INK : '#7A4800';
    const staffInk = palette === 'technical' ? STAFF_INK : '#9A6800';

    const hasAcc = !!staff.accidental;
    // nX: offset à direita quando há acidental — nota não se move, acidental recua
    const nX = width / 2 + (hasAcc ? 8 : 1);
    const nY = stepToY(staff.diatonicStep);

    // ── Ledger lines ───────────────────────────────────────────
    const ledgerYs: number[] = [];
    const addLedger = (y: number) => { if (!ledgerYs.includes(y)) ledgerYs.push(y); };

    if (staff.ledgerBelow) {
        const bot = Math.floor(staff.diatonicStep);
        for (let s = -1; s >= bot; s--) addLedger(stepToY(s));
        if (staff.diatonicStep === -0.5) addLedger(stepToY(-1));
    }
    if (staff.ledgerAbove) {
        const top = Math.ceil(staff.diatonicStep);
        for (let s = 5; s <= top; s++) addLedger(stepToY(s));
        if (staff.diatonicStep === 5.5) addLedger(stepToY(5));
    }

    // ── Haste ─────────────────────────────────────────────────
    // Ponto de saída: borda da elipse rotacionada projetada no eixo x
    const stemUp = staff.diatonicStep < 2.5;
    const edgeX = NRX * COS15;          // borda horizontal da elipse girada -15°
    const stemX = stemUp ? nX + edgeX - 0.5 : nX - edgeX + 0.5;
    const stemY1 = stemUp ? nY - NRY * 0.4 : nY + NRY * 0.4;
    const stemY2 = stemUp ? nY - STEM_L : nY + STEM_L;

    // X do acidental — respiro = 1.5× raio + margin
    const accX = nX - NRX - 9;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            aria-hidden="true"
        >
            {/* ── Staff lines — base neutra ── */}
            {LINE_Y.map((y, i) => (
                <line
                    key={i}
                    x1={4} y1={y} x2={width - 4} y2={y}
                    stroke={staffInk}
                    strokeWidth={1.30}
                />
            ))}

            {/* ── Ledger lines ── */}
            {ledgerYs.map((y, i) => (
                <line
                    key={'l' + i}
                    x1={nX - NRX - 3.5} y1={y}
                    x2={nX + NRX + 3.5} y2={y}
                    stroke={staffInk}
                    strokeWidth={1.25}
                />
            ))}

            {/* ── Acidental ── */}
            {staff.accidental === 'sharp' && <SharpSign x={accX} y={nY} ink={noteInk} />}
            {staff.accidental === 'flat' && <FlatSign x={accX} y={nY} ink={noteInk} />}
            {staff.accidental === 'natural' && <NaturalSign x={accX} y={nY} ink={noteInk} />}

            {/* ── Haste (antes do notehead — fica atrás em SVG paint order) ── */}
            <line
                x1={stemX} y1={stemY1}
                x2={stemX} y2={stemY2}
                stroke={noteInk}
                strokeWidth={0.95}
                strokeLinecap="butt"
            />

            {/* ── Notehead — oval editorial, hierarquia máxima ── */}
            <ellipse
                cx={nX} cy={nY}
                rx={NRX} ry={NRY}
                fill={noteInk}
                transform={`rotate(${ROT}, ${nX}, ${nY})`}
            />
        </svg>
    );
});

StaffGlyph.displayName = 'StaffGlyph';
export default StaffGlyph;
