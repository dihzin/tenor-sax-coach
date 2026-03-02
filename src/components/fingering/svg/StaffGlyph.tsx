// src/components/fingering/svg/StaffGlyph.tsx — v5 (nível partitura editorial)
import React, { memo } from 'react';
import type { StaffPosition } from '../../../lib/fingering/types';

interface StaffGlyphProps {
    staff: StaffPosition;
    width?: number;
    height?: number;
    palette?: 'technical' | 'gold';
}

// ── Geometria refinada ────────────────────────────────────────
const GAP = 7.5;          // espaçamento entre linhas
const TOP = 19;           // y da 1ª linha
const NRX = 6.6;          // notehead rx
const NRY = NRX * 0.60;  // ry mais achatado → proporção 1.1:0.66 → ratio ≈ 1.65
const ROT = -15;          // -15° (editorial standard)
const STEM_L = 24;
const OPT_Y = 0.8;          // ajuste óptico vertical (+0.8px → note parece pousada)

const LINE_Y = Array.from({ length: 5 }, (_, i) => TOP + i * GAP);
const stepToY = (s: number) => TOP - s * GAP + OPT_Y;

// ── Cores por hierarquia ──────────────────────────────────────
// staff lines: levemente menos saturado que notehead (impressão editorial)
const STAFF_INK = '#102030';  // base neutra levemente azulada
const NOTE_INK = '#06111E';  // mais escuro — domina

// ── SharpSign redesenhado (-8% scale, traços mais finos) ─────
const SharpSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    // Escala -8% vs v4: vH 6.5→6.0, hW 4.5→4.1, spacing 2.8→2.6, SW -8%
    const vLX = x - 1.9;
    const vRX = x + 1.9;
    const vH = 6.0;
    const hW = 4.1;
    const hSl = 0.9;      // inclinação óptica suavizada
    const b1y = y - 2.6;
    const b2y = y + 2.6;
    return (
        <g aria-hidden="true">
            <line x1={vLX} y1={y - vH} x2={vLX} y2={y + vH}
                stroke={ink} strokeWidth={1.0} strokeLinecap="square" />
            <line x1={vRX} y1={y - vH} x2={vRX} y2={y + vH}
                stroke={ink} strokeWidth={1.0} strokeLinecap="square" />
            <line x1={x - hW} y1={b1y + hSl} x2={x + hW} y2={b1y - hSl}
                stroke={ink} strokeWidth={1.35} strokeLinecap="round" />
            <line x1={x - hW} y1={b2y + hSl} x2={x + hW} y2={b2y - hSl}
                stroke={ink} strokeWidth={1.35} strokeLinecap="round" />
        </g>
    );
});
SharpSign.displayName = 'SharpSign';

// ── FlatSign — haste longa + barriga bezier fechada ───────────
const FlatSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    const stemTop = y - 9;
    const bumpTop = y - 1;
    const bumpBot = y + 4;
    const d = [
        `M ${x} ${bumpTop}`,
        `C ${x + 6.5} ${bumpTop - 1}`,
        `  ${x + 6.5} ${bumpBot + 1}`,
        `  ${x} ${bumpBot}`,
    ].join(' ');
    return (
        <g aria-hidden="true">
            <line x1={x} y1={stemTop} x2={x} y2={bumpBot}
                stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
            <path d={d} fill={ink} stroke="none" />
        </g>
    );
});
FlatSign.displayName = 'FlatSign';

// ── NaturalSign — dois segmentos + retângulo aberto ───────────
const NaturalSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    const lx = x - 2.4;
    const rx = x + 2.4;
    const bH = 3.2;
    return (
        <g aria-hidden="true">
            <line x1={lx} y1={y - 8.5} x2={lx} y2={y + bH} stroke={ink} strokeWidth={1.0} strokeLinecap="square" />
            <line x1={rx} y1={y - bH} x2={rx} y2={y + 8.5} stroke={ink} strokeWidth={1.0} strokeLinecap="square" />
            <line x1={lx} y1={y - bH} x2={rx} y2={y - bH} stroke={ink} strokeWidth={1.3} strokeLinecap="round" />
            <line x1={lx} y1={y + bH} x2={rx} y2={y + bH} stroke={ink} strokeWidth={1.3} strokeLinecap="round" />
        </g>
    );
});
NaturalSign.displayName = 'NaturalSign';

// ── StaffGlyph ────────────────────────────────────────────────
const StaffGlyph: React.FC<StaffGlyphProps> = memo(({
    staff, width = 92, height = 80, palette = 'technical',
}) => {
    const noteInk = palette === 'technical' ? NOTE_INK : '#8B5E00';
    const staffInk = palette === 'technical' ? STAFF_INK : '#A07000';

    const hasAcc = !!staff.accidental;
    const nX = width / 2 + (hasAcc ? 8 : 1);
    const nY = stepToY(staff.diatonicStep);

    // Ledger lines
    const ledgerYs: number[] = [];
    if (staff.ledgerBelow) {
        const bot = Math.floor(staff.diatonicStep);
        for (let s = -1; s >= bot; s--) {
            const ly = stepToY(s);
            if (!ledgerYs.includes(ly)) ledgerYs.push(ly);
        }
        if (staff.diatonicStep === -0.5) {
            const cy = stepToY(-1);
            if (!ledgerYs.includes(cy)) ledgerYs.push(cy);
        }
    }
    if (staff.ledgerAbove) {
        const top = Math.ceil(staff.diatonicStep);
        for (let s = 5; s <= top; s++) {
            const ly = stepToY(s);
            if (!ledgerYs.includes(ly)) ledgerYs.push(ly);
        }
        if (staff.diatonicStep === 5.5) {
            const cy = stepToY(5);
            if (!ledgerYs.includes(cy)) ledgerYs.push(cy);
        }
    }

    // Haste — sai do extremo direito/esquerdo do notehead
    const stemUp = staff.diatonicStep < 2.5;
    const stemX = stemUp ? nX + NRX - 0.7 : nX - NRX + 0.7;
    // stemY1: encontra borda vertical do notehead (elipse rotacionada ≈ NRY)
    const stemY1 = stemUp ? nY - NRY * 0.55 : nY + NRY * 0.55;
    const stemY2 = stemUp ? nY - STEM_L : nY + STEM_L;

    // X do acidental: respiro de 1.5× o raio antes da nota
    const accX = nX - NRX - 8;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            aria-hidden="true"
        >
            {/* Staff lines — base neutra, levemente mais clara que nota */}
            {LINE_Y.map((y, i) => (
                <line
                    key={i}
                    x1={5} y1={y} x2={width - 5} y2={y}
                    stroke={staffInk}
                    strokeWidth={1.25}
                    strokeOpacity={0.90}
                />
            ))}

            {/* Ledger lines */}
            {ledgerYs.map((y, i) => (
                <line
                    key={'l' + i}
                    x1={nX - NRX - 4} y1={y}
                    x2={nX + NRX + 4} y2={y}
                    stroke={staffInk}
                    strokeWidth={1.15}
                    strokeOpacity={0.90}
                />
            ))}

            {/* Acidental */}
            {staff.accidental === 'sharp' && <SharpSign x={accX} y={nY} ink={noteInk} />}
            {staff.accidental === 'flat' && <FlatSign x={accX} y={nY} ink={noteInk} />}
            {staff.accidental === 'natural' && <NaturalSign x={accX} y={nY} ink={noteInk} />}

            {/* Haste — -8% espessura (1.05 → 0.97) */}
            <line
                x1={stemX} y1={stemY1}
                x2={stemX} y2={stemY2}
                stroke={noteInk}
                strokeWidth={0.97}
                strokeLinecap="butt"
            />

            {/* Notehead — oval editorial -15°, horizontal dominante */}
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
